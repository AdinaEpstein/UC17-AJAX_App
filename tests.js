QUnit.test( "Test that app gets data when given search parameters", function( assert ) {
    findCarrier("");
    assert.equal(document.getElementById("screen").value, "", "Passed - Carrier Found");
});