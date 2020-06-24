window.onload = function(){

    var addButton = document.querySelector("button.add");
    addButton.addEventListener("click", this.addFamilyMember);

    var submitButton = this.document.querySelector("button[type=submit]");
    submitButton.addEventListener("click", this.submitData);

}

/**
 * validate the age, check if its an integer and if it is greater than 0
 */
function validateAge(){  
    var ageInput = document.getElementsByName("age")[0];
    if(!parseInt(ageInput.value) || ageInput.value < 0){
        return {valid: false, age: 0};
    }
    return {valid: true, age: ageInput.value};
}

/**
 * return the relationship selected
 */
function validateRelationship(){
    var relationship = document.querySelector("select[name=rel]");

    return relationship.value;
}

/**
 * return the checked input
 */
function validateCheckBox(){
    var smokerInput = document.querySelector("input[name=smoker]");
    return smokerInput.checked ? "Smoker" : "Non-smoker";
}

/**
 * add family member if the input is valid
*/

function addFamilyMember(event){
    event.preventDefault();

    // check that the input is valid

    var validAge = validateAge();
    var relationship = validateRelationship();
    var smoker = validateCheckBox();

    if(!validAge.valid){
        alert("You have to provide a valid age");
        return;
    } 

    if(relationship === ""){
        alert("You have to select a relationship");
        return;
    }

    // add and display the data
    var list = document.querySelector("ol.household");

    var person = document.createElement("li");

    var personObject = relationship + " " + validAge.age + " " + smoker + " ";


    // add data to the html element 
    person.textContent = personObject;
    
    // create the removeButton
    var removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "X";

    removeButton.addEventListener("click", function(){
        this.parentNode.remove();
    });

    person.appendChild(removeButton);

    list.appendChild(person);

}

/**
 * submit the data
 */
function submitData(){
    event.preventDefault();

    var list = document.querySelector("ol.household");

    var peopleData = [];

    for(item=0; item<list.children.length; item++){
        let person = list.children[item].textContent.split(" ");

        let personObject = {};
        personObject["Relationship"] = person[0];
        personObject["Age"] = person[1];
        personObject["Smoker"] = person[2];

        peopleData.push(personObject)
    }


    var debug = document.querySelector("pre.debug");
    debug.style.display = "block";
    debug.textContent = JSON.stringify(peopleData, null, 2);

}




