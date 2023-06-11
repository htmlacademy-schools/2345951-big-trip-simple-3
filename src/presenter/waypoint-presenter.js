import {remove, render, replace} from '../framework/render';
import EditFormView from '../view/edit-form-view';
import WaypointView from '../view/waypoint-view';
import {compareDates} from '../utils/utils';
import {UPDATE_TYPE, USER_ACTION} from '../const';


const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export class WaypointPresenter {
  #waypointList;
  #waypoint;
  #waypointFormComponent;
  #waypointComponent;

  #handleModeChange;
  #onDataChange;
  #destinations;
  #offers;
  #mode = Mode.DEFAULT;


  constructor({
    tripPointList,
    tripPoint,
    handleModeChange,
    destinations,
    offers,
    onDataChange
  }) {
    this.#waypoint = tripPoint;
    this.#waypointList = tripPointList;
    this.#handleModeChange = handleModeChange;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#onDataChange = onDataChange;
  }

  init = (tripEvent = this.#waypoint, destinations = this.#destinations, offers = this.#offers) => {
    const prevTripEventComponent = this.#waypointComponent;
    const prevTripEventFormComponent = this.#waypointFormComponent;

    this.#waypointFormComponent = new EditFormView({
      tripPoint: tripEvent,
      destinations: destinations,
      offers: offers,
      onFormSubmit: (update) => {
        this.#handleFormSubmit(update);
      },
      onRollUpButton: () => {
        this.#replaceFormToEvent();
      },
      onDeleteClick: (update) => {
        this.#handleDeleteClick(update);
      }
    });

    this.#waypointComponent = new WaypointView({
      tripPoint: tripEvent,
      destinations: destinations,
      offers: offers,
      onRollupClick: () => {
        this.#replacePointToForm();
      }
    });


    if (!prevTripEventComponent || !prevTripEventFormComponent) {
      render(this.#waypointComponent, this.#waypointList);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#waypointComponent, prevTripEventComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#waypointComponent, prevTripEventFormComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevTripEventComponent);
    remove(prevTripEventFormComponent);
  };

  setSaving = () => {
    if (this.#mode === Mode.EDITING) {
      this.#waypointFormComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  };

  setDeleting = () => {
    if (this.#mode === Mode.EDITING) {
      this.#waypointFormComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  };

  setAborting = () => {
    if (this.#mode === Mode.DEFAULT) {
      this.#waypointFormComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#waypointFormComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#waypointFormComponent.shake(resetFormState);
  };

  destroy = () => {
    remove(this.#waypointComponent);
    remove(this.#waypointFormComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#waypointFormComponent.reset(this.#waypoint, this.#offers);
      this.#replaceFormToEvent();
    }
  };

  #closeEditFormOnEscapeKey = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.#replaceFormToEvent();
    }
  };

  #replacePointToForm = () => {
    replace(this.#waypointFormComponent, this.#waypointComponent);
    document.addEventListener('keydown', this.#closeEditFormOnEscapeKey);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToEvent = () => {
    replace(this.#waypointComponent, this.#waypointFormComponent);
    document.removeEventListener('keydown', this.#closeEditFormOnEscapeKey);
    this.#mode = Mode.DEFAULT;
  };

  #handleFormSubmit = (update) => {
    const isMinorUpdate = compareDates(this.#waypoint.dateFrom, update.dateFrom) !== 0 || this.#waypoint.basePrice !== update.basePrice;
    this.#onDataChange(
      USER_ACTION.UPDATE_TRIPPOINT,
      isMinorUpdate ? UPDATE_TYPE.MINOR : UPDATE_TYPE.PATCH,
      update,
    );
  };

  #handleDeleteClick = (update) => {
    this.#onDataChange(
      USER_ACTION.DELETE_TRIPPOINT,
      UPDATE_TYPE.MINOR,
      update,
    );
  };
}
