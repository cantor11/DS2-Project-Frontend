import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/v1/';

const userApi = () => axios.create({
    baseURL: BASE_URL,
});

export const getAllUsers = async () => {
    try {
        const response = await userApi().get('user/');
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const createUser = async (user) => {
    try {
        const response = await userApi().post('user/', user);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const updateUser = async (id, formData) => {
    try {
        const response = await axios.put(`${BASE_URL}/user/${id}/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const deleteUser = async (id) => {
    try {
        const response = await userApi().delete(`user/${id}/`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getUser = async (id) => {
    try {
        const response = await userApi().get(`user/${id}/`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}
