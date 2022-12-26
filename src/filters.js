import Vue from "vue";

Vue.filter('firstUC', function(val) {
    if (typeof val !== 'string') return val;

    return val.charAt(0).toUpperCase() + val.slice(1);
});