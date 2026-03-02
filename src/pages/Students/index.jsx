import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Space, message, Card, Statistic, Row, Col } from 'antd';
import { PlusOutlined, DeleteOutlined, UserOutlined, CalendarOutlined } from '@ant-design/icons';

const StudentsPage = () => {
  // Состояние для списка студентов
  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem('students');
    return savedStudents ? JSON.parse(savedStudents) : [];
  });

  // Состояния для формы добавления
  const [studentName, setStudentName] = useState('');
  const [studentGroup, setStudentGroup] = useState('');
  
  // Состояние для счетчика студентов
  const [totalCount, setTotalCount] = useState(0);
  
  // Состояние для последней даты редактирования
  const [lastEditDate, setLastEditDate] = useState(() => {
    const savedLastDate = localStorage.getItem('lastEditDate');
    return savedLastDate || 'Нет изменений';
  });

  // Функция для вычисления следующего ID на основе текущего списка
  const calculateNextId = (studentsList) => {
    if (studentsList.length === 0) return 1;
    // Находим максимальный ID и добавляем 1
    const maxId = Math.max(...studentsList.map(s => parseInt(s.id) || 0));
    return maxId + 1;
  };

  // Состояние для следующего ID - вычисляется из текущего списка
  const [nextId, setNextId] = useState(() => calculateNextId(students));

  // Эффект для пересчета nextId при изменении списка студентов
  useEffect(() => {
    setNextId(calculateNextId(students));
  }, [students]);

  // useEffect для обновления статистики и localStorage
  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
    setTotalCount(students.length);
    
    if (students.length > 0) {
      const currentDate = new Date().toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      setLastEditDate(currentDate);
      localStorage.setItem('lastEditDate', currentDate);
    } else {
      setLastEditDate('Нет изменений');
      localStorage.setItem('lastEditDate', 'Нет изменений');
    }
  }, [students]);

  // Функция добавления студента
  const handleAddStudent = () => {
    if (!studentName.trim() || !studentGroup.trim()) {
      message.warning('Пожалуйста, заполните все поля');
      return;
    }

    const newStudent = {
      id: nextId.toString(), // Используем текущий nextId
      name: studentName.trim(),
      group: studentGroup.trim().toUpperCase(),
      dateAdded: new Date().toLocaleDateString(),
    };

    setStudents([...students, newStudent]);
    // Не увеличиваем nextId вручную, он пересчитается в useEffect
    setStudentName('');
    setStudentGroup('');
    
    message.success(`Студент успешно добавлен с ID: ${nextId}`);
  };

  // Функция удаления студента
  const handleDeleteStudent = (id) => {
    setStudents(students.filter(student => student.id !== id));
    message.success(`Студент с ID ${id} удален`);
  };

  // Функция удаления всех студентов
  const handleDeleteAll = () => {
    if (students.length === 0) {
      message.info('Список уже пуст');
      return;
    }
    
    if (window.confirm('Вы уверены, что хотите удалить всех студентов?')) {
      setStudents([]);
      // nextId пересчитается в useEffect и станет 1
      message.success('Все студенты удалены');
    }
  };

  // Получение уникальных групп
  const getUniqueGroups = () => {
    return [...new Set(students.map(s => s.group))];
  };

  // Колонки для таблицы
  const columns = [
    {
      title: '№',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      render: (id) => <strong>{id}</strong>,
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
      <Row justify="space-between" align="middle" style={{ marginBottom: '24px' }}>
        <Col>
          <h1 style={{ margin: 0 }}>Список студентов</h1>
        </Col>
        <Col>
          <Button danger onClick={handleDeleteAll}>
            Очистить весь список
          </Button>
        </Col>
      </Row>

      {/* Статистика - ТРИ плашки в ряд */}
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        {/* Плашка 1: Количество студентов */}
        <Col xs={24} sm={8}>
          <Card 
            hoverable 
            style={{ 
              borderRadius: '15px',
              textAlign: 'center',
              border: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            <Statistic
              title="Всего студентов"
              value={totalCount}
              prefix={<UserOutlined />}
              valueStyle={{ 
                color: totalCount > 0 ? '#ff1837' : '#cf1322',
                fontSize: '28px'
              }}
            />
          </Card>
        </Col>

        {/* Плашка 2: Последнее изменение */}
        <Col xs={24} sm={8}>
          <Card 
            hoverable 
            style={{ 
              borderRadius: '15px',
              textAlign: 'center',
              border: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            <Statistic
              title="Последнее изменение"
              value={lastEditDate}
            
              valueStyle={{ 
                fontSize: '28px',
                color: lastEditDate === 'Нет изменений' ? '#999' : '#ff1837'
              }}
            />
          </Card>
        </Col>

        {/* Плашка 3: Количество групп */}
        <Col xs={24} sm={8}>
          <Card 
            hoverable 
            style={{ 
              borderRadius: '15px',
              textAlign: 'center',
              border: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            <Statistic
              title="Количество групп"
              value={getUniqueGroups().length}
              suffix="групп"
              valueStyle={{ 
                color: '#ff1837', 
                fontSize: '28px'
              }}
            />
          </Card>
        </Col>
      </Row>

      {/* Форма добавления студента */}
      <Card 
        title="Добавить нового студента" 
        style={{ 
          marginBottom: '24px', 
          borderRadius: '15px',
          border: 'none',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
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
                style={{ borderRadius: '10px' }}
              />
            </Col>
            <Col xs={24} sm={8}>
              <Input
                placeholder="Введите группу"
                value={studentGroup}
                onChange={(e) => setStudentGroup(e.target.value)}
                onPressEnter={handleAddStudent}
                size="large"
                style={{ borderRadius: '10px' }}
              />
            </Col>
            <Col xs={24} sm={6}>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={handleAddStudent}
                size="large"
                block
                style={{ 
                  borderRadius: '10px',
                  height: '40px'
                }}
              >
                Добавить (ID: {nextId})
              </Button>
            </Col>
          </Row>
        </Space>
      </Card>

      {/* Таблица студентов */}
      <Card 
        title="📋 Список студентов" 
        style={{ 
          borderRadius: '15px',
          border: 'none',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
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

      {/* Дополнительная информация */}
      {students.length > 0 && (
        <div style={{ 
          marginTop: '16px', 
          textAlign: 'right', 
          color: '#999',
          fontSize: '12px'
        }}>
          <small>
            * Данные автоматически сохраняются. 
            Следующий свободный ID: {nextId}
          </small>
        </div>
      )}
    </div>
  );
};

export default StudentsPage;