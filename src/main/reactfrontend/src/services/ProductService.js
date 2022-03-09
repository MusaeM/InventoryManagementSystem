import axios from 'axios';

const PRODUCTS_REST_API_URL = 'http://localhost:8080/api/products';

class ProductService {

    async getProducts(){
        return axios.get(PRODUCTS_REST_API_URL)
    }



}

export default new ProductService();