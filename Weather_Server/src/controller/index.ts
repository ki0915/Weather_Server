import express from 'express';
import timeWeatherController from './timeWeather.controller';
import todayWeatherController from './todayWeather.controller';
import weekWeatherController from './weekWeather.controller';

const router = express.Router();

router.use('/time', timeWeatherController);
router.use('/today', todayWeatherController);
router.use('/week', weekWeatherController);

export default router;