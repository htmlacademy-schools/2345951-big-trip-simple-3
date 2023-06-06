import Presenter from './presenter/presenter';
import FiltersView from './View/filter-view';
import {render} from './framework/render';
import TripPointModel from './model/model';
import {generateFilter} from './mock/filter';
import {generateSort} from './mock/sort';

const filters = document.querySelector('.trip-controls__filters');
const container = document.querySelector('.trip-events');
const tripPointsModel = new TripPointModel();

const sorts = generateSort();

const presenter = new Presenter({container, tripPointsModel, sorts});

render(new FiltersView(generateFilter()), filters);

presenter.init();
