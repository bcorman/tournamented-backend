const db = require('./models');
const mongoose = require('mongoose');

mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost:27017/tournamented', { useNewUrlParser: true } );

//Seed Data
// 4 schools with 6 students and 1 judge each - sufficient for 8 total debate teams/ 4 total debates.

let sampleSchools = [{
  name: 'British International School',
  number: 1
}, {
  name: 'Foon Wizard Academy',
  number: 2
}, {
  name: 'NEST',
  number: 3
}, {
  name: 'Brearley School',
  number: 4
}];
                                  /* British */
const britishPeople = [{
  name: 'Ray Davies',
  role: 'student',
  isAvailable: true,
  score: 0
}, {
  name: 'George Orwell',
  role: 'student',
  isAvailable: true,
  score: 0
}, {
  name: 'Rod Stewart',
  role: 'student',
  isAvailable: true,
  score: 0
}, {
  name: 'Ronnie Lane',
  role: 'student',
  isAvailable: true,
  score: 0
}, {
  name: 'George Smiley',
  role: 'student',
  isAvailable: true,
  score: 0
}, {
  name: 'Jim Prideaux',
  role: 'student',
  isAvailable: true,
  score: 0
}, {
  name: 'Vaclav Paris',
  role: 'judge',
  isAvailable: true
}, {
  name: 'Alicia Gibson',
  role: 'coach',
  email: 'gib@bis-ny.org',
  isAvailable: true
}];
                            /* Foon */
const foonPeople = [{
  name: 'Usidore The Blue',
  role: 'student',
  isAvailable: true,
  score: 0
}, {
  name: 'Fi\'ang Yalok',
  role: 'student',
  isAvailable: true,
  score: 0
}, {
  name: 'Zoenen Hoogstandjes',
  role: 'student',
  isAvailable: true,
  score: 0
}, {
  name: 'Gasmueneas Maestar',
  role: 'student',
  isAvailable: true,
  score: 0
}, {
  name: 'Stinson Chapeau',
  role: 'student',
  isAvailable: true,
  score: 0
}, {
  name: 'Toby LeRone',
  role: 'student',
  isAvailable: true,
  score: 0
}, {
  name: 'Sleepy LeBoeuf',
  role: 'judge',
  isAvailable: true
}, {
  name: 'Woofie Wilkerson',
  role: 'coach',
  email: 'woof@foon.edu',
  isAvailable: true
}];
                                  /* Nest */
const nestPeople = [{
  name: 'Pierre Robin',
  role: 'student',
  isAvailable: true,
  score: 0
}, {
  name: 'Doderick Soup',
  role: 'student',
  isAvailable: true,
  score: 0
}, {
  name: 'Raggedy Anne',
  role: 'student',
  isAvailable: true,
  score: 0
}, {
  name: 'Encyclopedia Brown',
  role: 'student',
  isAvailable: true,
  score: 0
}, {
  name: 'Murphy Brown',
  role: 'student',
  isAvailable: true,
  score: 0
}, {
  name: 'Jian Leon',
  role: 'student',
  isAvailable: true,
  score: 0
}, {
  name: 'Franz DerVerf',
  role: 'judge',
  isAvailable: true
}, {
  name: 'Jordan Morris',
  role: 'coach',
  email: 'jmorris@foon.edu',
  isAvailable: false
}];
                              /* Brearley */
const brearleyPeople = [{
  name: 'Greg Stritch',
  role: 'student',
  isAvailable: true,
  score: 0
}, {
  name: 'Frank Kuntz',
  role: 'student',
  isAvailable: true,
  score: 0
}, {
  name: 'Yossarian The Assyrian',
  role: 'student',
  isAvailable: true,
  score: 0
}, {
  name: 'Orr Swede',
  role: 'student',
  isAvailable: true,
  score: 0
}, {
  name: 'Nately Garfunkel',
  role: 'student',
  isAvailable: true,
  score: 0
}, {
  name: 'Alan Arkansas',
  role: 'student',
  isAvailable: true,
  score: 0
}, {
  name: 'Clifford York',
  role: 'judge',
  isAvailable: true
}, {
  name: 'Monkton Combes',
  role: 'coach',
  email: 'mcombes@brearley.edu',
  isAvailable: false
}];

// Seed Functions


// Create all schools
const createSchools = (schools) => {

  db.School.create(schools, (err, success) => {
    if (err) { console.log(err) }
    console.log(`created schools`);
  });
};

