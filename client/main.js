import '../imports/ui/body.js';
import '../imports/ui/form.js';
import '../imports/ui/data.js';
import '../imports/ui/stat.js';

Template.registerHelper('realDay', (d) => {
    return d < 9 ? '0' + (d + 1) : d + 1;
});

Template.registerHelper('existbook', function(ex) {
  return ex ? 'existbook' : '';
});

Template.registerHelper('srcolor', function(source) {
  return 'option-' + source;
});

Template.registerHelper('getCurrentMonth', function() {
  return new Date().getMonthName('ru');
});

Template.registerHelper('currentToDate', function(today) {
  let d = new Date();
  let cd = d.getDate() < 9 ? '0' + d.getDate() : d.getDate();
  return today == cd ? 'current-date' : '';
});