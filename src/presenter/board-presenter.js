import {remove, render, RenderPosition} from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker';
import {filters, FILTER_TYPE, SORTS, SORT_TYPE, UPDATE_TYPE, USER_ACTION} from '../const';
import WaypointListView from '../view/waypoint-list-view';
import SortView from '../view/sorting-view';
import LoadingView from '../view/loading-view';
import NewWaypointPresenter from './new-waypoint-presenter';
import {WaypointPresenter} from './waypoint-presenter';
import NoWaypointsView from '../view/no-waypoints-view';


const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class BoardPresenter {
  #waypointContainer;
  #waypointModel;
  #destinationModel;
  #offerModel;
  #filterModel;
  #createWaypointerPresenter;
  #noPointsView;
  #onCreateWaypointEventDestroy;
  #WaypointPointsListComponent = new WaypointListView();
  #waypoints = [];
  #filterType = FILTER_TYPE.EVERYTHING;
  #waypointerPresenter = new Map();
  #isLoading = true;
  #sortComponent = new SortView({sorts: SORTS, current: SORT_TYPE.DAY});
  #loadingComponent = new LoadingView();
  #currentSortType = SORT_TYPE.DAY;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor(
    container,
    {
      tripEventModel,
      destinationModel,
      offerModel,
      filterModel,
      onCreateTripEventDestroy
    }) {
    this.#waypointContainer = container;
    this.#waypointModel = tripEventModel;
    this.#destinationModel = destinationModel;
    this.#offerModel = offerModel;
    this.#filterModel = filterModel;
    this.#onCreateWaypointEventDestroy = onCreateTripEventDestroy;

    tripEventModel.init();
    this.#waypoints = [...tripEventModel.tripEvents];

    this.#waypointModel.addObserver(this.#handleModelPoint);
    this.#destinationModel.addObserver(this.#handleModelPoint);
    this.#filterModel.addObserver(this.#handleModelPoint);
  }

  get tripEvents() {
    this.#filterType = this.#filterModel.filter;
    const filteredEvents = filters[this.#filterType](
      this.#waypointModel.tripEvents.sort(SORTS[SORT_TYPE.DAY])
    );
    return (SORTS[this.#currentSortType]) ? filteredEvents.sort(SORTS[this.#currentSortType]) : filteredEvents;
  }

  get destinations() {
    return this.#destinationModel.destinations;
  }

  get offers() {
    return this.#offerModel.offers;
  }

  createEvent = () => {
    this.#currentSortType = SORT_TYPE.DAY;
    this.#filterModel.setFilter(UPDATE_TYPE.MAJOR, FILTER_TYPE.EVERYTHING);
    this.#createWaypointerPresenter = new NewWaypointPresenter({
      tripEventsListContainer: this.#WaypointPointsListComponent.element,
      onDataChange: this.#handleUserAction,
      onDestroy: this.#onCreateWaypointEventDestroy,
      onReset: this.#handleCreateEventFormClose
    });
    this.#createWaypointerPresenter.init({destinations: this.destinations, offers: this.offers});
  };

  #renderTripPoint = (tripEvent) => {
    const container = this.#WaypointPointsListComponent.element;
    const tripEventPresenter = new WaypointPresenter({
      tripPointList: container,
      tripPoint: tripEvent,
      handleModeChange: this.#handleModeChange,
      destinations: this.destinations,
      offers: this.offers,
      onDataChange: this.#handleUserAction
    });
    tripEventPresenter.init();
    this.#waypointerPresenter.set(tripEvent.id, tripEventPresenter);
  };

  #renderSortingView = () => {
    this.#sortComponent.changeCurrentType(this.#currentSortType);
    render(this.#sortComponent, this.#waypointContainer, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderEventsList = () => {
    render(this.#WaypointPointsListComponent, this.#waypointContainer);
    const tripEventsList = this.tripEvents;
    for (let i = 0; i < this.#waypoints.length; i++) {
      try {
        this.#renderTripPoint(tripEventsList[i]);
      } catch (e) { /* */
      }
    }
  };

  #renderPreloader = () => {
    render(this.#loadingComponent, this.#waypointContainer, RenderPosition.AFTERBEGIN);
  };

  #renderNoEvents = () => {
    if (this.#filterType === FILTER_TYPE.FUTURE) {
      this.#noPointsView = new NoWaypointsView('There are no future events now');
    } else if (this.#filterType === FILTER_TYPE.PAST) {
      this.#noPointsView = new NoWaypointsView('There are no past events now');
    } else {
      this.#noPointsView = new NoWaypointsView();
    }
    render(this.#noPointsView, this.#waypointContainer);
  };

  #render = () => {
    if (this.#isLoading || !this.destinations || !this.offers) {
      this.#renderPreloader();
      return;
    }

    this.#waypoints = this.#waypointModel.tripEvents;

    if (this.tripEvents.length === 0) {
      this.#renderNoEvents();
      return;
    }
    this.#renderSortingView();
    this.#renderEventsList();
  };


  #clear = (resetSortType) => {
    this.#waypointerPresenter.forEach((presenter) => presenter.destroy());
    this.#waypointerPresenter.clear();

    if (this.#noPointsView) {
      remove(this.#noPointsView);
    }

    if (resetSortType) {
      this.#currentSortType = SORT_TYPE.DAY;
    }
    remove(this.#sortComponent);
  };

  init() {
    this.#render();
  }

  #handleModelPoint = (updateType, data) => {
    switch (updateType) {
      case UPDATE_TYPE.PATCH:
        this.#waypointerPresenter.get(data.id).init(data, this.destinations, this.offers);
        break;
      case UPDATE_TYPE.MINOR:
        this.#clear();
        this.#render();
        break;
      case UPDATE_TYPE.MAJOR:
        this.#clear(true);
        this.#render();
        break;
      case UPDATE_TYPE.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#clear();
        this.#render();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clear();
    this.#renderSortingView();
    this.#renderEventsList();
  };

  #handleUserAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case USER_ACTION.ADD_TRIPPOINT:
        this.#createWaypointerPresenter.setSaving();
        try {
          await this.#waypointModel.addTripPoint(updateType, update);
        } catch (err) {
          this.#waypointerPresenter.get(update.id).setAborting();
        }
        break;
      case USER_ACTION.UPDATE_TRIPPOINT:
        this.#waypointerPresenter.get(update.id).setSaving();
        try {
          await this.#waypointModel.updateTripPoint(updateType, update);
        } catch (err) {
          this.#waypointerPresenter.get(update.id).setAborting();
        }
        break;
      case USER_ACTION.DELETE_TRIPPOINT:
        this.#waypointerPresenter.get(update.id).setDeleting();
        try {
          await this.#waypointModel.deleteTripPoint(updateType, update);
        } catch (err) {
          this.#waypointerPresenter.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #handleCreateEventFormClose = () => {
    this.#createWaypointerPresenter.destroy();
    this.#createWaypointerPresenter = null;
  };

  #handleModeChange = () => {
    if (this.#createWaypointerPresenter) {
      this.#handleCreateEventFormClose();
    }
    this.#waypointerPresenter.forEach((presenter) => presenter.resetView());
  };
}
