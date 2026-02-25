import React from 'react';
import { Modal, Avatar, Typography, Space, Button } from 'antd';
import { 
  UserOutlined, 
  GithubOutlined, 
  MailOutlined, 
  LinkedinOutlined 
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

// Компонент модального окна
// Принимает два параметра (props):
// visible - открыто/закрыто окно
// onClose - функция для закрытия
const DeveloperModal = ({ visible, onClose }) => {
  return (
    <Modal
      title="О разработчике"  // Заголовок окна
      open={visible}          // Видимость окна
      onCancel={onClose}      // Что делать при закрытии
      footer={null}           // Убираем стандартные кнопки
      width={400}             // Ширина окна
      centered                // По центру экрана
      // Стили для темной темы
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
        mask: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        },
      }}
    >
      {/* Контент модального окна */}
      <Space 
        direction="vertical" 
        size="large" 
        style={{ width: '100%', textAlign: 'center' }}
      >
        {/* Фото разработчика */}
        <Avatar 
          size={120}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUOZ2wAHGDL7Z6VUqKWBsJLN7Deozk-FmN5w&s"  // Случайное фото
          shape="square"
          style={{ 
            border: `3px solid #ff1837`,  // Твой красный цвет
            boxShadow: '0 0 20px rgba(255, 24, 55, 0.3)'
          }}
        />
        
        {/* Имя */}
        <Title level={3} style={{ color: '#fff', margin: 0 }}>
          Бо́рат Маргарет Сагди́ев
        </Title>
        
        {/* Должность */}
        <Text style={{ color: '#ff1837', fontSize: '16px' }}>
          Frontend Developer
        </Text>
      </Space>
    </Modal>
  );
};

export default DeveloperModal;