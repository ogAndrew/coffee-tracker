import { getAllCoffee, getCoffee, addCoffee, updateCoffee, removeCoffee } from './async.js'

const form = document.getElementById('form');
const coffeeInput = document.getElementById('inputCoffee');
const roasterInput = document.getElementById('inputRoaster');
const regionInput = document.getElementById('inputRegion');
const processInput = document.getElementById('inputProcess');
const scoreInput = document.getElementById('inputScore');

const container = document.getElementById('container');

getAllCoffee()
  .then((coffees) => {
    coffees.forEach(coffee => {
      const card = document.createElement('div');
      card.setAttribute('class', 'card-container');

      // make score icons
      const scoreDiv = document.createElement('div');
      scoreDiv.setAttribute('class', 'score-container');

      console.log(coffee.score)

      for (let i = parseInt(coffee.score); i > 0; i--) {
        const icon = document.createElement('i');
        icon.setAttribute('class', 'fas fa-star');
        scoreDiv.appendChild(icon);
      }

      
      card.innerHTML = `
          <div class="content-container">
          <h3 id="roaster-name" class="name roaster">${coffee.roaster}</h3>
          <h2 id="coffee-name" class="name coffee">${coffee.name}</h3>
          <div class="region-container">
            <div class="label">Region</div>
            <h3 class="name">${coffee.region}</h3>
          </div>
          <div class="process-container">
            <div class="label">Process</div>
            <h3 class="name">${coffee.process}</h3>
          </div>
        </div>
        <div class="actions-container">
          <button id="edit" class="card-btn">Edit</button>
          <button id="delete" class="card-btn" data-id=${coffee._id}>Delete</button>
        </div>
      `;

      const actionsContainer = card.querySelector('.actions-container');
      actionsContainer.appendChild(scoreDiv);
      container.appendChild(card);
    });

    container.querySelectorAll('#delete').forEach(item => {
      item.addEventListener('click', async (e) => {
        console.log('delete clicked')
        const dbId = e.target.getAttribute('data-id');

        await removeCoffee(dbId);

        window.location.reload();
      })
    })
  })


const reset = () => {
  coffeeInput.value = '';
  roasterInput.value = '';
  regionInput.value = '';
  processInput.value = '';
  scoreInput.value = 'Score';
}

// event listeners
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const body = {
    name: coffeeInput.value,
    roaster: roasterInput.value,
    region: regionInput.value,
    process: processInput.value,
    score: scoreInput.value
  }

  const res = await addCoffee(body);

  reset();
});

