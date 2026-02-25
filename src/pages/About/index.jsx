import React, { useState } from 'react';  // Добавили useState
import { Button, Typography, Card, Space, Divider } from 'antd';
import { 
  HomeOutlined,
  UserOutlined,
  CodeOutlined,
  BulbOutlined,
  RocketOutlined,
  TeamOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import DeveloperModal from '@/components/Guide/DeveloperModal';  // Импортируем модалку

const { Title, Text, Paragraph } = Typography;

const AboutPage = () => {
  // Состояние для модального окна
  // modalVisible - переменная состояния (true/false)
  // setModalVisible - функция для изменения состояния
  // useState(false) - начальное значение false (окно закрыто)
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <div style={{ 
      minHeight: '100vh',
      background: '#141414',
      padding: '24px'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto' 
      }}>
        
        {/* Заголовок страницы */}
        <Title level={1} style={{ 
          color: '#fff', 
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          О программе
        </Title>

        {/* Основная информация */}
        <Card 
          style={{ 
            background: '#1f1f1f',
            border: '1px solid #333',
            borderRadius: '12px',
            marginBottom: '24px'
          }}
        >
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            {/* Блок с иконкой и названием */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <InfoCircleOutlined style={{ fontSize: '32px', color: '#ff1837' }} />
              <div>
                <Title level={3} style={{ color: '#fff', margin: 0 }}>
                  О проекте
                </Title>
                <Text style={{ color: '#888' }}>
                  Версия 1.0.0
                </Text>
              </div>
            </div>

            {/* Описание проекта */}
            <Paragraph style={{ color: '#ccc', fontSize: '16px' }}>
              Это учебный проект, созданный с использованием современных технологий. 
              Проект демонстрирует возможности React, Umi Max и Ant Design в создании 
              современных веб-приложений.
            </Paragraph>
          </Space>
        </Card>

        {/* Технологии */}
        <Title level={2} style={{ color: '#fff', marginBottom: '20px' }}>
          Используемые технологии
        </Title>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '16px',
          marginBottom: '32px'
        }}>
          {/* Карточка React */}
          <Card style={{ background: '#1f1f1f', border: '1px solid #333' }}>
            <Space direction="vertical" align="center" style={{ width: '100%' }}>
              <CodeOutlined style={{ fontSize: '40px', color: '#ff1837' }} />
              <Title level={4} style={{ color: '#fff', margin: '8px 0' }}>React</Title>
              <Text style={{ color: '#888', textAlign: 'center' }}>
                Библиотека для создания интерфейсов
              </Text>
            </Space>
          </Card>

          {/* Карточка Umi Max */}
          <Card style={{ background: '#1f1f1f', border: '1px solid #333' }}>
            <Space direction="vertical" align="center" style={{ width: '100%' }}>
              <RocketOutlined style={{ fontSize: '40px', color: '#ff1837' }} />
              <Title level={4} style={{ color: '#fff', margin: '8px 0' }}>Umi Max</Title>
              <Text style={{ color: '#888', textAlign: 'center' }}>
                Фреймворк для корпоративных приложений
              </Text>
            </Space>
          </Card>

          {/* Карточка Ant Design */}
          <Card style={{ background: '#1f1f1f', border: '1px solid #333' }}>
            <Space direction="vertical" align="center" style={{ width: '100%' }}>
              <BulbOutlined style={{ fontSize: '40px', color: '#ff1837' }} />
              <Title level={4} style={{ color: '#fff', margin: '8px 0' }}>Ant Design</Title>
              <Text style={{ color: '#888', textAlign: 'center' }}>
                Библиотека компонентов
              </Text>
            </Space>
          </Card>
        </div>

        {/* Информация о разработке */}
        <Card 
          style={{ 
            background: '#1f1f1f',
            border: '1px solid #333',
            borderRadius: '12px',
            marginBottom: '24px'
          }}
        >
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <TeamOutlined style={{ fontSize: '32px', color: '#ff1837' }} />
              <Title level={3} style={{ color: '#fff', margin: 0 }}>
                О разработке
              </Title>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <Text style={{ color: '#888', display: 'block' }}>Дата создания</Text>
                <Text style={{ color: '#fff' }}>Февраль 2025</Text>
              </div>
              <div>
                <Text style={{ color: '#888', display: 'block' }}>Версия</Text>
                <Text style={{ color: '#fff' }}>1.0.0</Text>
              </div>
              <div>
                <Text style={{ color: '#888', display: 'block' }}>Лицензия</Text>
                <Text style={{ color: '#fff' }}>Спираченная</Text>
              </div>
              <div>
                <Text style={{ color: '#888', display: 'block' }}>Репозиторий</Text>
                <Text style={{ color: '#fff' }}>GitHub</Text>
              </div>
            </div>
          </Space>
        </Card>

        {/* Разработчик и кнопка */}
        <Card 
          style={{ 
            background: '#1f1f1f',
            border: '1px solid #333',
            borderRadius: '12px',
            marginBottom: '24px'
          }}
        >
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <UserOutlined style={{ fontSize: '32px', color: '#ff1837' }} />
              <div>
                <Title level={4} style={{ color: '#fff', margin: 0 }}>
                  Разработчик
                </Title>
                <Text style={{ color: '#888' }}>
                  Бо́рат Маргарет Сагди́ев
                </Text>
              </div>
            </div>
            
            {/* Кнопка для открытия модального окна */}
            <Button 
              type="primary"
              size="large"
              icon={<UserOutlined />}
              onClick={() => setModalVisible(true)}  // Открываем модалку
              style={{ 
                background: '#ff1837',
                border: 'none',
                boxShadow: '0 4px 15px rgba(255, 24, 55, 0.3)'
              }}
            >
              Подробнее о разработчике
            </Button>
          </div>
        </Card>

        {/* Кнопка возврата на главную */}
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <Button 
            size="large"
            icon={<HomeOutlined />}
            href="/home"
            style={{ 
              background: 'transparent',
              color: '#fff',
              borderColor: '#ff1837'
            }}
          >
            На главную
          </Button>
        </div>
      </div>

      {/* Модальное окно */}
      <DeveloperModal 
        visible={modalVisible}           // Передаем состояние видимости
        onClose={() => setModalVisible(false)}  // Функция закрытия
      />
    </div>
  );
};

export default AboutPage;