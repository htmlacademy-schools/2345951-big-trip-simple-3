import Presenter from './presenter/presenter';
import FiltersView from './view/filter-view';
import {render} from './framework/render';
import TripPointModel from './model/model';
import {generateFilter} from './mock/filter';

const tripControlsFilters = document.querySelector('.trip-controls__filters');
const container = document.querySelector('.trip-events');

const tripPointsModel = new TripPointModel();
const presenter = new Presenter({container, tripPointsModel});

const filters = generateFilter(tripPointsModel.tripPoints);

render(new FiltersView({filters}), tripControlsFilters);

presenter.init();
