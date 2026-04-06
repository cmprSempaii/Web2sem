import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { history } from '@umijs/max';
import { login } from '@/services/auth';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { token } = await login(values.login, values.password);
      localStorage.setItem('token', token);
      message.success('Вход выполнен успешно');
      // После логина переходим на страницу студентов (принудительно перезагрузим, чтобы initialState подхватил пользователя)
      window.location.href = '/students';
    } catch (error) {
      message.error(error.data?.message || 'Ошибка входа');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card title="Вход в систему" style={{ width: 400 }}>
        <Form onFinish={onFinish}>
          <Form.Item name="login" rules={[{ required: true, message: 'Введите логин' }]}>
            <Input placeholder="Логин" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Введите пароль' }]}>
            <Input.Password placeholder="Пароль" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Войти
            </Button>
          </Form.Item>
          <div style={{ textAlign: 'center', color: '#999' }}>
            Тестовые данные: admin / admin
          </div>
        </Form>
      </Card>
    </div>
  );
}