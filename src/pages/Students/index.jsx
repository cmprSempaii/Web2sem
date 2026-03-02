import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Space, message, Card, Statistic, Row, Col } from 'antd';
import { PlusOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';

const StudentsPage = () => {
  // Состояние для списка студентов
  const [students, setStudents] = useState(() => {
    // Загружаем данные из localStorage при инициализации
    const savedStudents = localStorage.getItem('students');
    return savedStudents ? JSON.parse(savedStudents) : [];
  });

  // Состояния для формы добавления
  const [studentName, setStudentName] = useState('');
  const [studentGroup, setStudentGroup] = useState('');

  // Состояние для счетчика (для демонстрации useEffect)
  const [totalCount, setTotalCount] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(new Date().toLocaleTimeString());

  // useEffect для сохранения в localStorage и обновления счетчика
  useEffect(() => {
    // Сохраняем в localStorage при каждом изменении списка
    localStorage.setItem('students', JSON.stringify(students));
    
    // Обновляем счетчик студентов
    setTotalCount(students.length);
    setLastUpdate(new Date().toLocaleTimeString());
    
    // Показываем сообщение при изменении списка
    if (students.length > 0) {
      message.info(`Количество студентов обновлено: ${students.length}`);
    }
  }, [students]);

  // useEffect для загрузки начальных данных (демонстрация)
  useEffect(() => {
    // Если список пуст, добавляем тестовые данные
    if (students.length === 0) {
      const initialStudents = [
        { id: '001', name: 'Коротков Юрий', group: 'НМТМ-153901', dateAdded: new Date().toLocaleDateString() },
        { id: '002', name: 'Пётр Артемьев', group: 'НМТМ-153901', dateAdded: new Date().toLocaleDateString() },
        { id: '003', name: 'Харисов Владислав', group: 'НМТ-413319', dateAdded: new Date().toLocaleDateString() },
        { id: '004', name: 'Джефри Эпштейн', group: 'ISLAND-1337', dateAdded: new Date().toLocaleDateString() },
      ];
      setStudents(initialStudents);
    }
    
    // Изменяем заголовок документа
    document.title = 'Управление студентами';
    
    // Очистка при размонтировании
    return () => {
      document.title = 'Umi Max App';
    };
  }, []); // Пустой массив зависимостей - выполнится только при монтировании

  // Функция добавления студента
  const handleAddStudent = () => {
    if (!studentName.trim() || !studentGroup.trim()) {
      message.warning('Пожалуйста, заполните все поля');
      return;
    }

    const newStudent = {
      id: Date.now().toString(),
      name: studentName.trim(),
      group: studentGroup.trim().toUpperCase(),
      dateAdded: new Date().toLocaleDateString(),
    };

    setStudents([...students, newStudent]);
    
    // Очистка полей ввода
    setStudentName('');
    setStudentGroup('');
    
    message.success('Студент успешно добавлен');
  };

  // Функция удаления студента
  const handleDeleteStudent = (id) => {
    setStudents(students.filter(student => student.id !== id));
    message.success('Студент удален');
  };

  // Функция удаления всех студентов
  const handleDeleteAll = () => {
    if (students.length === 0) {
      message.info('Список уже пуст');
      return;
    }
    
    if (window.confirm('Вы уверены, что хотите удалить всех студентов?')) {
      setStudents([]);
      message.success('Все студенты удалены');
    }
  };

  // Получение уникальных групп для фильтрации
  const getUniqueGroups = () => {
    const groups = students.map(s => s.group);
    return [...new Set(groups)];
  };

  // Колонки для таблицы Ant Design
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
      filters: getUniqueGroups().map(group => ({
        text: group,
        value: group,
      })),
      onFilter: (value, record) => record.group === value,
    },
    {
      title: 'Дата добавления',
      dataIndex: 'dateAdded',
      key: 'dateAdded',
      sorter: (a, b) => new Date(a.dateAdded) - new Date(b.dateAdded),
    },
    {
      title: 'Действия',
      key: 'action',
      render: (_, record) => (
        <Button 
          type="text" 
          danger 
          icon={<DeleteOutlined />}
          onClick={() => handleDeleteStudent(record.id)}
        >
          Удалить
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      {/* Заголовок страницы */}
      <Row justify="space-between" align="middle" style={{ marginBottom: '24px' }}>
        <Col>
          <h1 style={{ margin: 0 }}>📚 Список студентов</h1>
        </Col>
        <Col>
          <Button danger onClick={handleDeleteAll}>
            Очистить весь список
          </Button>
        </Col>
      </Row>

      {/* Статистика с использованием useEffect */}
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Всего студентов"
              value={totalCount}
              prefix={<UserOutlined />}
              valueStyle={{ color: totalCount > 0 ? '#3f8600' : '#cf1322' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Количество групп"
              value={getUniqueGroups().length}
              suffix="групп"
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Последнее обновление"
              value={lastUpdate}
              precision={0}
            />
          </Card>
        </Col>
      </Row>

      {/* Форма добавления студента */}
      <Card 
        title="➕ Добавить нового студента" 
        style={{ marginBottom: '24px' }}
        bordered={false}
      >
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Row gutter={16}>
            <Col xs={24} sm={10}>
              <Input
                placeholder="Введите имя студента"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                onPressEnter={handleAddStudent}
                size="large"
              />
            </Col>
            <Col xs={24} sm={8}>
              <Input
                placeholder="Введите группу"
                value={studentGroup}
                onChange={(e) => setStudentGroup(e.target.value)}
                onPressEnter={handleAddStudent}
                size="large"
              />
            </Col>
            <Col xs={24} sm={6}>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={handleAddStudent}
                size="large"
                block
              >
                Добавить студента
              </Button>
            </Col>
          </Row>
        </Space>
      </Card>

      {/* Таблица студентов */}
      <Card 
        title="📋 Список студентов" 
        bordered={false}
      >
        <Table 
          columns={columns}
          dataSource={students}
          rowKey="id"
          pagination={{ 
            pageSize: 5,
            showTotal: (total, range) => `${range[0]}-${range[1]} из ${total} студентов`,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '20'],
          }}
          bordered
          locale={{
            emptyText: 'Список студентов пуст. Добавьте первого студента!'
          }}
        />
      </Card>

      {/* Дополнительная информация с useEffect */}
      {students.length > 0 && (
        <div style={{ marginTop: '16px', textAlign: 'right', color: '#999' }}>
          <small>
            * Данные автоматически сохраняются в localStorage. 
            Всего операций: {students.length}
          </small>
        </div>
      )}
    </div>
  );
};

export default StudentsPage;