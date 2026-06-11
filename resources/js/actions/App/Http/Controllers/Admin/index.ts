import ServiceController from './ServiceController'
import CategoryController from './CategoryController'
const Admin = {
    ServiceController: Object.assign(ServiceController, ServiceController),
CategoryController: Object.assign(CategoryController, CategoryController),
}

export default Admin