import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Input,
  Space,
  message,
  Card,
  Statistic,
  Row,
  Col,
  Modal,
  Form,
} from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  UserOutlined,
  EditOutlined,
  SearchOutlined,
  FileExcelOutlined,
  BarChartOutlined,
} from '@ant-design/icons';
import { getStudents, createStudent, updateStudent, deleteStudent } from '@/services/demo/student';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');

  // Загрузка данных при монтировании
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      message.error('Ошибка загрузки данных');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Сохранение (добавление/редактирование)
  const handleSave = async (values) => {
    try {
      if (editingStudent) {
        await updateStudent(editingStudent.id, values);
        message.success('Студент обновлён');
      } else {
        await createStudent(values);
        message.success('Студент добавлен');
      }
      setModalVisible(false);
      form.resetFields();
      setEditingStudent(null);
      fetchStudents(); // обновляем таблицу
    } catch (error) {
      message.error('Ошибка сохранения');
      console.error(error);
    }
  };

  // Удаление
  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Подтверждение удаления',
      content: 'Вы уверены, что хотите удалить этого студента?',
      onOk: async () => {
        try {
          await deleteStudent(id);
          message.success('Студент удалён');
          fetchStudents();
        } catch (error) {
          message.error('Ошибка удаления');
          console.error(error);
        }
      },
    });
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    form.setFieldsValue(student);
    setModalVisible(true);
  };

  const handleAdd = () => {
    setEditingStudent(null);
    form.resetFields();
    setModalVisible(true);
  };

  // Фильтрация по имени
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Подготовка данных для графика (агрегация по группам)
  const prepareChartData = () => {
    const groups = {};
    filteredStudents.forEach((student) => {
      const group = student.group;
      groups[group] = (groups[group] || 0) + 1;
    });
    return Object.keys(groups).map((group) => ({
      name: group,
      count: groups[group],
    }));
  };

  const chartData = prepareChartData();

  // Экспорт в Excel
  const exportToExcel = () => {
    if (filteredStudents.length === 0) {
      message.warning('Нет данных для экспорта');
      return;
    }

    // Преобразование данных: переименование полей, форматирование даты
    const transformedData = filteredStudents.map((student) => ({
      'ID': student.id,
      'Имя студента': student.name,
      'Группа': student.group,
      'Дата добавления': student.dateAdded
        ? new Date(student.dateAdded).toLocaleDateString('ru-RU')
        : '',
    }));

    // Создание рабочего листа и книги
    const worksheet = XLSX.utils.json_to_sheet(transformedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Студенты');

    // Генерация файла и скачивание
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(dataBlob, `students_${new Date().toISOString().slice(0, 19)}.xlsx`);
    message.success('Экспорт завершён');
  };

  const totalCount = filteredStudents.length;
  const groupCount = new Set(filteredStudents.map((s) => s.group)).size;

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Имя студента',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Группа',
      dataIndex: 'group',
      key: 'group',
      filters: [...new Set(students.map((s) => s.group))].map((group) => ({
        text: group,
        value: group,
      })),
      onFilter: (value, record) => record.group === value,
    },
    {
      title: 'Дата добавления',
      dataIndex: 'dateAdded',
      key: 'dateAdded',
      render: (date) => (date ? new Date(date).toLocaleDateString() : ''),
      sorter: (a, b) => new Date(a.dateAdded) - new Date(b.dateAdded),
    },
    {
      title: 'Действия',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Редактировать
          </Button>
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            Удалить
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: '24px' }}>
        <Col>
          <h1 style={{ margin: 0 }}>📚 Список студентов</h1>
        </Col>
        <Col>
          <Space>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAdd}
            >
              Добавить студента
            </Button>
            <Button
              icon={<FileExcelOutlined />}
              onClick={exportToExcel}
            >
              Экспорт в Excel
            </Button>
          </Space>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={8}>
          <Card
            hoverable
            style={{
              borderRadius: '15px',
              textAlign: 'center',
              border: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            <Statistic
              title="Всего студентов"
              value={totalCount}
              prefix={<UserOutlined />}
              valueStyle={{ color: totalCount > 0 ? '#3f8600' : '#cf1322', fontSize: '28px' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card
            hoverable
            style={{
              borderRadius: '15px',
              textAlign: 'center',
              border: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            <Statistic
              title="Количество групп"
              value={groupCount}
              suffix="групп"
              valueStyle={{ color: '#722ed1', fontSize: '28px' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card
            hoverable
            style={{
              borderRadius: '15px',
              textAlign: 'center',
              border: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            <Input
              placeholder="Поиск по имени"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
          </Card>
        </Col>
      </Row>

      {/* График (визуализация) */}
      {chartData.length > 0 && (
        <Card
          title={
            <span>
              <BarChartOutlined style={{ marginRight: 8 }} />
              Количество студентов по группам
            </span>
          }
          style={{
            marginBottom: '24px',
            borderRadius: '15px',
            border: 'none',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#1890ff" name="Студенты" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      )}

      <Card
        style={{
          borderRadius: '15px',
          border: 'none',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <Table
          columns={columns}
          dataSource={filteredStudents}
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: 5,
            showTotal: (total, range) => `${range[0]}-${range[1]} из ${total} студентов`,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '20'],
          }}
          bordered
          locale={{ emptyText: 'Нет студентов' }}
        />
      </Card>

      <Modal
        title={editingStudent ? 'Редактировать студента' : 'Добавить студента'}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
          setEditingStudent(null);
        }}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Form.Item
            name="name"
            label="Имя студента"
            rules={[{ required: true, message: 'Введите имя' }]}
          >
            <Input placeholder="Введите имя" />
          </Form.Item>
          <Form.Item
            name="group"
            label="Группа"
            rules={[{ required: true, message: 'Введите группу' }]}
          >
            <Input placeholder="Введите группу" />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {editingStudent ? 'Сохранить' : 'Добавить'}
              </Button>
              <Button onClick={() => setModalVisible(false)}>Отмена</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StudentsPage;