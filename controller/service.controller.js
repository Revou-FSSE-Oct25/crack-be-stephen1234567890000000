const { Service } = require("../models/index");
const Serviceservice = require("../services/service.service");

class ServiceController {
  static async createService(req, res, next) {
    try {
      const { name, duration, description, price } = req.body;
      const result = await Serviceservice.createService(
        name,
        duration,
        description,
        price,
      );

      if (!result) {
        return next({
          statusCode: 404,
          message: "Failed to create service",
        });
      }
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async getAllServices(req, res, next) {
    try {
      const { search, minPrice, maxPrice, page = 1 } = req.query;
      const limit = 10;
      const offset = (page - 1) * limit;
      const result = await Serviceservice.getAllServices(
        search,
        minPrice,
        maxPrice,
        limit,
        offset,
      );

      if (!result) {
        return next({
          statusCode: 404,
          message: "No services found",
        });
      }

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async getServiceById(req, res, next) {
    try {
      const { id } = req.params;
      const result = await Serviceservice.getServiceById(id);

      if (!result) {
        return next({
          statusCode: 404,
          message: "Service not found",
        });
      }

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async updateService(req, res, next) {
    try {
      const { name, duration, description, price } = req.body;
      const { id } = req.params;

      const result = await Serviceservice.updateService(
        id,
        name,
        duration,
        description,
        price,
      );

      if (!result) {
        return next({
          statusCode: 404,
          message: "Failed to update service",
        });
      }

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async deleteService(req, res, next) {
    try {
      const { id } = req.params;
      const result = await Serviceservice.deleteService(id);

      if (!result) {
        return next({
          statusCode: 404,
          message: "Failed to delete service",
        });
      }

      res.status(200).json({ message: "Service deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ServiceController;