//Find specific school by name
const findSchool = (schoolName) => {
  db.School.findOne({ name: schoolName }, (err, school) => {
    if (err) { console.log(err) }
    console.log(`found ${school}`);
    return school;
  });
};
//Team assignment functions
const assignTeams = (teamName1, teamName2, school, personArray) => {
  let team1 = new db.Team({
    name: teamName1,
    wins: 0,
    school: school
  });
  let team2 = new db.Team({
    name: teamName2,
    wins: 0,
    school: school
  });

  for (let i = 0; i < 3; i++ ) {
    personArray[i].team = team1;
  }
  for (let i = 3; i< 7; i++) {
    personArray[i].team = team2;
  }

  team1.save((err, succ) => {
    if (err) { console.log(err) }
    console.log(`saved ${teamName1}`);
  });
  team2.save((err, succ) => {
    if (err) { console.log(err) }
    console.log(`saved ${teamName2}`);
  });
  console.log(`${school.name} teams saved`);
};

//School assignment function

const assignSchool = (personArray, school) => {
  personArray.forEach( person => {
    person.affiliation = school;
    console.log(`${person.name} assigned to ${school.name}`);
  });
};

//Assign people to schools
const reverseAssignSchool = function (databasePeople, school) {

  for (let i = 0; i < databasePeople.length; i++) {
    let person = databasePeople[i];
    switch (person.role) {
      case 'student':
        school.students.push(person);
        break;
      case 'judge':
        school.judges.push(person);
        break;
      case 'coach':
        school.coaches.push(person);
      default: break;
    }
  }
  school.save(function (err, success) {
    if (err) { console.log(err) }

    console.log(`made reverse assignments`);
    console.log(success.students.length);
    console.log(success.judges.length);
    console.log(success.coaches.length);
  });
};


const seedDatabase = () => {

  db.School.remove({}, (err, succ) => {
    if (err) { console.log(err) }
    console.log(`removed all schools`);

      db.Team.remove({}, (err, succ) => {
        if (err) { console.log(err) }
        console.log(`removed all teams`);

        db.Debate.remove({}, (err, succ) => {
          if (err) { console.log(err) }
          console.log(`removed all debates`);

          db.Person.remove({}, (err, succ) => {
            if (err) { console.log(err) }
            console.log(`removed all people`);

            db.School.create(sampleSchools, (err, success) => {
              if (err) { console.log(err) }
              console.log(`created schools`);

              let britishSchool = success[0];
              let foonSchool = success[1];
              let nestSchool = success[2];
              let brearleySchool = success[3];

              //assign schools

              assignSchool(britishPeople, britishSchool);
              assignSchool(foonPeople, foonSchool);
              assignSchool(nestPeople, nestSchool);
              assignSchool(brearleyPeople, brearleySchool);

              //assign teams and save
              assignTeams('British-DOS', 'British-LSP', britishSchool, britishPeople);
              assignTeams('Foon-BYH', 'Foon-MCL', foonSchool, foonPeople);
              assignTeams('Nest-RSA', 'Nest-BBL', nestSchool, nestPeople);
              assignTeams('Brearley-SKT', 'Brearley-SGA', brearleySchool, brearleyPeople);

              //create people
              db.Person.create(britishPeople, (err, newBrits) => {
                if (err) { console.log(err) };
                reverseAssignSchool(newBrits, britishSchool);
                newBrits.forEach( brit => {
                  console.log(`created ${brit.name}`);
                });
                db.Person.create(foonPeople, (err, newFoons) => {
                  if (err) { console.log(err) }
                  reverseAssignSchool(newFoons, foonSchool);
                  newFoons.forEach( foony => {
                    console.log(`created ${foony.name}`);
                  });
                  db.Person.create(nestPeople, (err, newNest) => {
                    if (err) { console.log(err) };
                    reverseAssignSchool(newNest, nestSchool);
                    newNest.forEach( nester => {
                      console.log(`created ${nester.name}`);
                    });
                    db.Person.create(brearleyPeople, (err, newBrearleys) => {
                      if (err) { console.log(err) };
                      reverseAssignSchool(newBrearleys, brearleySchool);
                      newBrearleys.forEach( brearlier => {
                        console.log(`created ${brearlier.name}`);
                        process.exit();
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  };

// Function Calls

seedDatabase();
