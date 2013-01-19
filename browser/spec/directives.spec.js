// Generated by CoffeeScript 1.4.0
(function() {
  var Transparency;

  if (typeof module !== "undefined" && module !== null ? module.exports : void 0) {
    require('./spec_helper');
    Transparency = require('../src/transparency');
  }

  describe("Transparency", function() {
    it("should execute directive function and assign return value to the matching element attribute", function() {
      var directives, expected, person, template;
      template = $("<div class=\"person\">\n  <span class=\"name\"></span><span class=\"email\"></span>\n</div>");
      person = {
        firstname: 'Jasmine',
        lastname: 'Taylor',
        email: 'jasmine.tailor@example.com'
      };
      directives = {
        name: {
          text: function() {
            return "" + this.firstname + " " + this.lastname;
          }
        }
      };
      expected = $("<div class=\"person\">\n  <span class=\"name\">Jasmine Taylor</span>\n  <span class=\"email\">jasmine.tailor@example.com</span>\n</div>");
      template.render(person, directives);
      return expect(template).toBeEqual(expected);
    });
    it("should allow setting html content with directives", function() {
      var directives, expected, person, template;
      template = $("<div class=\"person\">\n  <div class=\"name\"><div>FOOBAR</div></div><span class=\"email\"></span>\n</div>");
      person = {
        firstname: '<b>Jasmine</b>',
        lastname: '<i>Taylor</i>',
        email: 'jasmine.tailor@example.com'
      };
      directives = {
        name: {
          html: function() {
            return "" + this.firstname + " " + this.lastname;
          }
        }
      };
      expected = $("<div class=\"person\">\n  <div class=\"name\"><b>Jasmine</b> <i>Taylor</i><div>FOOBAR</div></div>\n  <span class=\"email\">jasmine.tailor@example.com</span>\n</div>");
      template.render({
        firstname: "Hello",
        lastname: "David"
      }, directives);
      template.render(person, directives);
      return expect(template).toBeEqual(expected);
    });
    it("should handle nested directives", function() {
      var directives, expected, nameDecorator, person, template;
      template = $("<div class=\"person\">\n  <span class=\"name\"></span>\n  <span class=\"email\"></span>\n  <div class=\"friends\">\n    <div class=\"friend\">\n      <span class=\"name\"></span>\n      <span class=\"email\"></span>\n    </div>\n  </div>\n</div>");
      person = {
        firstname: 'Jasmine',
        lastname: 'Taylor',
        email: 'jasmine.taylor@example.com',
        friends: [
          {
            firstname: 'John',
            lastname: 'Mayer',
            email: 'john.mayer@example.com'
          }, {
            firstname: 'Damien',
            lastname: 'Rice',
            email: 'damien.rice@example.com'
          }
        ]
      };
      nameDecorator = function() {
        return "" + this.firstname + " " + this.lastname;
      };
      directives = {
        name: {
          text: nameDecorator
        },
        friends: {
          name: {
            text: nameDecorator
          }
        }
      };
      expected = $("<div class=\"person\">\n  <span class=\"name\">Jasmine Taylor</span>\n  <span class=\"email\">jasmine.taylor@example.com</span>\n  <div class=\"friends\">\n    <div class=\"friend\">\n      <span class=\"name\">John Mayer</span>\n      <span class=\"email\">john.mayer@example.com</span>\n    </div>\n    <div class=\"friend\">\n      <span class=\"name\">Damien Rice</span>\n      <span class=\"email\">damien.rice@example.com</span>\n    </div>\n  </div>\n</div>");
      template.render(person, directives);
      return expect(template).toBeEqual(expected);
    });
    it("should restore the original attributes", function() {
      var directives, expected, persons, template;
      template = $("<ul id=\"persons\">\n  <li class=\"person\"></li>\n</ul>");
      persons = [
        {
          person: "me"
        }, {
          person: "you"
        }, {
          person: "others"
        }
      ];
      directives = {
        person: {
          "class": function(params) {
            return params.value + (params.index % 2 ? " odd" : " even");
          }
        }
      };
      expected = $("<ul id=\"persons\">\n  <li class=\"person even\">me</li>\n  <li class=\"person odd\">you</li>\n  <li class=\"person even\">others</li>\n</ul>");
      template.render(persons, directives);
      template.render(persons, directives);
      return expect(template).toBeEqual(expected);
    });
    it("should allow directives without a return value", function() {
      var directives, expected, persons, template;
      template = $("<ul id=\"persons\">\n  <li class=\"person\"></li>\n</ul>");
      persons = [
        {
          person: "me"
        }, {
          person: "you"
        }, {
          person: "others"
        }
      ];
      directives = {
        person: {
          html: function(params) {
            var elem;
            elem = $(params.element);
            elem.attr("foobar", "foo");
            elem.text("" + params.index);
          }
        }
      };
      expected = $("<ul id=\"persons\">\n  <li class=\"person\" foobar=\"foo\">0</li>\n  <li class=\"person\" foobar=\"foo\">1</li>\n  <li class=\"person\" foobar=\"foo\">2</li>\n</ul>");
      template.render(persons, directives);
      template.render(persons, directives);
      return expect(template).toBeEqual(expected);
    });
    it("should provide current attribute value as a parameter for the directives", function() {
      var data, directives, expected, template;
      template = $("<div id=\"template\">\n  <div class=\"name\">Hello, <span>Br, Transparency</span></div>\n</div>");
      data = {
        me: "World"
      };
      directives = {
        name: {
          text: function(params) {
            return params.value + this.me + "!";
          }
        }
      };
      expected = $("<div id=\"template\">\n  <div class=\"name\">Hello, World!<span>Br, Transparency</span></div>\n</div>");
      template.render(data, directives);
      template.render(data, directives);
      return expect(template).toBeEqual(expected);
    });
    it("should render directives returning empty string, zero and other falsy values", function() {
      var data, directives, expected, template;
      template = $("<div id=\"root\">\n    <span id=\"d_number\">234</span>\n    <span id=\"d_bool\">foo</span>\n    <span id=\"d_dec\">1.234</span>\n    <span id=\"d_str\">abc</span>\n</div>​");
      data = {
        number: 0,
        bool: false,
        dec: 0.0,
        str: ""
      };
      directives = {
        d_number: {
          text: function() {
            return this.number;
          }
        },
        d_bool: {
          text: function() {
            return this.bool;
          }
        },
        d_dec: {
          text: function() {
            return this.dec;
          }
        },
        d_str: {
          text: function() {
            return this.str;
          }
        }
      };
      expected = $("<div id=\"root\">\n   <span id=\"d_number\">0</span>\n   <span id=\"d_bool\">false</span>\n   <span id=\"d_dec\">0</span>\n   <span id=\"d_str\"></span>\n </div>​");
      template.render(data, directives);
      return expect(template).toBeEqual(expected);
    });
    it("should skip directives which syntactically incorrect", function() {
      var data, directives, expected, template;
      template = $("<div id=\"template\">\n  <div class=\"name\"></div>\n</div>");
      expected = $("<div id=\"template\">\n  <div class=\"name\">World</div>\n</div>");
      data = {
        name: "World"
      };
      directives = {
        invalid: function() {
          return "Invalid!";
        }
      };
      template.render(data, directives);
      return expect(template).toBeEqual(expected);
    });
    return it("should use directive return value even if data value is null", function() {
      var data, directives, expected, template;
      template = $("<div id=\"template\">\n  <div class=\"name\"></div>\n</div>");
      expected = $("<div id=\"template\">\n  <div class=\"name\">Null value</div>\n</div>");
      data = {
        name: null
      };
      directives = {
        name: {
          text: function() {
            return "Null value";
          }
        }
      };
      template.render(data, directives);
      return expect(template).toBeEqual(expected);
    });
  });

}).call(this);
