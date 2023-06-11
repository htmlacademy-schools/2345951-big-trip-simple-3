
import {remove, render, RenderPosition} from '../framework/render';
import EditFormView from '../view/edit-form-view';
import {UPDATE_TYPE, USER_ACTION} from '../const';


export default class NewWaypointPresenter {
  #handleChange;
  #handelDestroy;
  #waypointsListContainer;
  #waypointsFormComponent;


  constructor({tripEventsListContainer, onDataChange, onDestroy}) {
    this.#waypointsListContainer = tripEventsListContainer;
    this.#handleChange = onDataChange;
    this.#handelDestroy = onDestroy;
  }

  init = ({destinations, offers}) => {
    if (this.#waypointsFormComponent !== undefined) {
      return;
    }

    try {
      this.#waypointsFormComponent = new EditFormView({
        destinations,
        offers,
        onFormSubmit: this.#onSubmit,
        onDeleteClick: this.#onDeleteClick,
        onRollUpButton: this.#onDeleteClick,
        isEditForm: false
      });

      render(this.#waypointsFormComponent, this.#waypointsListContainer,
        RenderPosition.AFTERBEGIN);

      document.body.addEventListener('keydown', this.#ecsKeyHandler);
    } catch (err) { /* */}
  };

  destroy() {
    if (this.#waypointsFormComponent === null) {
      return;
    }

    this.#handelDestroy();

    remove(this.#waypointsFormComponent);
    this.#waypointsFormComponent = null;

    document.body.removeEventListener('keydown', this.#ecsKeyHandler);
  }

  #onSubmit = (tripEvent) => {
    this.#handleChange(
      USER_ACTION.ADD_TRIPPOINT,
      UPDATE_TYPE.MINOR,
      this.#deleteId(tripEvent)
    );
    this.destroy();
  };

  #onDeleteClick = () => {
    this.destroy();
  };

  setSaving() {
    this.#waypointsFormComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#waypointsFormComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#waypointsFormComponent.shake(resetFormState);
  }

  #ecsKeyHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy();
    }
  };

  #deleteId = (tripEvent) => {
    delete tripEvent.id;
    return tripEvent;
  };
}
