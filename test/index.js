const should = require('chai').should();
const expect = require('chai').expect;
const multiReplace = require('../index');

describe('String-multiple-replace', function () {

    describe("need cover previous replacement", function () {
        it('Replace brave & trouble from a text with cowardly & escape, and sequencer is a array that decide the order of replacement.', function () {
            const input = "I'm only brave when I have to be. Being brave doesn't mean you go looking for trouble.";
            const matcherObj = {
                "brave": "cowardly",
                "trouble": "escape"
            }
            const sequencer = ["brave", "trouble"];

            const resultStr = multiReplace(input, matcherObj, sequencer);;
            resultStr.should.equal("I'm only cowardly when I have to be. Being cowardly doesn't mean you go looking for escape.");
        });

        it('Replace brave & trouble from a text with cowardly & escape, and sequencer is a function that will return a array', function () {
            const input = "I'm only brave when I have to be. Being brave doesn't mean you go looking for trouble.";
            const matcherObj = {
                "brave": "cowardly",
                "trouble": "escape"
            }

            const resultStr = multiReplace(input, matcherObj, function (keys) {
                return keys; //or keys.sort(callback)
            });
            resultStr.should.equal("I'm only cowardly when I have to be. Being cowardly doesn't mean you go looking for escape.");
        });

        it("Replace 'My friend' with 'I', but then 'I' will be overwritten with 'My friend'", function () {
            const input = "My friend has a dog. I want a dog too!";
            const matcherObj = {
                "My friend": "I",
                "has": "have",
                "I": "My friend"
            }
            const sequencer = ["My friend", "has", "I"];

            const resultStr = multiReplace(input, matcherObj, sequencer);;
            resultStr.should.equal("My friend have a dog. My friend want a dog too!");
        });
    });

    describe("needn't cover previous replacement", function () {
        it("Replace 'My firend' with 'I', and then 'I' will not be overwritten with 'My friend'", function () {
            const input = "My friend has a dog. I want a dog too!";
            const matcherObj = {
                "My friend": "I",
                "has": "have",
                "I": "My friend"
            }

            const resultStr = multiReplace(input, matcherObj);;
            resultStr.should.equal("I have a dog. My friend want a dog too!");
        });

        it("Replace all 'a' with 'b', and replace all 'b' with 'a'", function () {
            const input = "abcd, abcd, a";
            const matcherObj = {
                "a": "b",
                "b": "a"
            }

            const resultStr = multiReplace(input, matcherObj);
            resultStr.should.equal("bacd, bacd, b");
        });
    });

    describe("Some special cases", function () {
        it('Replace "My firend" with "{"Name":"Tom"}"', function () {
            const input = 'My friend has a dog. I want a dog too!';
            const matcherObj = {
                'My friend': {
                    "Name": "Tom"
                },
            }
            const sequencer = ["My friend"];

            const resultStr = multiReplace(input, matcherObj, sequencer);;
            resultStr.should.equal('{"Name":"Tom"} has a dog. I want a dog too!');
        });
        it("should return 'input'", function () {
            const input = 'My friend has a dog. I want a dog too!';
            const matcherObj = {}

            const resultStr = multiReplace(input, matcherObj);;
            resultStr.should.equal('My friend has a dog. I want a dog too!');
        });
    });

    describe("Some error scenes", function () {
        it("should throw a TypeError if number of parameters is not equal to 2 or 3", function () {
            const badFun = function () {
                const input = "abcd, abcd, a";
                return multiReplace(input);
            }
            expect(badFun).to.throw("The number of parameters is incorrect.");
        });

        it("should throw a TypeError if 'input' is not a string type", function () {
            const badFun = function () {
                const input = { "Name": "Tom" };
                const matcherObj = {
                    "Tom": "Bob",
                }
                return multiReplace(input, matcherObj);
            }
            expect(badFun).to.throw("Expected input to be a string, got object");
        });

        it("should throw a TypeError if 'matcherObj' is not a object type", function () {
            const badFun = function () {
                const input = "abcd, abcd, a";
                const matcherObj = "a";
                return multiReplace(input, matcherObj);
            }
            expect(badFun).to.throw("Expected matcherObj to be a object, got string");
        });

        it("should throw a TypeError if 'sequencer' is not a function or array type", function () {
            const badFun = function () {
                const input = "abcd, abcd, a";
                const matcherObj = {
                    "a": "b",
                    "b": "a"
                }
                const sequencer = "abc";
                return multiReplace(input, matcherObj, sequencer);
            }
            expect(badFun).to.throw("Expected sequencer to be a callback or array, got [object String]");
        });

        it("should throw a TypeError if 'sequencer' does not return a subset of Object.keys(matcherObj)", function () {
            const badFun = function () {
                const input = "abcd, abcd, a";
                const matcherObj = {
                    "a": "b",
                    "b": "a"
                }
                const sequencer = ["a", "b", "c"];
                return multiReplace(input, matcherObj, sequencer);
            }
            expect(badFun).to.throw("Expected sequence is the subset of Object.keys(matcherObj), got: a,b,c");
        });
    });
});
