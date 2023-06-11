import {render} from './framework/render.js';
import WaypointModel from './model/waypoint-model';
import {WaypointsApiService} from './waypoints-api-service.js';
import OffersModel from './model/offers-model';
import DestinationsModel from './model/destinations-model';
import FilterModel from './model/filter-model';
import BoardPresenter from './presenter/board-presenter';
import FilterPresenter from './presenter/filter-presenter';
import NewWaypointButton from './view/new-waypoint-button-view';


const filterContainer = document.querySelector('.trip-controls__filters');
const tripEventsSection = document.querySelector('.trip-events');
const headerBlock = document.querySelector('.trip-main');

const AUTHORIZATION = 'Basic jfhsuai5k8567';
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip';

const waypointsApiService = new WaypointsApiService(END_POINT, AUTHORIZATION);

const modelWaypoints = new WaypointModel({tripEventApiService: waypointsApiService});

const modelOffers = new OffersModel({tripEventApiService: waypointsApiService});
const modelDestinations = new DestinationsModel({tripEventApiService: waypointsApiService});
const modelFilters = new FilterModel();

const boardPresenter = new BoardPresenter(
  tripEventsSection,
  {
    tripEventModel: modelWaypoints,
    destinationModel: modelDestinations,
    offerModel: modelOffers,
    filterModel: modelFilters,
    onCreateTripEventDestroy
  });

const filterPresenter = new FilterPresenter({filterContainer, filterModel: modelFilters, tripEventModel: modelWaypoints});

const createWaypointEventButton = new NewWaypointButton({
  onClick: () => {
    boardPresenter.createEvent();
    createWaypointEventButton.element.disabled = true;
  }
});

function onCreateTripEventDestroy() {
  createWaypointEventButton.element.disabled = false;
}

modelWaypoints.init().finally(() => render(createWaypointEventButton, headerBlock));
boardPresenter.init();
filterPresenter.init();
