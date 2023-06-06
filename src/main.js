import Presenter from './presenter/presenter';
import FiltersView from './View/filter-view';
import {render} from './render';
import TripPointModel from './model/model';

const filters = document.querySelector('.trip-controls__filters');
const container = document.querySelector('.trip-events');
const tripPointsModel = new TripPointModel();
const presenter = new Presenter(container, tripPointsModel);

render(new FiltersView(), filters);

presenter.init();
