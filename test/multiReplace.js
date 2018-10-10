var should = require('chai').should();
var expect = require('chai').expect;
var multiReplace = require('../index');

describe('String-multiple-replace', function(){

	describe('needCover is true: The replacement operation will be overwritten', function() {
		it('Replace brave & trouble from a text with cowardly & escape, and sequencer is a array that decide the order of replacement.', function(){
			var input = "I'm only brave when I have to be. Being brave doesn't mean you go looking for trouble.";
			var matcherObj = {
				"brave": "cowardly",
				"trouble": "escape"
			}
			var sequencer = ["brave", "trouble"];
	
			var resultStr = multiReplace(input, matcherObj, true, sequencer);;
			resultStr.should.equal("I'm only cowardly when I have to be. Being cowardly doesn't mean you go looking for escape.");
		});
	
		it('Replace brave & trouble from a text with cowardly & escape, and sequencer is a function that will return a array', function() {
			var input = "I'm only brave when I have to be. Being brave doesn't mean you go looking for trouble.";
			var matcherObj = {
				"brave": "cowardly",
				"trouble": "escape"
			}
	
			var resultStr = multiReplace(input, matcherObj, true, function(keys) {
				return keys; //or keys.sort(callback)
			});
			resultStr.should.equal("I'm only cowardly when I have to be. Being cowardly doesn't mean you go looking for escape.");
		});
	
		it("Replace 'My firend' with 'I', but then 'I' will be overwritten with 'My friend'", function(){
			var input = "My friend has a dog. I want a dog too!";
			var matcherObj = {
				"My friend": "I",
				"has": "have",
				"I": "My friend"
			}
			var sequencer = ["My friend", "has", "I"];
	
			var resultStr = multiReplace(input, matcherObj, true, sequencer);;
			resultStr.should.equal("My friend have a dog. My friend want a dog too!");
		});
	});

	describe("needCover is false: The replacement operation will not be overwritten", function() {
		it("Replace 'My firend' with 'I', and then 'I' will not be overwritten with 'My friend'", function(){
			var input = "My friend has a dog. I want a dog too!";
			var matcherObj = {
				"My friend": "I",
				"has": "have",
				"I": "My friend"
			}
	
			var resultStr = multiReplace(input, matcherObj, false, Object.keys(matcherObj));;
			resultStr.should.equal("I have a dog. My friend want a dog too!");
		});
	
		it("Replace all 'a' with 'b', and replace all 'b' with 'a'", function() {
			var input = "abcd, abcd, a";
			var matcherObj = {
				"a": "b",
				"b": "a"
			}

			var resultStr = multiReplace(input, matcherObj, false, Object.keys(matcherObj));
			resultStr.should.equal("bacd, bacd, b");
		});
	});

	describe("Some error scenes", function() {
		it("should throw a TypeError if 'sequencer' does not return a subset of Object.keys(matcherObj)", function() {
			var badFun = function() {
				var input = "abcd, abcd, a";
				var matcherObj = {
					"a": "b",
					"b": "a"
				}
	
				var sequencer = ["a", "b", "c"];
				return multiReplace(input, matcherObj, false, sequencer);
			}
			expect(badFun).to.throw("Expected sequence is the subset of Object.keys(matcherObj), got: a,b,c");
		});
	});
});