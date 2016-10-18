const { expect } = require('chai');
const { attributes } = require('../../src');

describe('type coercion', () => {
  describe('Date', () => {
    const User = attributes({
      birth: Date
    })(class User {});

    it('does not coerce if value is already a date', () => {
      const birth = new Date();

      const user = new User({ birth });

      expect(user.birth).to.not.equal(new Date(birth.toString()));
      expect(user.birth).to.eql(birth);
    });

    it('does not coerces undefined', () => {
      const user = new User({
        birth: undefined
      });

      expect(user.birth).to.be.undefined;
    });

    it('coerces string to date', () => {
      const user = new User({
        birth: 'Feb 3, 1892'
      });

      expect(user.birth).to.eql(new Date('Feb 3, 1892'));
    });

    it('coerces null to first date on Unix time', () => {
      const user = new User({
        birth: null
      });

      expect(user.birth).to.eql(new Date('1970-01-01T00:00:00'));
    });

    // it('coerces true to one', () => {
    //   const user = new User({
    //     age: true
    //   });

    //   expect(user.age).to.equal(1);
    // });

    // it('coerces false to zero', () => {
    //   const user = new User({
    //     age: false
    //   });

    //   expect(user.age).to.equal(0);
    // });

    // it('coerces date to number', () => {
    //   const date = new Date();

    //   const user = new User({
    //     age: date
    //   });

    //   expect(user.age).to.equal(date.valueOf());
    // });

    // describe('coercing an object to number', () => {
    //   context('when the object does not implement #valueOf()', () => {
    //     it('coerces object to NaN', () => {
    //       const objectWithoutValueOf = { data: 42 };

    //       const user = new User({
    //         age: objectWithoutValueOf
    //       });

    //       expect(Number.isNaN(user.age)).to.be.ok;
    //     });
    //   });

    //   context('when the object implements #valueOf()', () => {
    //     it('coerces object to value returned by #valueOf()', () => {
    //       const objectWithValueOf = {
    //         data: '42',
    //         valueOf() { return this.data; }
    //       };

    //       const user = new User({
    //         age: objectWithValueOf
    //       });

    //       expect(user.age).to.equal(42);
    //     });
    //   });
    // });
  });
});