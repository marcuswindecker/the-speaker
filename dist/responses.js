'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Responses = function () {
  function Responses() {
    _classCallCheck(this, Responses);
  }

  /**
   * Builds the initial response sent back to satisfy the 3sec Slack timeout
   * 
   * @param  {string} username - the username sent with the initial Slack request
   * @return {object} response - the initial response body to send back to Slack
   */


  _createClass(Responses, [{
    key: 'buildInitialResponse',
    value: function buildInitialResponse(username) {
      var response = {
        response_type: 'in_channel',
        text: _util2.default.format('Processing request! Here\'s the raid.report in the meantime: https://raid.report/ps/%s', username)
      };

      return response;
    }

    /**
     * Builds an error response to send back to Slack
     * 
     * @param  {Error} error - an Error object
     * @return {object} response - the error response body to send back to Slack
     */

  }, {
    key: 'buildErrorResponse',
    value: function buildErrorResponse(error) {
      var response = {
        response_type: 'in_channel',
        attachments: [{
          fallback: error.message,
          text: error.message,
          color: 'danger'
        }]
      };

      return response;
    }

    /**
     * Builds a success response to send back to Slack
     * 
     * @param  {object} stats - the formatted stats object
     * @return {object} response - the success response body to send back to Slack
     */

  }, {
    key: 'buildSuccessResponse',
    value: function buildSuccessResponse(stats) {
      var response = {
        response_type: 'in_channel',
        text: 'Here are the detailed stats:',
        attachments: [{
          fallback: _util2.default.format('This user has %d completions in total on PSN.', stats.completions),
          fields: [{
            title: 'Total Completions',
            value: stats.completions,
            short: true
          }, {
            title: 'Completion Percentage',
            value: Math.round(stats.completion_pct * 100) + '%',
            short: true
          }, {
            title: 'Fastest Time',
            value: stats.fastest_time,
            short: true
          }],
          color: 'good'
        }]
      };

      return response;
    }
  }]);

  return Responses;
}();

var responses = new Responses();
exports.default = responses;