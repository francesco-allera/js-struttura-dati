function printOption(arr, DOMEl) {
    arr.forEach(el => DOMEl.innerHTML += `<option value="${el}">${el}</option>`);
}

function printCards(arr, DOMEl) {
    DOMEl.innerHTML = '';

    arr.forEach(el => {
        DOMEl.innerHTML += `
            <div>
                <h2>nome: ${el.name}</h2>
                <h3>costo: ${el.cost.costFields.length === 0 ? el.cost.genericCost : ((el.cost.genericCost !== 0 ? el.cost.genericCost : '') + ' ' + el.cost.costFields.join(' '))}</h3>
                <h3>tipo: ${el.type} - ${el.object}</h3>
                <h3>forza: ${el.values.power} / resistenza: ${el.values.toughness}</h3>
            </div>
        `;
    });
}

function filtering(select, DOMEl, arr, arg1, arg2) {
    select.onchange = function () {
        const val = isNaN(this.value) ? this.value : parseInt(this.value);

        if (val !== 'default') {
            const arrFiltered = arr.filter(el => {
                if (arg2) return val === el[arg1][arg2];
                else return val === el[arg1];
            });
            printCards(arrFiltered, DOMEl);
        }
    }
}


const fields = ['b', 'g', 'r', 'u', 'w'];
const types = ['artefatti', 'creature', 'incantesimi', 'terre'];
const powerValues = [0, 1, 2, 3, 4, 5];

const editions = {
    'BL': {
        edition: 'boolean',
        rarity: 'blue'
    },
    'GG': {
        edition: 'gigi',
        rarity: 'red'
    }
};

const cards = [
    // #1 card
    {
        name: 'Grizzly Bears',
        cost: {
            genericCost: 1,
            costFields: [fields[1]]
        },
        picture: 'https://static.wikia.nocookie.net/mtgsalvation_gamepedia/images/5/57/Bear.jpg/revision/latest/scale-to-width-down/401?cb=20190514085156',
        type: types[1],
        object: 'bear',
        edition: editions['BL'],
        description: '',
        story: 'we cannot forget that among all of Dominaria\'s wonders, a system of life exists, with prey and predators that will never fight wars nor vie for ancient power',
        values: {
            power: 2,
            toughness: 2
        }
    },
    // #2 card
    {
        name: 'Sviluppatore Guerriero',
        cost: {
            genericCost: 3,
            costFields: [fields[0], fields[2]]
        },
        picture: '',
        type: types[1],
        object: 'Warrior',
        edition: editions['BL'],
        description: 'Lo sviluppatore guerriero spezza i byte in bit!',
        story: 'Lo sviluppatore guerriero è una forma di essere umano evoluto.',
        values: {
            power: 5,
            toughness: 3
        }
    },
    // #3 card
    {
        name: 'Mewtwo',
        cost: {
            genericCost: 6,
            costFields: [fields[4], fields[4], fields[4]]
        },
        picture: '',
        type: types[1],
        object: 'Pokemon',
        edition: editions['GG'],
        description: 'Il potere della mente più forte del mondo',
        story: 'Il pokemon clonato dalla leggenda di Mew',
        values: {
            power: 5,
            toughness: 5
        }
    },
    // #4 card
    {
        name: 'Kelenvorita Mascherato',
        cost: {
            genericCost: 2,
            costFields: [fields[4], fields[0]]
        },
        picture: '',
        type: types[1],
        object: 'Mezz\'orco',
        edition: editions['GG'],
        description: 'Quando arriva a 0 punti ferita non va al cimitero ma acquista +2 punti resistenza',
        story: '',
        values: {
            power: 3,
            toughness: 4
        }
    },
    // #5 card
    {
        name: 'Paralyze',
        cost: {
            genericCost: 0,
            costFields: [fields[1]]
        },
        picture: '',
        type: types[2],
        object: 'Enchant',
        edition: editions['BL'],
        description: 'When paralyze lorem ipsum',
        story: '',
        values: {
            power: 0,
            toughness: 0
        }
    },
    // #6 card
    {
        name: 'Dancing Scimitar',
        cost: {
            genericCost: 4,
            costFields: []
        },
        picture: '',
        type: types[0],
        object: 'Spirit',
        edition: editions['GG'],
        description: 'Vola (questa creatura non può essere fermata eccetto da una creatura volante )',
        story: 'Una spada che non ha mai conosciuto il fodero, un\'impugnatura che non ha mai conosciuto mano',
        values: {
            power: 1,
            toughness: 5
        }
    }
];

const powerSelect = document.querySelector('#power-select');
const typeSelect = document.querySelector('#type-select');
const main = document.querySelector('main');


printOption(powerValues, powerSelect);
printOption(types, typeSelect);

printCards(cards, main);

filtering(powerSelect, main, cards, 'values', 'power');
filtering(typeSelect, main, cards, 'type');

document.querySelector('#reset').addEventListener('click', function() {
    printCards(cards, main);
});