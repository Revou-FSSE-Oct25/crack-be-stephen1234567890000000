const { Service } = require("../models/index");
const { Op } = require("sequelize");

class Serviceservice {
  static async createService(name, duration, description, price) {
    const service = await Service.create({
      name,
      duration,
      description,
      price,
    });

    return service;
  }

  static async getAllServices(search, minPrice, maxPrice, limit, offset) {
    const where = {};

    if (search) {
      where.name = {
        [Op.iLike]: `%${search}%`,
      };
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) {
        where.price[Op.gte] = minPrice;
      }
      if (maxPrice) {
        where.price[Op.lte] = maxPrice;
      }
    }

    const result = await Service.findAndCountAll({
      where,
      limit,
      offset,
    });

    return {
      total: result.count,
      services: result.rows,
    };
  }

  static async getServiceById(id) {
    const service = await Service.findByPk(id);

    return service;
  }

  static async updateService(id, name, duration, description, price) {
    const service = await Service.findByPk(id);

    if (!service) {
      throw {
        statusCode: 404,
        message: "Service not found",
      };
    }

    const updated = await service.update({
      name,
      duration,
      description,
      price,
    });

    return updated;
  }

  static async deleteService(id) {
    const service = await Service.findByPk(id);

    if (!service) {
      throw {
        statusCode: 404,
        message: "Service not found",
      };
    }

    await service.destroy();
    return true;
  }
}

module.exports = Serviceservice;
