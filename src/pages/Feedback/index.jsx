// Импортируем React и хуки
import React, { useState } from 'react';

// Импортируем компоненты из Ant Design
import { 
  Form,           // Компонент формы
  Input,          // Поле ввода
  Button,         // Кнопка
  Typography,     // Текст (заголовки)
  Modal,          // Модальное окно
  Space,          // Отступы
  Layout          // Структура страницы
} from 'antd';

// Импортируем иконки
import { 
  HomeOutlined, 
  MailOutlined, 
  UserOutlined, 
  MessageOutlined,
  CheckCircleOutlined 
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Content } = Layout;
const { TextArea } = Input;  // Текстовое поле для сообщения

// Компонент страницы "Обратная связь"
const FeedbackPage = () => {
  // Состояние для модального окна с данными формы
  const [modalVisible, setModalVisible] = useState(false);
  
  // Состояние для хранения данных из формы
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Создаем экземпляр формы
  // Form.useForm() - это хук Ant Design для управления формой
  const [form] = Form.useForm();

  // Функция, которая вызывается при успешной отправке формы
  const onFinish = (values) => {
    // values - это объект с данными из формы
    // Формат: { name: "Иван", email: "ivan@mail.ru", message: "Привет!" }
    
    // Сохраняем данные в состояние
    setFormData(values);
    
    // Показываем модальное окно
    setModalVisible(true);
    
    // Сбрасываем форму (очищаем поля)
    form.resetFields();
  };

  // Функция, которая вызывается при ошибке валидации
  const onFinishFailed = (errorInfo) => {
    console.log('Ошибка валидации:', errorInfo);
  };

  return (
    <Layout style={{ 
      minHeight: '100vh',
      background: '#141414'  // Темный фон как на других страницах
    }}>
      <Content style={{ padding: '50px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          {/* Заголовок страницы */}
          <Title level={1} style={{ 
            color: '#fff', 
            textAlign: 'center',
            marginBottom: '40px'
          }}>
            Обратная связь
          </Title>

          {/* Карточка с формой */}
          <div style={{ 
            background: '#1f1f1f',  // Темный фон карточки
            padding: '40px',
            borderRadius: '12px',
            border: '1px solid #333'
          }}>
            
            {/* Описание */}
            <Text style={{ 
              color: '#ccc', 
              fontSize: '16px',
              display: 'block',
              textAlign: 'center',
              marginBottom: '30px'
            }}>
              Заполните форму, и мы свяжемся с вами в ближайшее время
            </Text>

            {/* Компонент Form из Ant Design */}
            <Form
              form={form}                    // Привязываем экземпляр формы
              name="feedback"                 // Имя формы
              layout="vertical"               // Вертикальное расположение (метка сверху)
              onFinish={onFinish}             // Что делать при успешной отправке
              onFinishFailed={onFinishFailed} // Что делать при ошибке
              autoComplete="off"              // Отключаем автозаполнение браузера
            >
              {/* Поле для имени */}
              <Form.Item
                name="name"                    // Имя поля (ключ в объекте данных)
                label={<span style={{ color: '#fff' }}>Имя</span>}  // Метка поля
                rules={[                       // Правила валидации
                  { 
                    required: true,             // Обязательное поле
                    message: 'Пожалуйста, введите ваше имя!'  // Сообщение об ошибке
                  },
                  {
                    min: 2,                      // Минимальная длина
                    message: 'Имя должно содержать минимум 2 символа'
                  }
                ]}
              >
                {/* Поле ввода с иконкой */}
                <Input 
                  prefix={<UserOutlined style={{ color: '#ff1837' }} />}  // Иконка слева
                  placeholder="Введите ваше имя"  // Подсказка внутри поля
                  style={{ 
                    background: '#2d2d2d', 
                    border: '1px solid #333',
                    color: '#fff'
                  }}
                />
              </Form.Item>

              {/* Поле для email */}
              <Form.Item
                name="email"
                label={<span style={{ color: '#fff' }}>Email</span>}
                rules={[
                  { 
                    required: true, 
                    message: 'Пожалуйста, введите ваш email!' 
                  },
                  { 
                    type: 'email',  // Проверка формата email
                    message: 'Введите корректный email адрес!' 
                  }
                ]}
              >
                <Input 
                  prefix={<MailOutlined style={{ color: '#ff1837' }} />}
                  placeholder="example@mail.com"
                  style={{ 
                    background: '#2d2d2d', 
                    border: '1px solid #333',
                    color: '#fff'
                  }}
                />
              </Form.Item>

              {/* Поле для сообщения */}
              <Form.Item
                name="message"
                label={<span style={{ color: '#fff' }}>Сообщение</span>}
                rules={[
                  { 
                    required: true, 
                    message: 'Пожалуйста, напишите сообщение!' 
                  },
                  {
                    min: 10,
                    message: 'Сообщение должно быть не короче 10 символов'
                  }
                ]}
              >
                {/* TextArea - многострочное текстовое поле */}
                <TextArea 
                  rows={4}  // Высота в 4 строки
                  prefix={<MessageOutlined style={{ color: '#ff1837' }} />}
                  placeholder="Напишите ваше сообщение..."
                  style={{ 
                    background: '#2d2d2d', 
                    border: '1px solid #333',
                    color: '#fff'
                  }}
                />
              </Form.Item>

              {/* Кнопка отправки */}
              <Form.Item>
                <Button 
                  type="primary"
                  htmlType="submit"  // Важно! Тип submit для кнопки в форме
                  size="large"
                  block  // Кнопка на всю ширину
                  style={{ 
                    background: '#ff1837',
                    border: 'none',
                    height: '48px',
                    fontSize: '16px'
                  }}
                >
                  Отправить сообщение
                </Button>
              </Form.Item>
            </Form>
          </div>

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
      </Content>

      {/* Модальное окно с введенными данными */}
      <Modal
        title="Сообщение отправлено!"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button 
            key="ok" 
            type="primary"
            onClick={() => setModalVisible(false)}
            style={{ background: '#ff1837', border: 'none' }}
          >
            Хорошо
          </Button>
        ]}
        styles={{
          content: {
            background: '#1f1f1f',
            color: '#ffffff',
          },
          header: {
            background: '#1f1f1f',
            color: '#ffffff',
            borderBottom: '1px solid #333',
          },
        }}
      >
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          {/* Иконка успеха */}
          <div style={{ textAlign: 'center' }}>
            <CheckCircleOutlined style={{ fontSize: '48px', color: '#ff1837' }} />
          </div>
          
          {/* Информация о том, что данные получены */}
          <Text style={{ color: '#ccc', textAlign: 'center', display: 'block' }}>
            Спасибо за обращение! Вы отправили следующие данные:
          </Text>
          
          {/* Отображаем введенные данные */}
          <div style={{ 
            background: '#2d2d2d', 
            padding: '16px', 
            borderRadius: '8px',
            border: '1px solid #333'
          }}>
            <div style={{ marginBottom: '8px' }}>
              <Text strong style={{ color: '#ff1837' }}>Имя: </Text>
              <Text style={{ color: '#fff' }}>{formData.name}</Text>
            </div>
            <div style={{ marginBottom: '8px' }}>
              <Text strong style={{ color: '#ff1837' }}>Email: </Text>
              <Text style={{ color: '#fff' }}>{formData.email}</Text>
            </div>
            <div>
              <Text strong style={{ color: '#ff1837' }}>Сообщение: </Text>
              <Text style={{ color: '#fff' }}>{formData.message}</Text>
            </div>
          </div>
        </Space>
      </Modal>
    </Layout>
  );
};

export default FeedbackPage;