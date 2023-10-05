
async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

  const footer = document.querySelector('footer');
  const pinfo = document.querySelector('.info');

  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  const cards = document.querySelector('.cards');
  const fetchResult = await fetch("http://localhost:3003/api/learners");
  const learners = await fetchResult.json();

  const fetchResultOfMentors = await fetch("http://localhost:3003/api/mentors");
  const mentors = await fetchResultOfMentors.json();
  let isOnMentorH4 = false;

  pinfo.innerHTML = 'No learner is selected';

  learners.forEach((learner) => {
    const cardMainDiv = document.createElement('div');
    cardMainDiv.className = 'card';
    cardMainDiv.id = learner.id;
    const _h3 = document.createElement('h3');
    _h3.innerHTML = learner.fullName;
    _h3.id = learner.fullName;
    
    const _div = document.createElement('div');
    _div.innerHTML = learner.email;

    const _h4 = document.createElement('h4');
    _h4.innerHTML = 'Mentors';
    _h4.className = 'closed';

    const _ul = document.createElement('ul');

    learner.mentors.forEach(mentorId => {
      const mentor = mentors.find(mentor => mentor.id === mentorId);
      const _li = document.createElement('li');
      _li.innerHTML = `${mentor.firstName} ${mentor.lastName}`;
      _ul.appendChild(_li);
    });
    
    cardMainDiv.appendChild(_h3);
    cardMainDiv.appendChild(_div);
    cardMainDiv.appendChild(_h4);
    cardMainDiv.appendChild(_ul);
    
    cards.appendChild(cardMainDiv);
  });


  const allCards = document.querySelectorAll('.card');
  const allMentors = document.querySelectorAll('h4');

  allCards.forEach(card => card.addEventListener('click', function () {
    const pinfo = document.querySelector('.info');
    let _h3 = this.querySelector('h3');

    if(this.className === 'card'){
      this.className = 'card selected';  
      const learnerName = _h3.innerHTML;
      pinfo.innerHTML = `The selected learner is ${learnerName}`;
      _h3.innerHTML += `, ID ${this.id}`;
    }else if(isOnMentorH4 === false){
      this.className = 'card';
      _h3.innerHTML = _h3.id;
      pinfo.innerHTML = 'No learner is selected';
    }

    const _cards = document.querySelectorAll('.card');
    _cards.forEach( card => {
      if(card.id !== this.id){
        let _h3 = card.querySelector('h3');
        card.className = 'card';
        _h3.innerHTML = _h3.id;
      }
    });
  }));

  allMentors.forEach(mentorsH4 => {
    mentorsH4.addEventListener('click', function () {
      if(this.className === 'closed'){
        this.className = 'open selected';
      }else{
        this.className = 'closed';
      } 
    });

    mentorsH4.addEventListener('mouseenter', () => {
      isOnMentorH4 = true;
    });
    mentorsH4.addEventListener('mouseleave', () => {
      isOnMentorH4 = false;
    });
  });

  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
