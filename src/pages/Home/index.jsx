import React from 'react';
import { Button, Typography, Card, Space } from 'antd';
import { 
  HomeOutlined, 
  InfoCircleOutlined,
  CodeOutlined,
  MailOutlined  // Добавляем иконку для обратной связи
} from '@ant-design/icons';

const { Title, Text } = Typography;

const HomePage = () => {
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
        
        <Title level={1} style={{ 
          color: '#fff', 
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          Добро пожаловать!
        </Title>

        <Card 
          style={{ 
            background: '#1f1f1f',
            border: '1px solid #333',
            borderRadius: '8px',
            marginBottom: '24px'
          }}
        >
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            gap: '20px'
          }}>
            <CodeOutlined style={{ 
              fontSize: '48px', 
              color: '#ff1837'
            }} />
            
            <Text style={{ 
              color: '#ccc', 
              fontSize: '18px',
              textAlign: 'center'
            }}>
              Первый проект на React!
            </Text>
          </div>
        </Card>

        {/* Меняем расположение кнопок */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',  // Вертикальное расположение
          gap: '12px', 
          alignItems: 'center'
        }}>
          {/* Первый ряд: Главная и О программе */}
          <div style={{ 
            display: 'flex', 
            gap: '16px', 
            width: '100%',
            maxWidth: '500px'
          }}>
            <Button 
              type="primary"
              size="large"
              icon={<HomeOutlined />}
              disabled
              style={{ 
                flex: 1,
                background: 'transparent',
                color: '#fff',
                borderColor: '#ff1837'
              }}
            >
              Главная
            </Button>
            
            <Button 
              type="default"
              size="large"
              icon={<InfoCircleOutlined />}
              href="/about"
              style={{ 
                flex: 1,
                background: 'transparent',
                color: '#fff',
                borderColor: '#ff1837'
              }}
            >
              О программе
            </Button>
          </div>

          {/* Второй ряд: Обратная связь (на всю ширину) */}
          <div style={{ 
            width: '100%',
            maxWidth: '500px'
          }}>
            <Button 
              type="default"
              size="large"
              icon={<MailOutlined />}
              href="/feedback"
              style={{ 
                width: '100%',
                background: 'transparent',
                color: '#fff',
                borderColor: '#ff1837'
              }}
            >
              Обратная связь
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;