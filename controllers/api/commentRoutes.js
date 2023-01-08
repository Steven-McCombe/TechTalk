const router = require('express').Router();
const { Blog, User, Comments} = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');