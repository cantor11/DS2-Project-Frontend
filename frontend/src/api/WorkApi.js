import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/v1/';

const workApi = () => axios.create({
    baseURL: BASE_URL,
});

export const getAllWorks = async () => {
    try {
        const response = await workApi().get('work/');
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const createWork = async (work) => {
    try {
        const response = await workApi().post('work/', work);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const updateWork = async (work) => {
    try {
        const response = await workApi().put(`work/${work.id}/`, work);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const deleteWork = async (id) => {
    try {
        const response = await workApi().delete(`work/${id}/`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getWork = async (id) => {
    try {
        const response = await workApi().get(`work/${id}/`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getQuantityByBrand = async () => {
    try {
        const response = await workApi().get('work/quantity_by_brand/');
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getQuantityByCategory = async () => {
    try {
        const response = await workApi().get('work/quantity_by_category/');
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getQuantityByPrice = async () => {
    try {
        const response = await workApi().get('work/quantity_by_price/');
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getQuantityByStock = async () => {
    try {
        const response = await workApi().get('work/quantity_by_stock/');
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

