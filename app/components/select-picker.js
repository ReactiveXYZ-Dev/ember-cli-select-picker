import Ember from 'ember';
import SelectPickerMixin from 'ember-cli-select-picker/mixins/select-picker';

var I18nProps = (Ember.I18n && Ember.I18n.TranslateableProperties) || {};

var SelectPickerComponent = Ember.Component.extend(
  SelectPickerMixin, I18nProps, {

  selectAllLabel:  'All',
  selectNoneLabel: 'None',

  nativeMobile: true,

  classNames: ['select-picker'],

  didInsertElement: function() {
    var eventName = 'click.' + this.get('elementId');
    var _this = this;
    $(document).on(eventName, function (e) {
      if (_this.get('keepDropdownOpen')) {
        _this.set('keepDropdownOpen', false);
        return;
      }
      if (_this.element && !$.contains(_this.element, e.target)) {
        _this.set('showDropdown', false);
      }
    });
  },

  willDestroyElement: function() {
    $(document).off('.' + this.get('elementId'));
  },

  actions: {
    showHide: function () {
      this.toggleProperty('showDropdown');
    }
  }
});

export default SelectPickerComponent;
