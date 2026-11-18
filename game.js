'use strict';
(function () {
  const VERSION = '1.0.59';
  // the developer switch exists on the own computer (localhost, or index.html opened as a file)
  // and anywhere with ?dev=1 in the address (remembered; ?dev=0 removes it again)
  const DEV_HOST = (() => {
    let on = /^(localhost|127\.0\.0\.1|\[::1\]|)$/.test(location.hostname) || location.protocol === 'file:';
    if (document.querySelector('meta[name="sr-build"][content="app"]')) on = false;   // 1.0.52: the player app build is never in developer mode (unless ?dev=1)
    try {
      const q = new URLSearchParams(location.search).get('dev');
      if (q === '1') localStorage.setItem('sr_devhost', '1');
      if (q === '0') localStorage.removeItem('sr_devhost');
      if (localStorage.getItem('sr_devhost') === '1') on = true;
    } catch (e) { }
    return on;
  })();
  // =====================================================================
  //  Texts (ru / en). Language comes from the Yandex SDK.
  // =====================================================================
  const TEXT = {
    ru: {
      title: 'Stickman Run',
      play: 'Играть', levelN: 'Уровень', pause: 'Пауза', resume: 'Продолжить',
      retry: 'Заново', menu: 'В меню', next: 'Дальше', back: 'Назад',
      fail: 'Упс!', failText: 'Пройдено: ', win: 'Уровень пройден!',
      cont: '▶ Продолжить за рекламу', coins: 'Монеты', wallet: 'Монеты',
      hintPc: 'Пробел, ↑ или клик — прыжок. ↓, S или правая кнопка мыши — подкат (в воздухе — быстро вниз).',
      hintTouch: 'Нажми на экран — прыжок. Кнопка ▼ — подкат (в воздухе — быстро вниз).',
      allDone: 'Все уровни пройдены!',
      allDoneText: 'Все 15 уровней позади! Дальше — бесконечный забег, задания и магазин.',
      total: 'Звёзды',
      endless: '∞ Бесконечный забег', endlessShort: 'Бесконечный забег',
      endlessLocked: '🔒 Бесконечный забег — пройди 5 уровней',
      endlessTip: 'Беги как можно дальше!',
      distance: 'Дистанция', record: 'Рекорд', newRecord: 'Новый рекорд!', m: 'м', earned: 'Монет собрано',
      shop: '🛒 Магазин', shopTitle: 'Магазин',
      tabs: { color: 'Цвет', hat: 'Шапки', shorts: 'Шорты', shoes: 'Обувь', acc: 'Аксессуары', trail: 'Шлейфы',
              jump: 'Прыжок', pet: 'Питомцы', emote: 'Эмоции', theme: 'Миры', boost: 'Усиления', premium: '💎 Премиум' },
      chest: 'Открыть лутбокс', chestTitle: 'Лутбокс', lootInfo: 'Выпадает только то, чего у тебя ещё нет. Цена — средняя цена того, что осталось собрать.',
      newCat: { color: 'Новый цвет!', hat: 'Новая шапка!', shorts: 'Новые шорты!', shoes: 'Новая обувь!', acc: 'Новый аксессуар!', trail: 'Новый шлейф!',
                jump: 'Новый прыжок!', pet: 'Новый питомец!', emote: 'Новая эмоция!', theme: 'Новый мир!' },
      catNoun: { color: 'цвет', hat: 'шапка', shorts: 'шорты', shoes: 'обувь', acc: 'аксессуар', trail: 'шлейф', jump: 'прыжок', pet: 'питомец', emote: 'эмоция', theme: 'мир' },
      starterClaim: 'Забрать', magnetPermOn: 'Постоянный магнит — всегда с тобой', magnetsSold: 'Магниты выкуплены: +{n}', titleGot: 'Получен: собраны все вещи раздела «{c}»',
      devMode: 'Режим: разработчик', playerMode: 'Режим: игрок', devTake: 'Взять (DEV)', look: 'Рассмотреть', tryLook: 'Так ты будешь выглядеть',
      taskReward: 'Награда', replaceAd: 'Заменить',
      chestAgain: 'Ещё лутбокс', toShop: 'В магазин', lootAll: 'Всё собрано! Лутбоксы больше не нужны.',
      themeDesc: 'Миры меняют вид бесконечного забега.', worldsBtn: '🌍 Миры', worldsTitle: 'Миры', emoteDesc: 'Эмоция — что стикмен делает на финише уровня.',
      equip: 'Надеть', equipped: 'Надето', take: 'Снять', bought: 'Куплено', inStock: 'В запасе',
      lifeDesc: '❤ Вторая жизнь — в разделе «Премиум».',
      magnetDesc: '🧲 Магнит — 30 секунд монеты сами летят к тебе. На один забег.',
      run: 'Бежать!', magnetOn: '✓ Магнит на 30 с включён', buyMagnet: 'Купить магнит на 30 с',
      lifeHave: '❤ Вторая жизнь с тобой', lifeNo: '❤ Вторая жизнь — в «Премиум»',
      secondLife: 'Вторая жизнь!', magnetGot: 'Магнит!',
      values: 'Серебро = 1, золото = 5, кристалл = 25',
      items: {
        classic: 'Классика', red: 'Красный', blue: 'Синий', green: 'Зелёный', orange: 'Оранжевый',
        purple: 'Фиолетовый', pink: 'Розовый', cyan: 'Бирюзовый', gold: 'Золотой', white: 'Белый',
        cap: 'Кепка', fedora: 'Шляпа', cowboy: 'Ковбойская шляпа', tophat: 'Цилиндр',
        jeans: 'Джинсовые', sport: 'Спортивные', stripes: 'Полосатые',
        sneakers: 'Красные кеды', runners: 'Кроссовки', boots: 'Ботинки',
        life: 'Вторая жизнь', magnet: 'Магнит (1 забег)',
        gloves: 'Перчатки', glasses: 'Очки', mask: 'Маска героя', backpack: 'Рюкзак', cape: 'Плащ',
        bubbles: 'Пузыри', sparks: 'Искры', fire: 'Огонь', rainbow: 'Радуга',
        cloud: 'Облачко', stars: 'Звёздочки', notes: 'Ноты',
        bird: 'Птенчик', drone: 'Дрон', cat: 'Котик',
        d_bonya: 'Боня', d_dixon: 'Диксон', d_kurt: 'Курт', d_yosya: 'Йося', d_onya: 'Оня', d_lilu: 'Лилу', d_sonya: 'Соня', d_asya: 'Ася',
        flag: 'Флаг', dance: 'Танец', flip: 'Сальто',
        auto: 'День и ночь', desert: 'Пустыня', winter: 'Зима', city: 'Город', space: 'Космос',
        hearts: 'Сердечки', beanie: 'Шапка с помпоном', confetti: 'Конфетти', scarf: 'Шарф', neon: 'Неоновый',
        ghost: 'Привидение', lightning: 'Молнии', crown: 'Корона', dragon: 'Дракончик', prism: 'Радужный',
        dots: 'В горошек', starsh: 'Звёздные', zebra: 'Зебра', tiger: 'Тигровые', flowers: 'Гавайские', checker: 'Шахматные', rainbowsh: 'Радужные',
        leopard: 'Леопардовые', neonsh: 'Неоновые', goldsh: 'Золотые', denimcut: 'Рваные джинсовые', pajama: 'Пижамные', spacesh: 'Космические',
        slippers: 'Тапочки', sandals: 'Сандалии', skates: 'Коньки', cowboyboots: 'Ковбойские сапоги', clownshoes: 'Клоунские ботинки', rainboots: 'Резиновые сапоги',
        cleats: 'Бутсы', ballet: 'Пуанты', spaceboots: 'Космические ботинки', flipflops: 'Шлёпанцы', hightops: 'Высокие кеды', firekicks: 'Огненные кроссовки', bunnyslippers: 'Тапки-зайцы',
        clap: 'Аплодисменты', jumpjack: 'Прыжки-звёздочки', shrug: 'Пожать плечами', salute: 'Отдать честь', robotdance: 'Танец робота', guitar: 'Гитарист', kick: 'Удар ногой',
        dab: 'Дэб', heartpose: 'Сердце руками', karate: 'Карате', yoga: 'Йога', tada: 'Та-дам!', sit: 'Присесть отдохнуть', roar: 'Рык льва',
        savanna: 'Саванна', safari: 'Пробковый шлем', safarish: 'Шорты сафари', hikers: 'Походные ботинки', binoculars: 'Бинокль',
        paws: 'Следы лап', sunburst: 'Солнечная вспышка', lion: 'Львёнок',
        pirate: 'Причёска афро', party: 'Праздничный колпак', propeller: 'Кепка с пропеллером',
        tie: 'Галстук', satchel: 'Сумка через плечо', guitarback: 'Гитара за спиной', shieldback: 'Щит за спиной',
        petals: 'Лепестки', bluefire: 'Синее пламя', pixels: 'Пиксели', musictrail: 'Мелодия', shadowtrail: 'Тень',
        splash: 'Брызги', leafjump: 'Листопад', bolt: 'Разряд', flowerburst: 'Цветочный взрыв', portal: 'Портал', coinburst: 'Монетный дождик', feathers: 'Пёрышки', icejump: 'Ледяные осколки', bubblejump: 'Пузырьки',
        santa: 'Новогодний колпак', antlers: 'Оленьи рожки', garland: 'Гирлянда', mittens: 'Варежки', tinsel: 'Мишура', snowburst: 'Снежный взрыв', reindeer: 'Оленёнок', snowman: 'Снеговичок',
        laurel: 'Лавровый венок', goldtrail: 'Золотая пыль', medal: 'Медаль', shockwave: 'Ударная волна', champion: 'Платиновый', lvl_star: 'Звёздочка',
        aurora: 'Северное сияние', comet: 'Хвост кометы', halo: 'Нимб', flowercrown: 'Венок', fireworks: 'Салют', butterfly: 'Крылья бабочки', galaxy: 'Галактика',
        skin_gold: 'Золотой', skin_ruby: 'Рубиновый', skin_emerald: 'Изумрудный', skin_diamond: 'Алмазный', skin_obsidian: 'Обсидиановый',
        brown: 'Коричневый', lime: 'Лаймовый', navy: 'Тёмно-синий', maroon: 'Бордовый',
        yellow: 'Жёлтый', teal: 'Морская волна', skyblue: 'Голубой', lavender: 'Лавандовый', mint: 'Мятный', coral: 'Коралловый',
        gray: 'Серый', olive: 'Оливковый', magenta: 'Пурпурный', chocolate: 'Шоколадный', indigo: 'Индиго',
        beret: 'Берет', chef: 'Колпак повара', headphones: 'Ушки кролика', viking: 'Шлем викинга', wizard: 'Шляпа мага',
        pinky: 'Розовые', camo: 'Камуфляж', plaid: 'Клетчатые', flippers: 'Ласты', rollers: 'Ролики', goldkicks: 'Золотые кеды',
        headband: 'Повязка', bowtie: 'Бабочка', sword: 'Меч за спиной', wings: 'Крылья', jetpack: 'Реактивный ранец',
        smoke: 'Дымок', snow: 'Снежинки', leaves: 'Листья', startrail: 'Звёздный след', puff: 'Пыльное облако', rings: 'Кольца', love: 'Сердца',
        bee: 'Пчёлка', frog: 'Лягушонок', owl: 'Совёнок', bat: 'Летучая мышь', dog: 'Щенок', penguin: 'Пингвин', fox: 'Лисёнок',
        wave: 'Привет', cheer: 'Ура!', bow: 'Поклон', ocean: 'Пляж', forest: 'Новогодний лес', sakura: 'Сад сакуры', autumn: 'Осень', underwater: 'Подводный мир', mine: 'Шахта', wildwest: 'Дикий Запад', neoncity: 'Неоновый город', skyland: 'Небесные острова', swamp: 'Болото', egypt: 'Египет', halloween: 'Хэллоуин', volcano: 'Вулкан', candy: 'Конфетный мир',
        c_zombie: 'Зомби', c_ninja: 'Ниндзя', c_pirate: 'Пират', c_knight: 'Рыцарь', c_astronaut: 'Астронавт', c_hero: 'Супергерой',
        c_robot: 'Робот', c_vampire: 'Вампир', c_mummy: 'Мумия', c_skeleton: 'Скелет', c_warrior: 'Викинг', c_samurai: 'Самурай',
        c_clown: 'Клоун', c_detective: 'Детектив', c_firefighter: 'Пожарный',
        p_unicorn: 'Единорог', p_phoenix: 'Феникс', p_robopup: 'Робо-пёс', p_jelly: 'Медузка', p_dino: 'Динозаврик', p_panda: 'Панда'
      },
      secMain: '⭐ Особое', secCoins: '🪙 Монеты', secChars: '🦸 Персонажи', secPets: '🐾 Эксклюзивные питомцы',
      coinsN: '{n} монет', benefit: 'выгода', noBenefit: 'базовая цена', wear: 'Надеть', worn: '✓ Надето',
      daily: 'Ежедневная награда', dailyBtn: '🎁 Награда', day: 'День', claim: 'Забрать', claimed: '✓',
      friendPets: 'Питомцы разработчика и друзей', owner: 'Хозяин',
      forestGift: 'Мир «Пляж» стал настоящим пляжем. В подарок — мир «Новогодний лес»!',
      comeBack: 'Возвращайся завтра за новой наградой!', exclusive: 'Каждый день — случайный премиум-скин или питомец. Повторов не бывает!',
      dailyLeft: 'Ещё не получено: {n}', dailyGot: 'Сегодня тебе выпало:', dailyAll: 'Все премиум-скины и питомцы уже твои — держи монеты!',
      tasks: 'Задания', tasksBtn: '📋 Задания', taskDone: 'Готово!', newTasks: 'Новые задания через {t}',
      taskText: { coins: 'Собери {n} монет', endless: 'Пробеги {n} м в бесконечном забеге', jumps: 'Прыгни {n} раз',
        slides: 'Сделай {n} подкатов', level: 'Пройди уровней: {n}', gold: 'Собери {n} золотых монет', runs: 'Сыграй {n} забегов' },
      dailyRun: '📅 Забег дня', dailyRunShort: 'Забег дня', dailyRunDesc: 'Одна трасса на весь день — одинаковая у всех игроков.',
      todayBest: 'Рекорд дня', golden: '✨ Золотой час! ✨',
      adSuffix: ' (реклама)', contT: 'Продолжить', x2: '×2 монеты', dbl: 'Удвоить награду', freeChest: 'Бесплатный лутбокс',
      freeChestIn: 'Бесплатный лутбокс через {t} мин', tryOn: 'Примерить на 1 забег', buyFor: 'Купить за', notEnough: 'Не хватает монет',
      shield: '🛡 Старт со щитом', shieldOn: '🛡 Щит на старте включён', spin: 'Крутить', spinMore: 'Ещё вращение',
      wheelBtn: '🎡 Колесо', wheelTitle: 'Колесо удачи', wheelFree: 'Одно бесплатное вращение в день', wheelWin: 'Выпало',
      replaceTask: '↻', topBtn: '🏅 Рейтинг', topTitle: 'Рейтинг', topEndless: 'Бесконечный', topDaily: 'Забег дня', topStars: 'Звёзды', topCoinsDay: 'Монет за сутки', topNote: 'Рейтинг обновляется каждые 2 минуты. Каждый день в 00:00 по Москве первые три места каждого рейтинга получают случайный премиум-товар.', topUpd: 'Обновлено', topReward: '🏆 Награда за {n}-е место в рейтинге «{b}»: {i}!',
      topNoSdk: 'Рейтинг работает на Яндекс Играх.', topLogin: 'Войдите, чтобы попасть в рейтинг', login: 'Войти', you: 'Вы',
      profileBtn: '👤 Профиль', profileTitle: 'Профиль', guest: 'Гость', shortcutBtn: '📌 Ярлык +700', shortcutDone: 'Ярлык добавлен! +700',
      trying: 'Примерка на 1 забег (не покупка)', trialOver: 'Примерка «{i}» закончилась. Чтобы оставить навсегда — купи в магазине', noAdsNote: '🎁 — «Без рекламы» куплено: награды забираются без просмотра рекламы.',
      st: {
        playTime: 'Время в игре', runTime: 'Время в забегах', runs: 'Забегов', endlessRuns: 'Бесконечных забегов', dist: 'Всего пробежано', best: 'Рекорд бесконечного',
        bestDaily: 'Рекорд забега дня', coins: 'Монет собрано', spent: 'Монет потрачено', wallet: 'Монет сейчас', gold: 'Золотых монет',
        jumps: 'Прыжков', slides: 'Подкатов', deaths: 'Падений', deathBy: 'Чаще всего мешает', lives: 'Спасений второй жизнью',
        magnets: 'Магнитов подобрано', chests: 'Лутбоксов открыто', golden: 'Золотых часов', tasks: 'Заданий выполнено',
        levels: 'Уровней пройдено', stars: 'Звёзд', ach: 'Достижений', items: 'Вещей', daily: 'Дней с наградой', look: 'Наряд'
      },
      causes: { spike: 'шипы', box: 'ящики', bird: 'птицы', pit: 'ямы', saw: 'пилы', beam: 'балки' },
      min: 'мин', h: 'ч', km: 'км',
      goldRefund: 'Цвет «Золотой» убран из магазина — вернули 700 монет',
      resetBtn: '🗑 Сбросить прогресс', resetTitle: 'Сброс прогресса', resetNext: 'Да, дальше', resetDo: 'Сбросить всё', resetCancel: 'Отмена',
      reset1: 'Вы хотите начать игру заново?',
      reset2: 'Пропадут монеты, вещи из магазина, звёзды, рекорды, достижения и статистика. Покупки за яны и «Без рекламы» останутся.',
      reset3: 'Последнее предупреждение: отменить сброс будет невозможно. Сбросить?',
      resetDone: 'Прогресс сброшен',
      tutJumpTouch: 'Нажми на экран — прыжок!', tutJumpPc: 'Нажми пробел — прыжок!',
      tutSlideTouch: 'Зажми ▼ — подкат!', tutSlidePc: 'Зажми ↓ или правую кнопку мыши — подкат!', combo: 'Комбо',
      prem: {
        noads: ['Без рекламы', 'Убирает полноэкранную рекламу и баннер. Кнопки «за рекламу» дают награду сразу — без просмотра.'],
        starter: ['Набор дня', 'Каждый день новый: {c} монет, {m} магнитов и {i}. Один раз в день.'],
        starter_perm: ['Набор дня навсегда', 'Купи один раз — и забирай «Набор дня» бесплатно каждый день.'],
        life: ['Вторая жизнь', 'Одно спасение от удара в каждом забеге. Навсегда.'],
        magnet_perm: ['Постоянный магнит', 'Монеты сами летят к тебе всё время — в каждом забеге и на уровнях. Купленные магниты выкупаются за полную цену.'],
        coins_s: ['Горстка монет', '2 000 монет'], coins_m: ['Мешок монет', '6 000 монет'],
        coins_l: ['Сундук монет', '15 000 монет'], coins_xl: ['Гора монет', '40 000 монет'],
        skin_gold: ['Золотой стикмен', 'Сияет золотом'], skin_ruby: ['Рубиновый стикмен', 'Сияет как рубин'],
        skin_emerald: ['Изумрудный стикмен', 'Сияет как изумруд'], skin_diamond: ['Алмазный стикмен', 'Сверкает как алмаз'],
        skin_obsidian: ['Обсидиановый стикмен', 'Тёмный с фиолетовым сиянием']
      },
      buy: 'Купить', owned: '✓ Куплено', starterDone: 'Сегодня уже куплен', payNoSdk: 'Покупки работают на Яндекс Играх',
      thanks: 'Спасибо за покупку!', starterMore: '+350 монет вместо предмета (всё уже собрано)',
      achBtn: '🏆 Достижения', achTitle: 'Достижения', achGot: 'Достижение',
      ach: {
        run1: ['Первый шаг', 'Сыграй первый забег'], w1: ['Луга пройдены', 'Пройди мир 1'], w2: ['Испытания пройдены', 'Пройди мир 2'],
        w3: ['Мастер', 'Пройди мир 3'], stars: ['Звездочёт', 'Собери все 75 звёзд'],
        e1000: ['Бегун', '1000 м в бесконечном забеге'], e3000: ['Марафонец', '3000 м в бесконечном забеге'], e6000: ['Легенда', '6000 м в бесконечном забеге'],
        c1k: ['Копилка', 'Собери 1000 монет'], c10k: ['Богач', 'Собери 10 000 монет'],
        buy5: ['Модник', 'Получи 5 вещей'], buy20: ['Коллекционер', 'Получи 20 вещей'],
        life: ['Живучий', 'Спасись второй жизнью'], jumps: ['Попрыгун', 'Прыгни 1000 раз'], slides: ['Скользкий тип', 'Сделай 100 подкатов'],
        chest5: ['Кладоискатель', 'Открой 5 лутбоксов'], daily7: ['Неделя с нами', 'Забери 7 ежедневных наград'],
        golden3: ['Золотая лихорадка', 'Попади в золотой час 3 раза'], tasks10: ['Исполнитель', 'Выполни 10 заданий'], drun: ['Каждый день', 'Сыграй забег дня']
      },
      achG: {
        eb: [['Разминка', 'Стайер', 'Неутомимый', 'Ураган', 'Покоритель'], 'Пробеги {n} м за один бесконечный забег'],
        dist: [['Прогулка', 'Путешествие', 'Сотня километров', 'Кругосветка', 'Полмиллиона'], 'Пробеги всего {n}'],
        coin: [['Кошелёк', 'Казна', 'Сейф', 'Банкир'], 'Собери всего {n} монет'],
        spent: [['Покупатель', 'Шопоголик', 'Транжира', 'Меценат'], 'Потрать {n} монет'],
        jump: [['Прыг-скок', 'Кузнечик', 'Кенгуру', 'Пружина'], 'Прыгни {n} раз'],
        slide: [['Пригнись!', 'Ниже травы', 'Скользун', 'Гроза балок'], 'Сделай {n} подкатов'],
        runs: [['Новичок', 'Завсегдатай', 'Сотый старт', 'Ветеран', 'Неудержимый'], 'Сыграй {n} забегов'],
        er: [['Бесконечность', 'Снова и снова', 'Вечный бегун'], 'Сыграй {n} бесконечных забегов'],
        lw: [['Проходчик', 'Знаток трасс', 'Мастер уровней'], 'Пройди уровни {n} раз'],
        st: [['Первые звёзды', 'Созвездие'], 'Собери {n} звёзд'],
        own: [['Барахольщик', 'Музей'], 'Получи {n} вещей'],
        day: [['Привычка', 'Десять дней', 'Месяц с нами'], 'Забери {n} наград за вход'],
        task: [['Первые задания', 'Работяга', 'Трудоголик', 'Незаменимый'], 'Выполни {n} заданий'],
        gh: [['Золотая удача', 'Золотой век'], 'Попади в золотой час {n} раз'],
        loot: [['Сюрприз!', 'Лутоман', 'Счастливчик'], 'Открой {n} лутбоксов'],
        gold: [['Золотоискатель', 'Золотая жила', 'Царь Мидас'], 'Собери {n} золотых монет'],
        lives: [['Кошачьи жизни'], 'Спасись второй жизнью {n} раз'],
        ws: [['Звёзды лугов', 'Звёзды испытаний', 'Звёзды мастера'], 'Собери все 25 звёзд в мире {n}'],
        cat3: [{ color: 'Палитра', hat: 'Шляпник', shorts: 'Модные шорты', shoes: 'Обувщик', acc: 'Аксессуарчик', trail: 'Следопыт', jump: 'Прыгучий стиль', pet: 'Друг зверей', emote: 'Артист', theme: 'Путешественник' }, 'Получи 3 вещи в разделе «{c}»'],
        catAll: [{ color: 'Все цвета радуги', hat: 'Король шляп', shorts: 'Гардероб шорт', shoes: 'Сороконожка', acc: 'Весь блеск', trail: 'Все шлейфы', jump: 'Мастер прыжков', pet: 'Зоопарк', emote: 'Звезда сцены', theme: 'Весь мир' }, 'Собери все вещи раздела «{c}», что продаются за монеты ({n})']
      },
      achNew: 'Новые достижения',
      encBtn: '📖 Энциклопедия', encTitle: 'Энциклопедия', encTabs: { ev: 'События', worlds: 'Опасности миров', obs: 'Препятствия' },
      encEvIntro: 'Мини-события бывают только в бесконечном забеге, примерно раз в 1500 м. За 2 секунды до начала появляется табличка с подсказкой.',
      encEv: {
        jet: 'Стикмен взлетает на ракетном ранце. Держи прыжок — летишь вверх, отпусти — плавно опускаешься. В воздухе дорожки монет и птицы. 10 секунд.',
        giant: 'Стикмен вырастает почти вдвое и разбивает ящики насквозь (+2 монеты за ящик). Ямы остаются ямами. Монеты собирает всей своей фигурой. 8 секунд.',
        slow: 'Всё движется медленнее, зато препятствия стоят плотно. Можно спокойно собрать монеты.',
        flee: 'Монеты убегают и подпрыгивают, когда подбегаешь. Лови их прыжком в нужный момент.',
        rhythm: 'Шипы стоят ровно в такт, перед каждым звучит щелчок. Прыжок точно в такт — +3 монеты.',
        pet: 'Твой питомец (или случайный зверёк) сам собирает монеты вокруг тебя.',
        dark: 'Стемнело: светло только впереди, как от фонарика. Трасса в это время проще и чуть медленнее.',
        balloon: 'Стикмен держит воздушный шарик: прыжки выше и плавнее. Если задеть острое, лопнет шарик, а не ты.',
        cart: 'Только в мире «Шахта». Вагонетка едет по трём путям: прыжок — на путь выше, подкат — на путь ниже. Опасностей нет: лови монеты, разбросанные по всем трём путям.',
        skate: 'Скейтборд: скорость выше, на трассе трамплины. Прыжок в воздухе после трамплина — трюк, +5 монет.',
        word: 'По трассе разложены буквы слова БОНУС, часть высоко. Собери все пять — +100 монет.',
        portal: 'Вбеги в портал — он перенесёт на 500 м вперёд и даст 70 монет.'
      },
      encWorldsIntro: 'В каждом мире свои шипы (перепрыгни), своя «лужа» (замедляет) и свой столб — он висит сверху почти до земли (подкатись под него).',
      encSpike: 'Шипы', encPud: '«Лужа»', encBeam: 'Столб', encOnlyMine: 'только в «Шахте»',
      encBeams: { wild: 'Деревянная балка на верёвках', desert: 'Колонна из песчаника', egypt: 'Колонна из песчаника', winter: 'Ледяная колонна с сосульками',
        xmas: 'Берёза с гирляндой', space: 'Энергетический излучатель', volcano: 'Базальт с трещинами лавы', candy: 'Леденцовая трость', ocean: 'Корабельная мачта',
        underwater: 'Мачта затонувшего корабля', sakura: 'Бамбук с фонариком', autumn: 'Ствол дерева в листьях', swamp: 'Ствол дерева во мху', jungle: 'Ствол дерева во мху',
        mine: 'Крепь из бруса', wildwest: 'Брус с железными обручами', neon: 'Неоновая колонна', skyland: 'Мраморная колонна на облаке',
        halloween: 'Старое бревно с паутиной', city: 'Стальная балка', savanna: 'Ствол баобаба' },
      encGold: ['🌟 Золотой час', 'Случайное событие бесконечного забега: иногда 10 секунд с неба сыплются монеты. Они падают впереди и ложатся на землю — успеешь собрать все.'],
      encHaz: { wild: ['Деревянные колья', 'Лужа'], desert: ['Кактус', 'Зыбучий песок'], winter: ['Ледяные осколки', 'Ледяная каша'], city: ['Битое стекло', 'Грязная лужа с бензином'],
        space: ['Светящиеся кристаллы', 'Слизь'], volcano: ['Раскалённый камень', 'Остывающая лава'], candy: ['Леденцовые шипы', 'Газировка'], ocean: ['Морской ёж', 'Мокрый песок'],
        xmas: ['Остролист и хлопушки', 'Сугроб'], sakura: ['Бамбуковые колья', 'Пруд с карпом'], autumn: ['Колючие каштаны', 'Лужа с листьями'], underwater: ['Острый коралл', 'Водоросли'],
        mine: ['Сталагмиты', 'Подземная вода'], wildwest: ['Колючая проволока', 'Грязь'], neon: ['Электрический разрядник', 'Неоновая лужа'], skyland: ['Грозовая тучка', 'Дождевое облако'],
        swamp: ['Мухоловка', 'Трясина'], savanna: ['Колючки акации', 'Грязевая лужа'], egypt: ['Ловушка с копьями', 'Оазис'], halloween: ['Кованая ограда', 'Ведьмино зелье'], jungle: ['Колючий куст', 'Грязь'] },
      encObs: [['Шипы', 'Перепрыгни. В каждом мире выглядят по-своему — смотри «Опасности миров».'], ['Ящик', 'Низкий перепрыгни, на высокий можно запрыгнуть и бежать по нему.'],
        ['Яма', 'Перепрыгни. Упадёшь — забег окончен.'], ['Птица', 'Низко летящую перепрыгни, под высокой пробеги.'],
        ['Балка', 'Висит сверху почти до земли — только подкат: ↓, S, правая кнопка мыши или кнопка ▼.'], ['Пила', 'Вращается у самой земли — перепрыгни.'],
        ['Платформа над ямой', 'Яма слишком широкая — прыгай на качающуюся платформу, с неё дальше.'], ['Мост с дырами', 'Доски проваливаются под ногами, дыры перепрыгивай.'],
        ['«Лужа»', 'Замедляет бег. В каждом мире своя.'], ['Магнит', 'На 15 секунд монеты сами летят к тебе.'],
        ['Лутбокс на трассе', 'Подбери — получишь вещь, которой у тебя ещё нет.']],
      slotBusy: 'Пока надет «{c}», это не надеть: у образа уже есть {s}', slotShort: 'занято образом',
      slotNoun: { hat: 'головной убор', acc: 'аксессуар', shorts: 'своя одежда', shoes: 'своя обувь' },
      ev: { jet: ['🚀 Ракетный ранец!', 'Держи — вверх, отпусти — вниз'], giant: ['💪 Великан!', 'Ломай ящики, прыгай через ямы'],
            slow: ['🐢 Замедление времени', 'Всё медленнее, но препятствий много'], flee: ['🪙 Монеты убегают!', 'Догоняй их прыжком'],
            rhythm: ['🥁 Ритм', 'Прыгай в такт — бонус!'], pet: ['🐾 Помощник', 'Питомец собирает монеты'],
            dark: ['🔦 Фонарик', 'Темно! Свет только впереди'], balloon: ['🎈 Воздушный шарик', 'Прыжки выше и плавнее. Острое лопнет шарик'],
            cart: ['🛤 Вагонетка', 'Прыжок — путь выше, подкат — ниже. Лови монеты!'], skate: ['🛹 Скейтборд', 'Трамплины! Прыжок в воздухе — трюк'],
            word: ['🔤 Собери слово', 'Собери все буквы — награда'], portal: ['🌀 Портал', 'Вбеги в портал: +500 м и +70 монет'] },
      word: 'БОНУС', wordDone: 'Слово собрано! +100', trick: 'Трюк! +5', warp: 'Телепорт! +{n}', balloonPop: 'Шарик лопнул!',
      devEvents: 'События', devEventsTitle: 'Проверка событий', devEventsHint: 'Забег начнётся сразу с выбранного события.', devGod: 'Бессмертие', on: 'вкл', off: 'выкл',
      rhythmOk: 'В такт!', lootGot: 'Лутбокс на трассе!', levelUp: 'Новый уровень', lvlShort: 'Ур.', xp: 'опыт', lvlReward: 'Награда за уровень {n}',
      titleT: 'Титул', titleNone: 'Без титула', titleNew: 'Новый титул', titleHint: 'Собери все вещи раздела «{c}»',
      titles: { color: 'Художник', hat: 'Шляпных дел мастер', shorts: 'Модник', shoes: 'Сороконожка', acc: 'Стиляга', trail: 'Следопыт',
                jump: 'Попрыгунчик', pet: 'Друг зверей', emote: 'Артист', theme: 'Путешественник' },
      nearRecord: 'До рекорда всего {n} м!', toRecord: 'До рекорда {n} м', multTip: 'Монеты ×{k}', easyTip: 'Разминка: первые 500 м полегче',
      needStars: 'Мир {w} откроется за {n}★ — у тебя {have}★. Перепройди уровни на ★★★!', worldStars: 'нужно {n}★',
      obTips: {
        beamPc: 'Балка! Подкат — ↓, S или правая кнопка мыши', beamTouch: 'Балка! Подкат — кнопка ▼',
        saw: 'Перепрыгни пилу!', plat: 'Прыгай на платформу!', bridge: 'Мост с дырами — прыгай!',
        puddle: 'Лужа замедляет!', magnet: 'Магнит! Монеты летят к тебе'
      },
      tips: [
        'Перепрыгивай шипы!',
        'На ящики можно запрыгнуть',
        'Не упади в яму!',
        'Под высокими птицами — пробегай, не прыгай!',
        'Финальный забег мира!',
        'Лужи замедляют бег',
        'Под балку — подкатом!',
        'Перепрыгивай пилы!',
        'Прыгай на платформу над ямой',
        'Мост с дырами — смотри под ноги!',
        'Всё вперемешку!',
        'Вулкан: быстро и жарко',
        'Ледяная ночь',
        'Почти финиш!',
        'Последний уровень — космос!'
      ],
      world: 'Мир', worlds: ['Луга', 'Испытания', 'Мастер'],
      endlessOpen: 'Открыт бесконечный забег! Он в меню, а дальше ждут уровни 6–15.'
    },
    en: {
      title: 'Stickman Run',
      play: 'Play', levelN: 'Level', pause: 'Pause', resume: 'Resume',
      retry: 'Retry', menu: 'Menu', next: 'Next', back: 'Back',
      fail: 'Oops!', failText: 'Progress: ', win: 'Level complete!',
      cont: '▶ Continue (watch ad)', coins: 'Coins', wallet: 'Coins',
      hintPc: 'Space, ↑ or click to jump. ↓, S or right mouse button to slide (in the air it drops you fast).',
      hintTouch: 'Tap to jump. ▼ button to slide (in the air it drops you fast).',
      allDone: 'All levels complete!',
      allDoneText: 'All 15 levels done! Next: the endless run, tasks and the shop.',
      total: 'Stars',
      endless: '∞ Endless run', endlessShort: 'Endless run',
      endlessLocked: '🔒 Endless run — beat 5 levels',
      endlessTip: 'Run as far as you can!',
      distance: 'Distance', record: 'Best', newRecord: 'New record!', m: 'm', earned: 'Coins collected',
      shop: '🛒 Shop', shopTitle: 'Shop',
      tabs: { color: 'Color', hat: 'Hats', shorts: 'Shorts', shoes: 'Shoes', acc: 'Extras', trail: 'Trails',
              jump: 'Jump', pet: 'Pets', emote: 'Emotes', theme: 'Worlds', boost: 'Boosts', premium: '💎 Premium' },
      chest: 'Open a loot box', chestTitle: 'Loot box', lootInfo: 'Only what you don\'t have yet. The price is the median price of what is left to collect.',
      newCat: { color: 'New colour!', hat: 'New hat!', shorts: 'New shorts!', shoes: 'New shoes!', acc: 'New accessory!', trail: 'New trail!',
                jump: 'New jump effect!', pet: 'New pet!', emote: 'New emote!', theme: 'New world!' },
      catNoun: { color: 'colour', hat: 'hat', shorts: 'shorts', shoes: 'shoes', acc: 'accessory', trail: 'trail', jump: 'jump effect', pet: 'pet', emote: 'emote', theme: 'world' },
      starterClaim: 'Claim', magnetPermOn: 'Permanent magnet — always on', magnetsSold: 'Magnets bought back: +{n}', titleGot: 'Earned: every “{c}” item collected',
      devMode: 'Mode: developer', playerMode: 'Mode: player', devTake: 'Take (DEV)', look: 'Look closer', tryLook: 'This is how you will look',
      taskReward: 'Reward', replaceAd: 'Replace',
      chestAgain: 'Another loot box', toShop: 'To shop', lootAll: 'Everything collected! No more loot boxes needed.',
      themeDesc: 'Worlds change how the endless run looks.', worldsBtn: '🌍 Worlds', worldsTitle: 'Worlds', emoteDesc: 'Emote — what the stickman does at the level finish.',
      equip: 'Wear', equipped: 'Worn', take: 'Take off', bought: 'Owned', inStock: 'In stock',
      lifeDesc: '❤ Second life — in the Premium tab.',
      magnetDesc: '🧲 Magnet — coins fly to you for 30 seconds. One run.',
      run: 'Run!', magnetOn: '✓ 30 s magnet is on', buyMagnet: 'Buy a 30 s magnet',
      lifeHave: '❤ Second life is with you', lifeNo: '❤ Second life — in Premium',
      secondLife: 'Second life!', magnetGot: 'Magnet!',
      values: 'Silver = 1, gold = 5, crystal = 25',
      items: {
        classic: 'Classic', red: 'Red', blue: 'Blue', green: 'Green', orange: 'Orange',
        purple: 'Purple', pink: 'Pink', cyan: 'Teal', gold: 'Gold', white: 'White',
        cap: 'Cap', fedora: 'Hat', cowboy: 'Cowboy hat', tophat: 'Top hat',
        jeans: 'Denim', sport: 'Sport', stripes: 'Striped',
        sneakers: 'Red sneakers', runners: 'Running shoes', boots: 'Boots',
        life: 'Second life', magnet: 'Magnet (1 run)',
        gloves: 'Gloves', glasses: 'Glasses', mask: 'Hero mask', backpack: 'Backpack', cape: 'Cape',
        bubbles: 'Bubbles', sparks: 'Sparks', fire: 'Fire', rainbow: 'Rainbow',
        cloud: 'Cloud', stars: 'Stars', notes: 'Notes',
        bird: 'Chick', drone: 'Drone', cat: 'Kitty',
        d_bonya: 'Bonya', d_dixon: 'Dixon', d_kurt: 'Kurt', d_yosya: 'Yosya', d_onya: 'Onyx', d_lilu: 'Lilu', d_sonya: 'Sonya', d_asya: 'Asya',
        flag: 'Flag', dance: 'Dance', flip: 'Backflip',
        auto: 'Day & night', desert: 'Desert', winter: 'Winter', city: 'City', space: 'Space',
        hearts: 'Hearts', beanie: 'Bobble hat', confetti: 'Confetti', scarf: 'Scarf', neon: 'Neon',
        ghost: 'Ghost', lightning: 'Lightning', crown: 'Crown', dragon: 'Little dragon', prism: 'Rainbow',
        dots: 'Polka dots', starsh: 'Starry', zebra: 'Zebra', tiger: 'Tiger', flowers: 'Hawaiian', checker: 'Checkered', rainbowsh: 'Rainbow',
        leopard: 'Leopard', neonsh: 'Neon', goldsh: 'Golden', denimcut: 'Ripped denim', pajama: 'Pyjama', spacesh: 'Cosmic',
        slippers: 'Slippers', sandals: 'Sandals', skates: 'Ice skates', cowboyboots: 'Cowboy boots', clownshoes: 'Clown shoes', rainboots: 'Rain boots',
        cleats: 'Football boots', ballet: 'Ballet shoes', spaceboots: 'Space boots', flipflops: 'Flip-flops', hightops: 'High-tops', firekicks: 'Fire sneakers', bunnyslippers: 'Bunny slippers',
        clap: 'Applause', jumpjack: 'Jumping jacks', shrug: 'Shrug', salute: 'Salute', robotdance: 'Robot dance', guitar: 'Air guitar', kick: 'Kick',
        dab: 'Dab', heartpose: 'Hand heart', karate: 'Karate', yoga: 'Yoga', tada: 'Ta-da!', sit: 'Take a seat', roar: 'Lion roar',
        savanna: 'Savanna', safari: 'Safari helmet', safarish: 'Safari shorts', hikers: 'Hiking boots', binoculars: 'Binoculars',
        paws: 'Paw prints', sunburst: 'Sunburst', lion: 'Lion cub',
        pirate: 'Afro', party: 'Party hat', propeller: 'Propeller cap',
        tie: 'Tie', satchel: 'Satchel', guitarback: 'Guitar on the back', shieldback: 'Shield on the back',
        petals: 'Petals', bluefire: 'Blue flame', pixels: 'Pixels', musictrail: 'Melody', shadowtrail: 'Shadow',
        splash: 'Splash', leafjump: 'Leaf fall', bolt: 'Bolt', flowerburst: 'Flower burst', portal: 'Portal', coinburst: 'Coin shower', feathers: 'Feathers', icejump: 'Ice shards', bubblejump: 'Bubbles',
        santa: 'Christmas hat', antlers: 'Reindeer antlers', garland: 'Fairy lights', mittens: 'Mittens', tinsel: 'Tinsel', snowburst: 'Snow burst', reindeer: 'Reindeer fawn', snowman: 'Little snowman',
        laurel: 'Laurel wreath', goldtrail: 'Gold dust', medal: 'Medal', shockwave: 'Shockwave', champion: 'Platinum', lvl_star: 'Little star',
        aurora: 'Aurora', comet: 'Comet tail', halo: 'Halo', flowercrown: 'Flower crown', fireworks: 'Fireworks', butterfly: 'Butterfly wings', galaxy: 'Galaxy',
        skin_gold: 'Golden', skin_ruby: 'Ruby', skin_emerald: 'Emerald', skin_diamond: 'Diamond', skin_obsidian: 'Obsidian',
        brown: 'Brown', lime: 'Lime', navy: 'Navy', maroon: 'Burgundy',
        yellow: 'Yellow', teal: 'Teal', skyblue: 'Sky blue', lavender: 'Lavender', mint: 'Mint', coral: 'Coral',
        gray: 'Grey', olive: 'Olive', magenta: 'Magenta', chocolate: 'Chocolate', indigo: 'Indigo',
        beret: 'Beret', chef: 'Chef hat', headphones: 'Bunny ears', viking: 'Viking helmet', wizard: 'Wizard hat',
        pinky: 'Pink', camo: 'Camo', plaid: 'Plaid', flippers: 'Flippers', rollers: 'Roller skates', goldkicks: 'Gold sneakers',
        headband: 'Headband', bowtie: 'Bow tie', sword: 'Sword on back', wings: 'Wings', jetpack: 'Jetpack',
        smoke: 'Smoke', snow: 'Snowflakes', leaves: 'Leaves', startrail: 'Star trail', puff: 'Dust puff', rings: 'Rings', love: 'Hearts',
        bee: 'Bee', frog: 'Froggy', owl: 'Owlet', bat: 'Bat', dog: 'Puppy', penguin: 'Penguin', fox: 'Fox cub',
        wave: 'Wave', cheer: 'Hooray!', bow: 'Bow', ocean: 'Beach', forest: 'New Year forest', sakura: 'Sakura garden', autumn: 'Autumn', underwater: 'Underwater', mine: 'Mine', wildwest: 'Wild West', neoncity: 'Neon city', skyland: 'Sky islands', swamp: 'Swamp', egypt: 'Egypt', halloween: 'Halloween', volcano: 'Volcano', candy: 'Candy land',
        c_zombie: 'Zombie', c_ninja: 'Ninja', c_pirate: 'Pirate', c_knight: 'Knight', c_astronaut: 'Astronaut', c_hero: 'Superhero',
        c_robot: 'Robot', c_vampire: 'Vampire', c_mummy: 'Mummy', c_skeleton: 'Skeleton', c_warrior: 'Viking', c_samurai: 'Samurai',
        c_clown: 'Clown', c_detective: 'Detective', c_firefighter: 'Firefighter',
        p_unicorn: 'Unicorn', p_phoenix: 'Phoenix', p_robopup: 'Robo-pup', p_jelly: 'Jellyfish', p_dino: 'Dino', p_panda: 'Panda'
      },
      secMain: '⭐ Special', secCoins: '🪙 Coins', secChars: '🦸 Characters', secPets: '🐾 Exclusive pets',
      coinsN: '{n} coins', benefit: 'saving', noBenefit: 'base price', wear: 'Wear', worn: '✓ Worn',
      daily: 'Daily reward', dailyBtn: '🎁 Reward', day: 'Day', claim: 'Claim', claimed: '✓',
      friendPets: 'Pets of the developer and friends', owner: 'Owner',
      forestGift: 'The Beach world is now a real beach. Here is the New Year forest world as a gift!',
      comeBack: 'Come back tomorrow for a new reward!', exclusive: 'Every day — a random premium skin or pet. Never a repeat!',
      dailyLeft: 'Not received yet: {n}', dailyGot: 'Today you got:', dailyAll: 'You own every premium skin and pet — have some coins!',
      tasks: 'Tasks', tasksBtn: '📋 Tasks', taskDone: 'Done!', newTasks: 'New tasks in {t}',
      taskText: { coins: 'Collect {n} coins', endless: 'Run {n} m in the endless run', jumps: 'Jump {n} times',
        slides: 'Slide {n} times', level: 'Finish levels: {n}', gold: 'Collect {n} gold coins', runs: 'Play {n} runs' },
      dailyRun: '📅 Daily run', dailyRunShort: 'Daily run', dailyRunDesc: 'One track for the whole day — the same for every player.',
      todayBest: "Today's best", golden: '✨ Golden hour! ✨',
      adSuffix: ' (ad)', contT: 'Continue', x2: '×2 coins', dbl: 'Double the reward', freeChest: 'Free loot box',
      freeChestIn: 'Free loot box in {t} min', tryOn: 'Try on for 1 run', buyFor: 'Buy for', notEnough: 'Not enough coins',
      shield: '🛡 Start with a shield', shieldOn: '🛡 Start shield is on', spin: 'Spin', spinMore: 'Spin again',
      wheelBtn: '🎡 Wheel', wheelTitle: 'Lucky wheel', wheelFree: 'One free spin a day', wheelWin: 'You got',
      replaceTask: '↻', topBtn: '🏅 Ranking', topTitle: 'Ranking', topEndless: 'Endless', topDaily: 'Daily run', topStars: 'Stars', topCoinsDay: 'Coins today', topNote: 'The ranking refreshes every 2 minutes. Every day at 00:00 Moscow time the top three of each ranking get a random premium item.', topUpd: 'Updated', topReward: '🏆 Reward for place {n} in «{b}»: {i}!',
      topNoSdk: 'Rankings work on Yandex Games.', topLogin: 'Log in to get into the ranking', login: 'Log in', you: 'You',
      profileBtn: '👤 Profile', profileTitle: 'Profile', guest: 'Guest', shortcutBtn: '📌 Shortcut +700', shortcutDone: 'Shortcut added! +700',
      trying: 'Trying on for 1 run (not a purchase)', trialOver: 'The try-on of «{i}» is over. Buy it in the shop to keep it', noAdsNote: '🎁 — "No ads" purchased: rewards are claimed without watching ads.',
      st: {
        playTime: 'Time played', runTime: 'Time in runs', runs: 'Runs', endlessRuns: 'Endless runs', dist: 'Total distance', best: 'Endless best',
        bestDaily: 'Daily run best', coins: 'Coins collected', spent: 'Coins spent', wallet: 'Coins now', gold: 'Gold coins',
        jumps: 'Jumps', slides: 'Slides', deaths: 'Falls', deathBy: 'Worst enemy', lives: 'Second-life saves',
        magnets: 'Magnets picked', chests: 'Loot boxes opened', golden: 'Golden hours', tasks: 'Tasks done',
        levels: 'Levels finished', stars: 'Stars', ach: 'Achievements', items: 'Items', daily: 'Reward days', look: 'Outfit'
      },
      causes: { spike: 'spikes', box: 'crates', bird: 'birds', pit: 'pits', saw: 'saws', beam: 'beams' },
      min: 'min', h: 'h', km: 'km',
      goldRefund: 'The "Gold" colour left the shop — 700 coins returned',
      resetBtn: '🗑 Reset progress', resetTitle: 'Reset progress', resetNext: 'Yes, continue', resetDo: 'Reset everything', resetCancel: 'Cancel',
      reset1: 'Do you want to start the game over?',
      reset2: 'Coins, shop items, stars, records, achievements and stats will be lost. Purchases for yan and "No ads" stay.',
      reset3: 'Last warning: the reset cannot be undone. Reset?',
      resetDone: 'Progress reset',
      tutJumpTouch: 'Tap the screen to jump!', tutJumpPc: 'Press Space to jump!',
      tutSlideTouch: 'Hold ▼ to slide!', tutSlidePc: 'Hold ↓ or the right mouse button to slide!', combo: 'Combo',
      prem: {
        noads: ['No ads', 'Removes fullscreen ads and the banner. "Watch ad" buttons give the reward at once — no video.'],
        starter: ['Pack of the day', 'New every day: {c} coins, {m} magnets and {i}. Once a day.'],
        starter_perm: ['Pack of the day forever', 'Buy once — and claim the Pack of the day for free every day.'],
        life: ['Second life', 'Survive one hit in every run. Forever.'],
        magnet_perm: ['Permanent magnet', 'Coins fly to you all the time — in every run and on levels. Magnets you bought are bought back at full price.'],
        coins_s: ['Handful of coins', '2,000 coins'], coins_m: ['Bag of coins', '6,000 coins'],
        coins_l: ['Chest of coins', '15,000 coins'], coins_xl: ['Mountain of coins', '40,000 coins'],
        skin_gold: ['Golden stickman', 'Shines like gold'], skin_ruby: ['Ruby stickman', 'Shines like a ruby'],
        skin_emerald: ['Emerald stickman', 'Shines like an emerald'], skin_diamond: ['Diamond stickman', 'Sparkles like a diamond'],
        skin_obsidian: ['Obsidian stickman', 'Dark with a purple glow']
      },
      buy: 'Buy', owned: '✓ Owned', starterDone: 'Already bought today', payNoSdk: 'Purchases work on Yandex Games',
      thanks: 'Thank you for your purchase!', starterMore: '+350 coins instead of an item (you have everything)',
      achBtn: '🏆 Achievements', achTitle: 'Achievements', achGot: 'Achievement',
      ach: {
        run1: ['First step', 'Play your first run'], w1: ['Meadows done', 'Finish world 1'], w2: ['Trials done', 'Finish world 2'],
        w3: ['Master', 'Finish world 3'], stars: ['Stargazer', 'Collect all 75 stars'],
        e1000: ['Runner', '1000 m in the endless run'], e3000: ['Marathoner', '3000 m in the endless run'], e6000: ['Legend', '6000 m in the endless run'],
        c1k: ['Piggy bank', 'Collect 1000 coins'], c10k: ['Rich', 'Collect 10,000 coins'],
        buy5: ['Fashionista', 'Get 5 items'], buy20: ['Collector', 'Get 20 items'],
        life: ['Survivor', 'Be saved by a second life'], jumps: ['Hopper', 'Jump 1000 times'], slides: ['Slippery', 'Slide 100 times'],
        chest5: ['Treasure hunter', 'Open 5 loot boxes'], daily7: ['A week with us', 'Claim 7 daily rewards'],
        golden3: ['Gold rush', 'Catch the golden hour 3 times'], tasks10: ['Doer', 'Complete 10 tasks'], drun: ['Every day', 'Play the daily run']
      },
      achG: {
        eb: [['Warm-up', 'Stayer', 'Tireless', 'Hurricane', 'Conqueror'], 'Run {n} m in one endless run'],
        dist: [['A walk', 'A journey', 'A hundred kilometres', 'Round the world', 'Half a million'], 'Run {n} in total'],
        coin: [['Wallet', 'Treasury', 'Safe', 'Banker'], 'Collect {n} coins in total'],
        spent: [['Shopper', 'Shopaholic', 'Big spender', 'Patron'], 'Spend {n} coins'],
        jump: [['Hop', 'Grasshopper', 'Kangaroo', 'Spring'], 'Jump {n} times'],
        slide: [['Duck!', 'Below the grass', 'Slider', 'Beam breaker'], 'Slide {n} times'],
        runs: [['Rookie', 'Regular', 'Hundredth start', 'Veteran', 'Unstoppable'], 'Play {n} runs'],
        er: [['Infinity', 'Again and again', 'Eternal runner'], 'Play {n} endless runs'],
        lw: [['Pathfinder', 'Track expert', 'Level master'], 'Finish levels {n} times'],
        st: [['First stars', 'Constellation'], 'Collect {n} stars'],
        own: [['Hoarder', 'Museum'], 'Get {n} items'],
        day: [['Habit', 'Ten days', 'A month with us'], 'Claim {n} login rewards'],
        task: [['First tasks', 'Hard worker', 'Workaholic', 'Irreplaceable'], 'Complete {n} tasks'],
        gh: [['Golden luck', 'Golden age'], 'Catch the golden hour {n} times'],
        loot: [['Surprise!', 'Loot lover', 'Lucky one'], 'Open {n} loot boxes'],
        gold: [['Gold seeker', 'Gold vein', 'King Midas'], 'Collect {n} gold coins'],
        lives: [['Nine lives'], 'Be saved by a second life {n} times'],
        ws: [['Meadow stars', 'Trial stars', 'Master stars'], 'Collect all 25 stars in world {n}'],
        cat3: [{ color: 'Palette', hat: 'Hatter', shorts: 'Smart shorts', shoes: 'Shoemaker', acc: 'Accessorised', trail: 'Trailblazer', jump: 'Jump style', pet: 'Animal friend', emote: 'Performer', theme: 'Traveller' }, 'Get 3 items in “{c}”'],
        catAll: [{ color: 'Every colour', hat: 'King of hats', shorts: 'Shorts wardrobe', shoes: 'Centipede', acc: 'All the bling', trail: 'All the trails', jump: 'Jump master', pet: 'Zoo', emote: 'Star of the stage', theme: 'The whole world' }, 'Collect every “{c}” item sold for coins ({n})']
      },
      achNew: 'New achievements',
      encBtn: '📖 Encyclopedia', encTitle: 'Encyclopedia', encTabs: { ev: 'Events', worlds: 'World hazards', obs: 'Obstacles' },
      encEvIntro: 'Mini-events happen only in the endless run, about every 1500 m. A sign with a hint shows up 2 seconds before.',
      encEv: {
        jet: 'A jetpack: hold jump to fly up, let go to glide down. Coin trails and birds in the air. 10 seconds.',
        giant: 'The stickman grows almost twice as big and smashes crates (+2 coins each). Pits are still pits. 8 seconds.',
        slow: 'Everything is slower, but the obstacles are packed tight.',
        flee: 'Coins run away and hop when you come close — catch them with a well-timed jump.',
        rhythm: 'Spikes come on a steady beat with a click before each. A jump on the beat gives +3 coins.',
        pet: 'Your pet (or a random one) collects the coins around you.',
        dark: 'It gets dark: light only ahead, like a flashlight. The track is easier and a bit slower then.',
        balloon: 'Holding a balloon: higher, floatier jumps. Touch something sharp and the balloon pops instead of you.',
        cart: 'Mine world only. The cart rides three tracks: jump — one track up, slide — one track down. Nothing dangerous: catch the coins scattered over all three.',
        skate: 'A skateboard: faster, with ramps. Jump in the air after a ramp for a trick, +5 coins.',
        word: 'The letters of BONUS lie along the track, some up high. Collect all five for +100 coins.',
        portal: 'Run into the portal: it takes you 500 m ahead and gives 70 coins.'
      },
      encWorldsIntro: 'Every world has its own spikes (jump), its own "puddle" (slows you down) and its own pillar — it hangs from above almost to the ground (slide under it).',
      encSpike: 'Spikes', encPud: '"Puddle"', encBeam: 'Pillar', encOnlyMine: 'mine only',
      encBeams: { wild: 'Wooden beam on ropes', desert: 'Sandstone column', egypt: 'Sandstone column', winter: 'Ice column with icicles',
        xmas: 'Birch with a garland', space: 'Energy emitter', volcano: 'Basalt with lava cracks', candy: 'Candy cane', ocean: "Ship's mast",
        underwater: "A sunken ship's mast", sakura: 'Bamboo with a lantern', autumn: 'Tree trunk in leaves', swamp: 'Mossy tree trunk', jungle: 'Mossy tree trunk',
        mine: 'Timber prop', wildwest: 'Timber with iron bands', neon: 'Neon column', skyland: 'Marble column on a cloud',
        halloween: 'Old log with cobwebs', city: 'Steel girder', savanna: 'Baobab trunk' },
      encGold: ['🌟 Golden hour', 'A random endless-run event: sometimes coins rain from the sky for 10 seconds. They fall ahead and land, so you can get them all.'],
      encHaz: { wild: ['Wooden stakes', 'Puddle'], desert: ['Cactus', 'Quicksand'], winter: ['Ice shards', 'Slush'], city: ['Broken glass', 'Oily puddle'],
        space: ['Glowing crystals', 'Slime'], volcano: ['Red-hot rock', 'Cooling lava'], candy: ['Candy spikes', 'Soda'], ocean: ['Sea urchin', 'Wet sand'],
        xmas: ['Holly and firecrackers', 'Snowdrift'], sakura: ['Bamboo stakes', 'Koi pond'], autumn: ['Spiky chestnuts', 'Leafy puddle'], underwater: ['Sharp coral', 'Seaweed'],
        mine: ['Stalagmites', 'Underground water'], wildwest: ['Barbed wire', 'Mud'], neon: ['Electric emitter', 'Neon puddle'], skyland: ['Storm cloud', 'Rain cloud'],
        swamp: ['Flytrap', 'Bog'], savanna: ['Acacia thorns', 'Mud wallow'], egypt: ['Spear trap', 'Oasis'], halloween: ['Iron fence', "Witch's potion"], jungle: ['Thorny bush', 'Mud'] },
      encObs: [['Spikes', 'Jump over. Every world has its own — see World hazards.'], ['Crate', 'Jump a low one; land on a tall one and run along it.'],
        ['Pit', 'Jump over. Fall in and the run is over.'], ['Bird', 'Jump a low one, run under a high one.'],
        ['Beam', 'Hangs almost to the ground — slide only: ↓, S, right mouse button or the ▼ button.'], ['Saw', 'Spins at the ground — jump over.'],
        ['Platform over a pit', 'The pit is too wide — jump onto the moving platform, then on.'], ['Broken bridge', 'Planks fall under you; jump the holes.'],
        ['"Puddle"', 'Slows you down. Every world has its own.'], ['Magnet', 'For 15 seconds coins fly to you.'],
        ['Loot box on the track', 'Pick it up for an item you don\'t have yet.']],
      slotBusy: 'Not while «{c}» is on: the character already has {s}', slotShort: 'taken by the look',
      slotNoun: { hat: 'headwear', acc: 'an accessory', shorts: 'its own clothes', shoes: 'its own shoes' },
      ev: { jet: ['🚀 Jetpack!', 'Hold to fly up, let go to come down'], giant: ['💪 Giant!', 'Smash the crates, jump the pits'],
            slow: ['🐢 Slow motion', 'Everything is slower, but packed with obstacles'], flee: ['🪙 Runaway coins!', 'Catch them with a jump'],
            rhythm: ['🥁 Rhythm', 'Jump on the beat for a bonus!'], pet: ['🐾 Helper', 'Your pet collects coins'],
            dark: ['🔦 Flashlight', 'Dark! Light only ahead'], balloon: ['🎈 Balloon', 'Higher, floatier jumps. Sharp things pop it'],
            cart: ['🛤 Mine cart', 'Jump — a track up, slide — down. Catch the coins!'], skate: ['🛹 Skateboard', 'Ramps! Jump in the air for a trick'],
            word: ['🔤 Spell the word', 'Collect all the letters for a reward'], portal: ['🌀 Portal', 'Run into the portal: +500 m and +70 coins'] },
      word: 'BONUS', wordDone: 'Word complete! +100', trick: 'Trick! +5', warp: 'Teleport! +{n}', balloonPop: 'The balloon popped!',
      devEvents: 'Events', devEventsTitle: 'Event test', devEventsHint: 'The run starts right at the chosen event.', devGod: 'God mode', on: 'on', off: 'off',
      rhythmOk: 'On the beat!', lootGot: 'A loot box on the track!', levelUp: 'Level up', lvlShort: 'Lv.', xp: 'XP', lvlReward: 'Reward for level {n}',
      titleT: 'Title', titleNone: 'No title', titleNew: 'New title', titleHint: 'Collect every “{c}” item',
      titles: { color: 'Artist', hat: 'Master hatter', shorts: 'Trendsetter', shoes: 'Centipede', acc: 'Dandy', trail: 'Trailblazer',
                jump: 'Bouncer', pet: 'Animal friend', emote: 'Performer', theme: 'Traveller' },
      nearRecord: 'Only {n} m to your record!', toRecord: '{n} m to your record', multTip: 'Coins ×{k}', easyTip: 'Warm-up: the first 500 m are easier',
      needStars: 'World {w} opens at {n}★ — you have {have}★. Replay levels for ★★★!', worldStars: 'needs {n}★',
      obTips: {
        beamPc: 'Beam! Slide — ↓, S or right mouse button', beamTouch: 'Beam! Slide — ▼ button',
        saw: 'Jump over the saw!', plat: 'Jump on the platform!', bridge: 'Broken bridge — jump the holes!',
        puddle: 'Puddles slow you down!', magnet: 'Magnet! Coins fly to you'
      },
      tips: [
        'Jump over the spikes!',
        'You can land on crates',
        "Don't fall into the pit!",
        "Run under high birds, don't jump!",
        'The final run of the world!',
        'Puddles slow you down',
        'Slide under the beams!',
        'Jump over the saws!',
        'Jump on the platform over the pit',
        'Broken bridge — watch your step!',
        'Everything mixed!',
        'Volcano: fast and hot',
        'Icy night',
        'Almost there!',
        'The last level — space!'
      ],
      world: 'World', worlds: ['Meadows', 'Trials', 'Master'],
      endlessOpen: 'Endless run unlocked! It is in the menu, and levels 6–15 are next.'
    }
  };
  let S = TEXT.ru;
  const IS_TOUCH = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;

  // =====================================================================
  //  Shop catalogue (balance: everything is bought in roughly 4–6 hours)
  // =====================================================================
  const SHOP = {
    color: [
      { id: 'classic', price: 0 },
      { id: 'red', price: 150, col: '#e53935' },
      { id: 'blue', price: 150, col: '#1e6fd9' },
      { id: 'green', price: 200, col: '#2e9e44' },
      { id: 'orange', price: 200, col: '#fb8c00', light: true },
      { id: 'purple', price: 300, col: '#8e24aa' },
      { id: 'pink', price: 300, col: '#ec407a' },
      { id: 'cyan', price: 400, col: '#00acc1', light: true },
      { id: 'white', price: 500, col: '#f5f5f5', light: true },
      { id: 'brown', price: 200, col: '#795548' },
      { id: 'lime', price: 250, col: '#7cb342' },
      { id: 'navy', price: 300, col: '#1a237e' },
      { id: 'maroon', price: 300, col: '#800020' },   // 1.0.18: a true burgundy (was #880e4f, looked like eggplant)
      { id: 'yellow', price: 200, col: '#fdd835', light: true },
      { id: 'teal', price: 250, col: '#00897b' },
      { id: 'skyblue', price: 250, col: '#4fc3f7', light: true },
      { id: 'lavender', price: 300, col: '#b39ddb', light: true },
      { id: 'mint', price: 300, col: '#4cd9a0', light: true },
      { id: 'coral', price: 300, col: '#ff7043', light: true },
      { id: 'gray', price: 200, col: '#78909c' },
      { id: 'olive', price: 250, col: '#7d7d1f' },
      { id: 'magenta', price: 350, col: '#c51fc5' },
      { id: 'chocolate', price: 250, col: '#4e2c1c' },
      { id: 'indigo', price: 300, col: '#3949ab' },
      { id: 'neon', price: 0, col: '#39ff14', light: true, ex: 1 },
      { id: 'prism', price: 0, col: '#ff5252', light: true, ex: 1 },
      { id: 'galaxy', price: 0, col: '#5e35b1', ex: 1, gem: 'rgba(160,120,255,0.65)' },
      { id: 'champion', price: 0, col: '#dfe6ee', light: true, ex: 1, gem: 'rgba(255,255,255,0.75)' },
      // gem stickmen (were paid until 1.0.14, now for coins; buyers keep them)
      { id: 'skin_gold', price: 2500, col: '#ffcf33', light: true, gem: 'rgba(255,215,0,0.55)' },
      { id: 'skin_ruby', price: 3000, col: '#e0115f', gem: 'rgba(255,40,100,0.5)' },
      { id: 'skin_emerald', price: 3000, col: '#18b45b', gem: 'rgba(60,230,130,0.5)' },
      { id: 'skin_diamond', price: 4000, col: '#b3f0ff', light: true, gem: 'rgba(120,220,255,0.6)' },
      { id: 'skin_obsidian', price: 4000, col: '#2d1b4e', gem: 'rgba(170,90,255,0.6)' },
      // characters for yan (own original designs)
      ...[['zombie', '#7cb342'], ['ninja', '#212121'], ['pirate', '#3e2723'], ['knight', '#9ea7b3'], ['astronaut', '#eceff1'],
          ['hero', '#1565c0'], ['robot', '#90a4ae'], ['vampire', '#263238'], ['mummy', '#efe6d2'], ['skeleton', '#f5f5f5'],
          ['warrior', '#8d6e63'], ['samurai', '#b71c1c'], ['clown', '#fdd835'], ['detective', '#4e342e'], ['firefighter', '#d32f2f']]
        .map(([c, col]) => ({ id: 'c_' + c, price: 0, ex: 1, col, costume: c, light: ['astronaut', 'mummy', 'skeleton', 'clown'].includes(c) })),
      // 1.0.52: outfits of the background people (hidden: never in the shop)
      ...[['gnome', '#5d4037'], ['thief', '#263238'], ['police', '#0d47a1'], ['cowboy', '#1565c0'], ['witch', '#311b45'], ['ginger', '#b5651d'], ['mummy', '#d9cdb0'], ['ninja', '#212121'], ['cupid', '#ffd2b0'], ['astro', '#eceff1']]
        .map(([c, col]) => ({ id: 'cr_' + c, price: 0, ex: 1, hide: 1, col, costume: 'cr_' + c })),
      // 1.0.50: the new premium characters (the old ones stay for whoever owns them)
      ...[['starknight', '#5d4037'], ['spider', '#212121'], ['darkhero', '#263238'], ['plumber', '#5d4037'], ['superwarrior', '#c62828'], ['ghosthunter', '#bcaa8a'], ['cybersamurai', '#1a1a2e'], ['zombiepirate', '#7cb342'], ['wizardkid', '#212121'], ['luchador', '#e0a070'], ['catstronaut', '#eceff1'], ['pumpkin', '#212121'], ['snowgangster', '#f5f9ff'], ['dinosuit', '#66bb6a'], ['dj', '#311b92'], ['ghostknight', '#80deea'], ['lavagolem', '#3e2723'], ['iceking', '#b3e5fc'], ['alien', '#9ccc65'], ['pharaoh', '#c68642'], ['hacker', '#212121'], ['angel', '#fafafa'], ['demon', '#c62828'], ['racer', '#e53935'], ['rockstar', '#212121']].map(([c, col]) => ({ id: 'c_' + c, price: 0, ex: 1, col, costume: c, light: ['catstronaut', 'snowgangster', 'angel', 'ghostknight', 'iceking'].includes(c) }))
    ],
    hat: [
      { id: 'cap', price: 300, col: '#e53935' },
      { id: 'fedora', price: 450, col: '#5d4037' },
      { id: 'cowboy', price: 600, col: '#b0743a' },
      { id: 'tophat', price: 800, col: '#212121' },
      { id: 'beanie', price: 0, col: '#1e88e5', ex: 1 },
      { id: 'crown', price: 0, col: '#ffc107', ex: 1 },
      { id: 'beret', price: 350, col: '#c62828' },
      { id: 'chef', price: 450, col: '#fafafa' },
      { id: 'headphones', price: 500, col: '#263238' },
      { id: 'viking', price: 700, col: '#9e9e9e' },
      { id: 'wizard', price: 900, col: '#5e35b1' },
      { id: 'santa', price: 900, col: '#d32f2f' },
      { id: 'pirate', price: 800, col: '#212121' },
      { id: 'party', price: 500, col: '#7c4dff' },
      { id: 'propeller', price: 700, col: '#1e88e5' },
      { id: 'antlers', price: 800, col: '#8d6e63' },
      { id: 'halo', price: 0, col: '#ffd54f', ex: 1 },
      { id: 'laurel', price: 0, col: '#7cb342', ex: 1 },
      { id: 'flowercrown', price: 0, col: '#66bb6a', ex: 1 },
      { id: 'safari', price: 650, col: '#d7c29a' }
    ],
    shorts: [
      { id: 'jeans', price: 250, col: '#3f6fb5' },
      { id: 'sport', price: 300, col: '#d32f2f' },
      { id: 'stripes', price: 400, col: '#2e7d32' },
      { id: 'pinky', price: 300, col: '#ff4081' },
      { id: 'camo', price: 350, col: '#6b7d3a' },
      { id: 'plaid', price: 450, col: '#c62828' },
      // 1.0.39
      { id: 'dots', price: 350, col: '#8e24aa', pat: 'dots' },
      { id: 'starsh', price: 450, col: '#1a237e', pat: 'stars' },
      { id: 'zebra', price: 450, col: '#fafafa', pat: 'zebra' },
      { id: 'tiger', price: 500, col: '#fb8c00', pat: 'tiger' },
      { id: 'flowers', price: 400, col: '#0288d1', pat: 'flowers' },
      { id: 'checker', price: 400, col: '#fafafa', pat: 'checker' },
      { id: 'rainbowsh', price: 600, col: '#e53935', pat: 'rainbow' },
      { id: 'leopard', price: 500, col: '#fdd835', pat: 'leopard' },
      { id: 'neonsh', price: 550, col: '#76ff03', pat: 'glow' },
      { id: 'goldsh', price: 700, col: '#ffc107', pat: 'metal' },
      { id: 'denimcut', price: 300, col: '#90caf9', pat: 'frayed' },
      { id: 'pajama', price: 300, col: '#b3e5fc', pat: 'pin' },
      { id: 'spacesh', price: 650, col: '#1a1440', pat: 'galaxy' },
      { id: 'safarish', price: 450, col: '#bfa173', pat: 'cargo' }
    ],
    shoes: [
      { id: 'sneakers', price: 200, col: '#e53935' },
      { id: 'runners', price: 300, col: '#fafafa' },
      { id: 'boots', price: 450, col: '#6d4c41' },
      { id: 'flippers', price: 400, col: '#26a69a' },
      { id: 'rollers', price: 600, col: '#e53935' },
      { id: 'goldkicks', price: 700, col: '#ffc107' },
      // 1.0.39: each has its own shape (st)
      { id: 'slippers', price: 250, col: '#f48fb1', st: 'slipper' },
      { id: 'sandals', price: 300, col: '#8d6e63', st: 'sandal' },
      { id: 'skates', price: 650, col: '#fafafa', st: 'skate' },
      { id: 'cowboyboots', price: 600, col: '#8d5a35', st: 'cowboy' },
      { id: 'clownshoes', price: 500, col: '#e53935', st: 'big' },
      { id: 'rainboots', price: 350, col: '#fdd835', st: 'boot' },
      { id: 'cleats', price: 450, col: '#212121', st: 'cleat' },
      { id: 'ballet', price: 400, col: '#f8bbd0', st: 'ballet' },
      { id: 'spaceboots', price: 750, col: '#eceff1', st: 'space' },
      { id: 'flipflops', price: 200, col: '#26c6da', st: 'flip' },
      { id: 'hightops', price: 400, col: '#212121', st: 'hightop' },
      { id: 'firekicks', price: 800, col: '#ff5722', st: 'fire' },
      { id: 'bunnyslippers', price: 550, col: '#fafafa', st: 'bunny' },
      { id: 'hikers', price: 550, col: '#8d6e63', st: 'boot' }
    ],
    acc: [
      { id: 'gloves', price: 350, col: '#fafafa' },
      { id: 'glasses', price: 400, col: '#111' },
      { id: 'mask', price: 450, col: '#d32f2f' },
      { id: 'backpack', price: 600, col: '#ff9800' },
      { id: 'cape', price: 800, col: '#c62828' },
      { id: 'scarf', price: 0, col: '#e53935', ex: 1 },
      { id: 'headband', price: 250, col: '#e53935' },
      { id: 'bowtie', price: 300, col: '#d81b60' },
      { id: 'sword', price: 900, col: '#b0bec5' },
      { id: 'wings', price: 1200, col: '#ffffff' },
      { id: 'jetpack', price: 1500, col: '#78909c' },
      { id: 'garland', price: 1000, col: '#ffeb3b' },
      { id: 'tie', price: 400, col: '#c62828' },
      { id: 'satchel', price: 600, col: '#8d6e63' },
      { id: 'guitarback', price: 900, col: '#ff7043' },
      { id: 'shieldback', price: 800, col: '#a1887f' },
      { id: 'mittens', price: 600, col: '#e53935' },
      { id: 'butterfly', price: 0, col: '#ff9800', ex: 1 },
      { id: 'medal', price: 0, col: '#ffc107', ex: 1 },
      { id: 'binoculars', price: 700, col: '#33691e' }
    ],
    trail: [
      { id: 'bubbles', price: 500 },
      { id: 'sparks', price: 600 },
      { id: 'fire', price: 800 },
      { id: 'rainbow', price: 900 },
      { id: 'hearts', price: 0, ex: 1 },
      { id: 'lightning', price: 0, ex: 1 },
      { id: 'smoke', price: 450 },
      { id: 'snow', price: 500 },
      { id: 'leaves', price: 500 },
      { id: 'startrail', price: 700 },
      { id: 'tinsel', price: 800 },
      { id: 'petals', price: 700 },
      { id: 'bluefire', price: 1000 },
      { id: 'pixels', price: 600 },
      { id: 'musictrail', price: 650 },
      { id: 'shadowtrail', price: 750 },
      { id: 'aurora', price: 0, ex: 1 },
      { id: 'comet', price: 0, ex: 1 },
      { id: 'goldtrail', price: 0, ex: 1 },
      { id: 'paws', price: 650 }
    ],
    jump: [
      { id: 'cloud', price: 300 },
      { id: 'stars', price: 400 },
      { id: 'notes', price: 450 },
      { id: 'confetti', price: 0, ex: 1 },
      { id: 'puff', price: 300 },
      { id: 'rings', price: 400 },
      { id: 'love', price: 450 },
      { id: 'snowburst', price: 700 },
      { id: 'splash', price: 350 },
      { id: 'leafjump', price: 350 },
      { id: 'bolt', price: 500 },
      { id: 'flowerburst', price: 450 },
      { id: 'portal', price: 650 },
      { id: 'coinburst', price: 600 },
      { id: 'feathers', price: 400 },
      { id: 'icejump', price: 500 },
      { id: 'bubblejump', price: 300 },
      { id: 'fireworks', price: 0, ex: 1 },
      { id: 'shockwave', price: 0, ex: 1 },
      { id: 'sunburst', price: 550 }
    ],
    pet: [
      { id: 'bird', price: 1200 },
      { id: 'drone', price: 1500 },
      { id: 'cat', price: 1800 },
      { id: 'ghost', price: 0, ex: 1 },
      { id: 'dragon', price: 0, ex: 1 },
      { id: 'bee', price: 1100 },
      { id: 'frog', price: 1300 },
      { id: 'owl', price: 1400 },
      { id: 'bat', price: 1500 },
      { id: 'dog', price: 1600 },
      { id: 'penguin', price: 1700 },
      { id: 'fox', price: 2000 },
      { id: 'reindeer', price: 2200 },
      { id: 'snowman', price: 1900 },
      { id: 'lion', price: 2100 },
      // exclusive pets for yan
      ...['unicorn', 'phoenix', 'dino', 'kitsune', 'pegasus', 'axolotl', 'capybara', 'redpanda', 'golem', 'maneki', 'spiritcat', 'bunnyking', 'mech', 'kraken', 'griffin'].map(p => ({ id: 'p_' + p, price: 0, ex: 1 })),   // 1.0.51: 15 premium pets
      // 1.0.49: these three are sold for coins now
      { id: 'p_robopup', price: 2300 }, { id: 'p_jelly', price: 2100 }, { id: 'p_panda', price: 2400 },
      // pets of the developer and friends: own sub-section, always exactly 1200 (PRICE_SCALE doesn't apply)
      ...['bonya', 'dixon', 'kurt', 'yosya', 'onya', 'lilu', 'sonya', 'asya'].map(p => ({ id: 'd_' + p, price: 1200, fixed: 1, friend: 1 })),
      { id: 'lvl_star', price: 0, ex: 1 }
    ],
    emote: [
      { id: 'flag', price: 400 },
      { id: 'dance', price: 500 },
      { id: 'flip', price: 700 },
      { id: 'wave', price: 400 },
      { id: 'cheer', price: 450 },
      { id: 'bow', price: 500 },
      // 1.0.39: poses in EMO_POSE
      ...[['clap', 400], ['jumpjack', 450], ['shrug', 400], ['salute', 450], ['robotdance', 600], ['guitar', 650], ['kick', 500],
          ['dab', 550], ['heartpose', 600], ['karate', 550], ['yoga', 500], ['tada', 450], ['sit', 400], ['roar', 550]].map(([id, price]) => ({ id, price }))
    ],
    theme: [
      { id: 'auto', price: 0 },
      { id: 'desert', price: 1000 },
      { id: 'winter', price: 1000 },
      { id: 'city', price: 1200 },
      { id: 'space', price: 1500 },
      { id: 'ocean', price: 1200 },
      { id: 'forest', price: 1200 },
      { id: 'sakura', price: 1400 },
      { id: 'autumn', price: 1200 },
      { id: 'underwater', price: 1600 },
      { id: 'mine', price: 1400 },
      { id: 'wildwest', price: 1300 },
      { id: 'neoncity', price: 1600 },   // was 'neon' until 1.0.33 — the same id as the Neon colour
      { id: 'skyland', price: 1600 },
      { id: 'swamp', price: 1300 },
      { id: 'egypt', price: 1400 },
      { id: 'halloween', price: 1500 },
      { id: 'volcano', price: 1300 },
      { id: 'candy', price: 1500 },
      { id: 'savanna', price: 1500 }
    ]
  };
  // Balance (1.0.15): with ~100 items the list prices above are scaled ×0.4 so that buying
  // everything (plus the 4000-coin second life) still takes about 5–6 hours of play.
  // 1.0.40: the scale is computed from the list, so adding items never stretches the game:
  // everything sold for coins costs ≈ COLLECTION_TARGET ≈ 30 000 ≈ 5–6 h at 80–110 coins/min
  const COLLECTION_TARGET = 30000;   // 1.0.42: the second life is no longer sold for coins
  let baseSum = 0, fixedSum = 0;
  for (const cat of Object.keys(SHOP)) for (const it of SHOP[cat]) if (it.price > 0) { if (it.fixed) fixedSum += it.price; else baseSum += it.price; }
  const PRICE_SCALE = (COLLECTION_TARGET - fixedSum) / baseSum;
  for (const cat of Object.keys(SHOP)) for (const it of SHOP[cat])
    if (it.price > 0 && !it.fixed) it.price = Math.max(50, Math.round(it.price * PRICE_SCALE / 10) * 10);
  // 1.0.57: the daily login reward is one random premium skin or pet the player does not own yet (never a repeat);
  // the old 10-day list is gone (items already received stay). Once everything is owned, coins instead.
  const DAILY_ALL_COINS = 1000;
  // 1.0.27: a new set every 2 hours; a set of three takes about 10–15 minutes of normal play
  // (measured: ~80–110 coins/min, ~45 jumps/min, a slide every ~15 s once beams appear, ~1.5 min per run)
  const TASK_PERIOD = 2 * 3600 * 1000;
  const TASKS = [   // [id, stat, needs (easy, harder), reward]
    ['coins', 'coins', [800, 1200], 90], ['endless', 'endlessDist', [40000, 60000], 100], ['jumps', 'jumps', [400, 600], 70],
    ['slides', 'slides', [30, 45], 80], ['level', 'levelsWon', [3, 5], 90], ['gold', 'gold', [25, 40], 80], ['runs', 'runs', [6, 9], 70]
  ];
  // 1.0.28: 100 achievements. Rewards are small on purpose: all of them together give ~3.5 thousand coins
  // (≈ 10–15 % of the ~30 000 the coin collection costs), so they don't rush the game.
  const ACH = [     // [id, target, reward, value()]
    ['run1', 1, 10, () => save.stats.runs], ['w1', 1, 50, () => save.done[4] ? 1 : 0],
    ['w2', 1, 80, () => save.done[9] ? 1 : 0], ['w3', 1, 120, () => save.done[14] ? 1 : 0],
    ['stars', 75, 150, () => save.stars.reduce((a, b) => a + b, 0)],
    ['e1000', 1000, 40, () => save.bestEndless], ['e3000', 3000, 80, () => save.bestEndless], ['e6000', 6000, 120, () => save.bestEndless],
    ['c1k', 1000, 20, () => save.stats.coins], ['c10k', 10000, 60, () => save.stats.coins],
    ['buy5', 5, 20, () => save.owned.length - 2], ['buy20', 20, 50, () => save.owned.length - 2],
    ['life', 1, 20, () => save.stats.lives], ['jumps', 1000, 40, () => save.stats.jumps], ['slides', 100, 30, () => save.stats.slides],
    ['chest5', 5, 30, () => save.stats.chests], ['daily7', 7, 50, () => save.daily.count],
    ['golden3', 3, 50, () => save.stats.golden], ['tasks10', 10, 40, () => save.stats.tasks], ['drun', 1, 20, () => save.stats.dailyRuns]
  ];
  // tiered groups: [prefix, value(), targets, base rewards]; names / descriptions are in TEXT.achG
  const ACH_SCALE = 0.55;
  const ACH_GROUPS = [
    ['eb', () => save.bestEndless, [500, 2000, 4500, 8000, 10000], [20, 50, 90, 140, 180]],
    ['dist', () => save.stats.dist / 10, [5000, 25000, 100000, 250000, 500000], [15, 30, 60, 90, 130]],
    ['coin', () => save.stats.coins, [3000, 25000, 50000, 100000], [20, 50, 80, 120]],
    ['spent', () => save.stats.spent, [1000, 5000, 15000, 30000], [15, 30, 60, 100]],
    ['jump', () => save.stats.jumps, [100, 5000, 10000, 25000], [10, 40, 70, 110]],
    ['slide', () => save.stats.slides, [10, 500, 1000, 2500], [10, 40, 70, 110]],
    ['runs', () => save.stats.runs, [10, 50, 100, 250, 500], [10, 20, 40, 70, 110]],
    ['er', () => save.stats.endlessRuns, [10, 50, 200], [15, 40, 80]],
    ['lw', () => save.stats.levelsWon, [10, 30, 60], [20, 40, 70]],
    ['st', () => save.stars.reduce((a, b) => a + b, 0), [10, 25], [15, 35]],
    ['own', () => save.owned.length - 2, [50, 80], [60, 100]],
    ['day', () => save.daily.count, [3, 10, 30], [15, 40, 90]],
    ['task', () => save.stats.tasks, [3, 30, 100, 250], [10, 40, 80, 120]],
    ['gh', () => save.stats.golden, [1, 10], [20, 80]],
    ['loot', () => save.stats.chests, [1, 20, 50], [10, 40, 70]],
    ['gold', () => save.stats.gold, [50, 250, 1000], [15, 40, 80]],
    ['lives', () => save.stats.lives, [10], [40]]
  ];
  const achR = r => Math.max(5, Math.round(r * ACH_SCALE / 5) * 5);
  for (const [pre, val, targets, rewards] of ACH_GROUPS)
    targets.forEach((n, i) => ACH.push([`${pre}${i}`, n, achR(rewards[i]), val, pre, i]));
  // all 15 stars of a world
  [0, 1, 2].forEach(w => ACH.push([`ws${w}`, 25, achR([40, 60, 80][w]), () => save.stars.slice(w * 5, w * 5 + 5).reduce((a, b) => a + b, 0), 'ws', w]));
  // every shop section: 3 items, then everything that is sold for coins
  const coinItems = cat => SHOP[cat].filter(it => it.price > 0);
  const ownedIn = cat => coinItems(cat).filter(it => save.owned.includes(it.id)).length;
  // 1.0.42: the second life moved to the premium shop (140 yan); whoever bought it for coins keeps it
  const BOOSTS = [{ id: 'magnet', price: 25 }];
  const CATS = ['color', 'hat', 'shorts', 'shoes', 'acc', 'trail', 'jump', 'pet', 'emote', 'theme'];
  for (const cat of CATS) {
    ACH.push([`cat3_${cat}`, 3, achR(15), () => ownedIn(cat), 'cat3', cat]);
    ACH.push([`catAll_${cat}`, coinItems(cat).length, achR(cat === 'pet' || cat === 'theme' ? 90 : 65), () => ownedIn(cat), 'catAll', cat]);
  }
  const FREE = { color: 'classic', theme: 'auto' };   // slots that can't be left empty
  const TABS = [...CATS.filter(c => c !== 'theme'), 'boost', 'premium'];   // 1.0.48: worlds have their own screen (the «Миры» button in the menu)
  let worldsMode = false;

  // Products for yan (ids must match the Yandex console catalog). `yan` is only a fallback label:
  // the real price and currency name come from the SDK catalog.
  const PRODUCTS = [
    { id: 'noads', yan: 300, sec: 'main' },
    { id: 'starter', yan: 30, consumable: true, sec: 'main' },
    { id: 'starter_perm', yan: 130, sec: 'main' },
    { id: 'magnet_perm', yan: 200, sec: 'main' },
    { id: 'life', yan: 140, sec: 'main' },
    ...[[500, 15], [1000, 30], [2000, 55], [4000, 100], [10000, 210], [25000, 350]]
      .map(([c, y]) => ({ id: 'coins_' + c, yan: y, coins: c, consumable: true, sec: 'coins' })),
    // 1.0.50: new premium characters; of the old ones only the robot, the vampire and the clown are still sold
    ...['starknight', 'spider', 'darkhero', 'superwarrior', 'ghosthunter', 'cybersamurai', 'wizardkid', 'luchador', 'catstronaut', 'pumpkin', 'snowgangster', 'dinosuit', 'dj', 'ghostknight', 'lavagolem', 'iceking', 'alien', 'pharaoh', 'hacker', 'angel', 'demon', 'racer', 'rockstar']
      .map(c => ({ id: 'c_' + c, yan: 8, item: 'c_' + c, cat: 'color', sec: 'chars' })),
    ...['zombie', 'ninja', 'pirate', 'knight', 'astronaut', 'hero', 'mummy', 'skeleton', 'warrior', 'samurai', 'detective', 'firefighter', 'plumber', 'zombiepirate', 'robot', 'vampire', 'clown']   // 1.0.54: no longer sold
      .map(c => ({ id: 'c_' + c, item: 'c_' + c, cat: 'color', legacy: 1 })),
    ...['unicorn', 'phoenix', 'dino', 'kitsune', 'pegasus', 'axolotl', 'capybara', 'redpanda', 'golem', 'maneki', 'spiritcat', 'bunnyking', 'mech', 'kraken', 'griffin']
      .map(p => ({ id: 'p_' + p, yan: 10, item: 'p_' + p, cat: 'pet', sec: 'pets' })),
    ...['robopup', 'jelly', 'panda'].map(p => ({ id: 'p_' + p, item: 'p_' + p, cat: 'pet', legacy: 1 })),   // moved to the coin shop (old purchases still restored)
    // old coin packs (until 1.0.14): only so unfinished old purchases are still credited
    { id: 'coins_s', coins: 2000, consumable: true, legacy: 1 }, { id: 'coins_m', coins: 6000, consumable: true, legacy: 1 },
    { id: 'coins_l', coins: 15000, consumable: true, legacy: 1 }, { id: 'coins_xl', coins: 40000, consumable: true, legacy: 1 },
    // sold for yan until 1.0.13; kept only so old purchases are still restored (not shown any more)
    { id: 'skin_gold', item: 'skin_gold', legacy: 1 }, { id: 'skin_ruby', item: 'skin_ruby', legacy: 1 },
    { id: 'skin_emerald', item: 'skin_emerald', legacy: 1 }, { id: 'skin_diamond', item: 'skin_diamond', legacy: 1 },
    { id: 'skin_obsidian', item: 'skin_obsidian', legacy: 1 }
  ];
  // premium characters taken off sale: owners keep them, nobody else sees them
  const RETIRED = PRODUCTS.filter(pr => pr.legacy && pr.cat === 'color').map(pr => pr.item);
  const STARTER = { coins: 1500, magnets: 5, instead: 350 };   // 1.0.48: 1500 coins (was 700)
  const MAGNET_PRICE = 25;

  // Endless-run worlds bought in the shop ('auto' cycles day → night)
  const THEMES = {
    desert: { sky: ['#f6b26b', '#ffe6b3'], far: '#e0b070', near: '#d39b55', grass: '#d8a24f', dirt: '#b07a3a', sun: '#fff5c0', stick: '#1d1d26', night: 0, decor: 'dunes' },
    winter: { sky: ['#9fc6e8', '#eef6ff'], far: '#d6e6f2', near: '#bcd3e6', grass: '#f4f8fc', dirt: '#8fa7bd', sun: '#ffffff', stick: '#1d1d26', night: 0, decor: 'snow' },
    city: { sky: ['#ff9a76', '#ffd9a0'], far: '#6b5b7a', near: '#4a4060', grass: '#5d5d66', dirt: '#3a3a40', sun: '#fff2c0', stick: '#1d1d26', night: 0, decor: 'city' },
    space: { sky: ['#05030f', '#1a1440'], far: '#2b2357', near: '#1a1538', grass: '#6a5acd', dirt: '#2a2340', sun: '#c9b8ff', stick: '#f2f2f2', night: 1, decor: 'space' },
    // 1.0.21: a real beach (sea, surf, sand); its old look — sea drawn as blue hills behind palms — read as a forest, so it is kept as "Forest"
    ocean: { sky: ['#29b6f6', '#e1f5fe'], far: '#0277bd', near: '#4fc3f7', grass: '#f8e0a4', dirt: '#e9c77f', sun: '#fff59d', stick: '#1d1d26', night: 0, decor: 'ocean' },
    sakura: { sky: ['#ffd6e7', '#fff5f8'], far: '#c5b4d9', near: '#a5d6a7', grass: '#8bc34a', dirt: '#8d6e63', sun: '#fff9c4', stick: '#1d1d26', night: 0, decor: 'sakura' },
    autumn: { sky: ['#ffb74d', '#ffe0b2'], far: '#bf7a4a', near: '#a1572e', grass: '#b5a642', dirt: '#6d4c41', sun: '#fff3e0', stick: '#1d1d26', night: 0, decor: 'autumn' },
    underwater: { sky: ['#29b6f6', '#0d47a1'], far: '#1565c0', near: '#1e88e5', grass: '#f5deb3', dirt: '#d7b98a', sun: '#ffffff', stick: '#1d1d26', night: 0, decor: 'underwater' },
    mine: { sky: ['#1b1410', '#3e2c22'], far: '#4e3b30', near: '#3a2b22', grass: '#5d4a3a', dirt: '#2e221b', sun: '#000000', stick: '#1d1d26', night: 0.6, decor: 'mine' },
    wildwest: { cloud: '#fff3e0', sky: ['#ff8a50', '#ffe0b2'], far: '#c1693c', near: '#b5763f', grass: '#d4a35a', dirt: '#9c6b3a', sun: '#fff3c0', stick: '#1d1d26', night: 0, decor: 'wildwest' },
    neoncity: { sky: ['#0a0118', '#2a0f4a'], far: '#1a1033', near: '#0d0820', grass: '#3a2b5c', dirt: '#1a1428', sun: '#e1bee7', stick: '#1d1d26', night: 1, decor: 'neon' },
    skyland: { sky: ['#81d4fa', '#e1f5fe'], far: '#b3e5fc', near: '#ffffff', grass: '#ffffff', dirt: '#cfd8dc', sun: '#fffde7', stick: '#1d1d26', night: 0, decor: 'skyland' },
    swamp: { cloud: '#cfd8c4', sky: ['#8a9a6a', '#d7dfc0'], far: '#5b6b44', near: '#46553a', grass: '#5b6e3a', dirt: '#3e3a2a', sun: '#f0f4c3', stick: '#1d1d26', night: 0, decor: 'swamp' },
    egypt: { sky: ['#ffb74d', '#fff3e0'], far: '#e0b35a', near: '#d9a65a', grass: '#e8c27a', dirt: '#c49a52', sun: '#fffde7', stick: '#1d1d26', night: 0, decor: 'egypt' },
    halloween: { cloud: '#5e4a7a', sky: ['#1a0f2e', '#4a2c6b'], far: '#2b1d40', near: '#1f1530', grass: '#3b2f4a', dirt: '#21182b', sun: '#ffe9a8', stick: '#1d1d26', night: 1, decor: 'halloween' },
    // 1.0.36: "Forest" (the old beach look) became the New Year forest
    forest: { cloud: '#dfe7f3', sky: ['#0b1d3a', '#3d5f92'], far: '#28466e', near: '#e3ecf7', grass: '#f4f8fc', dirt: '#9fb3c8', sun: '#fffde7', stick: '#1d1d26', night: 0.7, decor: 'xmas' },
    volcano: { cloud: '#8d6e63', sky: ['#3e0f0f', '#d84315'], far: '#4e1c16', near: '#3a1410', grass: '#5d4037', dirt: '#2b1a14', sun: '#ffab40', stick: '#1d1d26', night: 0, decor: 'volcano' },
    candy: { cloud: '#fff0f6', sky: ['#f8bbd0', '#fff3e0'], far: '#ce93d8', near: '#f48fb1', grass: '#ffffff', dirt: '#a1887f', sun: '#fff176', stick: '#1d1d26', night: 0, decor: 'candy' },
    // 1.0.45: the African savanna at sunset — acacias, giraffes and zebras on the horizon, golden grass
    savanna: { cloud: '#ffe0c2', sky: ['#ff8a50', '#ffe2a8'], far: '#b9804a', near: '#a88a3c', grass: '#c9a43f', dirt: '#7a5a32', sun: '#fff1b8', stick: '#1d1d26', night: 0, decor: 'savanna' }
  };
  const findItem = (cat, id) => (SHOP[cat] || []).find(i => i.id === id) || null;

  // =====================================================================
  //  Yandex Games SDK wrapper (everything works without it, for local test)
  // =====================================================================
  const SDK = {
    ysdk: null, player: null, gameplayOn: false,

    async init() {
      if (typeof window.YaGames === 'undefined') return;
      try {
        this.ysdk = await withTimeout(window.YaGames.init(), 8000);
      } catch (e) { this.ysdk = null; return; }
      try {
        this.ysdk.on('game_api_pause', () => onSystemPause(true));
        this.ysdk.on('game_api_resume', () => onSystemPause(false));
      } catch (e) { /* old SDK */ }
      try {
        this.player = await withTimeout(this.ysdk.getPlayer({ scopes: false }), 5000);
      } catch (e) { this.player = null; }
    },

    lang() {
      try { return this.ysdk.environment.i18n.lang; } catch (e) { return navigator.language || 'ru'; }
    },

    ready() {
      try { this.ysdk && this.ysdk.features.LoadingAPI && this.ysdk.features.LoadingAPI.ready(); } catch (e) { }
    },

    gameplay(on) {
      if (on === this.gameplayOn) return;
      this.gameplayOn = on;
      try {
        const g = this.ysdk && this.ysdk.features.GameplayAPI;
        if (g) on ? g.start() : g.stop();
      } catch (e) { }
    },

    // Sticky banner: shown on menus, hidden during the run. Off with "no ads".
    bannerOn: false,
    banner(on) {
      if (save.noAds) on = false;
      if (!this.ysdk || on === this.bannerOn) return;
      this.bannerOn = on;
      try { on ? this.ysdk.adv.showBannerAdv() : this.ysdk.adv.hideBannerAdv(); } catch (e) { }
    },

    // Leaderboards (technical names must exist in the Yandex console)
    async setScore(name, score) {
      if (!this.ysdk || !this.authorized()) return;
      try {
        if (this.ysdk.leaderboards && this.ysdk.leaderboards.setScore) await this.ysdk.leaderboards.setScore(name, score);
        else { const lb = await this.ysdk.getLeaderboards(); await lb.setLeaderboardScore(name, score); }
      } catch (e) { }
    },
    async entries(name) {
      if (!this.ysdk) return null;
      const opts = { quantityTop: 10, includeUser: true, quantityAround: 1 };
      try {
        if (this.ysdk.leaderboards && this.ysdk.leaderboards.getEntries) return await this.ysdk.leaderboards.getEntries(name, opts);
        const lb = await this.ysdk.getLeaderboards(); return await lb.getLeaderboardEntries(name, opts);
      } catch (e) { return null; }
    },
    authorized() { try { return !!this.player && this.player.getMode() !== 'lite'; } catch (e) { return false; } },
    async login() {
      try { await this.ysdk.auth.openAuthDialog(); this.player = await this.ysdk.getPlayer({ scopes: false }); } catch (e) { }
    },
    name() { try { return this.authorized() ? this.player.getName() : ''; } catch (e) { return ''; } },
    photo() { try { return this.authorized() ? this.player.getPhoto('medium') : ''; } catch (e) { return ''; } },

    // Ask for a rating once (only if the platform allows it)
    async review() {
      try { const r = await this.ysdk.feedback.canReview(); if (r.value) await this.ysdk.feedback.requestReview(); } catch (e) { }
    },
    async canShortcut() {
      try { const r = await this.ysdk.shortcut.canShowPrompt(); return !!r.canShow; } catch (e) { return false; }
    },
    async shortcut() {
      try { const r = await this.ysdk.shortcut.showPrompt(); return r.outcome === 'accepted'; } catch (e) { return false; }
    },

    // ---- In-app purchases ----
    payments: null, catalog: {},
    async initPayments() {
      if (!this.ysdk) return;
      try {
        this.payments = await withTimeout(this.ysdk.getPayments({ signed: false }), 6000);
        const cat = await this.payments.getCatalog();
        for (const p of cat) this.catalog[p.id] = p.price;
        // restores bought items and finishes purchases that were not processed (e.g. the tab was closed)
        const list = await this.payments.getPurchases();
        for (const p of list) handlePurchase(p);
      } catch (e) { this.payments = null; }
    },
    async buy(id) {
      if (DEV_HOST && devMode) { handlePurchase({ productID: id, purchaseToken: '' }); return true; }   // developer mode: free
      if (!this.payments) {
        // local testing only: simulate the purchase on localhost
        if (DEV_HOST) { handlePurchase({ productID: id, purchaseToken: '' }); return true; }
        return false;
      }
      try { const p = await this.payments.purchase({ id }); handlePurchase(p); return true; } catch (e) { return false; }
    },
    consume(token) { try { if (this.payments && token) this.payments.consumePurchase(token); } catch (e) { } },

    // Fullscreen ad between levels. `done` is always called exactly once.
    fullscreen(done) {
      if (!this.ysdk || save.noAds) { done(); return; }
      let fin = false;
      const finish = () => { if (fin) return; fin = true; adOpen = false; applyAudio(); done(); };
      try {
        this.ysdk.adv.showFullscreenAdv({
          callbacks: {
            onOpen: () => { adOpen = true; applyAudio(); },
            onClose: finish, onError: finish, onOffline: finish
          }
        });
      } catch (e) { finish(); }
    },

    // Rewarded ad. done(true) only if the reward was granted.
    rewarded(done) {
      if (save.noAds) { done(true); return; }   // "no ads" purchase: reward without the video
      if (!this.ysdk) { done(true); return; } // local test: grant at once
      let fin = false, got = false;
      const finish = () => { if (fin) return; fin = true; adOpen = false; applyAudio(); done(got); };
      try {
        this.ysdk.adv.showRewardedVideo({
          callbacks: {
            onOpen: () => { adOpen = true; applyAudio(); },
            onRewarded: () => { got = true; },
            onClose: finish, onError: finish
          }
        });
      } catch (e) { finish(); }
    },

    async load() {
      let cloud = null, local = null;
      if (this.player) {
        try { cloud = await withTimeout(this.player.getData(), 5000); } catch (e) { }
      }
      try { local = JSON.parse(localStorage.getItem('stickman_run_save') || 'null'); } catch (e) { }
      const score = d => d && typeof d.unlocked === 'number'
        ? d.unlocked * 1e7 + (d.stars || []).reduce((a, b) => a + b, 0) * 1e6
          + (Array.isArray(d.owned) ? d.owned.length : 0) * 1e4 + (d.life ? 5e3 : 0) + (d.wallet | 0) : -1;
      return score(cloud) >= score(local) ? cloud : local;
    },

    save(data) {
      try { localStorage.setItem('stickman_run_save', JSON.stringify(data)); } catch (e) { }
      if (this.player) { try { this.player.setData(data, true).catch(() => { }); } catch (e) { } }
    }
  };

  function withTimeout(p, ms) {
    return Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), ms))]);
  }

  // =====================================================================
  //  Constants & levels
  // =====================================================================
  // 1.0.17: jump lowered (760 -> 700) — the game was too easy; every gap / bridge / platform width is derived from AIR
  const G = 2200, JUMP_V = 700;
  const PW = 22, PH = 56, PH_SLIDE = 26;
  const PEAK = JUMP_V * JUMP_V / (2 * G);   // ~111
  const AIR = 2 * JUMP_V / G;               // ~0.64 s
  const SLIDE_MAX = 1.5;                    // a slide never lasts longer than this, even if ↓ is held
  const MAGNET_TRACK = 15, MAGNET_SHOP = 30; // seconds

  const LEVELS = [
    { speed: 260, len: 7000, types: ['spike', 'spike', 'spike', 'coinrow'],
      sky: ['#6ec6ff', '#d8f1ff'], far: '#a8dba0', near: '#7cc66d', grass: '#5cb34a', dirt: '#8a5a35', sun: '#fff3a0', stick: '#1d1d26', night: 0 },
    { speed: 285, len: 9000, types: ['spike', 'box', 'box', 'spike', 'coinrow'],
      sky: ['#5fb0f0', '#fde9c0'], far: '#b9d68f', near: '#8fbf5a', grass: '#6aa83e', dirt: '#7d5230', sun: '#ffe27a', stick: '#1d1d26', night: 0 },
    { speed: 310, len: 11000, types: ['spike', 'box', 'gap', 'gap', 'spike'],
      sky: ['#f28b6b', '#ffd29a'], far: '#c98a7a', near: '#a0705e', grass: '#8a9a3e', dirt: '#6b4228', sun: '#fff0b0', stick: '#1d1d26', night: 0 },
    { speed: 335, len: 13000, types: ['spike', 'box', 'gap', 'bird', 'birdHigh', 'birdHigh'],
      sky: ['#4b4f9c', '#e59ab0'], far: '#6c5f95', near: '#4f4777', grass: '#4f7a4a', dirt: '#4a3326', sun: '#ffe9d0', stick: '#141420', night: 0 },
    { speed: 360, len: 15500, types: ['spike', 'box', 'gap', 'bird', 'birdHigh', 'boxspike', 'boxspike'],
      sky: ['#0f1a3d', '#3b4d8a'], far: '#2a3770', near: '#1f2a55', grass: '#2f5e46', dirt: '#2e2219', sun: '#f4f1d0', stick: '#f2f2f2', night: 1 },
    // ---- World 2: new obstacles one by one ----
    { speed: 300, len: 12000, types: ['spike', 'puddle', 'puddle', 'box', 'coinrow'],
      sky: ['#f6b26b', '#ffe6b3'], far: '#e0b070', near: '#d39b55', grass: '#d8a24f', dirt: '#b07a3a', sun: '#fff5c0', stick: '#1d1d26', night: 0, decor: 'dunes' },
    { speed: 310, len: 13000, types: ['spike', 'beam', 'beam', 'box', 'coinrow'],
      sky: ['#7ec8a0', '#e3f7e8'], far: '#7fb88f', near: '#4f9a66', grass: '#3f8a4f', dirt: '#5e4430', sun: '#fffbe0', stick: '#1d1d26', night: 0 },
    { speed: 320, len: 14000, types: ['spike', 'saw', 'saw', 'beam', 'gap'],
      sky: ['#9fc6e8', '#eef6ff'], far: '#d6e6f2', near: '#bcd3e6', grass: '#f4f8fc', dirt: '#8fa7bd', sun: '#ffffff', stick: '#1d1d26', night: 0, decor: 'snow' },
    { speed: 335, len: 15000, types: ['gap', 'plat', 'plat', 'spike', 'box', 'saw'],
      sky: ['#ff9a76', '#ffd9a0'], far: '#6b5b7a', near: '#4a4060', grass: '#5d5d66', dirt: '#3a3a40', sun: '#fff2c0', stick: '#1d1d26', night: 0, decor: 'city' },
    { speed: 350, len: 16000, types: ['bridge', 'bridge', 'saw', 'beam', 'puddle', 'spike'],
      sky: ['#1b1f3b', '#4a3f6b'], far: '#3a3358', near: '#2a2545', grass: '#47506b', dirt: '#2a2733', sun: '#ffe9a8', stick: '#f2f2f2', night: 1, decor: 'city' },
    // ---- World 3: everything mixed, faster ----
    { speed: 360, len: 17000, types: ['spike', 'box', 'gap', 'beam', 'saw', 'puddle', 'bird'],
      sky: ['#8bc34a', '#e6f5c9'], far: '#7aa94a', near: '#55883a', grass: '#4c7d2e', dirt: '#4a3a22', sun: '#fffde0', stick: '#1d1d26', night: 0 },
    { speed: 370, len: 17500, types: ['saw', 'boxspike', 'birdHigh', 'beam', 'plat', 'spike'],
      sky: ['#5a1e1e', '#ff8a50'], far: '#7a2e22', near: '#4e1c16', grass: '#6d4c41', dirt: '#2b1a14', sun: '#ffcc80', stick: '#1d1d26', night: 0 },
    { speed: 380, len: 18000, types: ['bridge', 'plat', 'gap', 'bird', 'birdHigh', 'beam', 'spike'],
      sky: ['#0b2a4a', '#4f86b5'], far: '#7aa6c9', near: '#4d7ea6', grass: '#e8f2fa', dirt: '#5b7690', sun: '#e8f4ff', stick: '#f2f2f2', night: 1, decor: 'snow' },
    { speed: 395, len: 19000, types: ['spike', 'boxspike', 'saw', 'bridge', 'beam', 'plat', 'birdHigh', 'puddle'],
      sky: ['#3a1c71', '#d76d77'], far: '#5b2a86', near: '#3d1d5c', grass: '#6a3f8f', dirt: '#2d1840', sun: '#ffd6a5', stick: '#1d1d26', night: 0 },
    { speed: 410, len: 20000, types: ['spike', 'box', 'gap', 'bird', 'birdHigh', 'boxspike', 'beam', 'saw', 'plat', 'bridge', 'puddle'],
      sky: ['#05030f', '#1a1440'], far: '#2b2357', near: '#1a1538', grass: '#6a5acd', dirt: '#2a2340', sun: '#c9b8ff', stick: '#f2f2f2', night: 1, decor: 'space' }
  ];
  const ENDLESS_AFTER = 4;            // finishing level 5 unlocks the endless run
  const WORLD_STARS = [0, 17, 42];   // 1.0.45: 5 stars per level now (was 10 / 25 of 3 per level)
  const WORLDS = [[0, 5], [5, 10], [10, 15]];
  const ENDLESS = LEVELS.length;   // lvl index used for the endless run

  function rng(seed) {
    return function () {
      seed = (seed + 0x6D2B79F5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  const newTrack = (len, vr) => ({ obs: [], gaps: [], coins: [], pud: [], items: [], len, total: 0, vr });

  // One obstacle group at x; pushes into L and returns its width.
  function genSegment(t, x, sp, r, L) {
    const reach = sp * AIR;
    // coin value: silver 1 (most), gold 5 (~4.4 %), crystal 25 (~0.6 %)
    const coin = (cx, cy) => {
      const q = L.vr();
      L.coins.push({ x: cx, y: cy, got: false, v: q < 0.006 ? 25 : q < 0.05 ? 5 : 1 });
    };
    const arc = (cx, base) => {
      for (const k of [-0.3, 0, 0.3]) {
        const dx = k * reach;
        const h = PEAK * (1 - Math.pow(2 * dx / reach, 2));
        coin(cx + dx, (base || 0) + h * 0.85 + 24);
      }
    };
    if (t === 'spike') {
      const n = r() < 0.35 ? 2 : 1;
      for (let k = 0; k < n; k++) L.obs.push({ t: 'spike', x: x + k * 26, w: 26, h: 30 });
      arc(x + n * 13);
      return n * 26;
    }
    if (t === 'box') {
      const h = r() < 0.5 ? 44 : 72;
      const bw = 56 + Math.floor(r() * 3) * 28;
      L.obs.push({ t: 'box', x, w: bw, h });
      for (let k = 0; k < bw / 28; k++) coin(x + 14 + k * 28, h + 34);
      return bw;
    }
    if (t === 'boxspike') {
      // crate is long enough to land on at any speed, then jump again over the spikes
      const bw = Math.max(112, Math.ceil(reach * 0.95 / 28) * 28);
      L.obs.push({ t: 'box', x, w: bw, h: 44 });
      for (let k = 1; k < bw / 28 - 1; k++) coin(x + 14 + k * 28, 44 + 34);
      L.obs.push({ t: 'spike', x: x + bw + 26, w: 26, h: 30 });
      L.obs.push({ t: 'spike', x: x + bw + 52, w: 26, h: 30 });
      arc(x + bw + 52, 30);
      return bw + 78;
    }
    if (t === 'gap') {
      const gw = Math.min(reach * 0.6, 80 + r() * 70);
      L.gaps.push({ x, w: gw });
      arc(x + gw / 2);
      return gw;
    }
    if (t === 'bird') {
      L.obs.push({ t: 'bird', x, w: 34, y: 14, h: 22 });
      arc(x + 17);
      return 34;
    }
    if (t === 'birdHigh') {
      L.obs.push({ t: 'bird', x, w: 34, y: 70, h: 22 });
      for (let k = -1; k <= 1; k++) coin(x + 17 + k * 34, 26);
      return 34;
    }
    if (t === 'beam') {
      // hangs down to 32 above the ground: only a slide gets under it
      const w = 40 + Math.floor(r() * 3) * 30;
      L.obs.push({ t: 'beam', x, w, y: 32 });
      for (let k = 0; k <= w / 30; k++) coin(x + k * 30, 14);
      return w;
    }
    if (t === 'saw') {
      L.obs.push({ t: 'saw', x, w: 48, r: 24, cy: 4 });
      arc(x + 24);
      return 48;
    }
    if (t === 'plat') {
      // pit too wide for one jump, with a platform moving up and down in the middle
      const gw = reach * 1.35;
      const pl = { t: 'plat', x: x + gw / 2 - 55, w: 110, base: 42, amp: 22, ph: r() * 6.28 };
      L.gaps.push({ x, w: gw, plat: pl });
      L.obs.push(pl);
      coin(x + gw / 2 - 18, 100); coin(x + gw / 2 + 18, 100);
      return gw;
    }
    if (t === 'bridge') {
      // planks over a long pit, with 1–2 holes; touched planks fall down
      // with a single jump the landing after hole 1 must be solid: hole 2 starts at least 1.25 jumps later
      const bw = Math.round(reach * 2.2 / 30) * 30;
      const holes = [];
      const hw1 = r() < 0.5 ? 60 : 90, hx1 = x + 60 + Math.floor(r() * 3) * 30;
      holes.push({ x: hx1, w: hw1 });
      const hw2 = r() < 0.5 ? 60 : 90, min2 = Math.ceil((hx1 + hw1 + reach * 1.25 - x) / 30) * 30 + x;
      if (r() < 0.6 && min2 + hw2 + 60 <= x + bw) holes.push({ x: min2, w: hw2 });
      for (const h of holes) arc(h.x + h.w / 2);
      const planks = [];
      for (let p = x; p < x + bw; p += 30) {
        if (holes.some(h => p >= h.x && p < h.x + h.w)) continue;
        planks.push({ x: p, w: 30, fall: -1, dy: 0 });
      }
      L.gaps.push({ x, w: bw, planks, holes });
      return bw;
    }
    if (t === 'puddle') {
      const w = 140 + Math.floor(r() * 4) * 30;
      L.pud.push({ x, w });
      for (let k = 0; k * 40 < w; k++) coin(x + 20 + k * 40, 26);
      return w;
    }
    // coinrow
    for (let k = 0; k < 5; k++) coin(x + k * 34, 26);
    return 5 * 34;
  }

  const avoidRepeat = t => ['gap', 'birdHigh', 'boxspike', 'plat', 'bridge', 'beam'].includes(t);

  // Story levels are generated from a fixed seed, so each level is always the same.
  function buildLevel(i) {
    const c = LEVELS[i], r = rng(9137 + i * 1013), sp = c.speed;
    const L = newTrack(c.len, rng(555 + i * 31));
    let x = 650, last = '';
    while (x < c.len - 600) {
      let t = c.types[Math.floor(r() * c.types.length)];
      if (t === last && avoidRepeat(t)) t = 'spike';
      last = t;
      const w = genSegment(t, x, sp, r, L);
      x += w + sp * (0.95 + r() * 0.75);
    }
    L.obs.sort((a, b) => a.x - b.x);
    // 1.0.45: five stars hidden along the level — each replaces a coin (so it is always reachable), the highest one nearby
    L.stars = [];
    for (let k = 0; k < 5; k++) {
      const tx = c.len * (0.12 + k * 0.18);
      let best = null;
      for (const cn of L.coins) if (Math.abs(cn.x - tx) < 900 && (!best || cn.y > best.y + 1 || (Math.abs(cn.y - best.y) <= 1 && Math.abs(cn.x - tx) < Math.abs(best.x - tx)))) best = cn;
      if (best) { L.coins.splice(L.coins.indexOf(best), 1); L.stars.push({ x: best.x, y: best.y, got: false }); }
    }
    L.total = L.coins.length;
    return L;
  }

  // ---------- Endless run: generated on the fly, gets faster and harder ----------
  const endlessSpeed = x => Math.min(480, 300 + x * 0.0045);

  // daySeed: the daily run uses the date as seed, so everyone gets the same track
  function buildEndless(daySeed) {
    const seed = daySeed ? (daySeed * 7919) | 0 : (Math.random() * 1e9) | 0;
    const L = newTrack(Infinity, rng(seed ^ 0x5bd1e995));
    Object.assign(L, { endless: true, genX: 650, last: '', r: rng(seed) });
    L.magX = 10000 + L.r() * 6000;           // first magnet at 1000–1600 m
    // golden hour: a 5 % chance, checked once every 1000 m (own random stream, so the daily track stays the same for everyone)
    L.gr = rng(seed ^ 0x2545f491); L.goldAt = 10000;
    L.lootX = 30000 + L.r() * 5000;              // first loot box at 3000–3500 m
    L.nextEv = 15000 + L.r() * 3000; L.zones = []; L.lastEv = '';   // first mini-event at ~1500 m
    if (devForce) { L.nextEv = 900; L.forceEv = devForce; devForce = null; }   // developer event test
    return L;
  }

  // ---------- 27.5 mini-events: a stretch of track built for the event; a 2-second warning before it ----------
  const EVENTS = {
    jet: { dur: 10 }, giant: { dur: 8 }, slow: { dur: 16, speed: 0.55 }, flee: { dur: 16 }, pet: { dur: 16 },   // 1.0.44: «Ритм» removed
    // 1.0.41
    dark: { dur: 16 }, balloon: { dur: 12 }, cart: { dur: 14, only: 'mine' }, skate: { dur: 12, speed: 1.25 }, word: { dur: 16 }, portal: { dur: 5 }
  };
  function addCoin(L, x, y, extra) {
    const q = L.vr(), c = { x, y, got: false, v: q < 0.006 ? 25 : q < 0.05 ? 5 : 1 };
    L.coins.push(extra ? Object.assign(c, extra) : c);
  }
  function genEventZone(L, x) {
    const decor = (THEMES[gl().theme] || {}).decor;   // some events exist only in one world (the mine cart)
    const r = L.r, ids = Object.keys(EVENTS).filter(id => id !== L.lastEv && (!EVENTS[id].only || EVENTS[id].only === decor));
    const id = L.forceEv || ids[Math.floor(r() * ids.length)], E = EVENTS[id];
    L.forceEv = null;
    L.lastEv = id;
    const base = endlessSpeed(x), sp = base * (E.speed || 1);
    const x0 = x + base * 2.2, x1 = x0 + E.dur * sp;   // the stretch before x0 stays empty while the warning is shown
    const z = { id, warn: x, x0, x1, speed: E.speed || 1, pet: null };
    L.zones.push(z);
    let cx = x0 + 60, last = '';
    if (id === 'jet') {   // coin trails in the air, birds at every height; nothing on the ground
      for (; cx < x1 - 120; cx += sp * 0.8) {
        const h = 40 + r() * 115, wave = r() < 0.5;
        for (let k = 0; k < 6; k++) addCoin(L, cx + k * 26, h + (wave ? Math.sin(k * 0.9) * 22 : k * 6));
        if (r() < 0.6) L.obs.push({ t: 'bird', x: cx + sp * 0.5, w: 34, y: 30 + r() * 150, h: 22 });
      }
    } else if (id === 'giant') {   // crates to smash and pits to jump
      while (cx < x1 - 150) cx += genSegment(r() < 0.6 ? 'box' : (r() < 0.5 ? 'gap' : 'coinrow'), cx, sp, r, L) + sp * 0.7;
    } else if (id === 'slow') {   // slower, but packed
      while (cx < x1 - 150) {
        let t = ['spike', 'box', 'saw', 'bird', 'gap', 'beam', 'spike', 'birdHigh'][Math.floor(r() * 8)];
        if (t === last && avoidRepeat(t)) t = 'spike';
        last = t; cx += genSegment(t, cx, sp, r, L) + sp * (0.75 + r() * 0.3);
      }
    } else if (id === 'flee') {   // hopping coins that run away
      while (cx < x1 - 150) {
        if (r() < 0.65) { for (let k = 0; k < 4; k++) addCoin(L, cx + k * 34, 26, { flee: 1 }); cx += 4 * 34 + sp * 0.5; }
        else cx += genSegment('spike', cx, sp, r, L) + sp * 0.7;
      }
      for (const c of L.coins) if (c.x >= x0 && c.x <= x1) c.flee = 1;   // the coins over the spikes run too
    } else if (id === 'rhythm') {   // spikes on a steady beat
      const per = Math.max(0.85, (TRACKS[gl().theme] || TRACKS.endless).step * 4);
      for (; cx < x1 - 100; cx += per * sp) { genSegment('spike', cx, sp, () => 0.9, L); L.obs[L.obs.length - 1].beat = 1; }
    } else if (id === 'dark') {   // flashlight (1.0.44: harder — the usual mix at normal speed, in real darkness)
      let last2 = '';
      while (cx < x1 - 150) {
        let t = ['spike', 'box', 'gap', 'bird', 'saw', 'coinrow', 'beam', 'spike'][Math.floor(r() * 8)];
        if (t === last2 && avoidRepeat(t)) t = 'spike';
        last2 = t; cx += genSegment(t, cx, sp, r, L) + sp * (0.9 + r() * 0.35);
      }
    } else if (id === 'balloon') {   // floaty jumps: high coin arcs, sharp things below
      while (cx < x1 - 150) {
        const t = ['spike', 'saw', 'coinrow', 'gap', 'spike'][Math.floor(r() * 5)];
        const w2 = genSegment(t, cx, sp, r, L);
        for (let k = 0; k < 4; k++) addCoin(L, cx + k * 28, 110 + Math.sin(k) * 12);
        cx += w2 + sp * (1.2 + r() * 0.3);
      }
    } else if (id === 'cart') {   // 1.0.45: three tracks, nothing dangerous — coins scattered over the tracks to catch
      let lane = 0;
      while (cx < x1 - 120) {
        lane = Math.max(0, Math.min(2, lane + [-2, -1, 1, 2, 1, -1][Math.floor(r() * 6)]));
        const n = 3 + Math.floor(r() * 3);
        for (let k = 0; k < n; k++) addCoin(L, cx + k * 28, lane * CART_UP + 26);
        cx += n * 28 + sp * (0.35 + r() * 0.2);
      }
    } else if (id === 'skate') {   // ramps launch you; a jump in the air is a trick
      while (cx < x1 - 200) {
        const rp = { t: 'ramp', x: cx, w: 70, h: 26, coins: [] };
        L.obs.push(rp);
        // 1.0.45: the coins lie on the flight path from the ramp's lip; at the launch they are laid again on the real path
        for (let k = 1; k <= 6; k++) { const tt = k * 0.105; addCoin(L, cx + 63 + sp * tt, 27 + 780 * tt - G * tt * tt / 2 + 30); rp.coins.push(L.coins[L.coins.length - 1]); }
        cx += 70 + sp * 1.3;
        if (r() < 0.6) { cx += genSegment('spike', cx, sp, r, L) + sp * 0.8; }
      }
    } else if (id === 'word') {   // the letters of the word, some on the ground, some up high
      z.got = 0; z.mask = 0;
      const step2 = (x1 - x0 - 200) / 5;
      const lx = [];
      for (let k = 0; k < 5; k++) { lx.push(x0 + 100 + k * step2); L.items.push({ t: 'letter', i: k, x: lx[k], y: k % 2 ? 92 : 30, got: false, z }); }
      // 1.0.45: obstacles only between the letters (a letter inside a crate or over a spike could not be taken)
      const o0 = L.obs.length, c0 = L.coins.length;
      for (let xx = x0 + 60; xx < x1 - 150;) { const t = ['spike', 'coinrow', 'box'][Math.floor(r() * 3)]; xx += genSegment(t, xx, sp, r, L) + sp * 1.1; }
      const near = q => lx.some(v => q.x + (q.w || 0) > v - 70 && q.x < v + 70);
      L.obs = L.obs.filter((o, i) => i < o0 || !near(o)); L.coins = L.coins.filter((c, i) => i < c0 || !near(c));
    } else if (id === 'portal') {   // a portal; the coin path behind it is collected on the way through
      const px0 = x0 + 80, to = px0 + 5000;   // 1.0.45: 500 m ahead and 70 coins
      L.items.push({ t: 'portal', x: px0, y: 30, to, got: false, gain: 70 });
      L.items.push({ t: 'portal', x: to, y: 30, got: false, deco: 1 });
      z.x1 = to + 60;
    } else {   // pet helper: lots of coins at different heights
      const pets = ['bird', 'cat', 'dog', 'fox', 'bee', 'owl', 'penguin'];
      z.pet = pets[Math.floor(r() * pets.length)];
      while (cx < x1 - 150) {
        if (r() < 0.7) { const h = [26, 70, 120][Math.floor(r() * 3)]; for (let k = 0; k < 6; k++) addCoin(L, cx + k * 30, h); cx += 6 * 30 + sp * 0.35; }
        else cx += genSegment('spike', cx, sp, r, L) + sp * 0.7;
      }
    }
    L.nextEv = z.x1 + 15000 + r() * 4000;
    return z.x1 + base * 1.2;
  }
  const zoneAt = d => { if (!LV.zones) return null; for (const z of LV.zones) if (d >= z.warn && d < z.x1) return z; return null; };
  const evNow = () => { if (!isEndless()) return null; const z = zoneAt(dist); return z && dist >= z.x0 ? z : null; };
  const evId = () => { const z = evNow(); return z ? z.id : ''; };
  let jumpHeld = false, petT = 0, petGrab = null;
  const CART_UP = 64;                        // 1.0.45: the gap between the three mine-cart tracks (0, 64, 128)
  let devForce = null, devGod = false, spinT = 0, skateAir = false, trickDone = false, warpT = 0;

  function extendEndless() {
    const L = LV, r = L.r;
    while (L.genX < dist + 1800) {
      const x = L.genX, sp = endlessSpeed(x);
      if (L.zones && x >= L.nextEv && !(L.easy && x < L.easy)) { L.genX = genEventZone(L, x); continue; }
      const pool = ['spike', 'spike', 'coinrow', 'coinrow', 'box'];
      if (x > 2500) pool.push('gap', 'bird', 'box');
      if (x > 4000) pool.push('beam', 'puddle');
      if (x > 6000) pool.push('birdHigh', 'boxspike', 'gap', 'spike');
      if (x > 8000) pool.push('saw', 'beam');
      if (x > 12000) pool.push('bird', 'birdHigh', 'boxspike', 'plat', 'bridge', 'saw');
      const easy = L.easy && x < L.easy;
      let t = easy ? ['spike', 'coinrow', 'coinrow', 'box'][Math.floor(r() * 4)] : pool[Math.floor(r() * pool.length)];
      if (t === L.last && avoidRepeat(t)) t = 'coinrow';
      L.last = t;
      const w = genSegment(t, x, easy ? sp * 0.85 : sp, r, L);
      const space = sp * (0.9 + r() * 0.7) * (easy ? 1.35 : 1);
      // magnet pickup: no more often than every 2000 m
      if (x + w >= L.magX) {
        L.items.push({ t: 'magnet', x: x + w + space / 2, y: 46, got: false });
        L.magX = x + w + 20000 + r() * 8000;
      }
      L.genX = x + w + space;
      // a loot box lying on the track about every 3000 m; sometimes between two saws — risk it or not
      if (!easy && x + w >= L.lootX) {
        L.lootX = x + 30000 + r() * 8000;
        const lx = L.genX;
        if (x > 12000 && r() < 0.4) {
          const reach = sp * AIR;
          L.obs.push({ t: 'saw', x: lx, w: 48, r: 24, cy: 4 });
          L.items.push({ t: 'loot', x: lx + 48 + reach * 0.6, y: 22, got: false });
          L.obs.push({ t: 'saw', x: lx + 48 + reach * 1.25, w: 48, r: 24, cy: 4 });
          L.genX = lx + 96 + reach * 1.25 + sp;
        } else { L.items.push({ t: 'loot', x: lx, y: 24, got: false }); L.genX = lx + sp * 0.6; }
      }
    }
    // forget what is far behind
    const keep = o => (o.x + (o.w || 0)) > dist - 400;
    if (L.obs.length > 40) L.obs = L.obs.filter(keep);
    if (L.coins.length > 80) L.coins = L.coins.filter(c => c.x > dist - 400 || c.mag);
    if (L.gaps.length > 10) L.gaps = L.gaps.filter(keep);
    if (L.pud.length > 10) L.pud = L.pud.filter(keep);
    if (L.items.length > 5) L.items = L.items.filter(keep);
    if (L.zones && L.zones.length > 3) L.zones = L.zones.filter(z => z.x1 > dist - 500);
  }

  const EMPTY_LEVEL = newTrack(Infinity, Math.random);

  // =====================================================================
  //  Save data
  // =====================================================================
  const newStats = () => ({ runs: 0, dist: 0, coins: 0, spent: 0, jumps: 0, slides: 0, deaths: 0,
    deathBy: {}, magnets: 0, lives: 0, levelsWon: 0, endlessRuns: 0, chests: 0,
    gold: 0, golden: 0, tasks: 0, dailyRuns: 0, endlessDist: 0, playTime: 0, runTime: 0 });
  const newLook = () => ({ color: 'classic', hat: null, shorts: null, shoes: null, acc: null,
    trail: null, jump: null, pet: null, emote: null, theme: 'auto' });
  let save = {
    unlocked: 0, stars: LEVELS.map(() => 0), done: LEVELS.map(() => 0), best: LEVELS.map(() => 0), sound: true,
    wallet: 0, bestEndless: 0, owned: ['classic', 'auto'],
    look: newLook(),
    life: false, magnets: 0, seen: {}, stats: newStats(),
    wOpen: {}, easyFails: 0, xp: 0, lvl: 1, title: '', titles: {},
    daily: { last: 0, count: 0, doubled: 0 }, tasks: { day: 0, list: [] }, dailyBest: { day: 0, m: 0 }, ach: {},
    noAds: false, magnetPerm: false, starterPerm: false, freeChestAt: 0, wheel: { day: 0, spins: 0 }, reviewAsked: false, shortcut: false, starterDay: 0,
    tut: { jump: 0, slide: 0 }, paid: [], migrations: {}, ver: ''
  };
  const DEFAULT_SAVE = JSON.parse(JSON.stringify(save));
  const today = () => { const d = new Date(); return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate(); };

  function persist() { if (state === 'loading') return; checkAch(); checkLevel(); checkTitles(); save.ver = VERSION; SDK.save(save); }   // 1.0.55: nothing is saved until the old save is loaded
  // ---------- 27.8 player level: XP for metres, coins and tasks; every 5 levels an item that isn't sold ----------
  const LVL_REWARDS = { 5: ['hat', 'laurel'], 10: ['trail', 'goldtrail'], 15: ['acc', 'medal'], 20: ['jump', 'shockwave'], 25: ['color', 'champion'], 30: ['pet', 'lvl_star'] };
  const xpNeed = L => 300 + 150 * (L - 1);
  function levelInfo() { let L = 1, x = save.xp; while (x >= xpNeed(L)) { x -= xpNeed(L); L++; } return { L, x: Math.floor(x), need: xpNeed(L) }; }
  function checkLevel(silent) {
    const L = levelInfo().L;
    if (save.lvl >= L) return;
    const got = [];
    while (save.lvl < L) {
      save.lvl++;
      const rw = LVL_REWARDS[save.lvl];
      if (rw && !save.owned.includes(rw[1])) { save.owned.push(rw[1]); got.push(`${S.catNoun[rw[0]]} «${S.items[rw[1]]}»`); }
    }
    const msg = `⭐ ${S.levelUp}: ${save.lvl}!${got.length ? '  🎁 ' + got.join(', ') : ''}`;
    if (silent) setTimeout(() => toast(msg), 3500); else { toast(msg); sfx.life(); }
  }
  // ---------- 27.9 collections → titles ----------
  const coinItemsOf = cat => SHOP[cat].filter(it => it.price > 0);
  const catComplete = cat => { const all = coinItemsOf(cat); return all.length > 0 && all.every(it => save.owned.includes(it.id)); };
  function checkTitles(silent) {
    for (const c of CATS) if (!save.titles[c] && catComplete(c)) {
      save.titles[c] = 1;
      if (!save.title) save.title = c;
      if (!silent) toast(`🏅 ${S.titleNew}: ${S.titles[c]}`);
    }
  }
  const allDone = () => save.done[ENDLESS_AFTER] > 0;   // endless run unlocked
  const starSum = () => save.stars.reduce((a, b) => a + b, 0);
  const worldOf = i => i < 5 ? 0 : i < 10 ? 1 : 2;
  function worldOpen(w) {
    if (w === 0 || save.wOpen[w]) return true;
    if (starSum() >= WORLD_STARS[w]) { save.wOpen[w] = 1; return true; }
    return false;
  }
  const levelOpen = i => i <= save.unlocked && worldOpen(worldOf(i));
  const nextLevel = () => { for (let i = 0; i <= save.unlocked; i++) if (!save.done[i] && levelOpen(i)) return i; return -1; };

  // =====================================================================
  //  Canvas & layout
  // =====================================================================
  const canvas = document.getElementById('game');
  let ctx = canvas.getContext('2d');   // `let`: the encyclopedia draws hazards into its own little canvases
  let W = 0, H = 0, DPR = 1, scale = 1, viewW = 560, viewH = 360, groundY = 290, px = 140;

  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = Math.max(1, window.innerWidth || 1); H = Math.max(1, window.innerHeight || 1);
    canvas.width = Math.round(W * DPR); canvas.height = Math.round(H * DPR);
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    scale = Math.min(W / 440, H / 360);
    viewW = W / scale; viewH = H / scale;
    groundY = viewH / 2 + 110;
    px = Math.min(150, viewW * 0.24);
  }
  window.addEventListener('resize', resize);
  window.addEventListener('orientationchange', () => setTimeout(resize, 200));

  // =====================================================================
  //  Audio (WebAudio, no files). Muted when tab hidden / ad shown / paused by platform.
  // =====================================================================
  let actx = null, master = null, sysPause = false, adOpen = false;
  let musicNext = 0, musicStep = 0;

  function ensureAudio() {
    if (!actx) {
      try {
        actx = new (window.AudioContext || window.webkitAudioContext)();
        master = actx.createGain(); master.gain.value = 0.6; master.connect(actx.destination);
      } catch (e) { actx = null; }
    }
    applyAudio();
  }

  function applyAudio() {
    if (!actx) return;
    const want = save.sound && !sysPause && !adOpen && !document.hidden;
    try { want ? actx.resume() : actx.suspend(); } catch (e) { }
  }

  function tone(freq, dur, type, vol, slide, when, dest) {
    if (!actx || actx.state !== 'running') return;
    const t = when || actx.currentTime;
    const o = actx.createOscillator(), g = actx.createGain();
    o.type = type || 'square';
    o.frequency.setValueAtTime(freq, t);
    if (slide) o.frequency.exponentialRampToValueAtTime(slide, t + dur);
    g.gain.setValueAtTime(vol || 0.15, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(dest || master);
    o.start(t); o.stop(t + dur + 0.02);
  }
  const at = d => actx && actx.currentTime + d;

  const sfx = {
    jump: () => tone(380, 0.14, 'square', 0.08, 700),
    djump: () => tone(520, 0.14, 'square', 0.08, 950),
    coin: v => {
      if (v >= 25) { [1319, 1568, 2093].forEach((f, i) => tone(f, 0.12, 'triangle', 0.08, null, at(i * 0.05))); return; }
      if (v >= 5) { tone(1175, 0.08, 'square', 0.07); tone(1760, 0.16, 'square', 0.07, null, at(0.07)); return; }
      tone(988, 0.07, 'square', 0.05); tone(1319, 0.12, 'square', 0.05, null, at(0.06));
    },
    die: () => tone(300, 0.5, 'sawtooth', 0.12, 60),
    win: () => [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.18, 'triangle', 0.15, null, at(i * 0.12))),
    click: () => tone(660, 0.05, 'triangle', 0.08),
    buy: () => [784, 1047, 1319].forEach((f, i) => tone(f, 0.12, 'square', 0.07, null, at(i * 0.07))),
    no: () => tone(180, 0.2, 'square', 0.08, 120),
    slide: () => tone(240, 0.18, 'sawtooth', 0.04, 110),
    magnet: () => tone(500, 0.35, 'sine', 0.12, 1400),
    life: () => [392, 523, 659, 784].forEach((f, i) => tone(f, 0.2, 'triangle', 0.13, null, at(i * 0.08)))
  };

  // Background music (1.0.25): the menu, each of the three level worlds and every world from the shop
  // has its own little theme. mel: semitones from C5 (null = rest), bass: semitones from C3, one per 4 steps.
  // drum: 'four' (kick on the beat + hats), 'back' (soft snare on 2 and 4), 'shaker' (light hats), 'gallop'.
  const _ = null;
  const TRACKS = {
    menu: { step: 0.27, wave: 'sine', vol: 0.04, mel: [0, 4, 7, 4, 2, 5, 9, 5, 0, 4, 7, 12, 11, 7, 4, 2], bass: [0, -3, -5, -7] },
    level1: { step: 0.19, wave: 'triangle', vol: 0.035, mel: [0, 4, 7, 9, 7, 4, 2, 4, 0, 4, 7, 12, 9, 7, 4, 2], bass: [0, 0, -3, -5], drum: 'shaker' },
    level2: { step: 0.18, wave: 'triangle', vol: 0.035, key: 2, mel: [0, 2, 4, 7, 9, 7, 4, 2, 0, 2, 4, 7, 10, 9, 7, 4], bass: [0, -2, -5, -7], drum: 'back' },
    level3: { step: 0.16, wave: 'square', vol: 0.02, key: -3, mel: [0, 3, 7, 10, 12, 10, 7, 3, 5, 8, 12, 8, 7, 3, 2, 3], bass: [0, -4, -2, -5], drum: 'four' },
    endless: { step: 0.15, wave: 'square', vol: 0.02, mel: [0, 3, 7, 10, 7, 3, 0, 3, 5, 8, 12, 8, 7, 10, 14, 10], bass: [0, 0, -4, -2], drum: 'four' },
    desert: { step: 0.19, wave: 'triangle', vol: 0.035, key: -2, mel: [0, 1, 4, 5, 7, 5, 4, 1, 0, 1, 4, 7, 8, 7, 5, 4], bass: [0, 0, 1, 0], drum: 'shaker' },
    winter: { step: 0.24, wave: 'sine', vol: 0.045, key: 5, mel: [12, 9, 7, 4, 7, 9, 12, 16, 14, 12, 9, 7, 9, 12, 14, _], bass: [0, -3, -7, -5] },
    city: { step: 0.17, wave: 'square', vol: 0.02, key: -5, mel: [0, _, 3, 5, _, 7, 5, 3, 0, _, 10, 7, 5, 3, 5, _], bass: [0, 0, 3, 5], drum: 'four' },
    space: { step: 0.26, wave: 'sine', vol: 0.045, len: 0.95, mel: [0, 4, 6, 11, 12, 11, 6, 4, 2, 6, 9, 14, 12, 9, 6, 2], bass: [0, -1, -3, -5] },
    ocean: { step: 0.17, wave: 'triangle', vol: 0.04, key: 7, mel: [0, 4, 7, 4, 9, 7, 4, 2, 0, 4, 7, 12, 11, 9, 7, 4], bass: [0, -5, -3, -7], drum: 'shaker' },
    forest: { step: 0.17, wave: 'triangle', vol: 0.04, key: 2, mel: [7, 7, 9, 7, 4, _, 0, 2, 4, 7, 12, 11, 9, _, 7, _], bass: [0, -5, -3, -7], drum: 'shaker' },
    volcano: { step: 0.17, wave: 'sawtooth', vol: 0.016, key: -4, mel: [0, 0, 3, 0, 7, 6, 3, 0, 0, 0, 3, 0, 10, 8, 7, 3], bass: [0, 0, -4, -5], drum: 'four' },
    savanna: { step: 0.17, wave: 'triangle', vol: 0.036, key: 2, mel: [0, 4, 7, 9, 7, 4, 0, _, 2, 4, 7, 12, 9, 7, 4, 2], bass: [0, 0, 5, 7], drum: 'back' },
    candy: { step: 0.16, wave: 'square', vol: 0.016, mel: [12, 16, 19, 16, 14, 17, 21, 17, 12, 16, 19, 24, 23, 19, 16, 14], bass: [0, 5, 7, 5], drum: 'shaker' },
    sakura: { step: 0.24, wave: 'triangle', vol: 0.04, key: 4, mel: [12, 8, 7, 5, 7, 8, 12, 13, 12, 8, 7, 5, 1, 5, 7, _], bass: [0, -4, -7, -5] },
    autumn: { step: 0.22, wave: 'triangle', vol: 0.035, key: -1, mel: [0, 3, 7, 3, 8, 7, 3, 2, 0, 3, 7, 12, 10, 8, 7, 3], bass: [0, -4, -7, -5] },
    underwater: { step: 0.2, wave: 'sine', vol: 0.045, len: 0.95, key: 3, mel: [0, 7, 12, 16, 12, 7, 4, 7, 2, 9, 14, 17, 14, 9, 5, 9], bass: [0, -3, 2, -5] },
    mine: { step: 0.2, wave: 'square', vol: 0.016, key: -5, mel: [0, _, 3, _, 0, _, 6, 5, 0, _, 3, _, 7, 6, 3, _], bass: [0, 0, 1, 0], drum: 'back' },
    wildwest: { step: 0.16, wave: 'triangle', vol: 0.04, key: 2, mel: [0, 0, 7, 7, 9, 7, 4, 4, 2, 2, 7, 7, 5, 4, 2, _], bass: [0, -5, 0, -5], drum: 'gallop' },
    neoncity: { step: 0.13, wave: 'sawtooth', vol: 0.014, key: -3, mel: [0, 7, 12, 7, 3, 10, 15, 10, 5, 12, 17, 12, 7, 14, 19, 14], bass: [0, -4, -7, -2], drum: 'four' },
    skyland: { step: 0.23, wave: 'sine', vol: 0.045, len: 0.95, key: 5, mel: [7, 11, 14, 18, 19, 18, 14, 11, 7, 9, 14, 16, 19, 16, 14, 9], bass: [0, 2, -3, -5] },
    swamp: { step: 0.22, wave: 'triangle', vol: 0.04, key: -2, mel: [0, 3, 5, 6, 7, _, 10, 7, 0, 3, 5, 6, 5, 3, 0, _], bass: [0, 0, 5, 0], drum: 'back' },
    egypt: { step: 0.18, wave: 'triangle', vol: 0.038, key: 1, mel: [0, 1, 4, 5, 7, 8, 11, 12, 11, 8, 7, 5, 4, 1, 0, _], bass: [0, 0, 1, 0], drum: 'shaker' },
    halloween: { step: 0.2, wave: 'square', vol: 0.016, key: -2, mel: [12, 11, 8, 7, 12, 11, 8, 7, 6, 5, 3, 2, 3, 6, 3, _], bass: [0, -1, -4, -6], drum: 'back' }
  };
  // which theme plays now: menu; a level world; the endless run's world (day & night = the classic endless theme)
  function musicMode() {
    if (!['play', 'paused', 'dying', 'winning', 'fail', 'win'].includes(state)) return 'menu';
    if (!isEndless()) return lvl < 5 ? 'level1' : lvl < 10 ? 'level2' : 'level3';
    const th = gl().theme;
    return th && TRACKS[th] ? th : 'endless';
  }
  let noiseBuf = null, musicTrack = '', musicBus = null;
  function noise(dur, vol, hp, when, dest) {
    if (!actx) return;
    if (!noiseBuf) {
      noiseBuf = actx.createBuffer(1, Math.floor(actx.sampleRate * 0.4), actx.sampleRate);
      const d = noiseBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    }
    const src = actx.createBufferSource(), f = actx.createBiquadFilter(), g = actx.createGain();
    src.buffer = noiseBuf; f.type = 'highpass'; f.frequency.value = hp;
    g.gain.setValueAtTime(vol, when); g.gain.exponentialRampToValueAtTime(0.0001, when + dur);
    src.connect(f); f.connect(g); g.connect(dest || master);
    src.start(when); src.stop(when + dur + 0.02);
  }
  setInterval(() => {
    if (!actx || actx.state !== 'running') return;
    const now = actx.currentTime, mode = musicMode(), T = TRACKS[mode];
    if (mode !== musicTrack || !musicBus) {   // a new theme: fade the old one out, start the new one from its first note
      if (musicBus) {
        const old = musicBus;
        old.gain.cancelScheduledValues(now); old.gain.setValueAtTime(old.gain.value, now); old.gain.linearRampToValueAtTime(0, now + 0.25);
        setTimeout(() => { try { old.disconnect(); } catch (e) { } }, 1500);
        musicNext = now + 0.3;
      }
      musicBus = actx.createGain(); musicBus.connect(master);
      musicTrack = mode; musicStep = 0;
    }
    const B = musicBus;
    if (musicNext < now - 0.3) musicNext = now + 0.05;
    while (musicNext < now) { musicNext += T.step; musicStep++; }
    const key = T.key || 0;
    while (musicNext < now + 0.2) {
      const L = T.mel.length, part = Math.floor(musicStep / L) % 4, j = musicStep % L, i = part === 3 ? L - 1 - j : j;
      const shift = part === 2 ? 5 : 0, n = T.mel[i], prev = T.mel[part === 3 ? (i + 1) % L : (i - 1 + L) % L];
      if (n !== null && (musicStep % 2 === 0 || n !== prev))
        tone(523.25 * Math.pow(2, (n + key + shift) / 12), T.step * Math.min(0.95, T.len || 0.85), T.wave, T.vol, null, musicNext, B);
      if (musicStep % 4 === 0) {
        const bn = T.bass[Math.floor(musicStep / 4) % T.bass.length];
        tone(130.81 * Math.pow(2, (bn + key + shift) / 12), T.step * 3.2, 'sine', 0.07, null, musicNext, B);
      }
      const d = T.drum, q = musicStep % 8;
      if (d === 'four') { if (q % 4 === 0) tone(150, 0.16, 'sine', 0.1, 45, musicNext, B); if (q % 2 === 1) noise(0.04, 0.025, 7000, musicNext, B); }
      else if (d === 'back') { if (q === 4) noise(0.12, 0.035, 1800, musicNext, B); if (q === 0) tone(120, 0.14, 'sine', 0.07, 50, musicNext, B); }
      else if (d === 'shaker') { if (q % 2 === 1) noise(0.05, 0.02, 6000, musicNext, B); }
      else if (d === 'gallop') { if (q % 4 !== 1) noise(0.04, 0.022, 5000, musicNext, B); if (q === 0) tone(110, 0.12, 'sine', 0.06, 50, musicNext, B); }
      musicNext += T.step; musicStep++;
    }
  }, 60);

  // =====================================================================
  //  Game state
  // =====================================================================
  let state = 'loading';      // loading | menu | play | paused | dying | winning | fail | win
  let lvl = 0, LV = EMPTY_LEVEL, dist = 0, time = 0, coinsGot = 0, picked = 0, usedContinue = false, starsGot = 0;
  let stateTimer = 0, tipTimer = 0, tipText = '', screen = '', shopTab = 'color', newRecord = false;
  let lifeUsed = false, slow = 1, slideHeld = false;
  const EMOTE_TIME = 1.1;
  let petHist = [], petY = 0, trailHist = [], trailT = 0, petPrevY = 0, petWasAir = false, petLandT = 0, petAct = null;
  let dailyRun = false, goldT = 0, goldSpawn = 0;
  let runLook = null, trial = null, shieldNext = false, shieldOn = false, x2Used = false, endlessDeaths = 0;
  const gl = () => runLook || save.look;     // outfit used in the run (a try-on can override it)
  // juice & tutorial
  let shakeT = 0, slowMoT = 0, combo = 0, tutWait = null, slideT = 0, winHold = 0, stopT = 0;
  let multD = 0, multAcc = 0;   // distance since the last hit, fractional extra coins
  const MULT_STEP = 5000, MULT_MAX = 2;
  const coinMult = () => isEndless() ? Math.min(MULT_MAX, 1 + 0.1 * Math.floor(multD / MULT_STEP)) : 1;
  const player = { y: 0, vy: 0, ground: true, jumps: 0, coyote: 0, buffer: 0, inv: 0, anim: 0,
                   visible: true, slide: 0, magnet: 0 };
  let particles = [];

  const isEndless = () => lvl === ENDLESS;
  const baseSpeed = () => {
    if (!isEndless()) return LEVELS[lvl].speed;
    const z = evNow();
    return endlessSpeed(dist) * (LV.easy && dist < LV.easy ? 0.85 : 1) * (z ? z.speed : 1);
  };
  const sliding = () => player.slide > 0 && player.ground;
  const bodyH = () => sliding() ? PH_SLIDE : PH;

  function showTip(text, secs) { tipText = text; tipTimer = secs; }

  function setState(s) {
    state = s;
    SDK.gameplay(s === 'play');
    if (s === 'play' || s === 'dying' || s === 'winning') SDK.banner(false);
    bPause.classList.toggle('hidden', s !== 'play');
    bSlide.classList.toggle('hidden', !(IS_TOUCH && s === 'play'));
    bJump.classList.toggle('hidden', !(IS_TOUCH && s === 'play'));
    if (s !== 'play') slideHeld = false;
  }

  function resetPlayer() {
    Object.assign(player, { y: 0, vy: 0, ground: true, jumps: 0, coyote: 0, buffer: 0, inv: 0, visible: true, slide: 0, magnet: 0 });
    slow = 1;
  }

  function startLevel(i, daily) {
    lvl = i;
    dailyRun = !!daily && i === ENDLESS;
    LV = i === ENDLESS ? buildEndless(dailyRun ? today() : 0) : buildLevel(i);
    goldT = 0;
    if (dailyRun) save.stats.dailyRuns++;
    dist = 0; time = 0; coinsGot = 0; picked = 0; starsGot = 0; usedContinue = false; particles = []; newRecord = false;
    lifeUsed = false; trailHist = []; petY = 0; petHist = []; crit = null; critNext = 4 + Math.random() * 6; tutWait = null; combo = 0; slowMoT = 0; slideT = 0; stopT = 0; multD = 0; multAcc = 0;
    runLook = null;
    if (trial) { runLook = Object.assign({}, save.look, { [trial.cat]: trial.id }); trialName = S.items[trial.id]; trial = null; }
    shieldOn = shieldNext; shieldNext = false; x2Used = false;
    resetPlayer();
    if (save.magnetPerm) player.magnet = Infinity;   // the permanent magnet works everywhere, all the time
    showTip(i === ENDLESS ? S.endlessTip : S.tips[i], 2.8);
    save.stats.runs++;
    if (i === ENDLESS) {
      save.stats.endlessRuns++;
      if (!save.magnetPerm && save.magnets > 0) { save.magnets--; player.magnet = MAGNET_SHOP; }
      if (!dailyRun && save.easyFails >= 3) { LV.easy = 5000; save.easyFails = 0; showTip(S.easyTip, 3); }
      extendEndless();
    }
    hideUI();
    setState('play');
  }

  let trialName = null;
  function goMenu() {
    persist();
    runLook = null;
    if (trialName) { toast(S.trialOver.replace('{i}', trialName)); trialName = null; }   // 1.0.55: the try-on is over (it was never a purchase)
    lvl = allDone() ? ENDLESS : Math.min(save.unlocked, LEVELS.length - 1);
    LV = EMPTY_LEVEL; dist = 0; particles = [];
    resetPlayer();
    setState('menu');
    showMenu();
  }

  function pauseGame() {
    if (state !== 'play') return;
    setState('paused');
    persist();
    showPanel(`<h2>${S.pause}</h2>
      <button class="btn main" data-act="resume">${S.resume}</button>
      <button class="btn" data-act="retry">${S.retry}</button>
      <button class="btn" data-act="menu">${S.menu}</button>`, 'pause');
  }

  function resumeGame() {
    if (state !== 'paused') return;
    hideUI();
    setState('play');
  }

  // put the stickman back on solid ground with a short invulnerability
  function rescue() {
    const p = player;
    multD = 0;   // a hit resets the coin multiplier
    p.vy = 0; p.slide = 0;
    if (p.y < 0) p.y = 0;
    for (const o of LV.obs) {
      if (o.t === 'box' && dist + PW / 2 > o.x && dist - PW / 2 < o.x + o.w) p.y = Math.max(p.y, o.h);
    }
    p.inv = 2.2;
  }

  function die(cause) {
    if (state !== 'play') return;
    if (devGod && devMode) { rescue(); return; }   // developer test: can't die
    const zb = evNow();
    if (zb && zb.id === 'balloon' && !zb.popped && cause !== 'pit') {   // the balloon pops instead of you
      zb.popped = true; zb.x1 = dist; rescue(); sfx.die(); showTip(S.balloonPop, 1.2);
      for (let k = 0; k < 12; k++) particles.push({ x: dist + 14, y: player.y + 80, vx: (Math.random() - 0.5) * 260, vy: Math.random() * 200, life: 0.5, col: '#e53935', sz: 3 });
      return;
    }
    if (shieldOn) { shieldOn = false; rescue(); sfx.life(); showTip('🛡', 1); return; }   // drawn as an icon by drawTextIco
    if (save.life && !lifeUsed) {
      lifeUsed = true; save.stats.lives++;
      rescue(); sfx.life(); showTip(S.secondLife, 1.5);
      for (let k = 0; k < 14; k++)
        particles.push({ x: dist, y: player.y + 28, vx: (Math.random() - 0.5) * 300, vy: Math.random() * 300, life: 0.6, col: '#ff5a7a' });
      return;
    }
    setState('dying');
    stateTimer = 0.9; shakeT = 0.35; combo = 0; tutWait = null;
    player.visible = false;
    sfx.die();
    save.stats.deaths++;
    save.stats.deathBy[cause] = (save.stats.deathBy[cause] || 0) + 1;
    if (isEndless()) {
      const m = Math.floor(dist / 10);
      endlessDeaths++;
      if (dailyRun) {
        if (save.dailyBest.day !== today()) save.dailyBest = { day: today(), m: 0 };
        if (m > save.dailyBest.m) { save.dailyBest.m = m; newRecord = true; SDK.setScore('dailyrun', m); }
      } else if (m > save.bestEndless) { save.bestEndless = m; newRecord = true; SDK.setScore('endless', m); }
      if (!dailyRun) save.easyFails = m < 300 ? save.easyFails + 1 : 0;
    }
    persist();
    if (newRecord) {   // fireworks over the track
      for (let f = 0; f < 4; f++) {
        const fx = dist + 60 + f * 70, fy = 150 + (f % 2) * 50, hue = f * 90;
        for (let k = 0; k < 18; k++) { const a = k / 18 * Math.PI * 2; particles.push({ k: 'c', x: fx, y: fy, vx: Math.cos(a) * 160, vy: Math.sin(a) * 160, g: 0.25, life: 1.4, l0: 1.4, r: 2.8, col: `hsl(${(hue + k * 12) % 360},95%,62%)` }); }
      }
      setTimeout(() => sfx.win(), 250);
    }
    const c = stickColor(palette());
    for (let k = 0; k < 26; k++) {
      const a = Math.random() * Math.PI * 2, s = 120 + Math.random() * 280;
      particles.push({ x: dist, y: player.y + 28, vx: Math.cos(a) * s, vy: Math.sin(a) * s + 150, life: 0.9, col: k % 3 ? c : '#ff5050' });
    }
  }

  let lastStars = 1, prerunDaily = false;
  function win() {
    setState('winning');
    winHold = gl().emote ? EMOTE_TIME : 0.8;   // after 0.5 s of braking the stickman stands still
    stateTimer = 0.5 + winHold; stopT = 0;
    slowMoT = 0.6;
    sfx.win();
    const stars = starsGot;   // 1.0.45: the stars found on the level (0–5); finishing is remembered on its own
    save.stars[lvl] = Math.max(save.stars[lvl], stars);
    save.done[lvl] = 1;
    save.best[lvl] = Math.max(save.best[lvl], picked);
    if (lvl + 1 < LEVELS.length) save.unlocked = Math.max(save.unlocked, lvl + 1);
    save.stats.levelsWon++;
    persist();
    lastStars = stars;
    SDK.setScore('stars', save.stars.reduce((a, b) => a + b, 0));
    if (save.stats.levelsWon >= 3 && !save.reviewAsked) { save.reviewAsked = true; setTimeout(() => SDK.review(), 2000); }
  }

  function continueAfterAd() {
    SDK.rewarded(ok => {
      if (!ok) { showFail(); return; }
      usedContinue = true;
      particles = [];
      player.visible = true;
      rescue();
      hideUI();
      setState('play');
    });
  }

  // =====================================================================
  //  Physics
  // =====================================================================
  function overGap(wx) {
    for (const g of LV.gaps) {
      if (wx > g.x + 4 && wx < g.x + g.w - 4) {
        if (g.planks) for (const pl of g.planks)
          if (pl.fall < 0.3 && wx >= pl.x - 6 && wx <= pl.x + pl.w + 6) return false;
        return true;
      }
    }
    return false;
  }
  const platTop = o => o.base + o.amp * Math.sin(time * 2.2 + o.ph);

  function rhythmLead() { return baseSpeed() * slow * AIR * 0.42 + 13; }
  function tryJump() {
    const p = player;
    const evj = state === 'play' ? evId() : '';
    if (evj === 'cart') { const zc = evNow(); if (zc && (zc.lane || 0) < 2) { zc.lane = (zc.lane || 0) + 1; sfx.jump(); save.stats.jumps++; } return; }
    if (evj === 'skate' && p.ground && p.y > 0.5) return;   // 1.0.45: on a ramp a jump does nothing — the ramp launches you itself
    if (evj === 'skate' && !p.ground && skateAir && !trickDone) {   // a trick in the air
      trickDone = true; spinT = 0.6; coinsGot += 5; save.wallet += 5; save.stats.coins += 5; sfx.coin(5);
      particles.push({ k: 't', txt: S.trick, fs: 15, x: dist + 20, y: player.y + 80, vx: 0, vy: 40, g: 0, life: 0.8, l0: 0.8, col: '#ffb300' });
      return;
    }
    if (state === 'play' && evId() === 'rhythm' && p.ground) {
      const lead = rhythmLead();
      for (const o of LV.obs) if (o.beat && !o.judged && o.x - dist > lead - 34 && o.x - dist < lead + 34) {
        o.judged = true; coinsGot += 3; save.wallet += 3; save.stats.coins += 3;
        particles.push({ k: 't', txt: `${S.rhythmOk} +3`, fs: 15, x: dist + 20, y: player.y + 80, vx: 0, vy: 40, g: 0, life: 0.8, l0: 0.8, col: '#ff4081' });
        break;
      }
    }
    // one jump only (no double jump since 1.0.10); a short grace time after leaving an edge
    if (p.ground || (p.coyote > 0 && p.jumps === 0)) {
      p.vy = JUMP_V * (evj === 'balloon' ? 0.75 : 1); p.jumps = 1; p.ground = false; p.coyote = 0; p.slide = 0; sfx.jump();
    } else return;
    jumpFx();
    save.stats.jumps++;
    p.buffer = 0;
  }

  // 1.0.45: lay the ramp's coins on the path the stickman is really going to fly (however he got onto the ramp)
  function rampCoins(o, wx, y0, vy) {
    const v = baseSpeed() * slow;
    (o.coins || []).forEach((c, j) => {
      if (c.got) return;
      const tt = (j + 1) * 0.105;
      c.x = wx + v * tt; c.y = Math.max(0, y0 + vy * tt - G * tt * tt / 2) + 30;
    });
  }
  function physics(dt) {
    const p = player, wx = dist;
    p.buffer -= dt; p.coyote -= dt; p.inv -= dt;
    const ev = state === 'play' ? evId() : '';
    if (ev === 'jet') {   // hold = thrust up, release = glide down
      p.slide = 0;
      p.vy += ((jumpHeld ? 3000 : 0) - G * 0.75) * dt;
      p.vy = Math.max(-520, Math.min(430, p.vy));
      p.y += p.vy * dt;
      if (p.y <= 0) { p.y = 0; p.vy = Math.max(0, p.vy); }
      if (p.y > 175) { p.y = 175; p.vy = Math.min(0, p.vy); }   // the head stays on screen
      p.ground = p.y === 0; p.jumps = p.ground ? 0 : 1;
      if (jumpHeld && Math.random() < dt * 30) particles.push({ k: 'c', x: wx - 12, y: p.y + 16, vx: -80, vy: -120, g: 0, life: 0.3, l0: 0.3, r: 3, col: Math.random() < 0.5 ? '#ffca28' : '#ff7043' });
      return;
    }
    if (ev === 'cart') {   // the cart rides one of two tracks: jump = up, slide = down
      const zc = evNow();
      if (slideHeld && !zc.sh && zc.lane > 0) { zc.lane--; sfx.slide(); }   // each press of ↓ = one track lower
      zc.sh = slideHeld;
      const ty = (zc.lane || 0) * CART_UP;
      p.y += (ty - p.y) * Math.min(1, dt * 12); p.vy = 0; p.ground = true; p.jumps = 0; p.slide = 0;
      return;
    }
    if (p.buffer > 0) tryJump();
    // slide: hold ↓ on the ground; in the air ↓ pulls you down fast
    if (slideHeld && state === 'play') {
      if (p.ground && slideT < SLIDE_MAX) {
        if (p.slide <= 0) { save.stats.slides++; sfx.slide(); }
        slideT += dt;
        p.slide = Math.max(p.slide, Math.min(0.35, SLIDE_MAX - slideT));
        if (Math.random() < dt * 40)   // dust from the sliding feet
          particles.push({ k: 'c', x: wx + 18 + Math.random() * 8, y: 2, vx: -60 - Math.random() * 80, vy: 30 + Math.random() * 50, g: 0.4, life: 0.35, l0: 0.35, r: 2.5 + Math.random() * 2, col: 'rgba(190,170,140,0.75)' });
      } else if (p.ground) p.slide -= dt;   // held longer than SLIDE_MAX: stand up until ↓ is released
      else if (p.vy > -900) p.vy = -900;
    } else { p.slide -= dt; slideT = 0; }

    const prevY = p.y;
    p.vy -= G * (ev === 'balloon' ? 0.45 : 1) * dt; p.y += p.vy * dt;   // the balloon makes jumps floaty
    let floor = (p.inv <= 0 && overGap(wx)) ? -1e9 : 0;
    for (const o of LV.obs) {
      if (o.x > wx + 60 || o.x + o.w < wx - 60) continue;
      if (!(wx + PW / 2 > o.x && wx - PW / 2 < o.x + o.w)) continue;
      if (o.t === 'box') {
        if (ev !== 'giant' && prevY >= o.h - 6 && p.y <= o.h) floor = Math.max(floor, o.h);
      } else if (o.t === 'plat') {
        const top = platTop(o);
        if (prevY >= top - 10 && p.y <= top) floor = Math.max(floor, top);
      } else if (o.t === 'ramp') {   // skate ramp: the floor rises along it; at its end it launches you
        const k = Math.max(0, Math.min(1, (wx - o.x) / o.w)), top = o.h * k;
        if (prevY >= top - 14 && p.y <= top) {
          floor = Math.max(floor, top);
          if (k > 0.9 && !o.used) { p.vy = 780; p.y = top + 1; floor = -1e9; skateAir = true; trickDone = false; sfx.jump(); o.used = 1; rampCoins(o, wx, p.y, p.vy); }
        } else if (k > 0.9 && !o.used && !p.ground && p.y < 160) {   // jumped onto / over the ramp: it still throws you up
          p.vy = Math.max(p.vy, 640); skateAir = true; trickDone = false; sfx.jump(); o.used = 1; rampCoins(o, wx, p.y, p.vy);
        }
      }
    }
    const was = p.ground;
    if (p.y <= floor) {
      if (!was && p.vy < -500 && state === 'play')    // landing dust
        for (let k = 0; k < 5; k++) particles.push({ k: 'c', x: wx + (Math.random() - 0.5) * 16, y: floor + 2, vx: (Math.random() - 0.5) * 120, vy: 20 + Math.random() * 40, g: 0.3, life: 0.35, l0: 0.35, r: 3, col: 'rgba(200,180,150,0.8)' });
      p.y = floor; p.vy = 0; p.ground = true; p.jumps = 0; skateAir = false;
    } else {
      p.ground = false;
      if (was && p.vy <= 0) p.coyote = 0.09;
    }
    if (!p.ground && p.coyote <= 0 && p.jumps === 0) p.jumps = 1;

    // bridge planks start to fall once stepped on
    if (p.ground && p.y === 0) {
      for (const g of LV.gaps) if (g.planks && wx > g.x && wx < g.x + g.w)
        for (const pl of g.planks) if (pl.fall < 0 && wx >= pl.x && wx <= pl.x + pl.w) pl.fall = 0;
    }
    // puddles slow you down
    let target = 1;
    if (p.ground && p.y === 0) for (const pd of LV.pud) if (wx > pd.x && wx < pd.x + pd.w) {
      target = 0.55;
      if (Math.random() < dt * 14)
        particles.push({ x: wx, y: 2, vx: (Math.random() - 0.3) * 120, vy: 120 + Math.random() * 120, life: 0.4, col: splashCol(worldKind(palette())) });
    }
    slow += (target - slow) * Math.min(1, dt * 6);
  }

  function collectCoin(c) {
    c.got = true; picked++; coinsGot += c.v; save.wallet += c.v; save.stats.coins += c.v; sfx.coin(c.v); save.xp += c.v * 0.5;
    const mk = coinMult();
    if (mk > 1) {   // the multiplier's extra coins (whole coins only, the rest is carried over)
      multAcc += c.v * (mk - 1);
      const ex = Math.floor(multAcc);
      if (ex) { multAcc -= ex; coinsGot += ex; save.wallet += ex; save.stats.coins += ex; }
    }
    if (c.v === 5) save.stats.gold++;
    particles.push({ k: 't', txt: '+' + c.v, fs: c.v > 1 ? 16 : 11, x: c.x, y: c.y + 8, vx: 0, vy: 70, g: 0, life: 0.55, l0: 0.55,
                     col: c.v >= 25 ? '#4fd8ff' : c.v >= 5 ? '#ffcc1a' : '#ffffff' });
    // combo: grows until a coin is missed (see collisions); every 25 in a row gives +5
    combo++;
    if (combo % 25 === 0) {
      coinsGot += 5; save.wallet += 5; save.stats.coins += 5;
      particles.push({ k: 't', txt: `${S.combo} ${combo}! +5`, fs: 16, x: dist + 20, y: player.y + 80, vx: 0, vy: 40, g: 0, life: 0.9, l0: 0.9, col: '#ffb400' });
    }
  }

  function trackLoot() {
    save.stats.chests++; sfx.buy();
    if (lootPool().length) { const pick = grantRandomItem(); showTip(S.lootGot, 1.6); toast(`🎁 ${S.newCat[pick.cat]} ${S.items[pick.id]}`); }
    else { coinsGot += 75; save.wallet += 75; save.stats.coins += 75; showTip('+75', 1.2); }   // everything collected: three crystals instead
    for (let k = 0; k < 16; k++) particles.push({ k: 's', x: dist + 10, y: player.y + 30, vx: (Math.random() - 0.5) * 300, vy: Math.random() * 260, g: 0.5, life: 0.8, l0: 0.8, r: 4, col: k % 2 ? '#ffd54f' : '#fff' });
  }
  function collisions(dt) {
    const p = player, wx = dist, hh = bodyH();
    const giantNow = evId() === 'giant';
    // magnet pulls coins in
    if (p.magnet > 0) {
      p.magnet -= dt;
      for (const c of LV.coins) if (!c.got && c.x - wx < 190 && c.x - wx > -60) c.mag = true;
    }
    for (const c of LV.coins) {
      if (c.got) continue;
      if (c.flee) {   // runs ahead and hops once the stickman gets close (for at most ~1.2 s)
        const dx = c.x - wx;
        if (dx < 150 && dx > -10 && (c.ft || 0) < 1.2) {
          if (c.y0 === undefined) c.y0 = c.y;
          c.ft = (c.ft || 0) + dt;
          c.x += baseSpeed() * slow * 0.45 * dt;
          // hops away (from its own height), smaller and lower as it tires
          const tire = 1 - c.ft / 1.2;
          c.y = 26 + (c.y0 - 26) * tire * 0.5 + Math.abs(Math.sin(c.ft * 5)) * 60 * tire;
        } else if ((c.ft || 0) >= 1.2) c.y += (26 - c.y) * Math.min(1, dt * 8);   // tired: it settles on the ground
      }
      // a coin left behind uncollected breaks the combo (golden-hour rain doesn't count)
      if (!c.miss && !c.rain && c.x < wx - 30) { c.miss = true; combo = 0; }
      if (c.mag) {
        const k = Math.min(1, dt * 10);
        c.x += (wx - c.x) * k; c.y += (p.y + hh / 2 - c.y) * k;
      }
      const gk = giantNow ? 1.8 : 1;   // the giant's figure is 1.8 times bigger
      if (Math.abs(c.x - wx) > 24 * gk) continue;
      if (c.y > p.y - 12 && c.y < p.y + hh * gk + 12) collectCoin(c);
    }
    for (const st of LV.stars || []) {   // the level's stars
      if (st.got || Math.abs(st.x - wx) > 26) continue;
      if (st.y > p.y - 14 && st.y < p.y + hh + 14) {
        st.got = true; starsGot++; sfx.coin(25);
        particles.push({ k: 't', txt: `★ ${starsGot}/5`, fs: 17, x: st.x, y: st.y + 10, vx: 0, vy: 70, g: 0, life: 0.9, l0: 0.9, col: '#ffd600' });
        for (let q = 0; q < 12; q++) { const a = q / 12 * Math.PI * 2; particles.push({ k: 'c', x: st.x, y: st.y, vx: Math.cos(a) * 150, vy: Math.sin(a) * 150, g: 0.2, life: 0.5, l0: 0.5, r: 2.4, col: '#ffe082' }); }
      }
    }
    for (const it of LV.items) {
      if (it.got || it.deco || Math.abs(it.x - wx) > 26) continue;
      if ((it.y > p.y - 16 && it.y < p.y + hh + 24) || it.t === 'portal') {   // the portal is as tall as the screen: can't be jumped over
        it.got = true;
        if (it.t === 'loot') { trackLoot(); continue; }
        if (it.t === 'letter') {   // a letter of the word
          const zw = it.z; zw.mask |= 1 << it.i; zw.got++; sfx.coin(5);
          if (zw.got === 5) { coinsGot += 100; save.wallet += 100; save.stats.coins += 100; showTip(S.wordDone, 1.8); sfx.win(); }
          continue;
        }
        if (it.t === 'portal') {   // warp ahead, collecting the coin path on the way
          if (it.deco) continue;
          let gain = it.gain || 0;
          for (const c of LV.coins) if (!c.got && c.x > it.x && c.x < it.to) { c.got = true; picked++; gain += c.v; }
          coinsGot += gain; save.wallet += gain; save.stats.coins += gain;
          save.stats.dist += it.to + 30 - dist; dist = it.to + 30;
          warpT = 0.6; p.inv = Math.max(p.inv, 0.6); sfx.magnet(); showTip(S.warp.replace('{n}', gain), 1.6);
          continue;
        }
        p.magnet = Math.max(p.magnet, MAGNET_TRACK); save.stats.magnets++;
        sfx.magnet(); showTip(S.magnetGot, 1.2);
      }
    }
    if (p.y < -70) { die('pit'); return; }
    const ev = evId();
    if (ev === 'giant') {   // crates break apart
      for (const o of LV.obs) if (o.t === 'box' && !o.smashed && wx + PW > o.x && wx - PW < o.x + o.w && p.y < o.h) {
        o.smashed = true; sfx.die();
        coinsGot += 2; save.wallet += 2; save.stats.coins += 2; shakeT = Math.max(shakeT, 0.12);
        for (let k = 0; k < 14; k++) particles.push({ x: o.x + Math.random() * o.w, y: Math.random() * o.h, vx: 60 + Math.random() * 220, vy: 80 + Math.random() * 220, life: 0.7, col: k % 2 ? '#b07436' : '#dca060', sz: 5 });
      }
      if (LV.obs.some(o => o.smashed)) LV.obs = LV.obs.filter(o => !o.smashed);
    }
    if (ev === 'pet') {   // the helper grabs coins around the stickman
      petT -= dt;
      if (petT <= 0) {
        petT = 0.05;   // 1.0.44: quick enough for rows of coins at full speed (grabs the nearest two)
        const near = LV.coins.filter(c => !c.got && c.x - wx > -40 && c.x - wx < 260 && c.y < 220).sort((a, b) => a.x - b.x).slice(0, 2);
        for (const c of near) { petGrab = { x: c.x, y: c.y, t: 0.12 }; collectCoin(c); }
      }
    }
    if (petGrab) { petGrab.t -= dt; if (petGrab.t <= 0) petGrab = null; }
    if (p.inv > 0) return;
    const l = wx - PW / 2 + 3, r = wx + PW / 2 - 3, b = p.y, t = p.y + hh * (giantNow ? 1.8 : 1) - 4;
    for (const o of LV.obs) {
      if (o.x > r + 5) continue;
      if (o.x + o.w < l) continue;
      if (o.t === 'spike') {
        if (r > o.x + 7 && l < o.x + o.w - 7 && b < o.h - 10) { die('spike'); return; }
      } else if (o.t === 'box') {
        if (ev !== 'giant' && r > o.x && l < o.x + o.w && b < o.h - 8) { die('box'); return; }
      } else if (o.t === 'cartblock') {
        if (r > o.x + 3 && l < o.x + o.w - 3 && Math.abs(b - (o.lane ? CART_UP : 0)) < 30) { die('box'); return; }
      } else if (o.t === 'bird') {
        if (r > o.x + 4 && l < o.x + o.w - 4 && t > o.y + 3 && b < o.y + o.h - 3) { die('bird'); return; }
      } else if (o.t === 'beam') {
        if (r > o.x && l < o.x + o.w && t > o.y + 2) { die('beam'); return; }
      } else if (o.t === 'saw') {
        const cx = o.x + o.w / 2, cy = o.cy, rad = o.r - 5;
        const nx = Math.max(l, Math.min(cx, r)), ny = Math.max(b, Math.min(cy, t));
        if ((nx - cx) * (nx - cx) + (ny - cy) * (ny - cy) < rad * rad) { die('saw'); return; }
      }
    }
  }

  // first spike / first beam ever: slow motion until the player jumps / slides
  function tutorial() {
    if (tutWait === 'jump' && !player.ground) { tutWait = null; save.tut.jump = 1; }
    if (tutWait === 'slide' && sliding()) { tutWait = null; save.tut.slide = 1; }
    if (tutWait || (save.tut.jump && save.tut.slide)) return;
    for (const o of LV.obs) {
      const dx = o.x - dist;
      if (dx < 0 || dx > 200 || !player.ground) continue;
      if (!save.tut.jump && o.t === 'spike' && dx < 95) { tutWait = 'jump'; return; }
      if (!save.tut.slide && o.t === 'beam' && dx < 110) { tutWait = 'slide'; return; }
    }
  }

  // tell the player about an obstacle the first time they ever see it
  function firstSightTips() {
    const ahead = o => o.x > dist && o.x < dist + viewW - px - 40;
    const check = (key, textKey) => {
      if (save.seen[key]) return false;
      save.seen[key] = 1; showTip(S.obTips[textKey || key], 2.6); return true;
    };
    for (const o of LV.obs) if (ahead(o)) {
      if (o.t === 'beam' && check('beam', IS_TOUCH ? 'beamTouch' : 'beamPc')) return;
      if ((o.t === 'saw' || o.t === 'plat') && check(o.t)) return;
    }
    for (const g of LV.gaps) if (g.planks && ahead(g) && check('bridge')) return;
    for (const pd of LV.pud) if (ahead(pd) && check('puddle')) return;
  }

  function step(dt) {
    time += dt;
    player.anim += dt;
    if (tipTimer > 0 && state === 'play') tipTimer -= dt;

    if (state === 'menu' || state === 'play' || state === 'winning') {
      let v = state === 'menu' ? 150 : baseSpeed() * slow;
      // after the finish line the stickman brakes and stops (then shows the emote, or just stands)
      if (state === 'winning') v *= Math.max(0, Math.min(1, (stateTimer - winHold) / 0.5));
      dist += v * dt;
      if (state === 'play') {
        save.stats.dist += v * dt; save.stats.runTime += dt; save.xp += v * dt / 100;
        if (isEndless()) {
          save.stats.endlessDist += v * dt;
          const before = coinMult(); multD += v * dt;
          if (coinMult() > before) { showTip(S.multTip.replace('{k}', coinMult().toFixed(1)), 1.2); sfx.magnet(); }
        }
      }
      if (state === 'play' && isEndless()) goldenHour(dt);
      if (state === 'play' && evId() === 'rhythm') {
        const lead = rhythmLead();
        for (const o of LV.obs) if (o.beat && !o.ticked && o.x - dist < lead) { o.ticked = true; tone(1320, 0.06, 'square', 0.06); tone(660, 0.1, 'triangle', 0.05); }
      }
      if (state === 'play' && isEndless()) extendEndless();
      physics(dt);
    }
    if (state === 'play') {
      collisions(dt);
      firstSightTips();
      tutorial();
      if (state === 'play' && dist >= LV.len) win();
    }
    // falling bridge planks
    for (const g of LV.gaps) if (g.planks && g.x < dist + 600 && g.x + g.w > dist - 400)
      for (const pl of g.planks) if (pl.fall >= 0) {
        pl.fall += dt;
        if (pl.fall > 0.3) pl.dy += (pl.fall - 0.3) * 900 * dt;
      }
    if ((state === 'winning' && stateTimer < winHold) || state === 'win') stopT += dt;
    if (spinT > 0) spinT -= dt;
    if (warpT > 0) warpT -= dt;
    if (state === 'play' || state === 'winning' || state === 'win' || state === 'menu') cosmeticsStep(dt);
    for (const q of particles) {
      q.vy -= 900 * (q.g === undefined ? 1 : q.g) * dt; q.x += q.vx * dt; q.y += q.vy * dt; q.life -= dt;
      partNature(q, dt);
    }
    particles = particles.filter(q => q.life > 0);

    if (state === 'dying' || state === 'winning') {
      stateTimer -= dt;
      if (stateTimer <= 0) {
        if (state === 'dying') { setState('fail'); showFail(); }
        else { setState('win'); showWin(); }
      }
    }
  }

  // =====================================================================
  //  Palettes (endless run slowly cycles through all five)
  // =====================================================================
  function hexLerp(a, b, t) {
    const pa = parseInt(a.slice(1), 16), pb = parseInt(b.slice(1), 16);
    const ch = s => [(s >> 16) & 255, (s >> 8) & 255, s & 255];
    const A = ch(pa), B = ch(pb);
    return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, '0')).join('');
  }

  function palette() {
    if (state === 'menu' && THEMES[save.look.theme]) return THEMES[save.look.theme];   // the menu shows the chosen world
    if (!isEndless()) return LEVELS[lvl];
    const th = THEMES[gl().theme];
    if (th && state !== 'menu') return th;
    const ZONE = 4000, z = dist / ZONE, f = z - Math.floor(z);
    const a = LEVELS[Math.floor(z) % 5], b = LEVELS[(Math.floor(z) + 1) % 5];
    const t = f < 0.85 ? 0 : (f - 0.85) / 0.15;
    if (t === 0) return a;
    const L = k => hexLerp(a[k], b[k], t);
    return {
      sky: [hexLerp(a.sky[0], b.sky[0], t), hexLerp(a.sky[1], b.sky[1], t)],
      far: L('far'), near: L('near'), grass: L('grass'), dirt: L('dirt'), sun: L('sun'),
      stick: t < 0.5 ? a.stick : b.stick, night: a.night + (b.night - a.night) * t
    };
  }

  function stickColor(pal) {
    const c = findItem('color', gl().color);
    return colorOf(c, pal);
  }
  // the stickman keeps its colour day and night (night only adds a light outline)
  const CLASSIC = '#1d1d26';
  function colorOf(c, pal) {
    if (!c || !c.col) return CLASSIC;
    if (c.id === 'prism') return `hsl(${Math.floor(time * 120) % 360},85%,55%)`;
    if (c.id === 'galaxy') return `hsl(${Math.round(255 + Math.sin(time * 1.5) * 25)},72%,${Math.round(44 + Math.sin(time * 2.3) * 8)}%)`;
    return c.col;
  }

  // =====================================================================
  //  Drawing
  // =====================================================================
  const sx = wx => px + (wx - dist);

  // 1.0.52: who crosses the world now and then. Each scene is a few actors walking on the ground line, on the
  // same plane as the trees (so they walk evenly and the trees can stand in front of them). Actors: p = a pet-style
  // animal, s = a stickman in an outfit (the real stickman renderer, so the walk is right), f = a custom drawing.
  let crVar = {}, o_hareCol = '#bcaaa4', o_horseCol = '#6d4c41';
  const gnomeTops = ['#2e7d32', '#1565c0', '#6d4c41', '#8e24aa'], gnomeHats = ['#e53935', '#1e88e5', '#fdd835', '#43a047'];
  const CRITTERS = {
    wild: [[{ p: 'fox', dx: 0, tempo: 1.1 }, { p: 'cr_hare', dx: 46, hare: '#a1887f' }], [{ p: 'reindeer', tempo: 0.7 }]],
    xmas: [[{ p: 'cr_wolf', dx: -30 }, { p: 'cr_wolf', dx: 0 }, { p: 'cr_hare', dx: 48, hare: '#f5f5f5' }]],
    mine: [[{ s: 'cr_gnome', dx: 0, gn: 0 }, { s: 'cr_gnome', dx: -16, gn: 1 }], [{ s: 'cr_gnome', gn: 2 }], [{ s: 'cr_gnome', dx: 0, gn: 3 }, { s: 'cr_gnome', dx: -15, gn: 0 }, { s: 'cr_gnome', dx: -30, gn: 1 }]],
    city: [[{ s: 'cr_thief', dx: 34, tempo: 1.2 }, { s: 'cr_police', dx: 0, tempo: 1.2 }], [{ s: 'cr_thief', tempo: 1.2 }]],
    skyland: [[{ s: 'cr_cupid', fly: -110, mode: 'sit', tempo: 0.6 }], [{ s: 'cr_cupid', fly: -95, mode: 'sit', tempo: 0.6 }, { s: 'cr_cupid', fly: -125, dx: -26, mode: 'sit', tempo: 0.6 }]],
    desert: [[{ p: 'cr_camel', dx: 0 }, { p: 'cr_camel', dx: -40 }, { p: 'cr_camel', dx: -80 }]],
    egypt: [[{ s: 'cr_mummy', tempo: 0.45 }]],
    ocean: [[{ p: 'cr_crab', dx: 0 }, { p: 'cr_crab', dx: -22 }]],
    underwater: [[{ p: 'cr_shark' }]],
    sakura: [[{ s: 'cr_ninja', tempo: 1.3 }]],
    autumn: [[{ p: 'cr_squirrel', dx: 0 }, { p: 'cr_hedgehog', dx: -28, tempo: 0.8 }]],
    wildwest: [[{ p: 'cr_horse', horse: '#6d4c41' }, { s: 'cr_cowboy', mode: 'sit', fly: -18, dx: -1, tempo: 0.3 }], [{ f: 'tumble' }]],
    neon: [[{ f: 'hover' }, { s: 'cr_astro', mode: 'stand', fly: -16, tempo: 0.3 }]],
    swamp: [[{ p: 'cr_croc' }], [{ p: 'frog', dx: 0 }, { p: 'frog', dx: -20 }]],
    halloween: [[{ s: 'cr_witch', mode: 'sit', fly: -110, tempo: 0.4 }], [{ p: 'bat', dx: 0 }, { p: 'bat', dx: -24 }]],
    volcano: [[{ p: 'dragon', fly: -40 }]],
    candy: [[{ s: 'cr_ginger', tempo: 1.1 }]],
    space: [[{ f: 'ufo' }], [{ s: 'cr_astro', tempo: 0.45 }]],
    winter: [[{ p: 'penguin', dx: 0 }, { p: 'penguin', dx: -18 }]],
    savanna: [[{ p: 'lion', dx: 0, tempo: 1.1 }, { p: 'cr_gazelle', dx: 50, tempo: 1.1 }]],
    jungle: [[{ f: 'monkey' }]]
  };
  const CRIT_F = {
    tumble: (g, t) => { g.translate(0, -7 - Math.abs(Math.sin(t * 5)) * 8); g.rotate(-t * 6); for (let q = 0; q < 14; q++) { g.strokeStyle = q % 2 ? '#a1887f' : '#8d6e63'; g.lineWidth = 0.9; g.beginPath(); g.arc(Math.cos(q) * 2, Math.sin(q * 1.7) * 2, 5 + (q % 4), q, q + 3); g.stroke(); } },
    hover: (g, t) => { g.translate(0, -14 + Math.sin(t * 3) * 2); g.save(); g.shadowColor = '#00e5ff'; g.shadowBlur = 10; const hg = g.createLinearGradient(-12, -3, 12, 3); hg.addColorStop(0, '#ff4081'); hg.addColorStop(1, '#7c4dff'); g.fillStyle = hg; g.beginPath(); g.ellipse(0, 0, 14, 3.2, 0, 0, Math.PI * 2); g.fill(); g.fillStyle = '#18ffff'; g.fillRect(-15, 2, 30, 1.2); g.restore(); },
    ufo: (g, t) => { g.translate(0, -150 + Math.sin(t * 1.5) * 10); const bm = g.createLinearGradient(0, 3, 0, 120); bm.addColorStop(0, 'rgba(178,255,89,0.35)'); bm.addColorStop(1, 'rgba(178,255,89,0)'); g.fillStyle = bm; g.beginPath(); g.moveTo(-6, 3); g.lineTo(-20, 120); g.lineTo(20, 120); g.lineTo(6, 3); g.fill();
      const ug = g.createLinearGradient(0, -4, 0, 5); ug.addColorStop(0, '#eceff1'); ug.addColorStop(1, '#546e7a'); g.fillStyle = ug; g.beginPath(); g.ellipse(0, 0, 17, 4.4, 0, 0, Math.PI * 2); g.fill();
      const dg = g.createRadialGradient(-2, -6, 1, 0, -3, 8); dg.addColorStop(0, '#e0f7fa'); dg.addColorStop(1, 'rgba(128,222,234,0.6)'); g.fillStyle = dg; g.beginPath(); g.ellipse(0, -3, 7.5, 5.5, 0, Math.PI, 0); g.fill();
      for (let q = 0; q < 6; q++) { g.fillStyle = Math.sin(t * 8 + q) > 0 ? '#ffeb3b' : '#ff7043'; g.beginPath(); g.arc(-12 + q * 4.8, 1.6, 1.1, 0, Math.PI * 2); g.fill(); } },
    monkey: (g, t) => { const sw = Math.sin(t * 3) * 0.6; g.translate(0, -110); g.strokeStyle = '#558b2f'; g.lineWidth = 1; g.beginPath(); g.moveTo(0, -40); g.lineTo(Math.sin(sw) * 40, -40 + Math.cos(sw) * 40); g.stroke(); g.translate(Math.sin(sw) * 40, -40 + Math.cos(sw) * 40);
      g.fillStyle = '#6d4c41'; g.beginPath(); g.ellipse(0, 7, 4, 6, 0, 0, Math.PI * 2); g.fill(); g.beginPath(); g.arc(0, -1, 3.6, 0, Math.PI * 2); g.fill(); g.fillStyle = '#d7ccc8'; g.beginPath(); g.ellipse(0.8, -0.5, 2.4, 2, 0, 0, Math.PI * 2); g.fill(); }
  };
  let crit = null, critNext = 6;
  function drawCritters(c) {
    const k = worldKind(c), list = CRITTERS[k] || CRITTERS.wild;
    if (!crit && time > critNext) {
      const dir = Math.random() < 0.5 ? -1 : 1;
      crit = { k, scene: list[Math.floor(Math.random() * list.length)], dir, s: 0.62 + Math.random() * 0.35, v: Math.floor(Math.random() * 6), spd: 18 + Math.random() * 22, x: viewW + 70, d0: dist, t0: time };
    }
    if (!crit) return;
    const sx2 = crit.x + crit.dir * crit.spd * (time - crit.t0) - (dist - crit.d0) * 0.62;
    if (sx2 < -160 || sx2 > viewW + 160) { crit = null; critNext = time + 10 + Math.random() * 10; return; }
    const live = ctx.__live; ctx.__live = 0;   // the background people must not disturb the player's emote timing
    try {
      for (const a of crit.scene) {
        const tt = (time - crit.t0) * (a.tempo || 1) + (a.dx || 0) * 0.01;
        ctx.save(); ctx.translate(sx2 + (a.dx || 0) * crit.s * crit.dir, groundY + (a.fly || 0) * crit.s); ctx.scale(crit.s * crit.dir, crit.s);
        if (a.p) { o_hareCol = a.hare || '#bcaaa4'; o_horseCol = a.horse || '#6d4c41'; drawPet(ctx, a.p, 0, 0, tt, false, 0); }
        else if (a.s) { crVar = { top: gnomeTops[((a.gn || 0) + crit.v) % 4], hat: gnomeHats[((a.gn || 0) + crit.v + 1) % 4] }; const it = findItem('color', a.s); drawStick(ctx, 0, 0, a.mode || 'run', tt, it ? it.col : '#333', 1, { color: a.s }, null); }
        else if (a.f) CRIT_F[a.f](ctx, tt);
        ctx.restore();
      }
    } catch (e) { if (DEV_HOST) window.__critErr = e.stack; crit = null; critNext = time + 3; }
    ctx.__live = live;
  }

  function drawBackground(c) {
    const W2 = WORLD[c.decor];
    const g = ctx.createLinearGradient(0, 0, 0, groundY);
    g.addColorStop(0, c.sky[0]); g.addColorStop(0.55, hexLerp(c.sky[0], c.sky[1], 0.6)); g.addColorStop(1, c.sky[1]);
    ctx.fillStyle = g; ctx.fillRect(0, 0, viewW, groundY + 1);
    // soft glow around the sun / moon
    const sgx = viewW * 0.78, sgy = groundY - 210;
    if (!(W2 && W2.noSun)) {
      const glow = ctx.createRadialGradient(sgx, sgy, 20, sgx, sgy, 120);
      glow.addColorStop(0, c.night > 0.5 ? 'rgba(255,255,230,0.18)' : 'rgba(255,250,210,0.45)'); glow.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = glow; ctx.fillRect(sgx - 120, sgy - 120, 240, 240);
    }

    if (c.night > 0 && !(W2 && W2.noStars)) {
      ctx.fillStyle = '#fff';
      for (let i = 0; i < 60; i++) {
        const hx = Math.sin(i * 12.9898) * 43758.5453, hy = Math.sin(i * 78.233) * 12543.123;
        const x = (hx - Math.floor(hx)) * viewW, y = (hy - Math.floor(hy)) * (groundY - 80);
        const tw = 0.5 + 0.5 * Math.sin(time * 2 + i);
        ctx.globalAlpha = (0.4 + tw * 0.6) * c.night; ctx.fillRect(x, y, 2, 2);
      }
      ctx.globalAlpha = 1;
    }
    // sun / moon
    if (!(W2 && W2.noSun)) {
      const sx0 = viewW * 0.78, sy0 = groundY - 210;
      if (c.night <= 0.5) {   // a slowly turning corona
        ctx.save(); ctx.translate(sx0, sy0); ctx.rotate(time * 0.05); ctx.fillStyle = 'rgba(255,250,210,0.18)';
        for (let k = 0; k < 12; k++) { ctx.rotate(Math.PI / 6); ctx.beginPath(); ctx.moveTo(-5, 34); ctx.lineTo(0, 56 + (k % 2) * 10); ctx.lineTo(5, 34); ctx.fill(); }
        ctx.restore();
      }
      const sdg = ctx.createRadialGradient(sx0 - 8, sy0 - 9, 3, sx0, sy0, 31); sdg.addColorStop(0, shade(c.sun[0] === '#' ? c.sun : '#ffffff', 1.25)); sdg.addColorStop(1, c.sun);
      ctx.fillStyle = sdg;
      ctx.beginPath(); ctx.arc(sx0, sy0, 30, 0, Math.PI * 2); ctx.fill();
      if (c.night > 0.5) { ctx.fillStyle = c.sky[0]; ctx.beginPath(); ctx.arc(viewW * 0.78 + 12, groundY - 216, 26, 0, Math.PI * 2); ctx.fill(); }
    }

    if (W2 && W2.sky) W2.sky(c);   // sky objects of a world (moon, rainbow) sit behind the clouds
    // clouds: a far, paler layer and a near one; four kinds (no clouds in space)
    if (c.decor !== 'space' && !(W2 && W2.noClouds)) {
      const span = viewW + 300;
      for (let i = 0; i < 4; i++) {
        const x = ((i * 271 + 90 - dist * 0.05) % span + span) % span - 150;
        cloud(x, groundY - 270 + (i * 29) % 50, 0.5 + (i % 2) * 0.12, CLOUD_KINDS[(i * 5 + 2) % CLOUD_KINDS.length], c, 0.55);
      }
      for (let i = 0; i < 6; i++) {
        const x = ((i * 233 - dist * 0.12) % span + span) % span - 150;
        cloud(x, groundY - 250 + (i * 47) % 90, 0.8 + (i % 3) * 0.22, CLOUD_KINDS[(i * 3 + 1) % CLOUD_KINDS.length], c, 1);
      }
    }
    if (c.decor === 'space') {   // 1.0.52: a ringed planet — the back half of the ring goes behind the ball, the front half in front
      const px = viewW * 0.25, py = groundY - 200, rot = -0.3;
      const ring = (a0, a1) => { for (const [w, col] of [[5, 'rgba(160,120,80,0.55)'], [3, 'rgba(255,224,170,0.85)'], [1, 'rgba(255,245,220,0.9)']]) { ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath(); ctx.ellipse(px, py, 38, 9, rot, a0, a1); ctx.stroke(); } };
      ring(Math.PI, Math.PI * 2);
      const pg = ctx.createRadialGradient(px - 8, py - 9, 3, px, py, 23); pg.addColorStop(0, '#b39ddb'); pg.addColorStop(0.6, '#7e57c2'); pg.addColorStop(1, '#3f2a73');
      ctx.fillStyle = pg; ctx.beginPath(); ctx.arc(px, py, 22, 0, Math.PI * 2); ctx.fill();
      ctx.save(); ctx.beginPath(); ctx.arc(px, py, 22, 0, Math.PI * 2); ctx.clip();
      for (const [dy, a] of [[-9, 0.18], [-2, 0.12], [6, 0.16], [12, 0.1]]) { ctx.fillStyle = `rgba(255,255,255,${a})`; ctx.save(); ctx.translate(px, py); ctx.rotate(rot); ctx.fillRect(-24, dy, 48, 3); ctx.restore(); }
      ctx.fillStyle = 'rgba(0,0,0,0.22)'; ctx.save(); ctx.translate(px, py); ctx.rotate(rot); ctx.fillRect(-24, 2, 48, 4); ctx.restore();   // the ring's shadow on the ball
      ctx.restore();
      ring(0, Math.PI);
    }
    // hills (or city blocks)
    if (c.decor === 'city') {
      for (const [lay, par, k3, hmul] of [[0, 0.1, 1.18, 1.25], [1, 0.2, 1, 1]]) {   // a pale far row, then the nearer row
        const span = 1200;
        for (let i = 0; i < 24; i++) {
          const w = 40 + ((i + lay * 7) * 37) % 50, h = (60 + ((i + lay * 3) * 53) % 110) * hmul;
          const x = ((i * 50 + lay * 23 - dist * par) % span + span) % span - 60, y = groundY - h;
          const bc = shade(c.far, k3 * (0.9 + (i % 3) * 0.06));
          const bg = ctx.createLinearGradient(x, 0, x + w, 0); bg.addColorStop(0, shade(bc, 1.18)); bg.addColorStop(0.3, bc); bg.addColorStop(1, shade(bc, 0.72));
          ctx.fillStyle = bg; ctx.fillRect(x, y, w, h);
          ctx.fillStyle = shade(bc, 0.6); ctx.fillRect(x - 1, y - 3, w + 2, 3);   // the roof ledge
          if (i % 4 === 1) { ctx.fillStyle = shade(bc, 0.7); ctx.fillRect(x + w * 0.6, y - 12, 9, 9); ctx.fillRect(x + w * 0.6 + 1, y - 3, 1.5, 3); ctx.fillRect(x + w * 0.6 + 6.5, y - 3, 1.5, 3); }   // a water tank
          if (i % 5 === 2) { ctx.strokeStyle = shade(bc, 0.6); ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(x + w * 0.3, y - 3); ctx.lineTo(x + w * 0.3, y - 22); ctx.stroke(); ctx.fillStyle = Math.sin(time * 3 + i) > 0 ? '#ff5252' : '#7f1d1d'; ctx.beginPath(); ctx.arc(x + w * 0.3, y - 22, 1.6, 0, Math.PI * 2); ctx.fill(); }   // an antenna, blinking
          if (lay === 1) for (let wy = y + 8; wy < groundY - 12; wy += 14)
            for (let wx = x + 6; wx < x + w - 8; wx += 12) {
              const hsh = Math.abs(Math.sin(wx * 12.9 + wy * 4.1 + i)), lit = hsh > 0.3;
              ctx.fillStyle = lit ? (hsh > 0.85 ? 'rgba(180,220,255,0.75)' : 'rgba(255,224,150,0.8)') : 'rgba(30,25,45,0.45)';
              ctx.fillRect(wx, wy, 5, 7); if (lit) { ctx.fillStyle = 'rgba(255,255,255,0.25)'; ctx.fillRect(wx, wy, 5, 1.5); }
            }
        }
        if (lay === 0) { const hz = ctx.createLinearGradient(0, groundY - 200, 0, groundY); hz.addColorStop(0, 'rgba(255,220,180,0)'); hz.addColorStop(1, 'rgba(255,210,170,0.25)'); ctx.fillStyle = hz; ctx.fillRect(0, groundY - 200, viewW, 200); }   // haze between the rows
      }
    } else if (c.decor === 'dunes') {   // desert dunes: sunlit and shaded sides, ripples, a heat shimmer
      for (const [par, base, amp, wl, k3] of [[0.08, 80, 34, 210, 1.12], [0.2, 52, 26, 150, 1], [0.4, 26, 18, 100, 0.92]]) {
        const pts = []; for (let x = -10; x <= viewW + 10; x += 8) { const w = x + dist * par; pts.push([x, groundY - base - amp * Math.sin(w / wl) - amp * 0.4 * Math.sin(w / (wl * 0.37) + 2)]); }
        const dgr = ctx.createLinearGradient(0, groundY - base - amp * 1.5, 0, groundY); dgr.addColorStop(0, shade(c.far, k3 * 1.15)); dgr.addColorStop(1, shade(c.far, k3 * 0.85));
        ctx.fillStyle = dgr; ctx.beginPath(); ctx.moveTo(-10, groundY); pts.forEach(([x, y]) => ctx.lineTo(x, y)); ctx.lineTo(viewW + 10, groundY); ctx.closePath(); ctx.fill();
        ctx.strokeStyle = `rgba(255,236,190,${0.45 * k3})`; ctx.lineWidth = 1.6; ctx.beginPath(); pts.forEach(([x, y], i) => i ? ctx.lineTo(x, y + 1) : ctx.moveTo(x, y + 1)); ctx.stroke();   // a sunlit crest line (1.0.52: no dark patches)
        ctx.strokeStyle = `rgba(255,240,200,${0.35 * k3})`; ctx.lineWidth = 0.8;
        for (let i = 0; i < pts.length; i += 5) { const [x, y] = pts[i]; ctx.beginPath(); ctx.moveTo(x - 8, y + 8); ctx.quadraticCurveTo(x, y + 6, x + 8, y + 9); ctx.stroke(); }
      }
    } else if (c.decor === 'candy') {   // frosted cake hills with icing drips and sprinkles, giant candy canes far away
      for (let i = 0; i < 4; i++) {
        const x = wrapX(i * 260 - dist * 0.06, viewW + 300) - 150, h = 90 + (i * 31) % 50;
        ctx.save(); ctx.translate(x, groundY); ctx.lineCap = 'round';
        ctx.strokeStyle = '#fafafa'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -h); ctx.arc(-12, -h, 12, 0, Math.PI, true); ctx.stroke();
        ctx.strokeStyle = '#ef5350'; ctx.lineWidth = 7; ctx.setLineDash([6, 8]); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -h); ctx.arc(-12, -h, 12, 0, Math.PI, true); ctx.stroke(); ctx.setLineDash([]);
        ctx.restore();
      }
      for (const [par, base, amp, wl, col, ice] of [[0.15, 70, 30, 170, shade(c.far, 1.05), '#fff0f6'], [0.4, 34, 22, 110, c.near, '#ffffff']]) {
        const pts = []; for (let x = -10; x <= viewW + 10; x += 8) { const w = x + dist * par; pts.push([x, groundY - base - amp * Math.sin(w / wl) - amp * 0.4 * Math.sin(w / (wl * 0.4) + 1)]); }
        const hg2 = ctx.createLinearGradient(0, groundY - base - amp * 1.5, 0, groundY); hg2.addColorStop(0, shade(col, 1.12)); hg2.addColorStop(1, shade(col, 0.82));
        ctx.fillStyle = hg2; ctx.beginPath(); ctx.moveTo(-10, groundY); pts.forEach(([x, y]) => ctx.lineTo(x, y)); ctx.lineTo(viewW + 10, groundY); ctx.closePath(); ctx.fill();
        ctx.fillStyle = ice; ctx.beginPath(); pts.forEach(([x, y], i) => i ? ctx.lineTo(x, y - 1) : ctx.moveTo(x, y - 1));   // icing with drips
        for (let i = pts.length - 1; i >= 0; i--) { const [x, y] = pts[i]; ctx.lineTo(x, y + 6 + Math.sin((x + dist * par) * 0.08) * 1.5); }
        ctx.closePath(); ctx.fill();
        for (let i = 0; i < pts.length; i++) {   // round drips hanging from the icing
          const [x, y] = pts[i], wv = Math.floor((x + dist * par) / 8);
          if (Math.abs(Math.sin(wv * 2.3)) < 0.8) continue;
          const L = 5 + Math.abs(Math.sin(wv)) * 7; ctx.beginPath(); ctx.moveTo(x - 2.5, y + 5); ctx.lineTo(x - 2.5, y + 5 + L); ctx.arc(x, y + 5 + L, 2.5, Math.PI, 0, true); ctx.lineTo(x + 2.5, y + 5); ctx.closePath(); ctx.fill();
        }
        const sp = ['#e53935', '#43a047', '#1e88e5', '#fdd835', '#8e24aa'];
        for (let i = 0; i < pts.length; i += 2) { const [x, y] = pts[i], wv = Math.floor((x + dist * par) / 8); ctx.fillStyle = sp[Math.abs(wv) % 5]; ctx.save(); ctx.translate(x + 3, y + 14 + (wv % 3) * 6); ctx.rotate(wv); ctx.fillRect(-2, -0.7, 4, 1.4); ctx.restore(); }
      }
    } else if (c.decor === 'volcano') {   // a big volcano breathing smoke, lava running down, embers in the air
      hills(shade(c.far, 1.2), 0.04, 50, 20, 260);
      const vx = wrapX(viewW * 0.62 - dist * 0.012, viewW + 420) - 210, vy = groundY - 170;
      const vg = ctx.createLinearGradient(vx - 160, 0, vx + 160, 0); vg.addColorStop(0, shade(c.far, 1.3)); vg.addColorStop(0.5, c.far); vg.addColorStop(1, shade(c.far, 0.6));
      ctx.fillStyle = vg; ctx.beginPath(); ctx.moveTo(vx - 200, groundY); ctx.quadraticCurveTo(vx - 70, vy + 70, vx - 26, vy); ctx.lineTo(vx + 26, vy); ctx.quadraticCurveTo(vx + 70, vy + 70, vx + 200, groundY); ctx.closePath(); ctx.fill();
      const pul = 0.7 + 0.3 * Math.sin(time * 2);
      const cg = ctx.createRadialGradient(vx, vy, 2, vx, vy, 60); cg.addColorStop(0, `rgba(255,200,80,${0.9 * pul})`); cg.addColorStop(0.4, `rgba(255,90,20,${0.5 * pul})`); cg.addColorStop(1, 'rgba(255,60,0,0)');
      ctx.fillStyle = cg; ctx.fillRect(vx - 60, vy - 60, 120, 90);
      ctx.save(); ctx.shadowColor = '#ff6d00'; ctx.shadowBlur = 10; ctx.strokeStyle = `rgba(255,${120 + 60 * pul | 0},20,0.95)`; ctx.lineWidth = 3; ctx.lineCap = 'round';
      for (const [dx, bend] of [[-14, -40], [10, 30], [-2, -10]]) { ctx.beginPath(); ctx.moveTo(vx + dx * 0.6, vy + 2); ctx.quadraticCurveTo(vx + dx + bend * 0.5, vy + 60, vx + dx * 3 + bend, vy + 140); ctx.stroke(); }
      ctx.restore();
      for (let k = 0; k < 6; k++) {   // smoke rising and spreading
        const ph = (time * 0.12 + k / 6) % 1, sy2 = vy - 10 - ph * 170, sx3 = vx + Math.sin(ph * 4 + k) * 14 + ph * 50, r2 = 14 + ph * 40;
        ctx.fillStyle = `rgba(70,50,50,${0.45 * (1 - ph)})`; ctx.beginPath(); ctx.arc(sx3, sy2, r2, 0, Math.PI * 2); ctx.fill();
      }
      for (let i = 0; i < 14; i++) {   // embers drifting up
        const ph = (time * 0.3 + hrand(i)) % 1, ex = wrapX(hrand(i + 3) * viewW + Math.sin(time + i) * 20, viewW), ey = groundY - ph * 260;
        ctx.fillStyle = `rgba(255,${150 + (i % 3) * 30},40,${1 - ph})`; ctx.fillRect(ex, ey, 2, 2);
      }
      hills(c.near, 0.4, 32, 22, 120);
    } else if (c.decor === 'ocean') drawSea(c);
    else if (W2 && W2.far) W2.far(c);
    else hills(c.far, 0.2, 70, 40, 180);
    if (c.decor !== 'ocean' && c.decor !== 'volcano' && c.decor !== 'candy' && !(W2 && W2.far)) hills(c.near, 0.45, 35, 26, 110);
    drawCritters(c);   // 1.0.48: someone crosses the far plane now and then
    scenery(c);
    if (W2 && W2.fx) W2.fx(c);
    if (c.decor === 'snow') {
      ctx.fillStyle = 'rgba(255,255,255,0.9)';
      for (let i = 0; i < 50; i++) {
        const hx = Math.sin(i * 91.7) * 1000, hs = Math.sin(i * 17.3) * 1000;
        const sp = 30 + (hs - Math.floor(hs)) * 40;
        const x = (((hx - Math.floor(hx)) * viewW - dist * 0.3 + Math.sin(time + i) * 10) % viewW + viewW) % viewW;
        const y = ((time * sp + i * 37) % (groundY + 20));
        ctx.fillRect(x, y, 3, 3);
      }
    }
  }

  // puffs [dx, dy, r] for each kind of cloud (1.0.49: 15 more kinds)
  const CLOUD_KINDS = [
    [[0, 0, 16], [18, -9, 20], [38, -4, 17], [54, 2, 12], [26, 4, 15], [-12, 4, 10]],          // cumulus
    [[0, 0, 9], [16, -3, 11], [34, -2, 10], [52, 0, 9], [70, 1, 7], [24, 3, 9], [44, 3, 8]],     // long, flat
    [[0, 0, 11], [12, -6, 13], [24, -1, 10]],                                                  // small puff
    [[0, 0, 15], [14, -14, 16], [8, -28, 13], [26, -6, 15], [36, 2, 12], [20, 4, 13]],           // towering
    [[0, 0, 12], [14, -8, 15], [30, -12, 17], [48, -6, 14], [62, 1, 10], [24, 4, 12], [42, 4, 11]],   // a big bank
    [[0, 0, 8], [10, -4, 10], [21, -2, 8]],                                                    // a tiny tuft
    [[0, 0, 13], [16, -12, 14], [30, -18, 16], [44, -10, 14], [56, 0, 11], [14, 4, 12], [36, 4, 13]],  // two humps
    [[0, 0, 10], [18, -2, 12], [38, -1, 11], [58, -3, 12], [78, 0, 10], [96, 2, 8]],             // a chain
    [[0, 0, 14], [10, -16, 12], [18, -30, 10], [24, -10, 13], [34, 1, 11]],                      // a leaning tower
    [[0, 0, 18], [22, -6, 22], [46, 0, 18], [24, 8, 16]],                                        // a fat round one
    [[0, 0, 7], [12, -5, 9], [26, -7, 10], [40, -5, 9], [54, -2, 8], [66, 0, 6]],                // a thin streak
    [[0, 0, 12], [12, -10, 13], [26, -14, 12], [40, -8, 13], [26, 4, 10]],                       // a crown
    [[0, 0, 15], [18, -4, 17], [36, -14, 19], [54, -4, 16], [70, 2, 12], [36, 6, 14]],           // a mountain cloud
    [[0, 0, 9], [12, -9, 11], [24, -14, 12], [36, -9, 11], [48, 0, 9], [24, 3, 8]],              // a dome
    [[0, 0, 11], [16, -6, 14], [32, -2, 12], [46, -8, 13], [60, -2, 11], [74, 2, 9]],            // a wavy row
    [[0, 0, 13], [8, -14, 11], [22, -18, 13], [34, -8, 12], [42, 2, 10]],                        // a puffed head
    [[0, 0, 10], [14, -2, 13], [30, 0, 11], [16, -14, 10]],                                      // a lump
    [[0, 0, 16], [20, -12, 18], [40, -20, 20], [62, -12, 17], [80, -2, 13], [96, 3, 10], [40, 6, 16], [66, 6, 13]],  // a storm front
    [[0, 0, 9], [10, -6, 10], [22, -9, 11], [34, -6, 10], [44, -1, 8]]                           // a soft bun
  ];
  const cloudCache = {};
  function cloudCanvas(puffs, base, night) {
    const key = CLOUD_KINDS.indexOf(puffs) + '|' + base + '|' + night;
    if (cloudCache[key]) return cloudCache[key];
    const R = 2;   // drawn at double size for sharpness
    let minX = 1e9, maxX = -1e9, minY = 1e9, maxY = -1e9;
    for (const [dx, dy, r] of puffs) { minX = Math.min(minX, dx - r); maxX = Math.max(maxX, dx + r); minY = Math.min(minY, dy - r); maxY = Math.max(maxY, dy + r); }
    const pad = 8, cv = document.createElement('canvas');
    cv.width = Math.ceil((maxX - minX + pad * 2) * R); cv.height = Math.ceil((maxY - minY + pad * 2) * R);
    const g = cv.getContext('2d'); g.scale(R, R); g.translate(pad - minX, pad - minY);
    // the joined body: every puff plus a flat base from the first puff to the last, so there are no gaps
    const ends = puffs.slice().sort((a, b) => a[0] - b[0]), L = ends[0], Rr = ends[ends.length - 1];
    const baseY = puffs.reduce((a, q) => a + q[1], 0) / puffs.length + 3, baseH = Math.min(L[2], Rr[2]) * 1.4;
    const shape = (ox, oy, k) => {
      g.beginPath();
      for (const [dx, dy, r] of puffs) { g.moveTo(dx + ox + r * k, dy + oy); g.arc(dx + ox, dy + oy, r * k, 0, Math.PI * 2); }
      const x0 = L[0] + ox, x1 = Rr[0] + ox, yc = baseY + oy, rr = baseH / 2;   // the base capsule, same winding as the puffs (a union, no holes)
      g.moveTo(x0, yc - rr); g.lineTo(x1, yc - rr); g.arc(x1, yc, rr, -Math.PI / 2, Math.PI / 2); g.lineTo(x0, yc + rr); g.arc(x0, yc, rr, Math.PI / 2, Math.PI * 1.5); g.closePath();
    };
    g.fillStyle = night ? 'rgba(60,70,110,1)' : shade(base === '#ffffff' ? '#c5d0e6' : base, 0.85); shape(3, 5, 1); g.fill();   // the shadow layer
    g.fillStyle = (() => { const gr = g.createLinearGradient(0, minY, 0, maxY); gr.addColorStop(0, base); gr.addColorStop(0.55, base); gr.addColorStop(1, shade(base === '#ffffff' ? '#dfe7f3' : base, 0.9)); return gr; })();
    shape(0, 0, 1); g.fill();
    g.fillStyle = 'rgba(255,255,255,0.7)';   // sunlit tops
    g.beginPath(); for (const [dx, dy, r] of puffs) { const hx = dx - r * 0.28, hy = dy - r * 0.32; g.moveTo(hx + r * 0.5, hy); g.arc(hx, hy, r * 0.5, 0, Math.PI * 2); } g.fill();
    const out = { cv, ox: minX - pad, oy: minY - pad, R };
    cloudCache[key] = out; return out;
  }
  function cloud(x, y, s, puffs, c, alpha) {
    puffs = puffs || CLOUD_KINDS[0];
    const night = c ? c.night > 0.5 : false, base = (c && c.cloud) || '#ffffff';
    const cc = cloudCanvas(puffs, base, night);
    ctx.save(); ctx.globalAlpha = (alpha || 1) * (night ? 0.16 : 0.92);
    ctx.drawImage(cc.cv, x + cc.ox * s, y + cc.oy * s, cc.cv.width / cc.R * s, cc.cv.height / cc.R * s);
    ctx.restore();
  }


  // the beach: flat sea up to the horizon with moving crests, glints, a sail and the surf at the shore
  function drawSea(c) {
    const hz = groundY - 92;
    const sg = ctx.createLinearGradient(0, hz, 0, groundY);
    sg.addColorStop(0, shade(c.far, 0.9)); sg.addColorStop(0.6, c.far); sg.addColorStop(1, c.near);
    ctx.fillStyle = sg; ctx.fillRect(0, hz, viewW, groundY - hz);
    ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.fillRect(0, hz, viewW, 1.5);
    // distant island and a sail
    const ix = ((viewW * 0.6 - dist * 0.03) % (viewW + 300) + viewW + 300) % (viewW + 300) - 150;
    ctx.fillStyle = shade(c.far, 0.7); ctx.beginPath(); ctx.ellipse(ix, hz + 1, 60, 10, 0, Math.PI, 0); ctx.fill();
    const bx = ((viewW * 0.25 - dist * 0.05 + time * 6) % (viewW + 200) + viewW + 200) % (viewW + 200) - 100, by = hz + 14;
    ctx.fillStyle = '#5d4037'; ctx.beginPath(); ctx.moveTo(bx - 12, by); ctx.lineTo(bx + 12, by); ctx.lineTo(bx + 8, by + 4); ctx.lineTo(bx - 8, by + 4); ctx.fill();
    ctx.fillStyle = '#fafafa'; ctx.beginPath(); ctx.moveTo(bx, by - 1); ctx.lineTo(bx, by - 20); ctx.lineTo(bx + 10, by - 2); ctx.fill();
    ctx.fillStyle = '#ef5350'; ctx.beginPath(); ctx.moveTo(bx - 1, by - 1); ctx.lineTo(bx - 1, by - 15); ctx.lineTo(bx - 8, by - 2); ctx.fill();
    // wave crests: thinner and slower near the horizon
    ctx.strokeStyle = 'rgba(255,255,255,0.55)'; ctx.lineCap = 'round';
    for (let row = 0; row < 6; row++) {
      const y = hz + 10 + row * row * 2.3 + row * 4, par = 0.05 + row * 0.07, sp = 34 + row * 20;
      ctx.lineWidth = 0.8 + row * 0.35;
      for (let i = 0; i < viewW / sp + 2; i++) {
        const x = ((i * sp + row * 17 - dist * par + Math.sin(time + row) * 4) % (viewW + sp) + viewW + sp) % (viewW + sp) - sp / 2, w = 6 + row * 2.5;
        ctx.beginPath(); ctx.moveTo(x - w, y); ctx.quadraticCurveTo(x, y - 2 - row * 0.4, x + w, y); ctx.stroke();
      }
    }
    // sun glints
    for (let i = 0; i < 14; i++) {
      const a = Math.max(0, Math.sin(time * 3 + i * 1.7));
      if (a < 0.7) continue;
      ctx.fillStyle = `rgba(255,255,240,${(a - 0.7) * 3})`;
      ctx.fillRect(viewW * 0.62 + Math.sin(i * 7.3) * 70, hz + 6 + (i * 11) % 60, 4, 1.5);
    }
    // surf at the shore
    const sy = groundY - 8;
    ctx.fillStyle = 'rgba(255,255,255,0.85)'; ctx.beginPath(); ctx.moveTo(0, groundY);
    for (let x = 0; x <= viewW + 10; x += 10) ctx.lineTo(x, sy + Math.sin((x + dist * 0.6) / 22 + time * 2) * 2.5);
    ctx.lineTo(viewW, groundY); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    for (let x = -(dist * 0.6 % 40); x < viewW; x += 40) { ctx.beginPath(); ctx.arc(x + Math.sin(x + time * 3) * 3, sy - 4, 1.6, 0, Math.PI * 2); ctx.fill(); }
  }

  function hills(col, par, base, amp, wl) {
    // 1.0.47: depth — a lit crest line, a darker foot, small bushes / rocks along the ridge
    const pts = [];
    for (let x = -10; x <= viewW + 10; x += 8) { const w = x + dist * par; pts.push([x, groundY - base - amp * Math.sin(w / wl) - amp * 0.5 * Math.sin(w / (wl * 0.43) + 1)]); }
    const hg = ctx.createLinearGradient(0, groundY - base - amp * 1.6, 0, groundY);
    hg.addColorStop(0, shade(col, 1.16)); hg.addColorStop(0.6, col); hg.addColorStop(1, shade(col, 0.78));
    ctx.fillStyle = hg;
    ctx.beginPath(); ctx.moveTo(-10, groundY); for (const [x, y] of pts) ctx.lineTo(x, y); ctx.lineTo(viewW + 10, groundY); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = shade(col, 1.35); ctx.globalAlpha = 0.55; ctx.lineWidth = 2; ctx.lineJoin = 'round';
    ctx.beginPath(); pts.forEach(([x, y], i) => i ? ctx.lineTo(x, y + 1) : ctx.moveTo(x, y + 1)); ctx.stroke(); ctx.globalAlpha = 1;
    // 1.0.48: no more bumps on the ridge (they looked like little hills riding along)
  }

  // 1.0.52: a palm drawn properly — a curved tapered trunk with ring scars, pinnate fronds (a midrib with
  // leaflets on both sides, light on top, darker below) drooping and swaying, a cluster of fruit under the crown
  function drawPalm(g, kind, seed) {
    const sw = Math.sin(time * 1.2 + seed) * 0.06, date = kind === 'date';
    const top = { x: date ? 3 : 10, y: -50 };
    g.fillStyle = 'rgba(0,0,0,0.16)'; g.beginPath(); g.ellipse(2, 0, 14, 2.8, 0, 0, Math.PI * 2); g.fill();
    // the trunk: two curved edges, a bark gradient, ring scars
    const T = f => ({ x: top.x * f * f + (date ? -2 : 4) * 2 * f * (1 - f), y: top.y * f }), Wd = f => 3.4 - 1.6 * f;
    const tg = g.createLinearGradient(-4, 0, 6, 0); tg.addColorStop(0, '#a1887f'); tg.addColorStop(0.45, '#8d6e63'); tg.addColorStop(1, '#4e342e');
    g.fillStyle = tg; g.beginPath();
    for (let f = 0; f <= 1.001; f += 0.1) { const q = T(f); f ? g.lineTo(q.x - Wd(f), q.y) : g.moveTo(q.x - Wd(f), q.y); }
    for (let f = 1; f >= -0.001; f -= 0.1) { const q = T(f); g.lineTo(q.x + Wd(f), q.y); }
    g.closePath(); g.fill();
    for (let f = 0.06; f < 0.97; f += 0.075) { const q = T(f), w = Wd(f); g.strokeStyle = 'rgba(60,40,25,0.55)'; g.lineWidth = 0.8; g.beginPath(); g.moveTo(q.x - w, q.y + 0.6); g.quadraticCurveTo(q.x, q.y - 1, q.x + w, q.y + 0.6); g.stroke();
      g.strokeStyle = 'rgba(255,235,210,0.25)'; g.lineWidth = 0.5; g.beginPath(); g.moveTo(q.x - w + 0.5, q.y - 0.4); g.lineTo(q.x - w * 0.2, q.y - 0.9); g.stroke(); }
    // the fronds: back ones darker, front ones lighter
    const fronds = date ? [[-2.9, 0.75, 20], [-2.4, 0.8, 22], [-1.9, 0.9, 21], [-1.2, 0.95, 20], [-0.6, 0.9, 22], [0.0, 0.8, 20], [0.4, 0.7, 17]]
                        : [[-3.0, 0.75, 22], [-2.5, 0.8, 24], [-1.95, 0.9, 23], [-1.4, 0.95, 22], [-0.8, 0.9, 24], [-0.25, 0.85, 22], [0.3, 0.75, 19]];
    fronds.forEach(([a0, k, L], i) => {
      const a = a0 + sw * (1 + i * 0.15), droop = 0.9 + (Math.abs(a0 + 1.5) * 0.25);
      const pts = []; for (let q = 0; q <= 8; q++) { const f = q / 8; pts.push([top.x + Math.cos(a) * L * f, top.y + Math.sin(a) * L * f * 0.55 + f * f * L * 0.55 * droop]); }
      const back = i % 2 === 0, base = date ? '#689f38' : '#43a047';
      for (let q = 1; q < 8; q++) {   // leaflets on both sides of the midrib
        const [x, y] = pts[q], dx = pts[q + 1][0] - pts[q - 1][0], dy = pts[q + 1][1] - pts[q - 1][1], dl = Math.hypot(dx, dy) || 1, nx = -dy / dl, ny = dx / dl, ll = 6.5 * (1 - q / 10);
        for (const sd of [-1, 1]) {
          g.fillStyle = shade(base, (back ? 0.72 : 1) * (sd > 0 ? 0.85 : 1.12) * k);
          g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + nx * sd * ll * 0.6 + dx / dl * 2, y + ny * sd * ll * 0.6 + dy / dl * 2 + 1.5, x + nx * sd * ll + dx / dl * 3, y + ny * sd * ll + dy / dl * 3 + 2.4); g.lineTo(x + dx / dl * 2.6, y + dy / dl * 2.6); g.closePath(); g.fill();
        }
      }
      g.strokeStyle = shade(base, back ? 0.55 : 0.7); g.lineWidth = 0.9; g.lineCap = 'round'; g.beginPath(); pts.forEach(([x, y], q) => q ? g.lineTo(x, y) : g.moveTo(x, y)); g.stroke();
    });
    // the fruit under the crown
    if (date) { for (let q = 0; q < 9; q++) { const x = top.x - 3 + (q % 3) * 2.2, y = top.y + 3 + Math.floor(q / 3) * 2; g.fillStyle = q % 2 ? '#d84315' : '#bf360c'; g.beginPath(); g.ellipse(x, y, 1.1, 1.5, 0, 0, Math.PI * 2); g.fill(); } }
    else for (const [dx, dy] of [[-2, 2.5], [1.8, 3], [0, 5]]) { const cg = g.createRadialGradient(top.x + dx - 0.8, top.y + dy - 0.8, 0.3, top.x + dx, top.y + dy, 2.6); cg.addColorStop(0, '#8d6e63'); cg.addColorStop(1, '#3e2723'); g.fillStyle = cg; g.beginPath(); g.arc(top.x + dx, top.y + dy, 2.4, 0, Math.PI * 2); g.fill(); }
    const cr = g.createRadialGradient(top.x, top.y, 0.5, top.x, top.y, 4); cr.addColorStop(0, '#6d4c41'); cr.addColorStop(1, 'rgba(109,76,65,0)'); g.fillStyle = cr; g.beginPath(); g.arc(top.x, top.y, 4, 0, Math.PI * 2); g.fill();
  }
  // trees / pines / cacti / street lamps / crystals between the hills and the track
  function scenery(c) {
    const biome = { snow: 'winter', dunes: 'desert', city: 'city', space: 'space', ocean: 'ocean', jungle: 'jungle', volcano: 'volcano', candy: 'candy' }[c.decor] || 'wild';
    const span = viewW + 400, base = groundY;
    for (let i = 0; i < 7; i++) {
      const hsh = Math.sin(i * 51.3) * 1000, rnd = hsh - Math.floor(hsh);
      const x = ((i * 157 + rnd * 90 - dist * 0.62) % span + span) % span - 200, s = 0.75 + rnd * 0.5;
      ctx.save(); ctx.translate(x, base); ctx.scale(s, s);
      if (WORLD[c.decor] && WORLD[c.decor].scen) WORLD[c.decor].scen(c, i, rnd);
      else if (biome === 'wild') {   // a round leafy tree: bark gradient, a crown in three tones, a gentle sway
        const sw = Math.sin(time * 1.1 + i) * 1.2;
        ctx.fillStyle = 'rgba(0,0,0,0.15)'; ctx.beginPath(); ctx.ellipse(0, 0, 16, 3, 0, 0, Math.PI * 2); ctx.fill();
        const tg = ctx.createLinearGradient(-3, 0, 3, 0); tg.addColorStop(0, shade(c.dirt, 0.6)); tg.addColorStop(0.5, shade(c.dirt, 1)); tg.addColorStop(1, shade(c.dirt, 0.5));
        ctx.fillStyle = tg; ctx.beginPath(); ctx.moveTo(-3.5, 0); ctx.lineTo(-2, -28); ctx.lineTo(2, -28); ctx.lineTo(3.5, 0); ctx.closePath(); ctx.fill();
        const blobs = [[0, -38, 16], [-11, -29, 11], [11, -29, 11], [-5, -46, 9], [7, -44, 9]];
        for (const [k3, dy, a] of [[0.62, 2, 1], [0.92, 0, 1], [1.25, -2.5, 0.6]]) {
          ctx.fillStyle = shade(c.near, k3); ctx.globalAlpha = a;
          for (const [cx2, cy2, r2] of blobs) { ctx.beginPath(); ctx.arc(cx2 + sw + (k3 > 1 ? -3 : 0), cy2 + dy, r2 * (k3 > 1 ? 0.55 : 1), 0, Math.PI * 2); ctx.fill(); }
        }
        ctx.globalAlpha = 1;
      } else if (biome === 'winter') {   // a snowy pine: shaded tiers, snow caps, a sway at the top
        const sw = Math.sin(time * 1.2 + i) * 1;
        ctx.fillStyle = 'rgba(0,0,0,0.15)'; ctx.beginPath(); ctx.ellipse(0, 0, 16, 3, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#5d4037'; ctx.fillRect(-2.5, -10, 5, 10);
        for (let k = 0; k < 3; k++) {
          const y0 = -10 - k * 13, w = 18 - k * 4, tx = sw * k * 0.5;
          const pg = ctx.createLinearGradient(-w, 0, w, 0); pg.addColorStop(0, '#3f8f68'); pg.addColorStop(0.5, '#2e6b4f'); pg.addColorStop(1, '#1b4332');
          ctx.fillStyle = pg; ctx.beginPath(); ctx.moveTo(-w, y0); ctx.lineTo(tx, y0 - 18); ctx.lineTo(w, y0); ctx.quadraticCurveTo(0, y0 + 3, -w, y0); ctx.fill();
          ctx.fillStyle = '#f4f8fc'; ctx.beginPath(); ctx.moveTo(-w * 0.6, y0 - 7); ctx.lineTo(tx, y0 - 18); ctx.lineTo(w * 0.6, y0 - 7); ctx.quadraticCurveTo(w * 0.2, y0 - 9, 0, y0 - 6); ctx.quadraticCurveTo(-w * 0.3, y0 - 9, -w * 0.6, y0 - 7); ctx.fill();
        }
      } else if (biome === 'desert') {   // a saguaro: rounded gradient arms, ribs, spines
        ctx.fillStyle = 'rgba(0,0,0,0.15)'; ctx.beginPath(); ctx.ellipse(0, 0, 14, 3, 0, 0, Math.PI * 2); ctx.fill();
        const cg = ctx.createLinearGradient(-6, 0, 6, 0); cg.addColorStop(0, '#7cb342'); cg.addColorStop(0.5, '#5e8c3a'); cg.addColorStop(1, '#3d5c25');
        ctx.fillStyle = cg;
        roundRectOn(ctx, -5, -40, 10, 40, 5); ctx.fill();
        roundRectOn(ctx, -15, -28, 6, 16, 3); ctx.fill(); roundRectOn(ctx, -15, -16, 12, 5, 2.5); ctx.fill();
        roundRectOn(ctx, 9, -34, 6, 14, 3); ctx.fill(); roundRectOn(ctx, 3, -24, 12, 5, 2.5); ctx.fill();
        ctx.strokeStyle = 'rgba(40,70,20,0.5)'; ctx.lineWidth = 0.8; for (const dx of [-2, 1.5]) { ctx.beginPath(); ctx.moveTo(dx, -38); ctx.lineTo(dx, -1); ctx.stroke(); }
        ctx.strokeStyle = 'rgba(255,255,230,0.8)'; ctx.lineWidth = 0.5; for (let q = -36; q < -2; q += 5) { ctx.beginPath(); ctx.moveTo(5, q); ctx.lineTo(7, q - 1); ctx.moveTo(-5, q + 2); ctx.lineTo(-7, q + 1); ctx.stroke(); }
        ctx.fillStyle = '#f48fb1'; ctx.beginPath(); ctx.arc(0, -41, 2, 0, Math.PI * 2); ctx.fill();
      } else if (biome === 'ocean' && i % 3 === 1) {   // beach umbrella
        ctx.strokeStyle = '#eceff1'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(3, -34); ctx.stroke();
        const cols = i % 2 ? ['#e53935', '#fafafa'] : ['#1e88e5', '#fafafa'];
        for (let k = 0; k < 6; k++) {
          ctx.fillStyle = cols[k % 2]; ctx.beginPath(); ctx.moveTo(3, -40);
          ctx.arc(3, -28, 18, Math.PI + k * Math.PI / 6, Math.PI + (k + 1) * Math.PI / 6); ctx.closePath(); ctx.fill();
        }
        const ug = ctx.createLinearGradient(0, -40, 0, -28); ug.addColorStop(0, 'rgba(255,255,255,0.3)'); ug.addColorStop(1, 'rgba(0,0,0,0.18)');
        ctx.fillStyle = ug; ctx.beginPath(); ctx.moveTo(3, -40); ctx.arc(3, -28, 18, Math.PI, Math.PI * 2); ctx.closePath(); ctx.fill();
        ctx.fillStyle = 'rgba(0,0,0,0.15)'; ctx.beginPath(); ctx.ellipse(6, 1, 16, 3, 0, 0, Math.PI * 2); ctx.fill();
      } else if (biome === 'ocean' && i % 3 === 2) {   // sand castle
        const sg = ctx.createLinearGradient(-12, 0, 12, 0); sg.addColorStop(0, '#f0cf86'); sg.addColorStop(1, '#c4954a');
        ctx.fillStyle = sg; ctx.fillRect(-12, -12, 24, 12); ctx.fillRect(-9, -22, 7, 10); ctx.fillRect(2, -22, 7, 10);
        ctx.fillStyle = '#d4a955'; for (const tx of [-9, -5.5, 2, 5.5]) ctx.fillRect(tx, -25, 3.5, 3);
        ctx.fillStyle = '#8d6e3a'; ctx.beginPath(); ctx.arc(0, -4, 2.2, Math.PI, 0); ctx.lineTo(2.2, 0); ctx.lineTo(-2.2, 0); ctx.fill();
        ctx.strokeStyle = '#757575'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(5.5, -25); ctx.lineTo(5.5, -33); ctx.stroke();
        ctx.fillStyle = '#e53935'; ctx.beginPath(); ctx.moveTo(5.5, -33); ctx.quadraticCurveTo(8, -32 + Math.sin(time * 6) * 1.2, 11, -31); ctx.lineTo(5.5, -29); ctx.fill();
      } else if (biome === 'ocean' || biome === 'jungle') {   // a palm (1.0.52: drawPalm)
        drawPalm(ctx, 'coconut', i);
      } else if (biome === 'volcano') {   // a lava rock with glowing cracks
        const rg = ctx.createLinearGradient(-14, -20, 14, 0); rg.addColorStop(0, '#5d4037'); rg.addColorStop(1, '#1f120e');
        ctx.fillStyle = rg; ctx.beginPath(); ctx.moveTo(-14, 0); ctx.lineTo(-8, -16); ctx.lineTo(4, -20); ctx.lineTo(14, 0); ctx.fill();
        ctx.save(); ctx.shadowColor = '#ff6d00'; ctx.shadowBlur = 6; ctx.strokeStyle = `rgba(255,${120 + Math.floor(Math.sin(time * 3 + i) * 40)},0,0.9)`; ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.moveTo(-6, -12); ctx.lineTo(-3, -6); ctx.lineTo(-5, 0); ctx.moveTo(4, -16); ctx.lineTo(6, -8); ctx.lineTo(3, 0); ctx.stroke(); ctx.restore();
      } else if (biome === 'candy') {   // a lollipop with a swirl and a shine
        ctx.fillStyle = '#fafafa'; ctx.fillRect(-1.5, -34, 3, 34);
        const lc = ['#ec407a', '#ab47bc', '#29b6f6', '#ffca28'][i % 4];
        const lg = ctx.createRadialGradient(-3, -46, 1, 0, -42, 12); lg.addColorStop(0, shade(lc, 1.4)); lg.addColorStop(1, shade(lc, 0.8));
        ctx.fillStyle = lg; ctx.beginPath(); ctx.arc(0, -42, 11, 0, Math.PI * 2); ctx.fill();
        ctx.save(); ctx.translate(0, -42); ctx.rotate(time * 0.8); ctx.strokeStyle = 'rgba(255,255,255,0.85)'; ctx.lineWidth = 2;
        ctx.beginPath(); for (let a = 0; a < Math.PI * 4; a += 0.2) { const r2 = a * 0.85; a ? ctx.lineTo(Math.cos(a) * r2, Math.sin(a) * r2) : ctx.moveTo(0, 0); } ctx.stroke(); ctx.restore();
        ctx.fillStyle = 'rgba(255,255,255,0.6)'; ctx.beginPath(); ctx.ellipse(-4, -47, 3, 1.6, -0.6, 0, Math.PI * 2); ctx.fill();
      } else if (biome === 'city') {   // a street lamp with a warm cone of light that flickers a little
        ctx.fillStyle = '#37474f'; ctx.fillRect(-1.5, -52, 3, 52); ctx.fillRect(-1.5, -52, 12, 3); ctx.fillRect(-3, -3, 6, 3);
        const fl = 0.85 + 0.15 * Math.sin(time * 9 + i * 3);
        const cone = ctx.createLinearGradient(0, -46, 0, 0); cone.addColorStop(0, `rgba(255,224,130,${0.32 * fl})`); cone.addColorStop(1, 'rgba(255,224,130,0)');
        ctx.fillStyle = cone; ctx.beginPath(); ctx.moveTo(6, -46); ctx.lineTo(-4, 0); ctx.lineTo(26, 0); ctx.lineTo(14, -46); ctx.fill();
        const lg = ctx.createRadialGradient(10, -46, 0, 10, -46, 9); lg.addColorStop(0, '#fffde7'); lg.addColorStop(0.4, `rgba(255,224,130,${fl})`); lg.addColorStop(1, 'rgba(255,224,130,0)');
        ctx.fillStyle = lg; ctx.fillRect(1, -55, 18, 18);
      } else {   // space crystals: faceted, glowing, a slow pulse
        const cc = rnd > 0.5 ? '#7c4dff' : '#26c6da', pul = 0.6 + 0.4 * Math.sin(time * 2 + i);
        ctx.save(); ctx.shadowColor = cc; ctx.shadowBlur = 10 * pul;
        const kg = ctx.createLinearGradient(-8, 0, 9, 0); kg.addColorStop(0, shade(cc, 1.4)); kg.addColorStop(0.5, cc); kg.addColorStop(1, shade(cc, 0.6));
        ctx.fillStyle = kg; ctx.globalAlpha = 0.9;
        ctx.beginPath(); ctx.moveTo(-8, 0); ctx.lineTo(-4, -26); ctx.lineTo(1, -32); ctx.lineTo(5, -20); ctx.lineTo(9, 0); ctx.fill(); ctx.restore();
        ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.beginPath(); ctx.moveTo(-3, -4); ctx.lineTo(-1, -26); ctx.lineTo(1, -4); ctx.fill();
        ctx.globalAlpha = 1;
      }
      ctx.restore();
    }
  }

  function drawGround(c) {
    const dg = ctx.createLinearGradient(0, groundY, 0, viewH);
    dg.addColorStop(0, c.dirt); dg.addColorStop(1, shade(c.dirt, 0.55));
    ctx.fillStyle = dg; ctx.fillRect(0, groundY, viewW, viewH - groundY);
    // soil layers: two soft wavy bands
    for (const [dy, a] of [[30, 0.12], [58, 0.1]]) {
      ctx.fillStyle = `rgba(0,0,0,${a})`; ctx.beginPath(); ctx.moveTo(0, groundY + dy);
      for (let x = 0; x <= viewW + 20; x += 20) ctx.lineTo(x, groundY + dy + Math.sin((x + dist) * 0.02 + dy) * 3);
      ctx.lineTo(viewW, groundY + dy + 6); ctx.lineTo(0, groundY + dy + 6); ctx.closePath(); ctx.fill();
    }
    // pebbles: lit on top, a shadow under
    for (let i = 0, x0 = -(dist % 90); x0 + i * 90 < viewW + 90; i++) {
      const sx0 = x0 + i * 90, k = Math.floor((dist + sx0) / 90), hh = Math.sin(k * 12.7) * 1000, rr = hh - Math.floor(hh);
      for (const [px, py, rx, ry] of [[sx0 + rr * 40, groundY + 24 + rr * 26, 5 + rr * 4, 3 + rr * 2], [sx0 + 50 - rr * 20, groundY + 46 - rr * 10, 3 + rr * 3, 2]]) {
        ctx.fillStyle = 'rgba(0,0,0,0.22)'; ctx.beginPath(); ctx.ellipse(px + 1, py + 1.2, rx, ry, 0, 0, Math.PI * 2); ctx.fill();
        const pg = ctx.createLinearGradient(0, py - ry, 0, py + ry); pg.addColorStop(0, shade(c.dirt, 1.35)); pg.addColorStop(1, shade(c.dirt, 0.85));
        ctx.fillStyle = pg; ctx.beginPath(); ctx.ellipse(px, py, rx, ry, 0, 0, Math.PI * 2); ctx.fill();
      }
    }
    // grass band: a lit top, shade under it, a wavy edge
    const gg = ctx.createLinearGradient(0, groundY, 0, groundY + 12);
    gg.addColorStop(0, shade(c.grass, 1.2)); gg.addColorStop(1, shade(c.grass, 0.82));
    ctx.fillStyle = gg; ctx.fillRect(0, groundY, viewW, 12);
    ctx.fillStyle = shade(c.grass, 0.72);
    ctx.beginPath(); ctx.moveTo(0, groundY + 11); for (let x = 0; x <= viewW + 12; x += 6) ctx.lineTo(x, groundY + 11 + ((Math.floor((x + dist) / 6)) % 2) * 2); ctx.lineTo(viewW, groundY + 11); ctx.closePath(); ctx.fill();
    const ao = ctx.createLinearGradient(0, groundY + 12, 0, groundY + 20); ao.addColorStop(0, 'rgba(0,0,0,0.22)'); ao.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = ao; ctx.fillRect(0, groundY + 12, viewW, 8);
    ctx.fillStyle = 'rgba(255,255,255,0.18)'; ctx.fillRect(0, groundY, viewW, 1.5);
    if (c.decor === 'ocean') {   // sand: shells and starfish instead of grass tufts
      for (let x = -(dist % 70), i = 0; x < viewW; x += 70, i++) {
        const k = Math.floor((dist + x) / 70), hsh = Math.sin(k * 9.1) * 1000, r = hsh - Math.floor(hsh);
        if (r < 0.35) { ctx.fillStyle = '#ffab91'; ctx.beginPath(); ctx.arc(x + r * 60, groundY + 4, 3, Math.PI, 0); ctx.fill(); }
        else if (r > 0.85) { ctx.fillStyle = '#ff7043'; starPath(ctx, x + r * 40, groundY + 6, 3.4); ctx.fill(); }
      }
    } else {   // grass blades of different heights in two tones, swaying
      const holes = LV.gaps.map(gp => [sx(gp.x) - 2, sx(gp.x) + gp.w + 2]);
      for (let x = -(dist % 11); x < viewW; x += 11) {
        if (holes.some(([a, b]) => x > a && x < b)) continue;   // 1.0.52: nothing grows over a pit
        const k = Math.floor((dist + x) / 11), r = Math.abs(Math.sin(k * 3.7)), ht = 3 + r * 5, tip = Math.sin(time * 2.5 + k * 0.7) * 1.2;
        ctx.fillStyle = shade(c.grass, k % 2 ? 1.18 : 0.92);
        ctx.beginPath(); ctx.moveTo(x - 1.4, groundY + 1); ctx.quadraticCurveTo(x, groundY - ht * 0.5, x + tip, groundY - ht); ctx.quadraticCurveTo(x + 0.6, groundY - ht * 0.4, x + 1.6, groundY + 1); ctx.closePath(); ctx.fill();
      }
    }
    if (WORLD[c.decor] && WORLD[c.decor].ground) WORLD[c.decor].ground(c);
    // pits: rocky walls getting dark with depth, a lit rim (and bridges over them)
    for (const g of LV.gaps) {
      const x = sx(g.x);
      if (x > viewW || x + g.w < 0) continue;
      const pg = ctx.createLinearGradient(0, groundY, 0, viewH);
      pg.addColorStop(0, '#2a1a0e'); pg.addColorStop(0.5, '#0f0904'); pg.addColorStop(1, '#000');
      ctx.fillStyle = pg; ctx.fillRect(x, groundY, g.w, viewH - groundY);
      for (const [wx, dir] of [[x, 1], [x + g.w, -1]]) {   // the side walls
        const wg = ctx.createLinearGradient(wx, 0, wx + dir * 10, 0); wg.addColorStop(0, shade(c.dirt, 0.8)); wg.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = wg; ctx.fillRect(Math.min(wx, wx + dir * 10), groundY, 10, viewH - groundY);
      }
      ctx.strokeStyle = 'rgba(90,60,30,0.7)'; ctx.lineWidth = 1;   // roots hanging into the pit
      for (const [rx, L] of [[x + 3, 14], [x + g.w - 4, 10]]) { ctx.beginPath(); ctx.moveTo(rx, groundY + 10); ctx.quadraticCurveTo(rx + 2, groundY + 10 + L / 2, rx - 1 + Math.sin(time + rx) * 1.5, groundY + 10 + L); ctx.stroke(); }
      if (g.planks) {
        ctx.strokeStyle = '#8d6e63'; ctx.lineWidth = 1.6;   // the rope rails
        for (const ry of [-14, 1]) { ctx.beginPath(); ctx.moveTo(x, groundY + ry); ctx.quadraticCurveTo(x + g.w / 2, groundY + ry + 6, x + g.w, groundY + ry); ctx.stroke(); }
        for (const pl of g.planks) {
          const plx = sx(pl.x);
          if (plx > viewW || plx + pl.w < 0 || pl.dy > viewH) continue;
          const wg = ctx.createLinearGradient(0, groundY + pl.dy, 0, groundY + pl.dy + 9);
          wg.addColorStop(0, pl.fall >= 0 ? '#c08850' : '#d39a5c'); wg.addColorStop(1, pl.fall >= 0 ? '#7a4f26' : '#8d5a2e');
          ctx.fillStyle = wg; ctx.fillRect(plx + 1, groundY + pl.dy, pl.w - 2, 9);
          ctx.strokeStyle = 'rgba(80,45,15,0.45)'; ctx.lineWidth = 0.7; ctx.beginPath(); ctx.moveTo(plx + 3, groundY + pl.dy + 4); ctx.quadraticCurveTo(plx + pl.w / 2, groundY + pl.dy + 5.5, plx + pl.w - 3, groundY + pl.dy + 3.5); ctx.stroke();
          ctx.fillStyle = '#3e2723'; for (const nx of [3.5, pl.w - 4.5]) { ctx.beginPath(); ctx.arc(plx + nx, groundY + pl.dy + 2.5, 0.9, 0, Math.PI * 2); ctx.fill(); }
          ctx.strokeStyle = '#8d6e63'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(plx + pl.w / 2, groundY + pl.dy); ctx.lineTo(plx + pl.w / 2, groundY - 13); ctx.stroke();
        }
      }
    }
    // puddles: water, quicksand, slush, soda... depending on the world
    const pk = worldKind(c);
    for (const pd of LV.pud) {
      const x = sx(pd.x);
      if (x > viewW || x + pd.w < 0) continue;
      drawPuddle(pk, x, pd.w);
    }
  }

  // =====================================================================
  //  New worlds (1.0.23: sakura, autumn, underwater, mine, wild west).
  //  Each one: far layer, scenery, overlay effect, its own hazard, its own puddle, its own birds.
  //  All drawing here works in view coordinates on ctx (like drawBackground).
  // =====================================================================
  const wrapX = (x, span) => ((x % span) + span) % span;
  const hrand = i => { const h = Math.sin(i * 12.9898 + 4.1) * 43758.5453; return h - Math.floor(h); };
  function spikeTri(bx, by, w, h, tilt, fill, edge) {
    ctx.fillStyle = fill; ctx.beginPath(); ctx.moveTo(bx - w / 2, by); ctx.lineTo(bx + tilt, by - h); ctx.lineTo(bx + w / 2, by); ctx.closePath(); ctx.fill();
    if (edge) { ctx.strokeStyle = edge; ctx.lineWidth = 0.9; ctx.beginPath(); ctx.moveTo(bx - 0.5, by - 2); ctx.lineTo(bx + tilt - 0.3, by - h + 3); ctx.stroke(); }
  }
  const pudEll = (cx, cy, rx, ry, col) => { ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(cx, cy, Math.max(0.1, rx), Math.max(0.1, ry), 0, 0, Math.PI * 2); ctx.fill(); };

  const WORLD = {
    // ---------------- New Year forest: snowy firs with garlands, gifts, snowmen, a sleigh across the moon ----------------
    xmas: {
      birds: 'winter', splash: 'rgba(255,255,255,0.95)',
      far: c => {
        hills(c.far, 0.12, 80, 34, 170);
        // the dark-blue fir line on the far hills
        ctx.fillStyle = shade(c.far, 0.75);
        for (let i = 0; i < 26; i++) { const x = wrapX(i * 37 - dist * 0.18, viewW + 80) - 40, hh = 22 + (i * 13) % 18; ctx.beginPath(); ctx.moveTo(x - 9, groundY - 50); ctx.lineTo(x, groundY - 50 - hh); ctx.lineTo(x + 9, groundY - 50); ctx.fill(); }
        // a sleigh with reindeer crossing the sky now and then (1.0.44: redrawn — flies right to left,
        // the reindeer lead and face the way they fly, a smooth glide past the moon)
        const T = 22, k = (time % T) / T;
        if (k < 0.4) {
          const u = k / 0.4, sx2 = viewW + 80 - u * (viewW + 300), sy2 = groundY - 205 - Math.sin(u * Math.PI) * 35;
          ctx.save(); ctx.translate(sx2, sy2); ctx.rotate(-Math.cos(u * Math.PI) * 0.12);
          const sil = 'rgba(14,24,48,0.88)';
          ctx.strokeStyle = sil; ctx.lineWidth = 0.9; ctx.beginPath(); ctx.moveTo(-6, -4); ctx.lineTo(-58, -4); ctx.stroke();   // reins
          for (let r2 = 0; r2 < 3; r2++) {   // reindeer, heads to the left, legs galloping
            const rx = -24 - r2 * 17, ph = time * 12 + r2;
            ctx.fillStyle = sil; ctx.beginPath(); ctx.ellipse(rx, -4, 6.5, 2.8, 0, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.moveTo(rx - 5, -5); ctx.lineTo(rx - 8.5, -10); ctx.lineTo(rx - 6.5, -10.5); ctx.lineTo(rx - 3.5, -6); ctx.fill();
            ctx.beginPath(); ctx.ellipse(rx - 9.5, -10.5, 2.4, 1.6, -0.3, 0, Math.PI * 2); ctx.fill();
            ctx.strokeStyle = sil; ctx.lineWidth = 0.8; ctx.beginPath(); ctx.moveTo(rx - 9, -12); ctx.lineTo(rx - 8, -15.5); ctx.lineTo(rx - 10, -17); ctx.moveTo(rx - 8.3, -14); ctx.lineTo(rx - 6, -15.5); ctx.stroke();
            ctx.lineWidth = 1;
            for (const [lx, o] of [[-4, 0], [-2, Math.PI], [3, Math.PI], [5, 0]]) { const sw = Math.sin(ph + o) * 0.6; ctx.beginPath(); ctx.moveTo(rx + lx, -2); ctx.lineTo(rx + lx + Math.sin(sw) * 4, 2.5); ctx.stroke(); }
          }
          // the sleigh: a curved body on a runner, a rider and a sack
          ctx.fillStyle = sil; ctx.beginPath(); ctx.moveTo(-6, -6); ctx.lineTo(10, -6); ctx.quadraticCurveTo(14, -12, 17, -11); ctx.lineTo(16, 0); ctx.lineTo(-4, 0); ctx.quadraticCurveTo(-7, -2, -6, -6); ctx.fill();
          ctx.strokeStyle = sil; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(-9, 3); ctx.lineTo(16, 3); ctx.quadraticCurveTo(19, 3, 19, 0); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(-2, 0); ctx.lineTo(-2, 3); ctx.moveTo(12, 0); ctx.lineTo(12, 3); ctx.stroke();
          ctx.fillStyle = sil; ctx.beginPath(); ctx.arc(3, -10, 3.6, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.moveTo(0, -12.5); ctx.lineTo(4, -18); ctx.lineTo(6, -12); ctx.fill();
          ctx.beginPath(); ctx.ellipse(11, -9, 4.5, 4, 0, 0, Math.PI * 2); ctx.fill();
          ctx.restore();
        }
        hills(c.near, 0.4, 30, 14, 110);
      },
      scen: (c, i, rnd) => {
        if (i % 4 === 3) {   // snowman with a scarf
          pE(ctx, 0, -9, 10, 9, 0, '#f5f9ff'); pE(ctx, 0, -24, 7.5, 7, 0, '#f5f9ff'); pE(ctx, 0, -36, 5.5, 5.5, 0, '#f5f9ff');
          ctx.fillStyle = '#212121'; ctx.fillRect(-5, -44, 10, 2); ctx.fillRect(-3.5, -51, 7, 7);
          ctx.fillStyle = '#ff7043'; ctx.beginPath(); ctx.moveTo(1, -36); ctx.lineTo(8, -35); ctx.lineTo(1, -34); ctx.fill();
          ctx.fillStyle = '#212121'; ctx.fillRect(-2.5, -38.5, 1.5, 1.5); ctx.fillRect(1.5, -38.5, 1.5, 1.5); ctx.fillRect(-0.7, -26, 1.4, 1.4); ctx.fillRect(-0.7, -21, 1.4, 1.4);
          ctx.fillStyle = '#e53935'; ctx.fillRect(-6, -31, 12, 3); ctx.fillRect(2, -31, 3, 9);
          ctx.strokeStyle = '#6d4c41'; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(-7, -25); ctx.lineTo(-15, -31); ctx.moveTo(7, -25); ctx.lineTo(15, -32); ctx.stroke();
          return;
        }
        // decorated fir
        ctx.fillStyle = '#5d4037'; ctx.fillRect(-3, -10, 6, 10);
        for (let k = 0; k < 3; k++) {
          const y0 = -10 - k * 14, w = 20 - k * 5;
          ctx.fillStyle = '#1b5e20'; ctx.beginPath(); ctx.moveTo(-w, y0); ctx.lineTo(0, y0 - 20); ctx.lineTo(w, y0); ctx.fill();
          ctx.fillStyle = '#f4f8fc'; ctx.beginPath(); ctx.moveTo(-w * 0.55, y0 - 9); ctx.lineTo(0, y0 - 20); ctx.lineTo(w * 0.55, y0 - 9); ctx.lineTo(0, y0 - 12); ctx.fill();
        }
        const cols = ['#ff5252', '#ffeb3b', '#40c4ff', '#69f0ae', '#e040fb'];
        for (let k = 0; k < 9; k++) {
          const yy = -14 - k * 4.5, xx = Math.sin(k * 2.3) * (17 - k * 1.6), on = Math.sin(time * 4 + k * 1.7 + i) > -0.3;
          ctx.fillStyle = on ? cols[(k + i) % 5] : 'rgba(80,80,80,0.6)'; ctx.beginPath(); ctx.arc(xx, yy, 1.8, 0, Math.PI * 2); ctx.fill();
        }
        ctx.fillStyle = '#ffd54f'; starPath(ctx, 0, -55, 4.5); ctx.fill();
        if (i % 2) {   // gifts under the tree
          ctx.fillStyle = '#e53935'; ctx.fillRect(10, -8, 9, 8); ctx.fillStyle = '#ffeb3b'; ctx.fillRect(13.5, -8, 2, 8); ctx.fillRect(10, -5, 9, 2);
          ctx.fillStyle = '#1e88e5'; ctx.fillRect(-19, -6, 8, 6); ctx.fillStyle = '#fafafa'; ctx.fillRect(-15.8, -6, 1.6, 6);
        }
      },
      fx: c => {   // snowfall
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        for (let i = 0; i < 45; i++) {
          const sp = 25 + hrand(i) * 35, y = (time * sp + i * 37) % (groundY + 20);
          const x = wrapX(hrand(i + 11) * viewW - dist * 0.3 + Math.sin(time + i) * 10, viewW);
          ctx.beginPath(); ctx.arc(x, y, 1 + hrand(i + 3) * 1.6, 0, Math.PI * 2); ctx.fill();
        }
      },
      haz: (x, w, h, o) => {
        const gy = groundY, cx = x + w / 2, kind = o ? Math.floor(o.x / 97) % 2 : 0;
        if (kind === 0) {   // prickly holly bush with red berries
          const leaf = (lx, ly, a, sz) => {
            ctx.save(); ctx.translate(lx, ly); ctx.rotate(a); ctx.fillStyle = '#1b5e20';
            ctx.beginPath(); ctx.moveTo(-sz, 0);
            for (let q = 0; q <= 4; q++) { const t2 = q / 4; ctx.lineTo(-sz + t2 * sz * 2, -sz * 0.45 - (q % 2 ? sz * 0.3 : 0)); }
            ctx.lineTo(sz + 3, 0);
            for (let q = 4; q >= 0; q--) { const t2 = q / 4; ctx.lineTo(-sz + t2 * sz * 2, sz * 0.45 + (q % 2 ? sz * 0.3 : 0)); }
            ctx.closePath(); ctx.fill();
            ctx.strokeStyle = '#66bb6a'; ctx.lineWidth = 0.7; ctx.beginPath(); ctx.moveTo(-sz, 0); ctx.lineTo(sz, 0); ctx.stroke();
            ctx.restore();
          };
          leaf(cx - 6, gy - 7, -0.5, 7); leaf(cx + 6, gy - 8, -2.6, 7); leaf(cx - 2, gy - h * 0.55, -1.2, 8); leaf(cx + 3, gy - h * 0.7, -1.9, 8);
          ctx.fillStyle = '#d32f2f'; for (const [bx, by] of [[-1, 0.42], [2.5, 0.38], [0.5, 0.3]]) { ctx.beginPath(); ctx.arc(cx + bx, gy - h * by, 2.3, 0, Math.PI * 2); ctx.fill(); }
          ctx.fillStyle = 'rgba(255,255,255,0.7)'; ctx.beginPath(); ctx.arc(cx - 1.6, gy - h * 0.42 - 0.8, 0.7, 0, Math.PI * 2); ctx.fill();
        } else {   // a bundle of firecrackers with a burning fuse
          for (const [dx, hh, col] of [[-6, 0.7, '#e53935'], [6, 0.75, '#c62828'], [0, 0.9, '#ef5350']]) {
            const bx = cx + dx, top = gy - h * hh;
            const fg = ctx.createLinearGradient(bx - 4, 0, bx + 4, 0); fg.addColorStop(0, shade(col, 1.2)); fg.addColorStop(1, shade(col, 0.75));
            ctx.fillStyle = fg; ctx.fillRect(bx - 4, top, 8, gy - top);
            ctx.fillStyle = '#ffd54f'; ctx.fillRect(bx - 4, top + 3, 8, 1.6); ctx.fillRect(bx - 4, gy - 5, 8, 1.6);
          }
          const fx2 = cx, fy2 = gy - h * 0.9;
          ctx.strokeStyle = '#424242'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(fx2, fy2); ctx.quadraticCurveTo(fx2 + 3, fy2 - 5, fx2 + 1, fy2 - 8); ctx.stroke();
          for (let q = 0; q < 6; q++) { const a = time * 20 + q * 1.05, r2 = 2 + ((time * 7 + q) % 1) * 4; ctx.fillStyle = q % 2 ? '#fff59d' : '#ff9800'; ctx.fillRect(fx2 + 1 + Math.cos(a) * r2, fy2 - 8 + Math.sin(a) * r2, 1.5, 1.5); }
        }
      },
      pud: (x, w) => {   // a snowdrift: you sink in and slow down
        const cx = x + w / 2, cy = groundY + 1;
        ctx.fillStyle = 'rgba(160,190,225,0.6)'; ctx.beginPath(); ctx.ellipse(cx + 3, cy + 1, w / 2, 7, 0, Math.PI, 0); ctx.fill();
        ctx.fillStyle = '#fbfdff'; ctx.beginPath(); ctx.ellipse(cx, cy, w / 2, 8, 0, Math.PI, 0); ctx.fill();
        ctx.fillStyle = 'rgba(200,220,245,0.8)'; ctx.beginPath(); ctx.ellipse(cx + w * 0.15, cy - 1, w * 0.25, 3, 0, Math.PI, 0); ctx.fill();
        for (let i = 0; i < 4; i++) { const a = Math.max(0, Math.sin(time * 3 + i * 1.9 + x * 0.01)); if (a > 0.7) { ctx.fillStyle = `rgba(255,255,255,${(a - 0.7) * 3})`; starPath(ctx, cx - w * 0.3 + i * w * 0.2, cy - 5, 1.8); ctx.fill(); } }
      }
    },
    // ---------------- Sakura: spring garden, pink trees, torii gates, falling petals ----------------
    sakura: {
      birds: 'sakura', splash: 'rgba(150,200,255,0.9)',
      far: c => {   // 1.0.48: two mountains lit from the left, snow caps, mist at the foot, a pagoda with red roofs
        for (const [xk, hh, par, k3] of [[0.62, 120, 0.03, 1.15], [0.3, 175, 0.04, 1]]) {
          const x0 = wrapX(viewW * xk - dist * par, viewW + 300) - 150, top = groundY - hh;
          const lg = ctx.createLinearGradient(x0 - 160, 0, x0 + 170, 0); lg.addColorStop(0, shade(c.far, 1.2 * k3)); lg.addColorStop(0.5, shade(c.far, k3)); lg.addColorStop(0.51, shade(c.far, 0.8 * k3)); lg.addColorStop(1, shade(c.far, 0.7 * k3));
          ctx.fillStyle = lg; ctx.beginPath(); ctx.moveTo(x0 - 170, groundY); ctx.quadraticCurveTo(x0 - 60, top + 50, x0, top); ctx.quadraticCurveTo(x0 + 60, top + 50, x0 + 180, groundY); ctx.closePath(); ctx.fill();
          const sg = ctx.createLinearGradient(x0 - 30, 0, x0 + 30, 0); sg.addColorStop(0, '#ffffff'); sg.addColorStop(0.5, '#ffffff'); sg.addColorStop(0.51, '#dfe6f2'); sg.addColorStop(1, '#c9d3e6');
          ctx.fillStyle = sg; ctx.beginPath(); ctx.moveTo(x0 - 28, top + 30); ctx.quadraticCurveTo(x0 - 12, top + 8, x0, top); ctx.quadraticCurveTo(x0 + 12, top + 8, x0 + 30, top + 30);
          for (let q = 4; q >= -4; q--) ctx.lineTo(x0 + q * 7, top + 30 - (q % 2 ? 10 : 0) + Math.abs(q)); ctx.closePath(); ctx.fill();
        }
        const mist = ctx.createLinearGradient(0, groundY - 90, 0, groundY - 20); mist.addColorStop(0, 'rgba(255,240,248,0)'); mist.addColorStop(1, 'rgba(255,240,248,0.75)');
        ctx.fillStyle = mist; ctx.fillRect(0, groundY - 90, viewW, 70);
        const px2 = wrapX(viewW * 0.8 - dist * 0.12, viewW + 160) - 80;
        for (let k = 0; k < 4; k++) {   // the pagoda: dark walls, curved red roofs with light edges
          const w = 34 - k * 6, y = groundY - 30 - k * 20;
          const wg = ctx.createLinearGradient(px2 - w * 0.35, 0, px2 + w * 0.35, 0); wg.addColorStop(0, '#6d4c41'); wg.addColorStop(1, '#3e2723');
          ctx.fillStyle = wg; ctx.fillRect(px2 - w * 0.35, y, w * 0.7, 20);
          ctx.fillStyle = '#ffe082'; ctx.fillRect(px2 - 2, y + 6, 4, 6);
          ctx.fillStyle = '#c62828'; ctx.beginPath(); ctx.moveTo(px2 - w / 2 - 7, y + 3); ctx.quadraticCurveTo(px2, y - 9, px2 + w / 2 + 7, y + 3); ctx.lineTo(px2 + w / 2 + 2, y + 1); ctx.quadraticCurveTo(px2, y - 4, px2 - w / 2 - 2, y + 1); ctx.closePath(); ctx.fill();
          ctx.strokeStyle = '#ff8a80'; ctx.lineWidth = 0.8; ctx.beginPath(); ctx.moveTo(px2 - w / 2 - 7, y + 3); ctx.quadraticCurveTo(px2, y - 9, px2 + w / 2 + 7, y + 3); ctx.stroke();
        }
        ctx.strokeStyle = '#ffd54f'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(px2, groundY - 92); ctx.lineTo(px2, groundY - 104); ctx.stroke();
        hills(c.near, 0.3, 40, 18, 140);
      },
      scen: (c, i, rnd) => {
        if (i % 4 === 3) {   // torii gate
          ctx.fillStyle = '#d32f2f'; ctx.fillRect(-14, -46, 4, 46); ctx.fillRect(10, -46, 4, 46); ctx.fillRect(-16, -38, 32, 3);
          ctx.fillStyle = '#212121'; ctx.beginPath(); ctx.moveTo(-22, -48); ctx.quadraticCurveTo(0, -52, 22, -48); ctx.lineTo(20, -44); ctx.lineTo(-20, -44); ctx.fill();
          return;
        }
        ctx.strokeStyle = '#5d4037'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(-3, -18, 2, -30); ctx.stroke();
        ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(1, -24); ctx.lineTo(12, -34); ctx.moveTo(0, -22); ctx.lineTo(-10, -30); ctx.stroke();
        for (const [bx, by, r, col] of [[0, -40, 15, '#f8bbd0'], [-12, -32, 11, '#f48fb1'], [13, -33, 11, '#f8bbd0'], [-4, -48, 9, '#fce4ec'], [7, -45, 8, '#f48fb1']]) {
          ctx.fillStyle = col; ctx.beginPath(); ctx.arc(bx, by, r, 0, Math.PI * 2); ctx.fill();
        }
        ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.beginPath(); ctx.arc(-4, -46, 5, 0, Math.PI * 2); ctx.fill();
      },
      fx: c => {   // falling petals
        for (let i = 0; i < 26; i++) {
          const sp = 20 + hrand(i) * 25, y = (time * sp + i * 41) % (groundY + 20) - 10;
          const x = wrapX(hrand(i + 50) * viewW - dist * 0.35 - time * 30 + Math.sin(time * 1.5 + i) * 18, viewW);
          ctx.fillStyle = i % 3 ? '#f8bbd0' : '#fce4ec';
          ctx.beginPath(); ctx.ellipse(x, y, 3, 1.6, time * 2 + i, 0, Math.PI * 2); ctx.fill();
        }
      },
      haz: (x, w, h) => {   // sharpened bamboo stakes
        const gy = groundY;
        for (const [dx, hh] of [[-8, 0.75], [8, 0.82], [0, 1]]) {
          const bx = x + w / 2 + dx, ty = gy - h * hh;
          const bg = ctx.createLinearGradient(bx - 3.5, 0, bx + 3.5, 0); bg.addColorStop(0, '#9ccc65'); bg.addColorStop(1, '#558b2f');
          ctx.fillStyle = bg; ctx.beginPath(); ctx.moveTo(bx - 3.5, gy); ctx.lineTo(bx - 3.5, ty + 6); ctx.lineTo(bx + 3.5, ty - 2); ctx.lineTo(bx + 3.5, gy); ctx.closePath(); ctx.fill();
          ctx.fillStyle = '#f1f8e9'; ctx.beginPath(); ctx.moveTo(bx - 3.5, ty + 6); ctx.lineTo(bx + 3.5, ty - 2); ctx.lineTo(bx + 1.5, ty + 4.5); ctx.fill();
          ctx.strokeStyle = '#33691e'; ctx.lineWidth = 1.2; for (let yy = gy - 9; yy > ty + 8; yy -= 9) { ctx.beginPath(); ctx.moveTo(bx - 3.5, yy); ctx.lineTo(bx + 3.5, yy); ctx.stroke(); }
        }
      },
      pud: (x, w) => {   // koi pond with a lily pad and petals
        const cx = x + w / 2, cy = groundY + 3;
        pudEll(cx, cy, w / 2, 7, 'rgba(66,165,245,0.9)'); pudEll(cx, cy + 1, w * 0.42, 4.5, 'rgba(30,110,200,0.6)');
        pudEll(cx + w * 0.2, cy - 1, 6, 2.4, '#66bb6a');
        const kx = cx - w * 0.2 + Math.sin(time * 1.5 + x * 0.01) * w * 0.15;
        pudEll(kx, cy + 1, 4, 1.4, '#ff7043'); pudEll(kx + 1.5, cy + 0.8, 1.4, 0.8, '#fff');
        ctx.fillStyle = '#f8bbd0'; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.ellipse(cx - w * 0.3 + i * w * 0.25, cy - 2 + (i % 2) * 2, 2, 1, i, 0, Math.PI * 2); ctx.fill(); }
      }
    },
    // ---------------- Autumn: orange forest, falling leaves ----------------
    autumn: {
      birds: 'autumn', splash: 'rgba(120,170,230,0.9)',
      scen: (c, i, rnd) => {
        ctx.fillStyle = 'rgba(0,0,0,0.15)'; ctx.beginPath(); ctx.ellipse(0, 0, 16, 3, 0, 0, Math.PI * 2); ctx.fill();
        const tg2 = ctx.createLinearGradient(-3, 0, 3, 0); tg2.addColorStop(0, '#795548'); tg2.addColorStop(1, '#3e2723'); ctx.fillStyle = tg2; ctx.beginPath(); ctx.moveTo(-3.5, 0); ctx.lineTo(-2, -28); ctx.lineTo(2, -28); ctx.lineTo(3.5, 0); ctx.fill();
        const cols = [['#ef6c00', '#ffa726'], ['#c62828', '#ef5350'], ['#f9a825', '#ffd54f'], ['#8d6e63', '#a1887f']][i % 4];
        const sw3 = Math.sin(time * 1.1 + i) * 1;
        ctx.fillStyle = shade(cols[0], 0.7); for (const [cx2, cy2, r2] of [[0, -36, 16], [-11, -27, 11], [11, -28, 11]]) { ctx.beginPath(); ctx.arc(cx2 + sw3, cy2, r2, 0, Math.PI * 2); ctx.fill(); }
        ctx.fillStyle = cols[0]; for (const [cx2, cy2, r2] of [[0, -38, 16], [-11, -29, 11], [11, -30, 11]]) { ctx.beginPath(); ctx.arc(cx2 + sw3, cy2 - 1, r2 * 0.9, 0, Math.PI * 2); ctx.fill(); }   // one circle per path: no holes
        ctx.fillStyle = cols[1]; for (const [cx2, cy2, r2] of [[-5, -44, 8], [6, -36, 6]]) { ctx.beginPath(); ctx.arc(cx2, cy2, r2, 0, Math.PI * 2); ctx.fill(); }
        if (i % 3 === 0) { ctx.fillStyle = '#ff8f00'; ctx.beginPath(); ctx.ellipse(14, -2, 6, 4.5, 0, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#5d4037'; ctx.fillRect(13, -8, 2, 3); }   // pumpkin
      },
      fx: c => {
        for (let i = 0; i < 18; i++) {
          const sp = 25 + hrand(i) * 25, y = (time * sp + i * 53) % (groundY + 20) - 10;
          const x = wrapX(hrand(i + 9) * viewW - dist * 0.4 - time * 20 + Math.sin(time * 2 + i) * 22, viewW);
          ctx.save(); ctx.translate(x, y); ctx.rotate(time * 3 + i);
          ctx.fillStyle = ['#ef6c00', '#c62828', '#f9a825'][i % 3]; ctx.beginPath(); ctx.moveTo(-4, 0); ctx.quadraticCurveTo(0, -3.5, 4, 0); ctx.quadraticCurveTo(0, 3.5, -4, 0); ctx.fill();
          ctx.restore();
        }
      },
      haz: (x, w, h) => {   // spiky chestnut husks
        const gy = groundY;
        for (const [dx, r] of [[-6, 7.5], [7, 8], [0.5, 10]]) {
          const cx = x + w / 2 + dx, cy = gy - r - (r > 9 ? h - 2 * r - 4 : 0);
          ctx.strokeStyle = '#7cb342'; ctx.lineWidth = 1.1;
          for (let a = 0; a < Math.PI * 2; a += Math.PI / 9) { ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * r * 0.8, cy + Math.sin(a) * r * 0.8); ctx.lineTo(cx + Math.cos(a) * (r + 5), cy + Math.sin(a) * (r + 5)); ctx.stroke(); }
          const hg = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.3, 1, cx, cy, r); hg.addColorStop(0, '#aed581'); hg.addColorStop(1, '#558b2f');
          ctx.fillStyle = hg; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = '#6d4c41'; ctx.beginPath(); ctx.ellipse(cx + 1, cy - 1, r * 0.4, r * 0.3, 0.4, 0, Math.PI * 2); ctx.fill();
        }
      },
      pud: (x, w) => {
        const cx = x + w / 2, cy = groundY + 3;
        pudEll(cx, cy, w / 2, 7, 'rgba(84,130,190,0.88)'); pudEll(cx - w * 0.15, cy - 2, w * 0.12, 1.6, 'rgba(255,255,255,0.4)');
        ctx.fillStyle = '#ef6c00'; ctx.beginPath(); ctx.ellipse(cx + w * 0.15, cy, 4, 2, 0.4, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#c62828'; ctx.beginPath(); ctx.ellipse(cx - w * 0.25, cy + 1.5, 3.5, 1.8, -0.6, 0, Math.PI * 2); ctx.fill();
      }
    },
    // ---------------- Underwater: light rays, bubbles, corals, fish instead of birds ----------------
    underwater: {
      birds: 'underwater', noSun: 1, noStars: 1, noClouds: 1, splash: 'rgba(120,255,180,0.8)',
      far: c => {
        for (let i = 0; i < 5; i++) {   // light rays from the surface
          const x = wrapX(i * 170 - dist * 0.05, viewW + 200) - 100, a = 0.07 + 0.04 * Math.sin(time + i);
          ctx.fillStyle = `rgba(255,255,255,${a})`; ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x + 40, 0); ctx.lineTo(x + 110, groundY); ctx.lineTo(x + 40, groundY); ctx.fill();
        }
        hills(c.far, 0.15, 60, 30, 170);
        hills(c.near, 0.4, 28, 16, 100);
      },
      scen: (c, i, rnd) => {
        if (i % 3 === 0) {   // kelp
          ctx.strokeStyle = '#2e7d32'; ctx.lineWidth = 4;
          for (const dx of [-4, 4]) { ctx.beginPath(); ctx.moveTo(dx, 0); for (let y = 0; y > -60; y -= 6) ctx.lineTo(dx + Math.sin(time * 2 + y * 0.1 + dx) * 4, y); ctx.stroke(); }
        } else {   // coral fan
          const col = ['#ff7043', '#ec407a', '#ab47bc'][i % 3];
          ctx.strokeStyle = col; ctx.lineCap = 'round';
          const br = (x, y, a, len, d) => { if (d > 3) return; const ex = x + Math.cos(a) * len, ey = y + Math.sin(a) * len; ctx.lineWidth = 4 - d; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(ex, ey); ctx.stroke(); br(ex, ey, a - 0.45, len * 0.75, d + 1); br(ex, ey, a + 0.45, len * 0.75, d + 1); };
          br(0, 0, -Math.PI / 2, 14, 0);
        }
      },
      fx: c => {
        ctx.strokeStyle = 'rgba(255,255,255,0.6)'; ctx.lineWidth = 1;
        for (let i = 0; i < 22; i++) {
          const sp = 30 + hrand(i) * 30, y = groundY - (time * sp + i * 37) % (groundY + 20);
          const x = wrapX(hrand(i + 3) * viewW - dist * 0.3 + Math.sin(time * 2 + i) * 6, viewW);
          ctx.beginPath(); ctx.arc(x, y, 1.5 + hrand(i + 7) * 2.5, 0, Math.PI * 2); ctx.stroke();
        }
      },
      haz: (x, w, h) => {   // sharp branching coral
        const gy = groundY, cx = x + w / 2;
        ctx.save(); ctx.strokeStyle = '#ff5252'; ctx.lineCap = 'round';
        const br = (bx, by, a, len, d) => { if (d > 2) { ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.arc(bx, by, 1.2, 0, Math.PI * 2); ctx.fill(); return; } const ex = bx + Math.cos(a) * len, ey = by + Math.sin(a) * len; ctx.lineWidth = 5 - d * 1.5; ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(ex, ey); ctx.stroke(); br(ex, ey, a - 0.5, len * 0.7, d + 1); br(ex, ey, a + 0.5, len * 0.7, d + 1); };
        br(cx, gy, -Math.PI / 2, h * 0.45, 0);
        ctx.restore();
      },
      pud: (x, w) => {   // tangled seaweed
        const cx = x + w / 2, cy = groundY + 2;
        pudEll(cx, cy + 1, w / 2, 6, 'rgba(46,125,50,0.75)');
        ctx.strokeStyle = '#66bb6a'; ctx.lineWidth = 1.6;
        for (let i = 0; i < 7; i++) { const bx = x + 6 + i * (w - 12) / 6; ctx.beginPath(); ctx.moveTo(bx, cy + 3); ctx.quadraticCurveTo(bx + Math.sin(time * 3 + i) * 5, cy - 6, bx + Math.sin(time * 3 + i + 1) * 3, cy - 11); ctx.stroke(); }
      }
    },
    // ---------------- Mine: cave ceiling, rails, lanterns, crystals in the walls ----------------
    mine: {
      birds: 'mine', noSun: 1, noStars: 1, noClouds: 1, splash: 'rgba(110,150,200,0.9)',
      far: c => {
        // cave wall with glinting ore (1.0.48: rock strata and cracks)
        hills(c.far, 0.15, 150, 30, 160);
        for (let i = 0; i < 4; i++) {   // rock strata across the wall
          ctx.strokeStyle = i % 2 ? 'rgba(0,0,0,0.18)' : 'rgba(255,220,180,0.06)'; ctx.lineWidth = 3 + i;
          ctx.beginPath(); for (let x = 0; x <= viewW + 20; x += 20) { const y = groundY - 40 - i * 32 + Math.sin((x + dist * 0.15) * 0.013 + i * 2) * 8; x ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke();
        }
        for (let i = 0; i < 16; i++) {
          const x = wrapX(i * 67 - dist * 0.15, viewW + 100) - 50, y = groundY - 60 - (i * 37) % 120;
          const a = 0.5 + 0.5 * Math.sin(time * 2 + i);
          ctx.fillStyle = i % 3 ? `rgba(100,220,255,${0.4 + a * 0.5})` : `rgba(255,213,79,${0.4 + a * 0.5})`;
          ctx.beginPath(); ctx.moveTo(x, y - 4); ctx.lineTo(x + 3, y); ctx.lineTo(x, y + 4); ctx.lineTo(x - 3, y); ctx.fill();
        }
        // stalactites hanging from the ceiling
        ctx.fillStyle = shade(c.far, 0.7); ctx.fillRect(0, 0, viewW, 18);
        for (let i = 0; i < 24; i++) {
          const x = wrapX(i * 41 - dist * 0.25, viewW + 60) - 30, L = 14 + (i * 13) % 26;
          const sg = ctx.createLinearGradient(x - 7, 0, x + 7, 0); sg.addColorStop(0, shade(c.far, 0.95)); sg.addColorStop(1, shade(c.far, 0.5));
          ctx.fillStyle = sg; ctx.beginPath(); ctx.moveTo(x - 7, 16); ctx.quadraticCurveTo(x - 2, 16 + L * 0.6, x, 16 + L); ctx.quadraticCurveTo(x + 2, 16 + L * 0.6, x + 7, 16); ctx.fill();
          if (i % 3 === 0) { const dp = (time * 0.6 + i * 0.37) % 1; ctx.fillStyle = `rgba(150,200,255,${0.8 * (1 - dp)})`; ctx.beginPath(); ctx.arc(x, 16 + L + dp * 60, 1.2, 0, Math.PI * 2); ctx.fill(); }   // a drip
        }
        hills(c.near, 0.4, 30, 14, 90);
      },
      scen: (c, i, rnd) => {
        if (i % 2) {   // support beams with a lantern
          ctx.fillStyle = '#6d4c41'; ctx.fillRect(-16, -62, 5, 62); ctx.fillRect(12, -62, 5, 62); ctx.fillRect(-18, -64, 37, 6);
          const fl = 0.85 + 0.15 * Math.sin(time * 9 + i);
          const lg = ctx.createRadialGradient(0, -48, 1, 0, -48, 34); lg.addColorStop(0, `rgba(255,200,90,${0.45 * fl})`); lg.addColorStop(1, 'rgba(255,200,90,0)');
          ctx.fillStyle = lg; ctx.fillRect(-34, -82, 68, 68);
          ctx.strokeStyle = '#424242'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, -58); ctx.lineTo(0, -53); ctx.stroke();
          ctx.fillStyle = '#ffca28'; ctx.fillRect(-3, -53, 6, 8); ctx.strokeStyle = '#424242'; ctx.strokeRect(-3, -53, 6, 8);
        } else {   // mine cart
          ctx.fillStyle = '#546e7a'; ctx.beginPath(); ctx.moveTo(-14, -18); ctx.lineTo(14, -18); ctx.lineTo(11, -5); ctx.lineTo(-11, -5); ctx.fill();
          ctx.fillStyle = '#90a4ae'; ctx.fillRect(-14, -19, 28, 2.5);
          ctx.fillStyle = '#78909c'; ctx.beginPath(); ctx.arc(-6, -20, 4, Math.PI, 0); ctx.closePath(); ctx.arc(1, -21, 5, Math.PI, 0); ctx.closePath(); ctx.arc(8, -20, 4, Math.PI, 0); ctx.fill();
          ctx.fillStyle = '#ffd54f'; ctx.fillRect(2, -24, 2.5, 2.5);
          ctx.fillStyle = '#212121'; ctx.beginPath(); ctx.arc(-7, -4, 3.5, 0, Math.PI * 2); ctx.closePath(); ctx.arc(7, -4, 3.5, 0, Math.PI * 2); ctx.fill();
        }
      },
      ground: c => {   // rails along the track
        ctx.fillStyle = '#5d4037'; for (let x = -(dist % 26); x < viewW; x += 26) ctx.fillRect(x, groundY + 5, 14, 4);
        ctx.fillStyle = '#9e9e9e'; ctx.fillRect(0, groundY + 3, viewW, 2);
      },
      haz: (x, w, h) => {   // stalagmites with glittering minerals
        const gy = groundY, cx = x + w / 2;
        for (const [dx, hh, wd] of [[-7, 0.65, 11], [7, 0.72, 11], [0, 1, 14]]) {
          const bx = cx + dx;
          const sg = ctx.createLinearGradient(bx - wd / 2, 0, bx + wd / 2, 0); sg.addColorStop(0, '#9e9e9e'); sg.addColorStop(1, '#5f5f5f');
          spikeTri(bx, gy, wd, h * hh, dx * 0.1, sg, 'rgba(255,255,255,0.45)');
        }
        // rock texture: a few dark cracks (the blinking blue dots looked like glitches)
        ctx.strokeStyle = 'rgba(40,40,40,0.45)'; ctx.lineWidth = 0.8;
        ctx.beginPath(); ctx.moveTo(cx - 1, gy - 3); ctx.lineTo(cx - 2.5, gy - h * 0.3); ctx.lineTo(cx - 1, gy - h * 0.5);
        ctx.moveTo(cx + 6, gy - 2); ctx.lineTo(cx + 7, gy - h * 0.25); ctx.moveTo(cx - 8, gy - 2); ctx.lineTo(cx - 6.5, gy - h * 0.22); ctx.stroke();
      },
      pud: (x, w) => {   // dark underground water reflecting a lantern
        const cx = x + w / 2, cy = groundY + 3;
        pudEll(cx, cy, w / 2, 7, 'rgba(25,45,70,0.95)');
        pudEll(cx + w * 0.1, cy - 1, w * 0.08, 2, `rgba(255,200,90,${0.5 + 0.2 * Math.sin(time * 9)})`);
        pudEll(cx - w * 0.2, cy - 1.5, w * 0.15, 1.2, 'rgba(255,255,255,0.25)');
      }
    },
    // ---------------- Wild West: mesas, cacti, saloon, tumbleweeds ----------------
    wildwest: {
      birds: 'desert', splash: 'rgba(140,95,55,0.9)', cloud: '#fff8ee',
      far: c => {   // 1.0.48: mesas with rock bands, a lit face and a shaded face, paler far away
        for (const [par, k3, n0] of [[0.06, 1.2, 0], [0.12, 1, 5]]) {
          for (let i = 0; i < 5; i++) {
            const x = wrapX((i + n0) * 230 - dist * par, viewW + 300) - 150, w = 90 + ((i + n0) * 37) % 60, hh = (60 + ((i + n0) * 23) % 50) * (k3 > 1 ? 1.3 : 1), top = groundY - hh;
            const mg = ctx.createLinearGradient(x, 0, x + w, 0); mg.addColorStop(0, shade(c.far, 1.15 * k3)); mg.addColorStop(0.7, shade(c.far, k3)); mg.addColorStop(0.71, shade(c.far, 0.75 * k3)); mg.addColorStop(1, shade(c.far, 0.68 * k3));
            ctx.fillStyle = mg; ctx.beginPath(); ctx.moveTo(x - 14, groundY); ctx.lineTo(x + 6, top + 6); ctx.lineTo(x + 10, top); ctx.lineTo(x + w - 10, top); ctx.lineTo(x + w - 4, top + 8); ctx.lineTo(x + w + 14, groundY); ctx.closePath(); ctx.fill();
            ctx.save(); ctx.clip();
            for (let b = 0; b < 4; b++) { ctx.fillStyle = b % 2 ? 'rgba(120,40,20,0.18)' : 'rgba(255,220,180,0.12)'; ctx.fillRect(x - 20, top + 8 + b * hh * 0.2, w + 40, hh * 0.08); }
            ctx.restore();
            ctx.fillStyle = 'rgba(255,240,220,0.3)'; ctx.fillRect(x + 10, top, w - 20, 2);
          }
        }
        hills(c.near, 0.4, 24, 10, 120);
      },
      scen: (c, i, rnd) => {
        if (i % 3 === 0) {   // saloon facade
          ctx.fillStyle = 'rgba(0,0,0,0.2)'; ctx.fillRect(-28, -2, 60, 4);
          const fg = ctx.createLinearGradient(-26, 0, 26, 0); fg.addColorStop(0, '#a1887f'); fg.addColorStop(1, '#6d4c41');
          ctx.fillStyle = fg; ctx.fillRect(-26, -50, 52, 50);
          ctx.strokeStyle = 'rgba(60,35,20,0.45)'; ctx.lineWidth = 0.7; for (let q = -46; q < 0; q += 4) { ctx.beginPath(); ctx.moveTo(-26, q); ctx.lineTo(26, q); ctx.stroke(); }
          ctx.fillStyle = '#5d4037'; ctx.fillRect(-30, -58, 60, 9); ctx.fillStyle = '#efebe9'; ctx.fillRect(-22, -57, 44, 7);
          ctx.fillStyle = '#3e2723'; ctx.font = '900 6.5px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('SALOON', 0, -51.5);
          ctx.fillStyle = '#4e342e'; ctx.fillRect(-30, -28, 60, 3); for (const px3 of [-28, -10, 10, 27]) ctx.fillRect(px3, -26, 2, 26);   // the porch roof on posts
          ctx.fillStyle = '#2e1d16'; ctx.fillRect(-8, -24, 16, 24);
          const sw2 = Math.sin(time * 3) * 1.5; ctx.fillStyle = '#8d6e63'; ctx.fillRect(-8, -18, 7.5 + sw2 * 0.3, 10); ctx.fillRect(0.5 - sw2 * 0.3, -18, 7.5, 10);   // swinging doors
          for (const wx of [-20, 10]) { const wg2 = ctx.createLinearGradient(0, -42, 0, -32); wg2.addColorStop(0, '#fff3c4'); wg2.addColorStop(1, '#ffb74d'); ctx.fillStyle = wg2; ctx.fillRect(wx, -42, 10, 9); ctx.fillStyle = '#4e342e'; ctx.fillRect(wx + 4.5, -42, 1, 9); ctx.fillRect(wx, -38, 10, 1); }
        } else {   // saguaro
          ctx.fillStyle = '#558b2f'; roundRectOn(ctx, -4.5, -46, 9, 46, 4.5); ctx.fill();
          roundRectOn(ctx, -14, -34, 6, 16, 3); ctx.fill(); roundRectOn(ctx, -14, -22, 12, 5, 2.5); ctx.fill();
          roundRectOn(ctx, 8, -40, 6, 18, 3); ctx.fill(); roundRectOn(ctx, 3, -27, 11, 5, 2.5); ctx.fill();
          ctx.fillStyle = 'rgba(255,255,255,0.15)'; ctx.fillRect(-2, -44, 1.5, 40);
        }
      },
      fx: c => {   // a tumbleweed rolling across
        const T = 7, k = (time % T) / T, x = viewW + 40 - k * (viewW + 120), y = groundY - 9 - Math.abs(Math.sin(k * 30)) * 14;
        ctx.save(); ctx.translate(x, y); ctx.rotate(-time * 6);
        ctx.strokeStyle = '#a1887f'; ctx.lineWidth = 1.2;
        for (let a = 0; a < 6; a++) { ctx.beginPath(); ctx.ellipse(0, 0, 9, 5, a, 0, Math.PI * 2); ctx.stroke(); }
        ctx.restore();
      },
      haz: (x, w, h) => {   // barbed wire between two posts
        const gy = groundY;
        ctx.fillStyle = '#6d4c41'; ctx.fillRect(x - 2, gy - h, 4, h); ctx.fillRect(x + w - 2, gy - h, 4, h);
        ctx.strokeStyle = '#78909c'; ctx.lineWidth = 1.3;
        for (const yy of [0.3, 0.6, 0.9]) {
          const y = gy - h * yy;
          ctx.beginPath(); ctx.moveTo(x, y); for (let k = 0; k <= 8; k++) ctx.lineTo(x + k * w / 8, y + (k % 2 ? 2 : -2)); ctx.stroke();
          for (let k = 1; k < 4; k++) { const bx = x + k * w / 4; ctx.beginPath(); ctx.moveTo(bx - 3, y - 3); ctx.lineTo(bx + 3, y + 3); ctx.moveTo(bx + 3, y - 3); ctx.lineTo(bx - 3, y + 3); ctx.stroke(); }
        }
      },
      pud: (x, w) => {   // thick mud
        const cx = x + w / 2, cy = groundY + 3;
        pudEll(cx, cy, w / 2, 7, 'rgba(110,72,40,0.95)'); pudEll(cx - w * 0.15, cy - 1.5, w * 0.2, 2, 'rgba(150,105,65,0.7)');
        ctx.fillStyle = 'rgba(70,45,25,0.8)'; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(cx - w * 0.25 + i * w * 0.25, cy + 1, 2, 0, Math.PI * 2); ctx.fill(); }
      }
    }
  };
  // 1.0.24: five more worlds — neon city, sky islands, swamp, Egypt, Halloween
  const WORLD2 = {
    // ---------------- Neon city: night skyscrapers with glowing signs ----------------
    neon: {
      birds: 'neon', noClouds: 1, splash: 'rgba(255,64,200,0.9)',
      far: c => {
        const span = 1100;
        for (let i = 0; i < 22; i++) {
          const w = 36 + (i * 37) % 44, h = 90 + (i * 53) % 130, x = wrapX(i * 52 - dist * 0.15, span) - 60;
          ctx.fillStyle = '#1a1033'; ctx.fillRect(x, groundY - h, w, h);
          const nc = ['#ff4081', '#00e5ff', '#b388ff', '#76ff03'][i % 4];
          ctx.fillStyle = nc; ctx.globalAlpha = 0.85; ctx.fillRect(x, groundY - h, w, 2); ctx.globalAlpha = 1;
          ctx.fillStyle = 'rgba(255,255,255,0.12)';
          for (let wy = groundY - h + 10; wy < groundY - 10; wy += 12) for (let wx = x + 5; wx < x + w - 6; wx += 9) if (((wx * 3 + wy) | 0) % 4) ctx.fillRect(wx, wy, 4, 5);
          if (i % 3 === 0) {   // glowing sign
            const on = Math.sin(time * 3 + i) > -0.6;
            ctx.save(); ctx.shadowColor = nc; ctx.shadowBlur = on ? 12 : 0; ctx.strokeStyle = on ? nc : 'rgba(120,120,140,0.5)'; ctx.lineWidth = 2;
            roundRectOn(ctx, x + 4, groundY - h + 14, w - 8, 14, 4); ctx.stroke(); ctx.restore();
          }
        }
        for (let i = 0; i < 14; i++) {   // near row, darker, with lit windows
          const w = 50 + (i * 29) % 40, h = 40 + (i * 41) % 60, x = wrapX(i * 80 - dist * 0.4, 1120) - 60;
          ctx.fillStyle = '#0d0820'; ctx.fillRect(x, groundY - h, w, h);
          ctx.fillStyle = 'rgba(255,214,0,0.5)'; for (let k = 0; k < 4; k++) if ((i + k) % 3) ctx.fillRect(x + 6 + k * 11, groundY - h + 8, 5, 6);
        }
      },
      scen: (c, i) => {   // neon street lamps
        const nc = ['#ff4081', '#00e5ff'][i % 2];
        ctx.fillStyle = '#263238'; ctx.fillRect(-1.5, -50, 3, 50);
        ctx.save(); ctx.shadowColor = nc; ctx.shadowBlur = 14; ctx.fillStyle = nc; ctx.fillRect(-7, -54, 14, 4); ctx.restore();
        ctx.fillStyle = nc.replace('#', '') === 'ff4081' ? 'rgba(255,64,129,0.12)' : 'rgba(0,229,255,0.12)';
        ctx.beginPath(); ctx.moveTo(-7, -50); ctx.lineTo(-18, 0); ctx.lineTo(18, 0); ctx.lineTo(7, -50); ctx.fill();
      },
      ground: c => {   // glowing kerb line
        ctx.save(); ctx.shadowColor = '#00e5ff'; ctx.shadowBlur = 8; ctx.fillStyle = '#00e5ff'; ctx.fillRect(0, groundY, viewW, 1.5); ctx.restore();
      },
      haz: (x, w, h) => {   // electric emitter with arcing sparks
        const gy = groundY, cx = x + w / 2;
        ctx.fillStyle = '#37474f'; ctx.fillRect(x + 2, gy - 8, w - 4, 8);
        ctx.fillStyle = '#ffd600'; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.moveTo(x + 4 + k * 7, gy - 8); ctx.lineTo(x + 7 + k * 7, gy - 8); ctx.lineTo(x + 4 + k * 7, gy); ctx.lineTo(x + 1 + k * 7, gy); ctx.fill(); }
        ctx.fillStyle = '#90a4ae'; ctx.fillRect(x + 3, gy - h, 3, h - 8); ctx.fillRect(x + w - 6, gy - h, 3, h - 8);
        ctx.fillStyle = '#b0bec5'; ctx.beginPath(); ctx.arc(x + 4.5, gy - h, 3, 0, Math.PI * 2); ctx.closePath(); ctx.arc(x + w - 4.5, gy - h, 3, 0, Math.PI * 2); ctx.fill();
        ctx.save(); ctx.shadowColor = '#40c4ff'; ctx.shadowBlur = 10; ctx.strokeStyle = '#e1f5fe'; ctx.lineWidth = 1.6;
        for (let r = 0; r < 2; r++) {
          ctx.beginPath(); ctx.moveTo(x + 4.5, gy - h + 2 + r * 8);
          for (let k = 1; k <= 5; k++) ctx.lineTo(x + 4.5 + k * (w - 9) / 5, gy - h + 2 + r * 8 + Math.sin(time * 40 + k * 2.3 + r) * 5);
          ctx.stroke();
        }
        ctx.restore();
      },
      pud: (x, w) => {   // puddle reflecting the neon
        const cx = x + w / 2, cy = groundY + 3;
        pudEll(cx, cy, w / 2, 7, 'rgba(25,20,50,0.95)');
        pudEll(cx - w * 0.2, cy, w * 0.15, 2, `rgba(255,64,129,${0.5 + 0.3 * Math.sin(time * 3)})`);
        pudEll(cx + w * 0.2, cy + 1, w * 0.12, 1.6, `rgba(0,229,255,${0.5 + 0.3 * Math.sin(time * 2 + 1)})`);
      }
    },
    // ---------------- Sky islands: floating islands, rainbow, clouds below ----------------
    skyland: {
      birds: 'skyland', splash: 'rgba(200,220,255,0.9)',
      sky: c => {   // the rainbow is behind the clouds
        ctx.save(); ctx.globalAlpha = 0.35; ctx.lineWidth = 6;
        RAINBOW.forEach((col, i) => { ctx.strokeStyle = col; ctx.beginPath(); ctx.arc(viewW * 0.3 - (dist * 0.02) % 200, groundY + 40, 230 - i * 6, Math.PI, 0); ctx.stroke(); });
        ctx.restore();
      },
      far: c => {
        for (let i = 0; i < 4; i++) {   // floating islands with waterfalls
          const x = wrapX(i * 260 - dist * 0.1, viewW + 300) - 150, y = groundY - 150 + (i * 37) % 60 + Math.sin(time + i) * 4, w = 50 + (i * 17) % 30;
          ctx.fillStyle = '#8d6e63'; ctx.beginPath(); ctx.moveTo(x - w / 2, y); ctx.lineTo(x + w / 2, y); ctx.lineTo(x + 6, y + w * 0.6); ctx.lineTo(x - 4, y + w * 0.5); ctx.closePath(); ctx.fill();
          ctx.fillStyle = '#7cb342'; ctx.fillRect(x - w / 2, y - 3, w, 5);
          ctx.fillStyle = '#558b2f'; ctx.beginPath(); ctx.arc(x - w * 0.2, y - 9, 7, 0, Math.PI * 2); ctx.closePath(); ctx.arc(x - w * 0.05, y - 12, 8, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = 'rgba(179,229,252,0.7)'; ctx.fillRect(x + w * 0.3, y + 1, 3, 30 + (i % 2) * 20);
        }
        // a sea of clouds at the bottom
        ctx.fillStyle = '#ffffff';
        for (let i = 0; i < 18; i++) { const x = wrapX(i * 60 - dist * 0.3, viewW + 120) - 60; ctx.beginPath(); ctx.arc(x, groundY - 8 + Math.sin(i) * 4, 28 + (i % 3) * 6, Math.PI, 0); ctx.fill(); }
        ctx.fillStyle = 'rgba(200,215,240,0.7)'; ctx.fillRect(0, groundY - 6, viewW, 6);
      },
      scen: (c, i) => {
        if (i % 2) { ctx.fillStyle = '#eceff1'; ctx.fillRect(-3, -40, 6, 40); ctx.fillRect(-6, -42, 12, 3); ctx.fillRect(-6, -2, 12, 3); ctx.fillStyle = 'rgba(0,0,0,0.08)'; ctx.fillRect(1, -40, 2, 38); }   // marble column
        else { ctx.fillStyle = '#fafafa'; ctx.beginPath(); ctx.arc(-8, -6, 8, 0, Math.PI * 2); ctx.closePath(); ctx.arc(4, -10, 10, 0, Math.PI * 2); ctx.closePath(); ctx.arc(14, -5, 7, 0, Math.PI * 2); ctx.fill(); }   // cloud bush
      },
      ground: c => {   // the track is a cloud path: fluffy edge
        ctx.fillStyle = '#ffffff';
        for (let x = -(dist % 18); x < viewW + 18; x += 18) { ctx.beginPath(); ctx.arc(x, groundY + 2, 8, Math.PI, 0); ctx.fill(); }
      },
      haz: (x, w, h) => {   // a little storm cloud firing lightning down
        const gy = groundY, cx = x + w / 2, cy = gy - h + 6;
        ctx.save(); ctx.shadowColor = '#ffee58'; ctx.shadowBlur = 10; ctx.strokeStyle = '#fff176'; ctx.lineWidth = 2.2;
        for (const dx of [-6, 5]) { const j = Math.sin(time * 30 + dx) * 2; ctx.beginPath(); ctx.moveTo(cx + dx, cy + 4); ctx.lineTo(cx + dx - 4 + j, cy + 12); ctx.lineTo(cx + dx + 2, cy + 14); ctx.lineTo(cx + dx - 2 + j, gy); ctx.stroke(); }
        ctx.restore();
        ctx.fillStyle = '#546e7a'; ctx.beginPath(); ctx.arc(cx - 7, cy + 2, 7, 0, Math.PI * 2); ctx.closePath(); ctx.arc(cx + 2, cy - 2, 9, 0, Math.PI * 2); ctx.closePath(); ctx.arc(cx + 10, cy + 3, 6, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#78909c'; ctx.beginPath(); ctx.arc(cx, cy - 5, 5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#fff'; ctx.fillRect(cx - 5, cy, 2.5, 2.5); ctx.fillRect(cx + 3, cy, 2.5, 2.5);
        ctx.strokeStyle = '#263238'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(cx - 6, cy - 2); ctx.lineTo(cx - 2.5, cy - 0.5); ctx.moveTo(cx + 6, cy - 2); ctx.lineTo(cx + 2.5, cy - 0.5); ctx.stroke();
      },
      pud: (x, w) => {   // a rain cloud lying on the path
        const cx = x + w / 2, cy = groundY;
        ctx.fillStyle = 'rgba(120,144,156,0.9)';
        for (let k = 0; k < 5; k++) { ctx.beginPath(); ctx.arc(x + 10 + k * (w - 20) / 4, cy + 1, 9 + (k % 2) * 3, Math.PI, 0); ctx.fill(); }
        ctx.strokeStyle = 'rgba(144,202,249,0.9)'; ctx.lineWidth = 1;
        for (let k = 0; k < 6; k++) { const ph = (time * 2 + k * 0.3) % 1; ctx.beginPath(); ctx.moveTo(x + 8 + k * (w - 16) / 5, cy + ph * 6); ctx.lineTo(x + 7 + k * (w - 16) / 5, cy + 3 + ph * 6); ctx.stroke(); }
      }
    },
    // ---------------- Swamp: crooked trees with moss, fireflies ----------------
    swamp: {
      birds: 'swamp', splash: 'rgba(110,140,60,0.9)', cloud: '#cfd8c4',
      scen: (c, i) => {
        ctx.strokeStyle = '#3e3a2a'; ctx.lineWidth = 5; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(-6, -22, 2, -44); ctx.stroke();
        ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(1, -34); ctx.quadraticCurveTo(12, -40, 18, -36); ctx.moveTo(0, -28); ctx.quadraticCurveTo(-12, -32, -16, -26); ctx.stroke();
        ctx.fillStyle = '#4e5d34'; ctx.beginPath(); ctx.arc(2, -48, 12, 0, Math.PI * 2); ctx.closePath(); ctx.arc(-10, -42, 8, 0, Math.PI * 2); ctx.closePath(); ctx.arc(13, -42, 8, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#7f8f52'; ctx.lineWidth = 1.2;   // hanging moss
        for (const mx of [-12, -4, 8, 15]) { ctx.beginPath(); ctx.moveTo(mx, -38); ctx.lineTo(mx + Math.sin(time + mx) * 1.5, -24 - (mx & 7)); ctx.stroke(); }
        if (i % 2) { ctx.strokeStyle = '#6d7d3a'; ctx.lineWidth = 1.5; for (const dx of [16, 19, 22]) { ctx.beginPath(); ctx.moveTo(dx, 0); ctx.lineTo(dx + 1, -16); ctx.stroke(); } ctx.fillStyle = '#5d4037'; ctx.fillRect(18, -20, 3, 7); }   // cattail
      },
      fx: c => {   // fireflies
        for (let i = 0; i < 16; i++) {
          const x = wrapX(hrand(i) * viewW - dist * 0.2 + Math.sin(time * 0.7 + i) * 30, viewW), y = groundY - 30 - hrand(i + 5) * 140 + Math.sin(time * 1.3 + i * 2) * 10;
          const a = Math.max(0, Math.sin(time * 2 + i * 1.7));
          const fg = ctx.createRadialGradient(x, y, 0, x, y, 7); fg.addColorStop(0, `rgba(220,255,120,${a})`); fg.addColorStop(1, 'rgba(220,255,120,0)');
          ctx.fillStyle = fg; ctx.fillRect(x - 7, y - 7, 14, 14);
        }
      },
      haz: (x, w, h) => {   // snapping flytrap (1.0.45: redrawn — two jaws on a hinge, each with its own red inside and teeth)
        const gy = groundY, cx = x + w / 2, open = 0.28 + 0.32 * Math.max(0, Math.sin(time * 3 + x * 0.05));
        const hx = cx, hy = gy - h * 0.42, L = h * 0.58;
        ctx.strokeStyle = '#558b2f'; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(cx, gy); ctx.quadraticCurveTo(cx - 3, gy - h * 0.25, hx, hy); ctx.stroke();
        for (const s2 of [-1, 1]) { ctx.fillStyle = '#689f38'; ctx.beginPath(); ctx.ellipse(cx + s2 * 7, gy - 3, 6.5, 2.5, s2 * 0.4, 0, Math.PI * 2); ctx.fill(); }
        for (const s2 of [-1, 1]) {   // s2 = -1 the left jaw, 1 the right jaw; the rim (open side) faces the other jaw
          ctx.save(); ctx.translate(hx, hy); ctx.rotate(s2 * open);
          const jg = ctx.createLinearGradient(s2 * 7, 0, 0, 0); jg.addColorStop(0, '#558b2f'); jg.addColorStop(1, '#8bc34a');
          ctx.fillStyle = jg; ctx.beginPath(); ctx.moveTo(0, 0); ctx.ellipse(0, -L / 2, 6.5, L / 2, 0, Math.PI / 2, Math.PI * 1.5, s2 > 0); ctx.closePath(); ctx.fill();
          ctx.fillStyle = '#e53935'; ctx.beginPath(); ctx.moveTo(0, -1); ctx.ellipse(0, -L / 2, 3.2, L / 2 - 1.5, 0, Math.PI / 2, Math.PI * 1.5, s2 > 0); ctx.closePath(); ctx.fill();
          ctx.fillStyle = '#fafafa';   // teeth along the rim, pointing at the other jaw
          for (let k = 1; k <= 5; k++) { const ty = -L * k / 6; ctx.beginPath(); ctx.moveTo(0, ty - 1.3); ctx.lineTo(-s2 * 3.5, ty); ctx.lineTo(0, ty + 1.3); ctx.closePath(); ctx.fill(); }
          ctx.restore();
        }
      },
      pud: (x, w) => {   // bog with duckweed and bubbles
        const cx = x + w / 2, cy = groundY + 3;
        pudEll(cx, cy, w / 2, 7, 'rgba(70,90,40,0.95)');
        ctx.fillStyle = '#9ccc65'; for (let i = 0; i < 8; i++) { ctx.beginPath(); ctx.arc(cx - w * 0.4 + ((i * 29) % (w * 0.8)), cy - 1 + (i % 3) * 1.5, 1.6, 0, Math.PI * 2); ctx.fill(); }
        for (let i = 0; i < 3; i++) { const ph = (time * 0.8 + i * 0.33) % 1; ctx.strokeStyle = `rgba(160,190,100,${1 - ph})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(cx - w * 0.2 + i * w * 0.2, cy, 1 + ph * 3, Math.PI, 0); ctx.stroke(); }
      }
    },
    // ---------------- Egypt: pyramids, palms, an obelisk ----------------
    egypt: {
      birds: 'egypt', splash: 'rgba(80,200,200,0.9)',
      far: c => {
        for (let i = 0; i < 4; i++) {
          const x = wrapX(i * 260 - dist * 0.08, viewW + 400) - 200, hh = 80 + (i % 3) * 35;
          const pg = ctx.createLinearGradient(x - hh, 0, x + hh, 0); pg.addColorStop(0, shade(c.far, 1.15)); pg.addColorStop(0.5, shade(c.far, 1.15)); pg.addColorStop(0.5, shade(c.far, 0.85)); pg.addColorStop(1, shade(c.far, 0.8));
          ctx.fillStyle = pg; ctx.beginPath(); ctx.moveTo(x - hh * 1.2, groundY); ctx.lineTo(x, groundY - hh); ctx.lineTo(x + hh * 1.2, groundY); ctx.fill();
          ctx.save(); ctx.clip(); ctx.strokeStyle = 'rgba(120,80,30,0.22)'; ctx.lineWidth = 0.8;   // courses of stone blocks
          for (let y = groundY - 7; y > groundY - hh; y -= 7) { ctx.beginPath(); ctx.moveTo(x - hh * 1.2, y); ctx.lineTo(x + hh * 1.2, y); ctx.stroke(); for (let bx = x - hh * 1.2 + ((groundY - y) / 7 % 2) * 6; bx < x + hh * 1.2; bx += 12) { ctx.beginPath(); ctx.moveTo(bx, y); ctx.lineTo(bx, y + 7); ctx.stroke(); } }
          ctx.restore();
          ctx.fillStyle = '#ffd54f'; ctx.beginPath(); ctx.moveTo(x - 8, groundY - hh + 7); ctx.lineTo(x, groundY - hh); ctx.lineTo(x + 8, groundY - hh + 7); ctx.fill();
          const gl = Math.max(0, Math.sin(time * 1.5 + i)); if (gl > 0.8) { ctx.fillStyle = `rgba(255,255,255,${(gl - 0.8) * 5})`; ctx.fillRect(x - 5, groundY - hh + 2, 10, 1); ctx.fillRect(x - 0.5, groundY - hh - 3, 1, 10); }
        }
        hills(c.near, 0.4, 20, 10, 140);
      },
      scen: (c, i) => {
        if (i % 3 === 1) {   // obelisk
          ctx.fillStyle = '#d7b46a'; ctx.beginPath(); ctx.moveTo(-6, 0); ctx.lineTo(-4.5, -54); ctx.lineTo(0, -60); ctx.lineTo(4.5, -54); ctx.lineTo(6, 0); ctx.fill();
          ctx.fillStyle = 'rgba(120,80,30,0.5)'; for (let k = 0; k < 5; k++) ctx.fillRect(-2, -48 + k * 9, 4, 2);
        } else drawPalm(ctx, 'date', i);   // a date palm (1.0.52: drawPalm)
      },
      haz: (x, w, h) => {   // spear trap sticking out of a stone slab
        const gy = groundY;
        ctx.fillStyle = '#bcaaa4'; ctx.fillRect(x - 2, gy - 6, w + 4, 6); ctx.fillStyle = 'rgba(0,0,0,0.2)'; ctx.fillRect(x - 2, gy - 2, w + 4, 2);
        for (let k = 0; k < 4; k++) {
          const bx = x + 3 + k * (w - 6) / 3, hh = h * (k % 2 ? 0.85 : 1);
          ctx.strokeStyle = '#6d4c41'; ctx.lineWidth = 1.8; ctx.beginPath(); ctx.moveTo(bx, gy - 6); ctx.lineTo(bx, gy - hh + 7); ctx.stroke();
          ctx.fillStyle = '#ffc107'; ctx.beginPath(); ctx.moveTo(bx - 3, gy - hh + 8); ctx.lineTo(bx, gy - hh); ctx.lineTo(bx + 3, gy - hh + 8); ctx.closePath(); ctx.fill();
          ctx.fillStyle = 'rgba(255,255,255,0.6)'; ctx.fillRect(bx - 0.5, gy - hh + 2, 1, 4);
        }
      },
      pud: (x, w) => {   // oasis water with reeds
        const cx = x + w / 2, cy = groundY + 3;
        pudEll(cx, cy, w / 2, 7, 'rgba(38,166,154,0.9)'); pudEll(cx - w * 0.12, cy - 1.5, w * 0.15, 1.6, 'rgba(255,255,255,0.45)');
        ctx.strokeStyle = '#7cb342'; ctx.lineWidth = 1.4; for (const dx of [-w * 0.45, -w * 0.4, w * 0.42]) { ctx.beginPath(); ctx.moveTo(cx + dx, cy); ctx.lineTo(cx + dx + Math.sin(time * 2 + dx) * 1.5, cy - 12); ctx.stroke(); }
      }
    },
    // ---------------- Savanna (1.0.47, redrawn): a huge low sun in the haze, layered horizon, real acacias,
    // giraffes and elephants walking far away, rounded termite mounds, boulders, swaying golden grass ----------------
    savanna: {
      birds: 'savanna', noSun: 1, splash: 'rgba(140,100,60,0.9)', cloud: '#ffd6b0',
      sky: c => {
        const sx0 = viewW * 0.66, sy0 = groundY - 92, pul = 1 + Math.sin(time * 0.8) * 0.03;
        const halo = ctx.createRadialGradient(sx0, sy0, 30, sx0, sy0, 260); halo.addColorStop(0, 'rgba(255,236,170,0.75)'); halo.addColorStop(0.35, 'rgba(255,190,110,0.3)'); halo.addColorStop(1, 'rgba(255,160,90,0)');
        ctx.fillStyle = halo; ctx.fillRect(sx0 - 260, sy0 - 260, 520, 520);
        const sg = ctx.createRadialGradient(sx0 - 10, sy0 - 12, 6, sx0, sy0, 58 * pul); sg.addColorStop(0, '#fffbe6'); sg.addColorStop(0.6, '#ffe08a'); sg.addColorStop(1, '#ffb74d');
        ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(sx0, sy0, 58 * pul, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = 'rgba(255,140,80,0.22)'; for (let k = 0; k < 4; k++) ctx.fillRect(sx0 - 70, sy0 + 8 + k * 11 + Math.sin(time + k) * 1.5, 140, 3 + k);   // heat-haze bands across the sun
        for (let b = 0; b < 7; b++) {   // a far flock of birds gliding across
          const bx = wrapX(viewW * 0.2 + b * 14 - time * 18 - (b % 2) * 6, viewW + 200) - 100, by = groundY - 230 + Math.abs(b - 3) * 6, f = Math.sin(time * 6 + b) * 2.2;
          ctx.strokeStyle = 'rgba(90,40,30,0.6)'; ctx.lineWidth = 1.1; ctx.beginPath(); ctx.moveTo(bx - 4, by - f); ctx.quadraticCurveTo(bx - 2, by - 1, bx, by); ctx.quadraticCurveTo(bx + 2, by - 1, bx + 4, by - f); ctx.stroke();
        }
      },
      far: c => {
        // a pale distant ridge, then dark silhouettes of acacias and animals, then the golden near hills
        hills(shade(c.far, 1.25), 0.04, 46, 14, 300);
        const sil = shade(c.far, 0.5);
        const acaciaS = (x, y, s) => {
          ctx.strokeStyle = sil; ctx.lineCap = 'round';
          ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 1 * s, y - 20 * s); ctx.stroke();
          ctx.lineWidth = 1.8 * s; ctx.beginPath(); ctx.moveTo(x + s, y - 18 * s); ctx.lineTo(x - 12 * s, y - 30 * s); ctx.moveTo(x + s, y - 19 * s); ctx.lineTo(x + 14 * s, y - 31 * s); ctx.moveTo(x + s, y - 20 * s); ctx.lineTo(x + 2 * s, y - 32 * s); ctx.stroke();
          ctx.fillStyle = sil;
          for (const [dx, dy, rx, ry] of [[-14, -33, 17, 4.5], [2, -35, 24, 5.5], [17, -33, 15, 4.5], [-4, -38, 15, 3.5], [10, -38, 11, 3]]) { ctx.beginPath(); ctx.ellipse(x + dx * s, y + dy * s, rx * s, ry * s, 0, 0, Math.PI * 2); ctx.fill(); }
        };
        const giraffeS = (x, y, s, ph) => {
          ctx.fillStyle = sil; ctx.strokeStyle = sil; ctx.lineCap = 'round';
          ctx.beginPath(); ctx.moveTo(x - 9 * s, y - 20 * s); ctx.quadraticCurveTo(x, y - 27 * s, x + 9 * s, y - 25 * s); ctx.lineTo(x + 8 * s, y - 17 * s); ctx.quadraticCurveTo(x, y - 15 * s, x - 9 * s, y - 16 * s); ctx.closePath(); ctx.fill();   // body, the back slopes down
          ctx.beginPath(); ctx.moveTo(x + 5 * s, y - 24 * s); ctx.lineTo(x + 14 * s, y - 46 * s); ctx.lineTo(x + 17 * s, y - 45 * s); ctx.lineTo(x + 10 * s, y - 20 * s); ctx.closePath(); ctx.fill();   // neck
          ctx.beginPath(); ctx.ellipse(x + 18 * s, y - 46 * s, 4.2 * s, 2 * s, 0.4, 0, Math.PI * 2); ctx.fill();   // head
          ctx.lineWidth = 0.9 * s; ctx.beginPath(); ctx.moveTo(x + 15 * s, y - 48 * s); ctx.lineTo(x + 15 * s, y - 51 * s); ctx.moveTo(x + 16.5 * s, y - 48 * s); ctx.lineTo(x + 17 * s, y - 51 * s); ctx.stroke();
          ctx.lineWidth = 1.6 * s;
          for (const [lx, o] of [[-7, 0], [-5, Math.PI], [5, Math.PI], [7, 0]]) { const sw = Math.sin(ph + o) * 3 * s; ctx.beginPath(); ctx.moveTo(x + lx * s, y - 17 * s); ctx.lineTo(x + lx * s + sw * 0.5, y - 8 * s); ctx.lineTo(x + lx * s + sw, y); ctx.stroke(); }
          ctx.lineWidth = 0.8 * s; ctx.beginPath(); ctx.moveTo(x - 9 * s, y - 19 * s); ctx.quadraticCurveTo(x - 12 * s, y - 15 * s, x - 11 * s, y - 10 * s); ctx.stroke();
        };
        const elephantS = (x, y, s, ph) => {
          ctx.fillStyle = sil;
          ctx.beginPath(); ctx.ellipse(x, y - 13 * s, 13 * s, 8.5 * s, 0, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.ellipse(x + 12 * s, y - 15 * s, 6 * s, 6 * s, 0, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.ellipse(x + 9 * s, y - 14 * s, 4.5 * s, 6 * s, 0.2, 0, Math.PI * 2); ctx.fill();   // ear
          ctx.strokeStyle = sil; ctx.lineCap = 'round'; ctx.lineWidth = 2.6 * s; ctx.beginPath(); ctx.moveTo(x + 16 * s, y - 14 * s); ctx.quadraticCurveTo(x + 20 * s, y - 6 * s, x + 18 * s + Math.sin(ph * 0.5) * s, y - 2 * s); ctx.stroke();
          ctx.lineWidth = 4 * s; for (const [lx, o] of [[-8, 0], [-4, Math.PI], [5, Math.PI], [9, 0]]) { ctx.beginPath(); ctx.moveTo(x + lx * s, y - 9 * s); ctx.lineTo(x + lx * s + Math.sin(ph + o) * 1.5 * s, y); ctx.stroke(); }
        };
        for (let i = 0; i < 6; i++) {
          const x = wrapX(i * 210 - dist * 0.07, viewW + 300) - 150, y = groundY - 30;
          if (i % 3 === 0) acaciaS(x, y, 1);
          else if (i % 3 === 1) giraffeS(x + Math.sin(time * 0.2 + i) * 8, y, 0.9, time * 2.4 + i);
          else { acaciaS(x - 40, y, 0.7); elephantS(x + 12 + Math.sin(time * 0.15 + i) * 6, y, 0.9, time * 1.6 + i); }
        }
        hills(c.near, 0.4, 14, 8, 160);
      },
      scen: (c, i) => {
        const sw = Math.sin(time * 0.9 + i) * 1.2;
        if (i % 4 === 1) {   // a rounded termite mound with ridges
          ctx.fillStyle = 'rgba(0,0,0,0.18)'; ctx.beginPath(); ctx.ellipse(2, 0, 20, 3.5, 0, 0, Math.PI * 2); ctx.fill();
          const mg = ctx.createLinearGradient(-14, 0, 14, 0); mg.addColorStop(0, '#d9a066'); mg.addColorStop(0.55, '#b07a45'); mg.addColorStop(1, '#7a4f2a');
          ctx.fillStyle = mg;
          ctx.beginPath(); ctx.moveTo(-15, 0); ctx.bezierCurveTo(-14, -14, -9, -22, -6, -30); ctx.bezierCurveTo(-4, -40, 3, -42, 4, -33); ctx.bezierCurveTo(6, -26, 7, -24, 9, -22); ctx.bezierCurveTo(11, -28, 16, -27, 15, -18); ctx.bezierCurveTo(15, -10, 17, -4, 17, 0); ctx.closePath(); ctx.fill();
          ctx.strokeStyle = 'rgba(80,45,20,0.45)'; ctx.lineWidth = 1;
          for (const [a, b2] of [[-9, -24], [-3, -34], [3, -28], [11, -18]]) { ctx.beginPath(); ctx.moveTo(a, -2); ctx.quadraticCurveTo(a + 1, (b2 - 2) / 2, a + 2, b2); ctx.stroke(); }
          ctx.fillStyle = 'rgba(255,230,180,0.35)'; ctx.beginPath(); ctx.ellipse(-7, -20, 2.5, 9, 0.15, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = 'rgba(60,30,10,0.55)'; for (const [hx, hy] of [[-4, -14], [1, -26], [8, -10]]) { ctx.beginPath(); ctx.ellipse(hx, hy, 1.4, 2, 0, 0, Math.PI * 2); ctx.fill(); }
        } else if (i % 4 === 3) {   // a smooth boulder
          ctx.fillStyle = 'rgba(0,0,0,0.2)'; ctx.beginPath(); ctx.ellipse(1, 0, 18, 3.5, 0, 0, Math.PI * 2); ctx.fill();
          const rg = ctx.createRadialGradient(-5, -14, 2, 0, -8, 18); rg.addColorStop(0, '#d7c4a8'); rg.addColorStop(1, '#7d6a52');
          ctx.fillStyle = rg; ctx.beginPath(); ctx.moveTo(-16, 0); ctx.bezierCurveTo(-17, -12, -8, -19, 2, -18); ctx.bezierCurveTo(12, -17, 17, -9, 16, 0); ctx.closePath(); ctx.fill();
          ctx.strokeStyle = 'rgba(70,55,40,0.4)'; ctx.lineWidth = 0.8; ctx.beginPath(); ctx.moveTo(-2, -17); ctx.quadraticCurveTo(1, -9, -3, -2); ctx.stroke();
        } else {   // an umbrella acacia: forked bark trunk, a flat layered crown lit from above
          ctx.fillStyle = 'rgba(0,0,0,0.16)'; ctx.beginPath(); ctx.ellipse(0, 0, 26, 3.5, 0, 0, Math.PI * 2); ctx.fill();
          const tg = ctx.createLinearGradient(-3, 0, 3, 0); tg.addColorStop(0, '#4e342e'); tg.addColorStop(0.5, '#8d6e63'); tg.addColorStop(1, '#3e2723');
          ctx.fillStyle = tg; ctx.beginPath(); ctx.moveTo(-3, 0); ctx.quadraticCurveTo(-2.5, -14, -1.5, -26); ctx.lineTo(1.5, -26); ctx.quadraticCurveTo(2.5, -14, 3.5, 0); ctx.closePath(); ctx.fill();
          ctx.strokeStyle = '#5d4037'; ctx.lineCap = 'round';
          for (const [ex, ey, w2] of [[-20, -42, 2.2], [20, -43, 2.2], [-6, -46, 1.6], [8, -47, 1.6]]) { ctx.lineWidth = w2; ctx.beginPath(); ctx.moveTo(0, -24); ctx.quadraticCurveTo(ex * 0.4, -34, ex + sw * 0.3, ey); ctx.stroke(); }
          const layer = (dy, k, a) => {
            for (const [dx, yy, rx, ry] of [[-18, -44, 17, 4.5], [0, -47, 25, 5.5], [18, -45, 16, 4.5], [-8, -51, 14, 3.5], [10, -51, 12, 3.2]]) {
              ctx.fillStyle = shade('#6b8e23', k); ctx.globalAlpha = a; ctx.beginPath(); ctx.ellipse(dx + sw, yy + dy, rx, ry, 0, 0, Math.PI * 2); ctx.fill();
            }
            ctx.globalAlpha = 1;
          };
          layer(2.5, 0.55, 1); layer(0, 1, 1); layer(-2, 1.35, 0.55);
          ctx.fillStyle = 'rgba(220,240,150,0.5)'; for (let q = 0; q < 9; q++) { ctx.beginPath(); ctx.arc(-22 + q * 5.5 + sw, -48 - (q % 3), 1.2, 0, Math.PI * 2); ctx.fill(); }
        }
        // tall golden grass: tapered blades in two tones that sway
        for (let k = -4; k <= 4; k++) {
          const bx = 22 + k * 2.4, ht = 12 + ((k * 7 + i * 3) & 7) * 1.4, tip = Math.sin(time * 2 + k * 0.6 + i) * 2.4;
          ctx.fillStyle = k % 2 ? '#e6c35a' : '#b8913a';
          ctx.beginPath(); ctx.moveTo(bx - 1, 0); ctx.quadraticCurveTo(bx - 0.5, -ht * 0.5, bx + tip, -ht); ctx.quadraticCurveTo(bx + 0.6, -ht * 0.5, bx + 1, 0); ctx.closePath(); ctx.fill();
        }
      },
      fx: c => {   // warm dust motes drifting in the low sun
        for (let i = 0; i < 16; i++) {
          const x = wrapX(hrand(i) * viewW - dist * 0.25 - time * 12, viewW), y = groundY - 10 - hrand(i + 3) * 120 + Math.sin(time + i) * 6;
          ctx.fillStyle = `rgba(255,224,170,${0.25 + 0.25 * Math.sin(time * 2 + i)})`; ctx.beginPath(); ctx.arc(x, y, 1.4 + (i % 3) * 0.4, 0, Math.PI * 2); ctx.fill();
        }
      },
      ground: c => {   // dry grass tufts along the track edge
        for (let x = -(dist % 31); x < viewW; x += 31) {
          const k = Math.floor((dist + x) / 31), r = Math.abs(Math.sin(k * 7.7));
          if (LV.gaps.some(gp => x + r * 20 > sx(gp.x) - 6 && x + r * 20 < sx(gp.x) + gp.w + 6)) continue;
          for (let q = 0; q < 4; q++) { const tip = Math.sin(time * 2.2 + k + q) * 1.5; ctx.strokeStyle = q % 2 ? '#e8c867' : '#a8862f'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(x + r * 20 + q * 2, groundY + 1); ctx.quadraticCurveTo(x + r * 20 + q * 2, groundY - 4, x + r * 20 + q * 2.6 + tip, groundY - 7 - (q % 3) * 2); ctx.stroke(); }
        }
      },
      haz: (x, w, h) => {   // a low thorn bush: tangled dry twigs, long white thorns, a few leaves
        const gy = groundY, cx = x + w / 2;
        ctx.fillStyle = 'rgba(0,0,0,0.2)'; ctx.beginPath(); ctx.ellipse(cx, gy, w / 2 + 4, 3, 0, 0, Math.PI * 2); ctx.fill();
        ctx.lineCap = 'round';
        const tw = [[-0.45, 0.55, -0.3], [-0.2, 0.95, -0.05], [0.05, 1, 0.15], [0.3, 0.8, 0.35], [0.48, 0.5, 0.2], [-0.35, 0.35, 0.25], [0.2, 0.45, -0.3]];
        tw.forEach(([dx, hh, bend], q) => {
          const ex = cx + dx * w + bend * 8, ey = gy - h * hh;
          const tg = ctx.createLinearGradient(cx, gy, ex, ey); tg.addColorStop(0, '#4e342e'); tg.addColorStop(1, '#8d6e63');
          ctx.strokeStyle = tg; ctx.lineWidth = 2.6 - q * 0.15; ctx.beginPath(); ctx.moveTo(cx + dx * 4, gy); ctx.quadraticCurveTo(cx + dx * w * 0.6, gy - h * hh * 0.5, ex, ey); ctx.stroke();
          ctx.strokeStyle = '#fafafa'; ctx.lineWidth = 1;
          for (let f = 0.35; f < 1; f += 0.22) { const px = cx + dx * 4 + (ex - cx - dx * 4) * f, py = gy + (ey - gy) * f, sd = (Math.round(f * 10) % 2) ? 1 : -1; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + sd * 6, py - 4); ctx.stroke(); }
        });
        ctx.fillStyle = '#7cb342'; for (const [dx, dy] of [[-0.25, 0.6], [0.2, 0.75], [0.38, 0.45]]) { ctx.beginPath(); ctx.ellipse(cx + dx * w, gy - h * dy, 2.6, 1.3, 0.5, 0, Math.PI * 2); ctx.fill(); }
      },
      pud: (x, w) => {   // a mud wallow: glossy, with bubbles and hoof prints at the edge
        const cx = x + w / 2, cy = groundY + 3;
        pudEll(cx, cy, w / 2, 7, 'rgba(95,60,30,0.97)'); pudEll(cx, cy - 1, w / 2 - 4, 5, 'rgba(120,80,42,0.9)');
        pudEll(cx - w * 0.15, cy - 2.2, w * 0.18, 1.5, 'rgba(255,220,170,0.45)');
        for (let q = 0; q < 2; q++) { const ph = (time * 0.8 + q * 0.5) % 1; ctx.strokeStyle = `rgba(160,110,60,${1 - ph})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.ellipse(cx + (q ? w * 0.2 : -w * 0.25), cy, 2 + ph * 6, (2 + ph * 6) * 0.35, 0, 0, Math.PI * 2); ctx.stroke(); }
        ctx.fillStyle = 'rgba(60,35,15,0.6)'; for (const dx of [-0.42, 0.4]) for (const s2 of [0, 2.4]) { ctx.beginPath(); ctx.ellipse(cx + w * dx + s2, groundY + 5, 1.3, 0.9, 0, 0, Math.PI * 2); ctx.fill(); }
      }
    },
    // ---------------- Halloween: big moon, dead trees, graves, bats ----------------
    halloween: {
      birds: 'halloween', noSun: 1, splash: 'rgba(160,255,90,0.9)', cloud: '#5e4a7a',
      sky: c => {   // the moon is part of the sky: the clouds pass in front of it
        const mg = ctx.createRadialGradient(viewW * 0.72, groundY - 190, 10, viewW * 0.72, groundY - 190, 90);
        mg.addColorStop(0, 'rgba(255,236,179,0.55)'); mg.addColorStop(1, 'rgba(255,236,179,0)'); ctx.fillStyle = mg; ctx.fillRect(viewW * 0.72 - 90, groundY - 280, 180, 180);
        ctx.fillStyle = '#ffe9a8'; ctx.beginPath(); ctx.arc(viewW * 0.72, groundY - 190, 44, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = 'rgba(200,170,110,0.4)'; ctx.beginPath(); ctx.arc(viewW * 0.72 - 12, groundY - 200, 9, 0, Math.PI * 2); ctx.closePath(); ctx.arc(viewW * 0.72 + 14, groundY - 178, 6, 0, Math.PI * 2); ctx.fill();
      },
      far: c => {
        hills(c.far, 0.15, 60, 30, 170);
        const hx = wrapX(viewW * 0.4 - dist * 0.15, viewW + 300) - 150;   // haunted house silhouette
        ctx.fillStyle = shade(c.far, 0.6); ctx.fillRect(hx - 30, groundY - 110, 60, 50); ctx.beginPath(); ctx.moveTo(hx - 36, groundY - 110); ctx.lineTo(hx, groundY - 140); ctx.lineTo(hx + 36, groundY - 110); ctx.fill(); ctx.fillRect(hx + 12, groundY - 150, 10, 30);
        ctx.fillStyle = `rgba(255,213,79,${0.6 + 0.3 * Math.sin(time * 5)})`; ctx.fillRect(hx - 18, groundY - 98, 8, 9); ctx.fillRect(hx + 8, groundY - 98, 8, 9);
        hills(c.near, 0.4, 30, 18, 110);
      },
      scen: (c, i) => {
        if (i % 3 === 0) {   // gravestone
          ctx.fillStyle = '#78909c'; ctx.beginPath(); ctx.moveTo(-9, 0); ctx.lineTo(-9, -18); ctx.arc(0, -18, 9, Math.PI, 0); ctx.lineTo(9, 0); ctx.fill();
          ctx.fillStyle = '#546e7a'; ctx.fillRect(-4, -20, 8, 2); ctx.fillRect(-1, -24, 2, 10);
        } else if (i % 3 === 1) {   // jack-o'-lantern
          ctx.fillStyle = '#ef6c00'; ctx.beginPath(); ctx.ellipse(-4, -8, 7, 8, 0, 0, Math.PI * 2); ctx.closePath(); ctx.ellipse(4, -8, 7, 8, 0, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = '#33691e'; ctx.fillRect(-1, -19, 2.5, 4);
          ctx.fillStyle = `rgba(255,235,59,${0.7 + 0.3 * Math.sin(time * 8 + i)})`;
          ctx.beginPath(); ctx.moveTo(-6, -11); ctx.lineTo(-3, -11); ctx.lineTo(-4.5, -14); ctx.fill(); ctx.beginPath(); ctx.moveTo(3, -11); ctx.lineTo(6, -11); ctx.lineTo(4.5, -14); ctx.fill();
          ctx.beginPath(); ctx.moveTo(-6, -6); ctx.lineTo(6, -6); ctx.lineTo(4, -3); ctx.lineTo(2, -5); ctx.lineTo(0, -3); ctx.lineTo(-2, -5); ctx.lineTo(-4, -3); ctx.fill();
        } else {   // dead tree
          ctx.strokeStyle = '#2b2233'; ctx.lineCap = 'round';
          const br = (bx, by, a, len, d) => { if (d > 3) return; const ex = bx + Math.cos(a) * len, ey = by + Math.sin(a) * len; ctx.lineWidth = 5 - d * 1.2; ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(ex, ey); ctx.stroke(); br(ex, ey, a - 0.6, len * 0.7, d + 1); br(ex, ey, a + 0.5, len * 0.65, d + 1); };
          br(0, 0, -Math.PI / 2, 24, 0);
        }
      },
      fx: c => {   // 1.0.46: rolling ground mist (two layers with a wavy top), will-o'-wisps, a ghost far away
        for (const [k, sp, al, hg2] of [[0, 0.3, 0.2, 30], [1, 0.6, 0.28, 16]]) {
          ctx.beginPath(); ctx.moveTo(-10, groundY + 2);
          for (let x = -10; x <= viewW + 20; x += 16) {
            const wx = x + dist * sp + time * (k ? 14 : -8);
            ctx.lineTo(x, groundY - hg2 - Math.sin(wx * 0.011) * 8 - Math.sin(wx * 0.029 + time * 0.9) * 4 - Math.max(0, Math.sin(wx * 0.004)) * 10);
          }
          ctx.lineTo(viewW + 20, groundY + 2); ctx.closePath();
          const fg = ctx.createLinearGradient(0, groundY - hg2 - 22, 0, groundY); fg.addColorStop(0, 'rgba(190,170,235,0)'); fg.addColorStop(0.55, `rgba(190,170,235,${al * 0.7})`); fg.addColorStop(1, `rgba(200,185,240,${al})`);
          ctx.fillStyle = fg; ctx.fill();
        }
        for (let i = 0; i < 5; i++) {   // will-o'-wisps: glowing orbs that bob and leave a fading tail
          const x = wrapX(hrand(i) * viewW - dist * 0.3 + Math.sin(time * 0.6 + i * 2) * 40, viewW), by = groundY - 45 - hrand(i + 7) * 90;
          const yy = q => by + Math.sin(time * 1.7 + i - q * 0.35) * 12, pul = 0.6 + 0.4 * Math.sin(time * 3 + i * 1.3), cc = i % 2 ? '120,255,170' : '190,140,255';
          for (let q = 1; q <= 5; q++) { ctx.fillStyle = `rgba(${cc},${0.3 * pul * (1 - q / 6)})`; ctx.beginPath(); ctx.arc(x + q * 4.5, yy(q), 3.2 - q * 0.45, 0, Math.PI * 2); ctx.fill(); }
          const y = yy(0), gg = ctx.createRadialGradient(x, y, 0, x, y, 13); gg.addColorStop(0, `rgba(255,255,255,${0.95 * pul})`); gg.addColorStop(0.3, `rgba(${cc},${0.75 * pul})`); gg.addColorStop(1, `rgba(${cc},0)`);
          ctx.fillStyle = gg; ctx.fillRect(x - 13, y - 13, 26, 26);
        }
        const gk = (time % 19) / 19;   // a ghost drifts across far behind, now and then
        if (gk < 0.42) {
          const u = gk / 0.42, x = viewW * 1.1 - u * viewW * 1.3, y = groundY - 150 + Math.sin(u * 14) * 9;
          ctx.save(); ctx.globalAlpha = 0.38 * Math.sin(u * Math.PI); ctx.fillStyle = '#ede7f6';
          ctx.beginPath(); ctx.arc(x, y, 12, Math.PI, 0); ctx.lineTo(x + 12, y + 13);
          for (let q = 0; q < 4; q++) { const xx = x + 12 - (q + 1) * 6; ctx.quadraticCurveTo(xx + 3, y + 13 + (q % 2 ? -4 : 4) + Math.sin(time * 6 + q) * 1.5, xx, y + 13); }
          ctx.closePath(); ctx.fill();
          ctx.fillStyle = '#4a2c6b'; ctx.beginPath(); ctx.ellipse(x - 4, y - 2, 1.8, 2.6, 0, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.ellipse(x + 2, y - 2, 1.8, 2.6, 0, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.ellipse(x - 1, y + 5, 2, 2.6, 0, 0, Math.PI * 2); ctx.fill();
          ctx.restore();
        }
      },
      haz: (x, w, h) => {   // wrought-iron cemetery fence spikes
        // 1.0.34: light iron with a purple glow — the dark bars were hard to see on the dark ground
        const gy = groundY, pul = 0.6 + 0.4 * Math.sin(time * 4 + x * 0.05);
        ctx.save(); ctx.shadowColor = `rgba(200,120,255,${0.9 * pul})`; ctx.shadowBlur = 10;
        const ig = ctx.createLinearGradient(x, 0, x + w, 0); ig.addColorStop(0, '#eceff1'); ig.addColorStop(1, '#90a4ae');
        ctx.fillStyle = ig; ctx.fillRect(x - 2, gy - h * 0.38, w + 4, 3); ctx.fillRect(x - 2, gy - 6, w + 4, 3);
        for (let k = 0; k < 4; k++) {
          const bx = x + 2 + k * (w - 4) / 3, hh = h * (k % 2 ? 0.88 : 1);
          ctx.fillStyle = ig; ctx.fillRect(bx - 1.6, gy - hh + 6, 3.2, hh - 6);
          ctx.fillStyle = '#fafafa'; ctx.beginPath(); ctx.moveTo(bx - 4.5, gy - hh + 8); ctx.lineTo(bx, gy - hh - 1); ctx.lineTo(bx + 4.5, gy - hh + 8); ctx.closePath(); ctx.fill();
        }
        ctx.restore();
        ctx.strokeStyle = '#37474f'; ctx.lineWidth = 0.8;
        for (let k = 0; k < 4; k++) {
          const bx = x + 2 + k * (w - 4) / 3, hh = h * (k % 2 ? 0.88 : 1);
          ctx.beginPath(); ctx.moveTo(bx - 4.5, gy - hh + 8); ctx.lineTo(bx, gy - hh - 1); ctx.lineTo(bx + 4.5, gy - hh + 8); ctx.closePath(); ctx.stroke();
        }
      },
      pud: (x, w) => {   // bubbling witch's potion
        const cx = x + w / 2, cy = groundY + 3;
        ctx.save(); ctx.shadowColor = 'rgba(118,255,3,0.7)'; ctx.shadowBlur = 8; pudEll(cx, cy, w / 2, 7, 'rgba(106,27,154,0.92)'); ctx.restore();
        pudEll(cx, cy - 1, w * 0.35, 3, 'rgba(118,255,3,0.45)');
        for (let i = 0; i < 4; i++) { const ph = (time * 1.2 + i * 0.25) % 1; ctx.strokeStyle = `rgba(178,255,89,${1 - ph})`; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(cx - w * 0.3 + i * w * 0.2, cy - 2 - ph * 6, 1.5 + ph * 2, 0, Math.PI * 2); ctx.stroke(); }
      }
    }
  };

  Object.assign(WORLD, WORLD2);
  const BIRDS_NEW = {
    sakura: [{ n: 'crane', body: '#fafafa', belly: '#ffffff', head: '#fafafa', wing: '#cfd8dc', beak: '#424242', cap: '#e53935', longBeak: 1, big: 1 },
             { n: 'whiteeye', body: '#9ccc65', belly: '#f1f8e9', head: '#8bc34a', wing: '#689f38', beak: '#424242' }],
    autumn: [{ n: 'robin', body: '#8d6e63', belly: '#ff7043', head: '#6d4c41', wing: '#5d4037', beak: '#ffb300' },
             { n: 'goose', body: '#9e9e9e', belly: '#e0e0e0', head: '#212121', wing: '#757575', beak: '#212121', big: 1, cheek: 1 }],
    underwater: [{ n: 'fish', fish: 1, body: '#ffb300', fin: '#ff6f00' }, { n: 'fish2', fish: 1, body: '#4fc3f7', fin: '#0288d1', stripes: 1 }, { n: 'fish3', fish: 1, body: '#ec407a', fin: '#ad1457' }],
    mine: [{ n: 'bat', pet: 'bat', dy: 66 }],
    neon: [{ n: 'drone', pet: 'drone', dy: 70 }],
    skyland: [{ n: 'dove', body: '#fafafa', belly: '#ffffff', head: '#fafafa', wing: '#e0e0e0', beak: '#ffb74d' },
              { n: 'swallow', body: '#1a237e', belly: '#fff3e0', head: '#1a237e', wing: '#0d1250', beak: '#424242', longTail: 1 }],
    swamp: [{ n: 'heron', body: '#90a4ae', belly: '#eceff1', head: '#eceff1', wing: '#78909c', beak: '#fbc02d', longBeak: 1, big: 1, cap: '#263238' },
            { n: 'raven', body: '#263238', belly: '#37474f', head: '#212121', wing: '#1c262b', beak: '#455a64' }],
    egypt: [{ n: 'ibis', body: '#fafafa', belly: '#ffffff', head: '#212121', wing: '#212121', beak: '#212121', longBeak: 1 },
            { n: 'falcon', body: '#a1887f', belly: '#efebe9', head: '#6d4c41', wing: '#795548', beak: '#ffca28', spots: 1 }],
    halloween: [{ n: 'bat', pet: 'bat', dy: 66 }, { n: 'ghost', pet: 'ghost', dy: 52 }],
    savanna: [{ n: 'vulture', body: '#5d4037', belly: '#d7ccc8', head: '#f8bbd0', wing: '#3e2723', beak: '#ffe0b2' },
              { n: 'weaver', body: '#fdd835', belly: '#fff59d', head: '#212121', wing: '#c0a000', beak: '#424242' }]
  };

  // ---------- 1.0.22: every world has its own spike-like hazard and its own slowing "puddle" ----------
  // (same hitbox as the old grey spike; each one is drawn to read as "jump over me" at a glance)
  const worldKind = c => WORLD[c.decor] ? c.decor : ({ dunes: 'desert', snow: 'winter', city: 'city', space: 'space', ocean: 'ocean', jungle: 'jungle', volcano: 'volcano', candy: 'candy' }[c.decor] || 'wild');
  const PUD_SPLASH = { wild: 'rgba(120,190,255,0.9)', jungle: 'rgba(120,85,50,0.9)', ocean: 'rgba(170,130,80,0.8)', desert: 'rgba(214,170,100,0.9)',
    city: 'rgba(110,115,120,0.9)', candy: 'rgba(160,90,50,0.9)', winter: 'rgba(230,242,255,0.95)', volcano: 'rgba(255,120,30,0.9)', space: 'rgba(140,255,110,0.9)' };
  const splashCol = k => (WORLD[k] && WORLD[k].splash) || PUD_SPLASH[k];
  function drawHazard(k, x, w, h, o) {
    const gy = groundY, cx = x + w / 2, top = gy - h;
    const g = ctx;
    g.save(); g.lineJoin = 'round'; g.lineCap = 'round';
    // a faint red glow on the ground: danger
    const rg = g.createRadialGradient(cx, gy, 1, cx, gy, w * 0.8);
    rg.addColorStop(0, 'rgba(255,40,40,0.28)'); rg.addColorStop(1, 'rgba(255,40,40,0)');
    g.fillStyle = rg; g.fillRect(cx - w, gy - 8, w * 2, 12);
    if (WORLD[k]) WORLD[k].haz(x, w, h, o);
    else if (k === 'desert') {   // barrel cactus with long spines
      const ry = h * 0.5, rx = w * 0.42, cy = gy - ry;
      g.strokeStyle = 'rgba(255,250,230,0.95)'; g.lineWidth = 1;
      for (let a = -Math.PI * 0.95; a <= -0.05; a += Math.PI / 9) { g.beginPath(); g.moveTo(cx + Math.cos(a) * rx * 0.9, cy + Math.sin(a) * ry * 0.9); g.lineTo(cx + Math.cos(a) * (rx + 6), cy + Math.sin(a) * (ry + 6)); g.stroke(); }
      const cg = g.createLinearGradient(cx - rx, 0, cx + rx, 0); cg.addColorStop(0, '#7cb342'); cg.addColorStop(0.5, '#558b2f'); cg.addColorStop(1, '#33691e');
      g.fillStyle = cg; g.beginPath(); g.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2); g.fill();
      g.strokeStyle = 'rgba(30,60,10,0.55)'; g.lineWidth = 1.2;
      for (const k2 of [-0.55, 0, 0.55]) { g.beginPath(); g.ellipse(cx + k2 * rx * 0.5, cy, rx * (1 - Math.abs(k2) * 0.6) * 0.35, ry * 0.95, 0, 0, Math.PI * 2); g.stroke(); }
      g.fillStyle = '#fff'; for (let i = 0; i < 6; i++) g.fillRect(cx - rx * 0.7 + i * rx * 0.28, cy - ry * 0.5 + (i % 2) * ry * 0.6, 1.4, 1.4);
      g.fillStyle = '#ec407a'; for (let i = 0; i < 5; i++) { g.beginPath(); g.ellipse(cx + Math.cos(i * 1.26) * 3, top + 2 + Math.sin(i * 1.26) * 2, 2.6, 1.4, i * 1.26, 0, Math.PI * 2); g.fill(); }
      g.fillStyle = '#ffeb3b'; g.beginPath(); g.arc(cx, top + 2, 1.4, 0, Math.PI * 2); g.fill();
    } else if (k === 'winter') {   // ice shards
      for (const [dx, hh, wd, tilt] of [[-7, 0.7, 9, -0.25], [6, 0.75, 9, 0.3], [0, 1, 11, 0]]) {
        const bx = cx + dx, tipX = bx + tilt * h * hh, tipY = gy - h * hh;
        const ig = g.createLinearGradient(bx - wd / 2, 0, bx + wd / 2, 0); ig.addColorStop(0, '#e1f5fe'); ig.addColorStop(0.5, '#81d4fa'); ig.addColorStop(1, '#4fa3d9');
        g.fillStyle = ig; g.strokeStyle = '#ffffff'; g.lineWidth = 1;
        g.beginPath(); g.moveTo(bx - wd / 2, gy); g.lineTo(tipX, tipY); g.lineTo(bx + wd / 2, gy); g.closePath(); g.fill(); g.stroke();
        g.strokeStyle = 'rgba(255,255,255,0.8)'; g.beginPath(); g.moveTo(bx - wd * 0.1, gy - 2); g.lineTo(tipX - 0.5, tipY + 4); g.stroke();
      }
      const a = Math.max(0, Math.sin(time * 4 + x * 0.1)); if (a > 0.6) { g.fillStyle = `rgba(255,255,255,${(a - 0.6) * 2.5})`; starPath(g, cx + 1, top + 5, 3); g.fill(); }
    } else if (k === 'city') {   // broken glass
      for (const [dx, hh, wd, tilt, col] of [[-8, 0.6, 8, -0.4, 'rgba(76,175,80,0.85)'], [7, 0.7, 8, 0.35, 'rgba(141,110,99,0.85)'], [-1, 1, 10, 0.08, 'rgba(129,212,250,0.8)'], [4, 0.45, 6, -0.1, 'rgba(76,175,80,0.85)']]) {
        const bx = cx + dx, tx = bx + tilt * h * hh, ty = gy - h * hh;
        g.fillStyle = col; g.strokeStyle = 'rgba(255,255,255,0.85)'; g.lineWidth = 0.9;
        g.beginPath(); g.moveTo(bx - wd / 2, gy); g.lineTo(bx - wd * 0.2, gy - h * hh * 0.55); g.lineTo(tx, ty); g.lineTo(bx + wd / 2, gy); g.closePath(); g.fill(); g.stroke();
        g.fillStyle = 'rgba(255,255,255,0.6)'; g.beginPath(); g.moveTo(bx - 1, gy - 3); g.lineTo(tx - 0.3, ty + 3); g.lineTo(bx + 1, gy - 3); g.fill();
      }
    } else if (k === 'space') {   // glowing crystals
      const pul = 0.6 + 0.4 * Math.sin(time * 4 + x * 0.05);
      g.shadowColor = `rgba(236,64,122,${pul})`; g.shadowBlur = 12;
      for (const [dx, hh, wd, tilt, c1, c2] of [[-7, 0.65, 8, -0.3, '#80deea', '#00838f'], [6, 0.7, 8, 0.3, '#ce93d8', '#6a1b9a'], [0, 1, 10, 0, '#f48fb1', '#ad1457']]) {
        const bx = cx + dx, tx = bx + tilt * h * hh, ty = gy - h * hh;
        const cg = g.createLinearGradient(bx - wd / 2, 0, bx + wd / 2, 0); cg.addColorStop(0, c1); cg.addColorStop(1, c2);
        g.fillStyle = cg; g.beginPath(); g.moveTo(bx - wd / 2, gy); g.lineTo(bx - wd / 2 + 1, gy - h * hh * 0.7); g.lineTo(tx, ty); g.lineTo(bx + wd / 2 - 1, gy - h * hh * 0.7); g.lineTo(bx + wd / 2, gy); g.closePath(); g.fill();
        g.shadowBlur = 0; g.strokeStyle = 'rgba(255,255,255,0.6)'; g.lineWidth = 0.8; g.beginPath(); g.moveTo(bx, gy - 2); g.lineTo(tx, ty + 2); g.stroke(); g.shadowBlur = 12;
      }
    } else if (k === 'volcano') {   // red-hot rock
      g.fillStyle = '#2b1a14';
      g.beginPath(); g.moveTo(x - 2, gy); g.lineTo(x + 3, gy - h * 0.55); g.lineTo(x + 8, gy - h * 0.5); g.lineTo(cx, top); g.lineTo(x + w - 7, gy - h * 0.6); g.lineTo(x + w - 2, gy - h * 0.35); g.lineTo(x + w + 2, gy); g.closePath(); g.fill();
      const pul = 0.6 + 0.4 * Math.sin(time * 5 + x);
      g.shadowColor = 'rgba(255,110,0,0.9)'; g.shadowBlur = 8 * pul;
      g.strokeStyle = `rgba(255,${130 + 60 * pul | 0},0,0.95)`; g.lineWidth = 1.6;
      g.beginPath(); g.moveTo(cx, top + 3); g.lineTo(cx - 2, gy - h * 0.5); g.lineTo(cx + 3, gy - h * 0.3); g.lineTo(cx, gy - 2); g.moveTo(x + 5, gy - h * 0.4); g.lineTo(x + 9, gy - h * 0.25); g.stroke();
      g.shadowBlur = 0; g.fillStyle = 'rgba(255,255,255,0.12)'; g.beginPath(); g.moveTo(x + 3, gy - h * 0.55); g.lineTo(cx, top); g.lineTo(cx - 2, top + 8); g.fill();
    } else if (k === 'candy') {   // sharp sugar spikes, peppermint-striped
      for (const [dx, hh, wd] of [[-7, 0.7, 10], [7, 0.7, 10], [0, 1, 12]]) {
        const bx = cx + dx, ty = gy - h * hh;
        g.save(); g.beginPath(); g.moveTo(bx - wd / 2, gy); g.lineTo(bx, ty); g.lineTo(bx + wd / 2, gy); g.closePath(); g.clip();
        g.fillStyle = '#fafafa'; g.fillRect(bx - wd, ty, wd * 2, h);
        g.strokeStyle = '#e53935'; g.lineWidth = 3; for (let yy = gy + 4; yy > ty - 6; yy -= 7) { g.beginPath(); g.moveTo(bx - wd, yy); g.lineTo(bx + wd, yy - 6); g.stroke(); }
        g.restore();
        g.strokeStyle = 'rgba(183,28,28,0.7)'; g.lineWidth = 1; g.beginPath(); g.moveTo(bx - wd / 2, gy); g.lineTo(bx, ty); g.lineTo(bx + wd / 2, gy); g.stroke();
      }
    } else if (k === 'ocean') {   // 1.0.45: a real sea urchin — a dense ball of thin spines of different lengths, lighter tips, sitting in a sand mound
      const r = w * 0.3, cy = gy - r * 0.7, sd = (o && o.x) || x;
      const hr = q => { const v = Math.sin(q * 127.1 + sd * 0.013) * 43758.5453; return v - Math.floor(v); };
      // spines behind the body (darker), then the body, then the front spines
      const spines = (front) => {
        for (let q = 0; q < 34; q++) {
          if ((q % 2 === 0) !== front) continue;
          const a = -Math.PI + 0.12 + (q / 33) * (Math.PI - 0.24) + (hr(q) - 0.5) * 0.12;
          const L = r + (h - r) * (0.45 + hr(q + 50) * 0.55) * (0.75 + 0.25 * Math.abs(Math.sin(a)));
          const x1 = cx + Math.cos(a) * r * 0.7, y1 = cy + Math.sin(a) * r * 0.7;
          const x2 = cx + Math.cos(a) * L * (w / 2 / Math.max(r, h) + 0.55), y2 = Math.min(gy - 1, cy + Math.sin(a) * L);
          g.strokeStyle = front ? '#2a1238' : '#170a20'; g.lineWidth = front ? 1.1 : 0.9; g.lineCap = 'round';
          g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke();
          g.strokeStyle = front ? 'rgba(206,147,216,0.85)' : 'rgba(150,100,170,0.6)'; g.lineWidth = 0.7;
          g.beginPath(); g.moveTo(x1 + (x2 - x1) * 0.75, y1 + (y2 - y1) * 0.75); g.lineTo(x2, y2); g.stroke();
        }
      };
      spines(false);
      const ug = g.createRadialGradient(cx - r * 0.35, cy - r * 0.45, 0.5, cx, cy, r * 1.1); ug.addColorStop(0, '#6a3d7d'); ug.addColorStop(1, '#1d0c27');
      g.fillStyle = ug; g.beginPath(); g.ellipse(cx, cy, r, r * 0.85, 0, Math.PI, 0); g.lineTo(cx + r, gy); g.lineTo(cx - r, gy); g.closePath(); g.fill();
      g.fillStyle = 'rgba(220,180,240,0.35)'; for (let q = 0; q < 7; q++) { const a = -Math.PI + 0.4 + q * 0.38; g.beginPath(); g.arc(cx + Math.cos(a) * r * 0.55, cy + Math.sin(a) * r * 0.45, 0.8, 0, Math.PI * 2); g.fill(); }
      spines(true);
      // the sand mound it sits in, and a little shell
      const sg = g.createLinearGradient(0, gy - 6, 0, gy); sg.addColorStop(0, '#f6dfa6'); sg.addColorStop(1, '#e2c27c');
      g.fillStyle = sg; g.beginPath(); g.ellipse(cx, gy, r * 1.5, 5, 0, Math.PI, 0); g.fill();
      g.fillStyle = '#ffccbc'; g.beginPath(); g.arc(x + w - 3, gy - 1.5, 2.6, Math.PI, 0); g.fill();
      g.strokeStyle = 'rgba(191,54,12,0.5)'; g.lineWidth = 0.5; for (const d of [-1.2, 0, 1.2]) { g.beginPath(); g.moveTo(x + w - 3, gy - 0.5); g.lineTo(x + w - 3 + d, gy - 3.8); g.stroke(); }
    } else if (k === 'jungle') {   // thorny bramble
      g.fillStyle = '#33691e';
      g.beginPath(); g.ellipse(cx, gy - h * 0.32, w * 0.55, h * 0.36, 0, Math.PI, 0); g.lineTo(cx + w * 0.55, gy); g.lineTo(cx - w * 0.55, gy); g.fill();
      g.fillStyle = '#558b2f'; g.beginPath(); g.ellipse(cx - 3, gy - h * 0.42, w * 0.32, h * 0.22, 0, 0, Math.PI * 2); g.fill();
      g.fillStyle = '#efebe9';
      for (let a = -Math.PI * 0.95; a <= -0.05; a += Math.PI / 8) {
        const ox = cx + Math.cos(a) * w * 0.52, oy = gy - h * 0.32 + Math.sin(a) * h * 0.34, L = a > -2.2 && a < -0.9 ? h * 0.42 : 6;
        g.beginPath(); g.moveTo(ox - Math.sin(a) * 2, oy + Math.cos(a) * 2); g.lineTo(ox + Math.cos(a) * L, oy + Math.sin(a) * L); g.lineTo(ox + Math.sin(a) * 2, oy - Math.cos(a) * 2); g.fill();
      }
      g.fillStyle = '#c62828'; for (const [bx, by] of [[-5, 0.3], [4, 0.5], [7, 0.2]]) { g.beginPath(); g.arc(cx + bx, gy - h * by, 1.6, 0, Math.PI * 2); g.fill(); }
    } else {   // wild: sharpened wooden stakes
      for (const [dx, hh] of [[-8, 0.72], [8, 0.8], [0, 1]]) {
        const bx = cx + dx, ty = gy - h * hh, sw = 7;
        const wg = g.createLinearGradient(bx - sw / 2, 0, bx + sw / 2, 0); wg.addColorStop(0, '#a1744a'); wg.addColorStop(1, '#6d4826');
        g.fillStyle = wg; g.beginPath(); g.moveTo(bx - sw / 2, gy); g.lineTo(bx - sw / 2, ty + 8); g.lineTo(bx, ty); g.lineTo(bx + sw / 2, ty + 8); g.lineTo(bx + sw / 2, gy); g.closePath(); g.fill();
        g.fillStyle = '#e8d5b5'; g.beginPath(); g.moveTo(bx - sw / 2, ty + 8); g.lineTo(bx, ty); g.lineTo(bx + 1, ty + 8); g.fill();
        g.strokeStyle = 'rgba(60,35,15,0.5)'; g.lineWidth = 0.7; g.beginPath(); g.moveTo(bx - 1, gy - 2); g.lineTo(bx - 1.5, ty + 10); g.stroke();
      }
      g.strokeStyle = '#8d6e63'; g.lineWidth = 2; g.beginPath(); g.moveTo(cx - 12, gy - h * 0.38); g.lineTo(cx + 12, gy - h * 0.42); g.stroke();
    }
    g.restore();
  }
  function drawPuddle(k, x, w) {
    const g = ctx, cx = x + w / 2, cy = groundY + 3;
    if (WORLD[k]) { WORLD[k].pud(x, w); return; }
    const ell = (col, rx, ry, ox, oy) => { g.fillStyle = col; g.beginPath(); g.ellipse(cx + (ox || 0), cy + (oy || 0), rx, ry, 0, 0, Math.PI * 2); g.fill(); };
    if (k === 'desert') {   // quicksand: no water at all, a slowly turning sand funnel
      ell('#b98a45', w / 2, 7); ell('#a57838', w * 0.36, 5);
      g.strokeStyle = 'rgba(255,230,170,0.6)'; g.lineWidth = 1.2;
      for (let i = 0; i < 3; i++) { const a = time * 1.5 + i * 2.1; g.beginPath(); g.ellipse(cx, cy, w * (0.12 + i * 0.1), 1.5 + i * 1.5, 0, a, a + 2.4); g.stroke(); }
      ell('#7a5524', w * 0.06, 1.6);
    } else if (k === 'city') {   // dirty puddle with an oily sheen
      ell('rgba(84,88,92,0.92)', w / 2, 7);
      const og = g.createLinearGradient(cx - w * 0.2, 0, cx + w * 0.2, 0);
      ['rgba(255,82,82,0.35)', 'rgba(255,235,59,0.35)', 'rgba(76,175,80,0.35)', 'rgba(33,150,243,0.35)', 'rgba(156,39,176,0.35)'].forEach((c2, i) => og.addColorStop(i / 4, c2));
      ell(og, w * 0.2, 2.6, -w * 0.08, -0.5);
      g.fillStyle = 'rgba(60,45,30,0.6)'; for (let i = 0; i < 4; i++) g.fillRect(cx - w * 0.35 + i * w * 0.2, cy + 1 + (i % 2), 3, 1.4);
    } else if (k === 'candy') {   // fizzy soda
      ell('rgba(120,60,30,0.92)', w / 2, 7); ell('rgba(190,110,60,0.6)', w * 0.4, 3.5, 0, -1.5);
      g.fillStyle = 'rgba(255,255,255,0.8)';
      for (let i = 0; i < 7; i++) { const ph = (time * 1.6 + i * 0.37) % 1; g.globalAlpha = 1 - ph; g.beginPath(); g.arc(cx - w * 0.4 + ((i * 37) % (w * 0.8)), cy - ph * 14, 1 + (i % 3) * 0.6, 0, Math.PI * 2); g.fill(); }
      g.globalAlpha = 1;
    } else if (k === 'winter') {   // slush with ice chunks
      ell('rgba(205,226,244,0.95)', w / 2, 7); ell('rgba(160,195,225,0.7)', w * 0.38, 4, 0, 1);
      g.fillStyle = '#ffffff';
      for (let i = 0; i < 6; i++) { const bx = cx - w * 0.38 + i * w * 0.15, by = cy - 1 + (i % 2) * 2; g.beginPath(); g.moveTo(bx, by); g.lineTo(bx + 3, by - 2); g.lineTo(bx + 6, by); g.lineTo(bx + 3, by + 1.5); g.fill(); }
    } else if (k === 'volcano') {   // cooling lava: dark crust, glowing cracks
      ell('#3a221b', w / 2, 7);
      const pul = 0.6 + 0.4 * Math.sin(time * 3 + x * 0.02);
      g.save(); g.shadowColor = 'rgba(255,100,0,0.9)'; g.shadowBlur = 6 * pul;
      g.strokeStyle = `rgba(255,${120 + 70 * pul | 0},20,0.95)`; g.lineWidth = 1.4;
      g.beginPath(); for (let i = 0; i < 5; i++) { const bx = cx - w * 0.38 + i * w * 0.19; g.moveTo(bx, cy - 3); g.lineTo(bx + 4, cy); g.lineTo(bx + 2, cy + 3); } g.stroke();
      g.restore();
    } else if (k === 'space') {   // glowing slime
      g.save(); g.shadowColor = 'rgba(118,255,3,0.8)'; g.shadowBlur = 10;
      ell('rgba(118,220,60,0.88)', w / 2, 7); g.restore();
      ell('rgba(200,255,150,0.5)', w * 0.25, 2, -w * 0.12, -1.5);
      for (let i = 0; i < 4; i++) { const ph = (time * 0.9 + i * 0.29) % 1; g.strokeStyle = `rgba(220,255,180,${1 - ph})`; g.lineWidth = 1; g.beginPath(); g.arc(cx - w * 0.3 + i * w * 0.2, cy - 1, 1 + ph * 3, Math.PI, 0); g.stroke(); }
    } else if (k === 'ocean') {   // wet sand
      ell('rgba(160,118,62,0.55)', w / 2, 6.5); ell('rgba(255,255,255,0.35)', w * 0.18, 1.4, -w * 0.1, -1.6);
      g.fillStyle = 'rgba(255,255,255,0.5)'; for (let i = 0; i < 3; i++) g.fillRect(cx - w * 0.3 + i * w * 0.25, cy + 1, 4, 0.8);
    } else if (k === 'jungle') {   // mud
      ell('rgba(101,72,40,0.95)', w / 2, 7); ell('rgba(140,100,60,0.6)', w * 0.3, 2.6, -w * 0.1, -1.6);
      for (let i = 0; i < 3; i++) { const ph = (time * 0.7 + i * 0.33) % 1; g.strokeStyle = `rgba(160,120,80,${1 - ph})`; g.lineWidth = 1; g.beginPath(); g.arc(cx - w * 0.2 + i * w * 0.2, cy, 1 + ph * 2.5, Math.PI, 0); g.stroke(); }
    } else {   // plain water
      ell('rgba(70,140,220,0.85)', w / 2, 7);
      ell('rgba(255,255,255,0.45)', w * 0.12, 1.8, -w * 0.15, -2);
    }
  }

  // 1.0.37: the beam you slide under looks different in every world (same hitbox: from the top down to 32 above the ground)
  function drawBeam(k, x, w, yb) {
    const g = ctx, col = (a, b) => { const gr = g.createLinearGradient(x, 0, x + w, 0); gr.addColorStop(0, a); gr.addColorStop(0.45, b); gr.addColorStop(1, a); return gr; };
    const body = (a, b) => { g.fillStyle = col(a, b); g.fillRect(x, 0, w, yb); };
    const band = (c1, c2) => {   // a striped lower edge: this is where you must get under
      g.save(); g.beginPath(); g.rect(x, yb - 12, w, 12); g.clip(); g.fillStyle = c1; g.fillRect(x, yb - 12, w, 12);
      g.fillStyle = c2; for (let q = -14; q < w + 14; q += 16) { g.beginPath(); g.moveTo(x + q, yb); g.lineTo(x + q + 8, yb); g.lineTo(x + q + 20, yb - 12); g.lineTo(x + q + 12, yb - 12); g.fill(); }
      g.restore();
    };
    const rings = (c, step) => { g.fillStyle = c; for (let ry = yb - 20; ry > 0; ry -= step) g.fillRect(x, ry, w, 2.5); };
    switch (k) {
      case 'desert': case 'egypt':   // sandstone pillar with carvings
        body('#c9a25e', '#e8c98a'); g.fillStyle = 'rgba(120,80,30,0.45)';
        for (let ry = yb - 30; ry > 0; ry -= 24) { g.fillRect(x + w * 0.3, ry, w * 0.15, 8); g.beginPath(); g.arc(x + w * 0.65, ry + 4, 3.5, 0, Math.PI * 2); g.fill(); }
        g.fillStyle = '#b08a48'; g.fillRect(x - 3, yb - 9, w + 6, 9); break;
      case 'winter':   // ice column with icicles
        body('#90caf9', '#e3f2fd'); g.fillStyle = 'rgba(255,255,255,0.5)'; g.fillRect(x + 4, 0, 3, yb - 8);
        g.fillStyle = '#e1f5fe'; for (let q = 0; q < w; q += 8) { g.beginPath(); g.moveTo(x + q, yb); g.lineTo(x + q + 4, yb + 7 + (q % 3) * 2); g.lineTo(x + q + 8, yb); g.fill(); } break;
      case 'xmas':   // birch trunk with a garland and a snowy edge
        body('#e0e0e0', '#fafafa'); g.fillStyle = '#37474f'; for (let ry = yb - 18; ry > 0; ry -= 15) g.fillRect(x + ((ry * 7) % (w - 10)), ry, 8, 2);
        { const lc = ['#ff5252', '#ffeb3b', '#40c4ff', '#69f0ae']; for (let ry = yb - 22, q = 0; ry > 0; ry -= 11, q++) { g.fillStyle = Math.sin(time * 4 + q) > -0.3 ? lc[q % 4] : '#555'; g.beginPath(); g.arc(x + w / 2 + Math.sin(q * 1.4) * (w / 2 - 4), ry, 2.2, 0, Math.PI * 2); g.fill(); } }
        g.fillStyle = '#ffffff'; g.beginPath(); g.ellipse(x + w / 2, yb - 2, w / 2 + 3, 5, 0, 0, Math.PI * 2); g.fill(); break;
      case 'space':   // metal emitter with a glowing energy edge
        body('#263238', '#546e7a'); rings('#90a4ae', 22);
        g.save(); g.shadowColor = '#00e5ff'; g.shadowBlur = 12; g.fillStyle = `rgba(0,229,255,${0.7 + 0.3 * Math.sin(time * 10)})`; g.fillRect(x, yb - 5, w, 5); g.restore(); break;
      case 'volcano':   // basalt with glowing lava cracks
        body('#2b1a14', '#4e342e'); g.strokeStyle = `rgba(255,${120 + 60 * Math.sin(time * 3) | 0},0,0.9)`; g.lineWidth = 1.6;
        g.beginPath(); for (let ry = yb - 10; ry > 0; ry -= 30) { g.moveTo(x + 6, ry); g.lineTo(x + w * 0.5, ry - 10); g.lineTo(x + w - 6, ry - 4); } g.stroke();
        g.fillStyle = '#ff6d00'; g.fillRect(x, yb - 4, w, 4); break;
      case 'candy':   // a giant candy cane
        g.save(); g.beginPath(); g.rect(x, 0, w, yb); g.clip(); g.fillStyle = '#fafafa'; g.fillRect(x, 0, w, yb);
        g.fillStyle = '#e53935'; for (let ry = yb + 20; ry > -20; ry -= 18) { g.beginPath(); g.moveTo(x, ry); g.lineTo(x + w, ry - 14); g.lineTo(x + w, ry - 6); g.lineTo(x, ry + 8); g.fill(); }
        g.restore(); g.fillStyle = 'rgba(255,255,255,0.35)'; g.fillRect(x + 4, 0, 4, yb); break;
      case 'ocean': case 'underwater':   // a ship's mast, ropes and barnacles
        body('#6d4c41', '#a1887f'); g.strokeStyle = '#d7ccc8'; g.lineWidth = 1.5;
        for (let ry = yb - 16; ry > 0; ry -= 28) { g.beginPath(); g.moveTo(x, ry); g.lineTo(x + w, ry + 8); g.stroke(); }
        g.fillStyle = k === 'underwater' ? '#80cbc4' : '#cfd8dc'; for (let q = 4; q < w; q += 9) { g.beginPath(); g.arc(x + q, yb - 3, 2.6, 0, Math.PI * 2); g.fill(); } break;
      case 'sakura':   // bamboo with a paper lantern
        body('#7cb342', '#aed581'); rings('#33691e', 20);
        g.fillStyle = '#ef5350'; g.beginPath(); g.ellipse(x + w / 2, yb - 7, Math.min(10, w / 2), 7, 0, 0, Math.PI * 2); g.fill();
        g.fillStyle = '#ffeb3b'; g.fillRect(x + w / 2 - 5, yb - 1, 10, 2); break;
      case 'autumn': case 'swamp': case 'jungle':   // a tree trunk; leaves or moss at the bottom
        body('#5d4037', '#8d6e63'); g.strokeStyle = 'rgba(40,25,15,0.5)'; g.lineWidth = 1;
        for (let q = 6; q < w; q += 9) { g.beginPath(); g.moveTo(x + q, 0); g.lineTo(x + q + 2, yb); g.stroke(); }
        g.fillStyle = k === 'autumn' ? '#ef6c00' : '#7f8f52';
        for (let q = 0; q < w; q += 7) { g.beginPath(); g.ellipse(x + q + 3, yb - 2 + (q % 2) * 3, 4, k === 'autumn' ? 3 : 6, 0, 0, Math.PI * 2); g.fill(); } break;
      case 'savanna':   // a fat baobab trunk with smooth folds
        body('#8d7b68', '#b8a48e'); g.strokeStyle = 'rgba(70,55,40,0.45)'; g.lineWidth = 1.4;
        for (let q = 5; q < w; q += 7) { g.beginPath(); g.moveTo(x + q, 0); g.quadraticCurveTo(x + q + 2, yb * 0.5, x + q - 1, yb); g.stroke(); }
        g.fillStyle = '#c9a43f'; for (let q = 0; q < w; q += 5) { g.beginPath(); g.moveTo(x + q, yb); g.lineTo(x + q + 2, yb + 7 + (q % 3) * 2); g.lineTo(x + q + 4, yb); g.fill(); } break;
      case 'mine': case 'wildwest':   // timber with iron bands
        body('#795548', '#a1887f'); g.fillStyle = 'rgba(60,40,25,0.5)'; for (let q = 8; q < w; q += 12) g.fillRect(x + q, 0, 1.5, yb);
        rings('#455a64', 34); g.fillStyle = '#4e342e'; g.fillRect(x - 2, yb - 8, w + 4, 8); break;
      case 'neon':   // dark pillar with neon edges
        body('#1a1033', '#2a1a4a'); g.save(); g.shadowColor = '#ff4081'; g.shadowBlur = 10; g.fillStyle = '#ff4081';
        g.fillRect(x, 0, 2, yb); g.fillRect(x + w - 2, 0, 2, yb); g.fillStyle = '#00e5ff'; g.fillRect(x, yb - 4, w, 4); g.restore(); break;
      case 'skyland':   // marble column resting on a cloud
        body('#cfd8dc', '#fafafa'); g.fillStyle = 'rgba(120,144,156,0.35)'; for (let q = 6; q < w; q += 8) g.fillRect(x + q, 0, 2, yb);
        g.fillStyle = '#ffffff'; for (let q = 0; q <= w; q += 10) { g.beginPath(); g.arc(x + q, yb - 3, 7, 0, Math.PI * 2); g.fill(); } break;
      case 'halloween':   // old dark wood with cobwebs and a glowing edge
        body('#2b2233', '#4a3b55'); g.strokeStyle = 'rgba(220,220,230,0.6)'; g.lineWidth = 0.7;
        g.beginPath(); g.moveTo(x, yb - 30); g.lineTo(x + 14, yb - 12); g.moveTo(x, yb - 22); g.quadraticCurveTo(x + 6, yb - 20, x + 8, yb - 14); g.moveTo(x, yb - 14); g.lineTo(x + 6, yb - 10); g.stroke();
        g.save(); g.shadowColor = '#b388ff'; g.shadowBlur = 8; g.fillStyle = '#b388ff'; g.fillRect(x, yb - 3, w, 3); g.restore(); break;
      case 'city':   // steel girder with hazard stripes (the original look)
        body('#2c2c36', '#4a4a58'); g.fillStyle = '#9e9eb0';
        for (let ry = yb - 24; ry > 0; ry -= 26) { g.beginPath(); g.arc(x + 5, ry, 1.6, 0, Math.PI * 2); g.closePath(); g.arc(x + w - 5, ry, 1.6, 0, Math.PI * 2); g.fill(); }
        band('#ffcc00', '#1d1d26'); break;
      default:   // meadows: a wooden beam on ropes
        body('#8d6e63', '#bcaaa4'); g.strokeStyle = 'rgba(60,40,25,0.45)'; g.lineWidth = 1;
        for (let ry = yb - 20; ry > 0; ry -= 18) { g.beginPath(); g.moveTo(x + 4, ry); g.quadraticCurveTo(x + w / 2, ry - 4, x + w - 4, ry); g.stroke(); }
        g.fillStyle = '#d7ccc8'; for (const q of [6, w - 9]) g.fillRect(x + q, yb - 14, 3, 14);
        band('#a1887f', '#6d4c41');
    }
  }
  // ---------- props of the newer mini-events ----------
  function drawMineCart(g, x, foot) {
    g.fillStyle = '#212121'; for (const dx of [-9, 9]) { g.beginPath(); g.arc(x + dx, foot - 2.5, 3.5, 0, Math.PI * 2); g.fill(); }
    const cg = g.createLinearGradient(0, foot - 18, 0, foot - 4); cg.addColorStop(0, '#90a4ae'); cg.addColorStop(1, '#455a64');
    g.fillStyle = cg; g.beginPath(); g.moveTo(x - 15, foot - 18); g.lineTo(x + 15, foot - 18); g.lineTo(x + 12, foot - 5); g.lineTo(x - 12, foot - 5); g.closePath(); g.fill();
    g.fillStyle = '#cfd8dc'; g.fillRect(x - 15, foot - 19, 30, 2.5); g.fillStyle = 'rgba(0,0,0,0.25)'; g.fillRect(x - 3, foot - 16, 1.5, 10); g.fillRect(x + 4, foot - 16, 1.5, 10);
  }
  function drawSkateboard(g, x, foot) {
    g.fillStyle = '#ffca28'; for (const dx of [-8, 8]) { g.beginPath(); g.arc(x + dx, foot - 1.8, 2.2, 0, Math.PI * 2); g.fill(); }
    const bg = g.createLinearGradient(0, foot - 7, 0, foot - 3); bg.addColorStop(0, '#ef5350'); bg.addColorStop(1, '#b71c1c');
    g.fillStyle = bg; g.beginPath(); g.moveTo(x - 15, foot - 7); g.quadraticCurveTo(x - 17, foot - 9, x - 16, foot - 4); g.lineTo(x + 16, foot - 4); g.quadraticCurveTo(x + 17, foot - 9, x + 15, foot - 7); g.closePath(); g.fill();
    g.fillStyle = 'rgba(255,255,255,0.35)'; g.fillRect(x - 12, foot - 7, 24, 1);
  }
  function drawBalloon(g, x, foot) {
    const bx = x + 16 + Math.sin(time * 2) * 2, by = foot - 92 + Math.sin(time * 3) * 2;
    g.strokeStyle = 'rgba(80,80,80,0.8)'; g.lineWidth = 0.8; g.beginPath(); g.moveTo(x + 8, foot - 40); g.quadraticCurveTo(x + 14, foot - 60, bx, by + 13); g.stroke();
    const rg2 = g.createRadialGradient(bx - 4, by - 5, 1, bx, by, 13); rg2.addColorStop(0, '#ff8a80'); rg2.addColorStop(1, '#c62828');
    g.fillStyle = rg2; g.beginPath(); g.ellipse(bx, by, 10, 12.5, 0, 0, Math.PI * 2); g.fill();
    g.fillStyle = '#b71c1c'; g.beginPath(); g.moveTo(bx - 2, by + 12.5); g.lineTo(bx + 2, by + 12.5); g.lineTo(bx, by + 15); g.fill();
    g.fillStyle = 'rgba(255,255,255,0.6)'; g.beginPath(); g.ellipse(bx - 4, by - 5, 2, 3.5, -0.4, 0, Math.PI * 2); g.fill();
  }
  // =====================================================================
  //  1.0.47: every world has its own crates (same hitbox: x … x+w, from the ground up h).
  //  Shared look: a body gradient lit from the upper left, a bevelled top edge, a dark bottom edge,
  //  ambient occlusion where it stands, a thin outline.
  // =====================================================================
  function drawBox(k, x, w, h) {
    const g = ctx, y = groundY - h, t = time;
    const lin = (x0, y0, x1, y1, stops) => { const gr = g.createLinearGradient(x0, y0, x1, y1); stops.forEach(([o, c]) => gr.addColorStop(o, c)); return gr; };
    const body = (c, k1, k2) => { g.fillStyle = lin(x, y, x + w * 0.4, y + h, [[0, shade(c, k1 || 1.18)], [1, shade(c, k2 || 0.72)]]); g.fillRect(x, y, w, h); };
    const bevel = (c) => { g.fillStyle = 'rgba(255,255,255,0.28)'; g.fillRect(x, y, w, 2.5); g.fillStyle = 'rgba(0,0,0,0.22)'; g.fillRect(x, y + h - 3, w, 3); g.fillStyle = 'rgba(0,0,0,0.12)'; g.fillRect(x + w - 3, y, 3, h); g.strokeStyle = c || 'rgba(0,0,0,0.45)'; g.lineWidth = 1; g.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1); };
    // contact shadow on the ground
    g.fillStyle = lin(0, groundY - 2, 0, groundY + 6, [[0, 'rgba(0,0,0,0.3)'], [1, 'rgba(0,0,0,0)']]); g.fillRect(x - 4, groundY - 1, w + 8, 7);
    g.save(); g.beginPath(); g.rect(x, y, w, h); g.clip();
    const cells = Math.max(1, Math.round(w / 28)), cw = w / cells;
    switch (k) {
      case 'desert': case 'egypt': {   // sandstone blocks; in Egypt carved with signs
        body(k === 'egypt' ? '#e2bf7a' : '#d9b26a');
        g.strokeStyle = 'rgba(120,80,30,0.45)'; g.lineWidth = 1.2;
        for (let q = 1; q < cells; q++) { g.beginPath(); g.moveTo(x + q * cw, y); g.lineTo(x + q * cw, y + h); g.stroke(); }
        if (h > 40) { g.beginPath(); g.moveTo(x, y + h / 2); g.lineTo(x + w, y + h / 2); g.stroke(); }
        g.fillStyle = 'rgba(120,80,30,0.25)'; for (let q = 0; q < 6; q++) { const hx = x + ((q * 37 + x * 0) % w), hy = y + 4 + (q * 23) % (h - 8); g.beginPath(); g.arc(hx, hy, 1, 0, Math.PI * 2); g.fill(); }
        if (k === 'egypt') {
          g.strokeStyle = 'rgba(110,60,20,0.75)'; g.lineWidth = 1.4;
          for (let q = 0; q < cells; q++) {
            const cx = x + q * cw + cw / 2, cy = y + Math.min(h / 2, 16);
            if (q % 2 === 0) { g.beginPath(); g.ellipse(cx, cy, 6, 3, 0, 0, Math.PI * 2); g.stroke(); g.beginPath(); g.arc(cx, cy, 1.5, 0, Math.PI * 2); g.fill(); g.beginPath(); g.moveTo(cx - 1, cy + 3); g.lineTo(cx - 3, cy + 8); g.stroke(); }
            else { g.beginPath(); g.ellipse(cx, cy - 4, 3, 3.5, 0, 0, Math.PI * 2); g.moveTo(cx, cy); g.lineTo(cx, cy + 9); g.moveTo(cx - 4, cy + 2); g.lineTo(cx + 4, cy + 2); g.stroke(); }
          }
        } else { g.strokeStyle = 'rgba(90,60,25,0.5)'; g.lineWidth = 0.8; g.beginPath(); g.moveTo(x + w * 0.7, y); g.lineTo(x + w * 0.62, y + h * 0.3); g.lineTo(x + w * 0.68, y + h * 0.45); g.stroke(); }
        bevel('rgba(120,80,30,0.6)'); break;
      }
      case 'winter': {   // a clear ice block: cold gradient, inner cracks, frosty top, a shine
        g.fillStyle = lin(x, y, x + w, y + h, [[0, 'rgba(225,245,255,0.95)'], [0.5, 'rgba(144,202,249,0.92)'], [1, 'rgba(100,160,220,0.95)']]); g.fillRect(x, y, w, h);
        g.strokeStyle = 'rgba(255,255,255,0.75)'; g.lineWidth = 0.9;
        g.beginPath(); g.moveTo(x + w * 0.2, y + h * 0.3); g.lineTo(x + w * 0.45, y + h * 0.5); g.lineTo(x + w * 0.4, y + h * 0.8); g.moveTo(x + w * 0.45, y + h * 0.5); g.lineTo(x + w * 0.75, y + h * 0.42); g.stroke();
        g.fillStyle = 'rgba(255,255,255,0.55)'; g.beginPath(); g.moveTo(x + 4, y + 4); g.lineTo(x + 10, y + 4); g.lineTo(x + 4, y + h - 6); g.closePath(); g.fill();
        g.fillStyle = '#ffffff'; for (let q = 0; q < w; q += 6) { g.beginPath(); g.arc(x + q + 3, y + 1, 3 + (q % 3), 0, Math.PI); g.fill(); }
        bevel('rgba(60,120,190,0.6)'); break;
      }
      case 'xmas': {   // a present: wrapping with dots, a ribbon cross and a bow on top
        const pc = ['#d32f2f', '#1e88e5', '#43a047', '#8e24aa'][Math.floor(Math.abs(x + dist) / 97) % 4];
        body(pc);
        g.fillStyle = 'rgba(255,255,255,0.35)'; for (let a = 0; a < w; a += 9) for (let b = 0; b < h; b += 9) { g.beginPath(); g.arc(x + a + ((b / 9) % 2) * 4.5 + 2, y + b + 4, 1.4, 0, Math.PI * 2); g.fill(); }
        g.fillStyle = lin(x, 0, x + w, 0, [[0, '#fff59d'], [0.5, '#ffd54f'], [1, '#ffb300']]); g.fillRect(x + w / 2 - 3, y, 6, h); g.fillRect(x, y + h / 2 - 3, w, 6);
        bevel(); g.restore(); g.save();
        g.fillStyle = '#ffca28'; for (const sd of [-1, 1]) { g.beginPath(); g.ellipse(x + w / 2 + sd * 6, y - 3, 6, 3.5, sd * 0.5, 0, Math.PI * 2); g.fill(); }
        g.fillStyle = '#ffb300'; g.beginPath(); g.arc(x + w / 2, y - 2, 2.6, 0, Math.PI * 2); g.fill();
        break;
      }
      case 'city': {   // a cardboard box: flaps, packing tape, "this side up" arrows
        body('#c49a6c');
        g.fillStyle = 'rgba(255,255,255,0.12)'; for (let q = 3; q < h; q += 3) g.fillRect(x, y + q, w, 0.6);
        g.fillStyle = 'rgba(210,180,120,0.85)'; g.fillRect(x + w / 2 - 4, y, 8, h * 0.45);
        g.strokeStyle = 'rgba(80,50,20,0.5)'; g.lineWidth = 1; g.beginPath(); g.moveTo(x, y + 6); g.lineTo(x + w, y + 6); g.stroke();
        g.strokeStyle = 'rgba(40,40,40,0.7)'; g.lineWidth = 1.3;
        for (const dx of [-5, 5]) { const ax = x + w * 0.25 + dx * 0.6, ay = y + h * 0.62; g.beginPath(); g.moveTo(ax, ay + 6); g.lineTo(ax, ay - 4); g.moveTo(ax - 3, ay - 1); g.lineTo(ax, ay - 4); g.lineTo(ax + 3, ay - 1); g.stroke(); }
        bevel('rgba(90,60,30,0.6)'); break;
      }
      case 'space': {   // a metal cargo container: panels, rivets, a hazard band and a status light
        body('#78909c', 1.35, 0.6);
        g.strokeStyle = 'rgba(30,40,50,0.6)'; g.lineWidth = 1; for (let q = 1; q < cells; q++) { g.beginPath(); g.moveTo(x + q * cw, y); g.lineTo(x + q * cw, y + h); g.stroke(); }
        g.fillStyle = '#cfd8dc'; for (const [rx, ry] of [[4, 4], [w - 4, 4], [4, h - 7], [w - 4, h - 7]]) { g.beginPath(); g.arc(x + rx, y + ry, 1.4, 0, Math.PI * 2); g.fill(); }
        g.save(); g.beginPath(); g.rect(x, y + h - 9, w, 6); g.clip(); g.fillStyle = '#fdd835'; g.fillRect(x, y + h - 9, w, 6); g.fillStyle = '#212121'; for (let q = -6; q < w; q += 8) { g.beginPath(); g.moveTo(x + q, y + h - 3); g.lineTo(x + q + 4, y + h - 3); g.lineTo(x + q + 8, y + h - 9); g.lineTo(x + q + 4, y + h - 9); g.fill(); } g.restore();
        const on = Math.sin(t * 4 + x * 0.01) > 0; g.save(); g.shadowColor = '#00e5ff'; g.shadowBlur = on ? 8 : 0; g.fillStyle = on ? '#18ffff' : '#00606a'; g.fillRect(x + w / 2 - 5, y + 5, 10, 2.5); g.restore();
        bevel('rgba(20,30,40,0.7)'); break;
      }
      case 'volcano': {   // an obsidian block with pulsing lava cracks
        g.fillStyle = lin(x, y, x + w, y + h, [[0, '#4e342e'], [0.5, '#2b1a14'], [1, '#160b08']]); g.fillRect(x, y, w, h);
        const pul = 0.6 + 0.4 * Math.sin(t * 3 + x * 0.02);
        g.save(); g.shadowColor = '#ff6d00'; g.shadowBlur = 8 * pul; g.strokeStyle = `rgba(255,${110 + 80 * pul | 0},0,${0.85})`; g.lineWidth = 1.6;
        g.beginPath(); g.moveTo(x + w * 0.15, y); g.lineTo(x + w * 0.35, y + h * 0.35); g.lineTo(x + w * 0.25, y + h * 0.6); g.lineTo(x + w * 0.45, y + h); g.moveTo(x + w * 0.35, y + h * 0.35); g.lineTo(x + w * 0.7, y + h * 0.45); g.lineTo(x + w, y + h * 0.3); g.stroke(); g.restore();
        g.fillStyle = 'rgba(255,255,255,0.18)'; g.beginPath(); g.moveTo(x + 3, y + 3); g.lineTo(x + w * 0.5, y + 3); g.lineTo(x + 3, y + h * 0.5); g.closePath(); g.fill();
        bevel('rgba(0,0,0,0.7)'); break;
      }
      case 'candy': {   // a chocolate bar: squares with a shine, a wrapper at one end
        body('#6d3d1f', 1.25, 0.7);
        const sq = 13;
        for (let a = 0; a < w; a += sq) for (let b = 0; b < h; b += sq) {
          g.fillStyle = 'rgba(255,255,255,0.12)'; g.fillRect(x + a + 2, y + b + 2, sq - 4, 2);
          g.fillStyle = 'rgba(0,0,0,0.25)'; g.fillRect(x + a + 2, y + b + sq - 3, sq - 4, 1.5); g.fillRect(x + a + sq - 3, y + b + 2, 1.5, sq - 4);
        }
        g.fillStyle = lin(x, 0, x + 10, 0, [[0, '#ec407a'], [1, '#ad1457']]); g.fillRect(x + w - 10, y, 10, h);
        g.fillStyle = '#ffd54f'; g.fillRect(x + w - 10, y + h * 0.35, 10, 3);
        bevel('rgba(40,20,10,0.7)'); break;
      }
      case 'ocean': {   // a treasure chest: planks, iron bands, a gold lock
        body('#8d5a35');
        g.strokeStyle = 'rgba(60,35,15,0.5)'; g.lineWidth = 1; for (let q = 7; q < h; q += 7) { g.beginPath(); g.moveTo(x, y + q); g.lineTo(x + w, y + q); g.stroke(); }
        g.fillStyle = lin(x, 0, x + w, 0, [[0, '#90a4ae'], [0.5, '#eceff1'], [1, '#78909c']]); for (const bx of [x + 4, x + w - 8]) g.fillRect(bx, y, 4, h);
        g.fillRect(x, y + Math.min(12, h * 0.35), w, 3);
        g.fillStyle = lin(0, y + 12, 0, y + 22, [[0, '#fff59d'], [1, '#ff8f00']]); roundRectOn(g, x + w / 2 - 4, y + Math.min(12, h * 0.35) - 2, 8, 9, 2); g.fill();
        g.fillStyle = '#4e342e'; g.fillRect(x + w / 2 - 0.8, y + Math.min(12, h * 0.35) + 2, 1.6, 3);
        bevel('rgba(50,30,10,0.7)'); break;
      }
      case 'underwater': {   // a sunken crate: green-tinted wood, barnacles, swaying weed, rising bubbles
        body('#5d7a6a');
        g.strokeStyle = 'rgba(30,50,40,0.6)'; g.lineWidth = 2; g.strokeRect(x + 2, y + 2, w - 4, h - 4); g.beginPath(); g.moveTo(x + 3, y + 3); g.lineTo(x + w - 3, y + h - 3); g.stroke();
        g.fillStyle = '#d7ccc8'; for (let q = 0; q < 6; q++) { g.beginPath(); g.arc(x + 4 + (q * 13) % (w - 6), y + h - 4 - (q * 7) % 12, 1.8, 0, Math.PI * 2); g.fill(); }
        bevel('rgba(20,40,30,0.7)'); g.restore(); g.save();
        g.strokeStyle = '#2e7d32'; g.lineWidth = 2; for (const dx of [3, w - 5]) { g.beginPath(); g.moveTo(x + dx, y + 4); g.quadraticCurveTo(x + dx + Math.sin(t * 2 + dx) * 4, y - 8, x + dx + Math.sin(t * 2 + dx + 1) * 5, y - 16); g.stroke(); }
        g.fillStyle = 'rgba(200,240,255,0.6)'; for (let q = 0; q < 3; q++) { const by = ((t * 30 + q * 20) % 50); g.beginPath(); g.arc(x + w / 2 + Math.sin(t * 3 + q) * 3, y - by, 1.6, 0, Math.PI * 2); g.fill(); }
        break;
      }
      case 'sakura': {   // a red lacquered box with gold corners and a little cherry-blossom crest
        body('#c62828', 1.25, 0.65);
        g.fillStyle = '#ffd54f'; for (const [cx, cy] of [[x, y], [x + w - 6, y], [x, y + h - 6], [x + w - 6, y + h - 6]]) g.fillRect(cx, cy, 6, 6);
        for (let q = 0; q < cells; q++) { const cx = x + q * cw + cw / 2, cy = y + h / 2; g.fillStyle = '#f8bbd0'; for (let p = 0; p < 5; p++) { const a = p / 5 * Math.PI * 2 - Math.PI / 2; g.beginPath(); g.ellipse(cx + Math.cos(a) * 3, cy + Math.sin(a) * 3, 2.4, 1.6, a, 0, Math.PI * 2); g.fill(); } g.fillStyle = '#ffd54f'; g.beginPath(); g.arc(cx, cy, 1.2, 0, Math.PI * 2); g.fill(); }
        g.fillStyle = 'rgba(255,255,255,0.3)'; g.fillRect(x + 3, y + 3, w - 6, 1.5);
        bevel('rgba(90,0,0,0.7)'); break;
      }
      case 'autumn': {   // a hay bale: straw strokes and two twine bands
        body('#d4a843', 1.2, 0.75);
        g.lineWidth = 0.8;
        for (let q = 0; q < w * h / 22; q++) { const hx = x + ((q * 47) % w), hy = y + ((q * 29) % h); g.strokeStyle = q % 3 ? 'rgba(255,240,170,0.55)' : 'rgba(140,100,30,0.5)'; g.beginPath(); g.moveTo(hx, hy); g.lineTo(hx + 5, hy + (q % 2 ? 1.5 : -1.5)); g.stroke(); }
        g.strokeStyle = '#8d6e63'; g.lineWidth = 1.6; for (const f of [0.3, 0.7]) { g.beginPath(); g.moveTo(x + w * f, y); g.lineTo(x + w * f, y + h); g.stroke(); }
        bevel('rgba(120,80,20,0.6)'); g.restore(); g.save();
        g.strokeStyle = '#e6c25a'; g.lineWidth = 0.9; for (let q = 2; q < w; q += 4) { g.beginPath(); g.moveTo(x + q, y + 1); g.lineTo(x + q + (q % 3 - 1) * 2, y - 3 - (q % 4)); g.stroke(); }
        break;
      }
      case 'mine': {   // a crate full of ore: iron corners, dark wood, coal and gems poking over the top
        body('#6d4c41');
        g.strokeStyle = 'rgba(30,20,10,0.6)'; g.lineWidth = 1; for (let q = 6; q < h; q += 8) { g.beginPath(); g.moveTo(x, y + q); g.lineTo(x + w, y + q); g.stroke(); }
        g.fillStyle = lin(x, 0, x + 8, 0, [[0, '#90a4ae'], [1, '#455a64']]); for (const [cx, cy] of [[x, y], [x + w - 7, y], [x, y + h - 7], [x + w - 7, y + h - 7]]) g.fillRect(cx, cy, 7, 7);
        bevel('rgba(20,10,5,0.8)'); g.restore(); g.save();
        for (let q = 0; q < w / 7; q++) { const ox = x + 3 + q * 7, gem = q % 4 === 2; g.fillStyle = gem ? (q % 8 === 2 ? '#40c4ff' : '#e040fb') : '#263238'; g.beginPath(); g.moveTo(ox - 3.5, y + 1); g.lineTo(ox, y - 4 - (q % 3)); g.lineTo(ox + 3.5, y + 1); g.closePath(); g.fill(); if (gem) { g.fillStyle = 'rgba(255,255,255,0.7)'; g.fillRect(ox - 1, y - 2, 1, 1.5); } }
        break;
      }
      case 'wildwest': {   // a dynamite crate: weathered planks, rope handles and a stencil
        body('#a1764b');
        g.strokeStyle = 'rgba(70,45,20,0.6)'; g.lineWidth = 1.2; for (let q = 9; q < h; q += 9) { g.beginPath(); g.moveTo(x, y + q); g.lineTo(x + w, y + q); g.stroke(); }
        g.strokeStyle = 'rgba(80,50,20,0.35)'; g.lineWidth = 0.6; for (let q = 0; q < h; q += 3) { g.beginPath(); g.moveTo(x, y + q + 1); g.quadraticCurveTo(x + w / 2, y + q + (q % 2 ? 1.5 : -1), x + w, y + q + 1); g.stroke(); }
        g.fillStyle = 'rgba(150,30,20,0.85)'; g.font = `900 ${Math.min(14, h * 0.4)}px system-ui, sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('TNT', x + w / 2, y + h / 2 + 1);
        bevel('rgba(60,35,15,0.7)'); break;
      }
      case 'neon': {   // a dark cube with glowing edges, a grid and a slow colour pulse
        g.fillStyle = lin(x, y, x, y + h, [[0, '#2a1a4a'], [1, '#0d0820']]); g.fillRect(x, y, w, h);
        g.strokeStyle = 'rgba(0,229,255,0.18)'; g.lineWidth = 0.7; for (let q = 7; q < w; q += 7) { g.beginPath(); g.moveTo(x + q, y); g.lineTo(x + q, y + h); g.stroke(); } for (let q = 7; q < h; q += 7) { g.beginPath(); g.moveTo(x, y + q); g.lineTo(x + w, y + q); g.stroke(); }
        g.restore(); g.save();
        const hue = (t * 40 + x * 0.1) % 360; g.shadowColor = `hsl(${hue},100%,60%)`; g.shadowBlur = 12; g.strokeStyle = `hsl(${hue},100%,65%)`; g.lineWidth = 2; g.strokeRect(x + 1, y + 1, w - 2, h - 2);
        break;
      }
      case 'skyland': {   // a solid cloud block: puffy top, soft blue-grey shading underneath
        g.fillStyle = lin(0, y, 0, y + h, [[0, '#ffffff'], [0.7, '#e3eef8'], [1, '#b0c4de']]); g.fillRect(x, y, w, h);
        g.fillStyle = 'rgba(176,196,222,0.5)'; for (let q = 0; q < w; q += 9) { g.beginPath(); g.arc(x + q + 4, y + h - 2, 6, Math.PI, 0); g.fill(); }
        g.restore(); g.save();
        g.fillStyle = '#ffffff'; for (let q = 0; q <= w; q += 8) { g.beginPath(); g.arc(x + q, y + 2, 5 + (q % 3), Math.PI, 0); g.fill(); }
        g.fillStyle = 'rgba(255,255,255,0.9)'; g.fillRect(x, y + 1, w, 2);
        break;
      }
      case 'swamp': {   // a rotten mossy crate with dripping moss and a toadstool
        body('#5d4b37', 1.1, 0.7);
        g.strokeStyle = 'rgba(30,25,15,0.6)'; g.lineWidth = 2; g.strokeRect(x + 2, y + 2, w - 4, h - 4); g.beginPath(); g.moveTo(x + 3, y + h - 3); g.lineTo(x + w - 3, y + 3); g.stroke();
        g.fillStyle = lin(0, y, 0, y + 10, [[0, '#8bc34a'], [1, 'rgba(85,139,47,0)']]); g.fillRect(x, y, w, 10);
        bevel('rgba(20,20,10,0.7)'); g.restore(); g.save();
        g.fillStyle = '#7cb342'; for (let q = 2; q < w; q += 7) { const L = 4 + (q * 7) % 9 + Math.sin(t * 2 + q) * 0.8; g.beginPath(); g.moveTo(x + q - 2, y + 2); g.quadraticCurveTo(x + q, y + 2 + L * 1.3, x + q + 2, y + 2); g.fill(); }
        g.fillStyle = '#e53935'; g.beginPath(); g.ellipse(x + w - 6, y - 3, 5, 3, 0, Math.PI, 0); g.fill(); g.fillStyle = '#fafafa'; g.fillRect(x + w - 7, y - 3, 2, 3); g.beginPath(); g.arc(x + w - 8, y - 4.2, 0.8, 0, Math.PI * 2); g.arc(x + w - 4, y - 4.5, 0.7, 0, Math.PI * 2); g.fill();
        break;
      }
      case 'halloween': {   // a dark crate bound with chains, glowing purple runes
        body('#3b2f4a', 1.3, 0.7);
        g.strokeStyle = 'rgba(10,5,20,0.6)'; g.lineWidth = 1; for (let q = 8; q < h; q += 8) { g.beginPath(); g.moveTo(x, y + q); g.lineTo(x + w, y + q); g.stroke(); }
        const pul = 0.5 + 0.5 * Math.sin(t * 3 + x * 0.03);
        g.save(); g.shadowColor = '#b388ff'; g.shadowBlur = 8; g.strokeStyle = `rgba(200,150,255,${0.5 + 0.5 * pul})`; g.lineWidth = 1.4;
        for (let q = 0; q < cells; q++) { const cx = x + q * cw + cw / 2, cy = y + h / 2; g.beginPath(); g.moveTo(cx, cy - 6); g.lineTo(cx + 5, cy + 4); g.lineTo(cx - 5, cy + 4); g.closePath(); g.moveTo(cx, cy - 6); g.lineTo(cx, cy + 6); g.stroke(); }
        g.restore();
        g.strokeStyle = '#90a4ae'; g.lineWidth = 1.4; for (let q = 0; q < w + h; q += 5) { g.beginPath(); g.ellipse(x + q * w / (w + h), y + q * h / (w + h), 2.4, 1.4, 0.6, 0, Math.PI * 2); g.stroke(); }
        bevel('rgba(0,0,0,0.7)'); break;
      }
      case 'savanna': {   // a woven wicker basket
        body('#c8a060', 1.2, 0.7);
        for (let b = 0; b < h; b += 5) for (let a = (b / 5) % 2 * 5; a < w; a += 10) { g.fillStyle = 'rgba(255,230,170,0.45)'; g.beginPath(); g.ellipse(x + a + 2.5, y + b + 2.5, 3.5, 2, 0, 0, Math.PI * 2); g.fill(); g.fillStyle = 'rgba(90,60,25,0.35)'; g.fillRect(x + a + 5, y + b, 1, 5); }
        g.fillStyle = lin(0, y, 0, y + 5, [[0, '#e0bc7c'], [1, '#8d6a35']]); g.fillRect(x, y, w, 5);
        bevel('rgba(90,60,25,0.7)'); break;
      }
      case 'jungle': {   // bamboo poles lashed with rope
        for (let q = 0; q < w; q += 7) {
          g.fillStyle = lin(x + q, 0, x + q + 7, 0, [[0, '#9ccc65'], [0.5, '#c5e1a5'], [1, '#689f38']]); g.fillRect(x + q, y, 7, h);
          g.fillStyle = 'rgba(51,105,30,0.7)'; for (let n = 6 + (q % 3) * 3; n < h; n += 14) g.fillRect(x + q, y + n, 7, 1.6);
        }
        g.strokeStyle = '#8d6e63'; g.lineWidth = 2; for (const f of [0.25, 0.75]) { g.beginPath(); g.moveTo(x, y + h * f); g.lineTo(x + w, y + h * f); g.stroke(); }
        bevel('rgba(40,70,20,0.7)'); break;
      }
      default: {   // meadows: a wooden crate with planks, grain, a frame, a brace and nails
        body('#d29a58');
        g.strokeStyle = 'rgba(120,70,25,0.35)'; g.lineWidth = 0.7; for (let q = 2; q < h; q += 4) { g.beginPath(); g.moveTo(x, y + q); g.bezierCurveTo(x + w * 0.3, y + q + 1.2, x + w * 0.6, y + q - 1.2, x + w, y + q); g.stroke(); }
        for (let q = 0; q < cells; q++) {
          const bx = x + q * cw;
          g.strokeStyle = '#7a4e22'; g.lineWidth = 3; g.strokeRect(bx + 1.5, y + 1.5, cw - 3, h - 3);
          g.lineWidth = 2.5; g.beginPath(); g.moveTo(bx + 3, y + h - 3); g.lineTo(bx + cw - 3, y + 3); g.stroke();
          g.strokeStyle = 'rgba(255,220,170,0.35)'; g.lineWidth = 0.8; g.beginPath(); g.moveTo(bx + 3, y + h - 4.5); g.lineTo(bx + cw - 4.5, y + 3); g.stroke();
          g.fillStyle = '#4e2e10'; for (const [nx, ny] of [[5, 5], [cw - 5, 5], [5, h - 5], [cw - 5, h - 5]]) { g.beginPath(); g.arc(bx + nx, y + ny, 1.3, 0, Math.PI * 2); g.fill(); }
        }
        bevel('rgba(70,40,10,0.6)');
      }
    }
    g.restore();
  }

  function drawObstacles() {
    const wk = worldKind(palette());
    // the upper mine-cart track along a cart zone
    for (const z of LV.zones || []) if (z.id === 'cart') {
      const a = Math.max(0, sx(z.x0) - 40), b = Math.min(viewW, sx(z.x1));
      if (b > 0 && a < viewW) {
        for (const ln of [2, 1]) {   // the raised tracks on timber posts
          const yy = groundY - CART_UP * ln;
          ctx.fillStyle = '#5d4037'; for (let xx = a - ((a + dist) % 60); xx < b; xx += 60) ctx.fillRect(xx + ln * 9, yy, 5, CART_UP * ln);
          ctx.fillStyle = '#6d4c41'; ctx.fillRect(a, yy + 2, b - a, 4); ctx.fillStyle = '#9e9e9e'; ctx.fillRect(a, yy, b - a, 2);
        }
      }
    }
    for (const o of LV.obs) {
      const x = sx(o.x);
      if (x > viewW + 30 || x + o.w < -30) continue;
      if (o.t === 'spike') drawHazard(wk, x, o.w, o.h, o);
      else if (o.t === 'box') { drawBox(wk, x, o.w, o.h);
      } else if (o.t === 'bird') {
        const bob = Math.sin(time * 6 + o.x) * 2;
        drawBird(ctx, birdKind(palette(), o.x), x + o.w / 2, groundY - o.y - o.h / 2 + bob, time + o.x * 0.013);
      } else if (o.t === 'cartblock') {   // a barrier on one of the tracks
        const yb = groundY - (o.lane ? CART_UP : 0);
        ctx.fillStyle = '#8d6e63'; ctx.fillRect(x, yb - 26, o.w, 26); ctx.strokeStyle = '#4e342e'; ctx.lineWidth = 2; ctx.strokeRect(x + 1, yb - 25, o.w - 2, 24);
        ctx.beginPath(); ctx.moveTo(x + 2, yb - 24); ctx.lineTo(x + o.w - 2, yb - 2); ctx.moveTo(x + o.w - 2, yb - 24); ctx.lineTo(x + 2, yb - 2); ctx.stroke();
        ctx.fillStyle = '#e53935'; ctx.fillRect(x, yb - 30, o.w, 4); ctx.fillStyle = '#fafafa'; for (let q = 0; q < o.w; q += 10) ctx.fillRect(x + q, yb - 30, 5, 4);
      } else if (o.t === 'ramp') {   // a wooden skate ramp
        const yb = groundY;
        const rg2 = ctx.createLinearGradient(0, yb - o.h, 0, yb); rg2.addColorStop(0, '#d7ccc8'); rg2.addColorStop(1, '#6d4c41');
        ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.fillRect(x, yb - 1, o.w + 4, 5);
        ctx.fillStyle = rg2; ctx.beginPath(); ctx.moveTo(x, yb); ctx.lineTo(x + o.w, yb - o.h); ctx.lineTo(x + o.w, yb); ctx.closePath(); ctx.fill();
        ctx.strokeStyle = 'rgba(70,40,20,0.5)'; ctx.lineWidth = 1; for (let q = 10; q < o.w; q += 10) { ctx.beginPath(); ctx.moveTo(x + q, yb - o.h * q / o.w); ctx.lineTo(x + q, yb); ctx.stroke(); }
        ctx.strokeStyle = '#fafafa'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, yb); ctx.lineTo(x + o.w, yb - o.h); ctx.stroke();
        ctx.fillStyle = '#4e342e'; ctx.fillRect(x + o.w - 3, yb - o.h, 3, o.h);
      } else if (o.t === 'beam') {
        drawBeam(wk, x, o.w, groundY - o.y);
      } else if (o.t === 'saw') {
        const cx = x + o.w / 2, cy = groundY - o.cy;
        const hg2 = ctx.createLinearGradient(0, groundY - 3, 0, groundY + 4); hg2.addColorStop(0, '#5a5a66'); hg2.addColorStop(1, '#1d1d24');
        ctx.fillStyle = hg2; roundRect(cx - o.r - 5, groundY - 3, o.r * 2 + 10, 6, 2); ctx.fill();
        ctx.fillStyle = '#ffcc00'; for (let q = -o.r; q < o.r; q += 10) ctx.fillRect(cx + q, groundY - 2, 5, 1.5);
        ctx.save(); ctx.translate(cx, cy);
        ctx.strokeStyle = 'rgba(220,225,235,0.35)'; ctx.lineWidth = 3; for (let q = 0; q < 2; q++) { ctx.beginPath(); ctx.arc(0, 0, o.r - 2 - q * 4, -time * 14 + q, -time * 14 + q + 1.6); ctx.stroke(); }   // motion blur
        ctx.rotate(-time * 14);
        const mg = ctx.createRadialGradient(-6, -6, 2, 0, 0, o.r);
        mg.addColorStop(0, '#f5f7fa'); mg.addColorStop(0.7, '#b0b6c2'); mg.addColorStop(1, '#7a8190');
        ctx.fillStyle = mg; ctx.strokeStyle = '#555c69'; ctx.lineWidth = 1.2;
        ctx.beginPath();
        for (let k = 0; k < 24; k++) { const a = k / 24 * Math.PI * 2, rr = k % 2 ? o.r - 5 : o.r; ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); }
        ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.fillStyle = 'rgba(60,65,75,0.35)'; for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; ctx.beginPath(); ctx.moveTo(Math.cos(a) * (o.r - 5), Math.sin(a) * (o.r - 5)); ctx.lineTo(Math.cos(a + 0.26) * o.r, Math.sin(a + 0.26) * o.r); ctx.lineTo(Math.cos(a + 0.26) * (o.r - 5), Math.sin(a + 0.26) * (o.r - 5)); ctx.fill(); }
        ctx.strokeStyle = 'rgba(255,255,255,0.45)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(0, 0, o.r * 0.6, 0, Math.PI * 2); ctx.stroke();
        for (let k = 0; k < 4; k++) { ctx.rotate(Math.PI / 2); ctx.fillStyle = 'rgba(80,85,95,0.5)'; ctx.beginPath(); ctx.ellipse(o.r * 0.38, 0, 3, 1.6, 0, 0, Math.PI * 2); ctx.fill(); }
        const hub = ctx.createRadialGradient(-2, -2, 0.5, 0, 0, 6.5); hub.addColorStop(0, '#ff8a80'); hub.addColorStop(1, '#b71c1c');
        ctx.fillStyle = hub; ctx.beginPath(); ctx.arc(0, 0, 6, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#eceff1'; ctx.beginPath(); ctx.arc(0, 0, 1.8, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      } else if (o.t === 'plat') {
        const top = groundY - platTop(o);
        const pgp = ctx.createLinearGradient(x + o.w / 2 - 4, 0, x + o.w / 2 + 4, 0); pgp.addColorStop(0, '#6b7385'); pgp.addColorStop(0.5, '#4b5263'); pgp.addColorStop(1, '#2f3440');
        ctx.fillStyle = pgp; ctx.fillRect(x + o.w / 2 - 4, top + 12, 8, groundY + 60 - top);
        ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.fillRect(x + 4, top + 12, o.w - 8, 4);
        const pg2 = ctx.createLinearGradient(0, top, 0, top + 12);
        pg2.addColorStop(0, '#dde3ee'); pg2.addColorStop(0.35, '#b5bdcc'); pg2.addColorStop(1, '#6f7886');
        ctx.fillStyle = pg2; roundRect(x, top, o.w, 12, 2.5); ctx.fill();
        ctx.fillStyle = '#4a5160'; ctx.fillRect(x + 1, top + 9, o.w - 2, 3);
        ctx.fillStyle = '#ffcc00'; for (let k = 6; k < o.w - 4; k += 16) ctx.fillRect(x + k, top + 3, 8, 3);
        ctx.fillStyle = '#e7ebf2'; for (const rx of [3, o.w - 3]) { ctx.beginPath(); ctx.arc(x + rx, top + 6, 1.3, 0, Math.PI * 2); ctx.fill(); }
      }
    }
    // magnet pickups and loot boxes
    for (const it of LV.items) {
      if (it.got) continue;
      const x = sx(it.x);
      if (x < -30 || x > viewW + 30) continue;
      const y = groundY - it.y + Math.sin(time * 4) * 4;
      if (it.t === 'letter') {   // a golden letter tile
        const ch = S.word[it.i] || '?';
        ctx.fillStyle = 'rgba(255,214,0,0.35)'; ctx.beginPath(); ctx.arc(x, y, 18, 0, Math.PI * 2); ctx.fill();
        const lg = ctx.createLinearGradient(0, y - 12, 0, y + 12); lg.addColorStop(0, '#fff59d'); lg.addColorStop(1, '#ffb300');
        ctx.fillStyle = lg; roundRect(x - 12, y - 12, 24, 24, 5); ctx.fill(); ctx.strokeStyle = '#e65100'; ctx.lineWidth = 2; ctx.stroke();
        ctx.fillStyle = '#5d2e00'; ctx.font = '900 17px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(ch, x, y + 1);
        continue;
      }
      if (it.t === 'portal') {   // a swirling portal ring
        const py2 = groundY - 34;
        ctx.save(); ctx.translate(x, py2);
        ctx.shadowColor = '#e040fb'; ctx.shadowBlur = 14;
        for (let k = 0; k < 3; k++) { ctx.strokeStyle = ['#7c4dff', '#e040fb', '#b388ff'][k]; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(0, 0, 12 - k * 2.5, 34 - k * 6, 0, time * (2 + k) , time * (2 + k) + Math.PI * 1.6); ctx.stroke(); }
        ctx.shadowBlur = 0; ctx.fillStyle = 'rgba(124,77,255,0.3)'; ctx.beginPath(); ctx.ellipse(0, 0, 10, 30, 0, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
        continue;
      }
      if (it.t === 'loot') {
        const gl2 = ctx.createRadialGradient(x, y, 4, x, y, 30); gl2.addColorStop(0, 'rgba(255,214,0,0.55)'); gl2.addColorStop(1, 'rgba(255,214,0,0)');
        ctx.fillStyle = gl2; ctx.fillRect(x - 30, y - 30, 60, 60);
        ctx.imageSmoothingEnabled = false; ctx.drawImage(lootIcon(), x - 13, y - 13, 26, 26); ctx.imageSmoothingEnabled = true;
        continue;
      }
      ctx.fillStyle = 'rgba(255,255,255,0.35)';
      ctx.beginPath(); ctx.arc(x, y, 18 + Math.sin(time * 6) * 2, 0, Math.PI * 2); ctx.fill();
      drawMagnetIcon(ctx, x, y + 2, 1.1);
    }
  }

  // ---------- Birds: each world has its own kinds ----------
  const BIRDS = {
    wild: [
      { n: 'sparrow', body: '#8d6e63', belly: '#d7ccc8', head: '#795548', wing: '#5d4037', beak: '#ffb300', cap: '#a1887f' },
      { n: 'bluebird', body: '#1e88e5', belly: '#ffab91', head: '#1565c0', wing: '#0d47a1', beak: '#424242' },
      { n: 'cardinal', body: '#e53935', belly: '#ef5350', head: '#c62828', wing: '#b71c1c', beak: '#ff8f00', crest: 1, mask: 1 },
      { n: 'goldfinch', body: '#fdd835', belly: '#fff59d', head: '#fbc02d', wing: '#212121', beak: '#ffab91', cap: '#212121' }
    ],
    night: [
      { n: 'owl', body: '#8d6e63', belly: '#d7ccc8', head: '#795548', wing: '#5d4037', beak: '#ffb300', owl: 1 }
    ],
    winter: [
      { n: 'bullfinch', body: '#78909c', belly: '#e53935', head: '#263238', wing: '#37474f', beak: '#212121', cap: '#212121' },
      { n: 'tit', body: '#90a4ae', belly: '#fdd835', head: '#212121', wing: '#5c8fc0', beak: '#212121', cheek: 1 },
      { n: 'waxwing', body: '#bcaaa4', belly: '#d7ccc8', head: '#a1887f', wing: '#6d4c41', beak: '#212121', crest: 1, mask: 1, tip: '#fdd835' }
    ],
    desert: [
      { n: 'vulture', body: '#4e342e', belly: '#6d4c41', head: '#f8bbd0', wing: '#3e2723', beak: '#bdbdbd', big: 1, ruff: '#efebe9' },
      { n: 'hoopoe', body: '#ff8a65', belly: '#ffccbc', head: '#ff7043', wing: '#212121', beak: '#424242', crest: 1, stripes: 1, longBeak: 1 },
      { n: 'falcon', body: '#a1887f', belly: '#efebe9', head: '#6d4c41', wing: '#795548', beak: '#ffca28', spots: 1 }
    ],
    city: [
      { n: 'pigeon', body: '#90a4ae', belly: '#b0bec5', head: '#78909c', wing: '#607d8b', beak: '#424242', neck: '#26a69a', bars: 1 },
      { n: 'crow', body: '#263238', belly: '#37474f', head: '#212121', wing: '#1c262b', beak: '#455a64', big: 1 },
      { n: 'magpie', body: '#212121', belly: '#fafafa', head: '#111111', wing: '#1565c0', beak: '#212121', longTail: 1 }
    ],
    space: [{ n: 'ufo', ufo: 1 }],
    sea: [{ n: 'gull', body: '#fafafa', belly: '#ffffff', head: '#fafafa', wing: '#90a4ae', beak: '#ffb300' }]
  };
  function birdKind(pal, x) {
    const biome = (WORLD[pal.decor] && WORLD[pal.decor].birds) || { snow: 'winter', dunes: 'desert', volcano: 'desert', city: 'city', space: 'space', ocean: 'sea' }[pal.decor]
      || (pal.night > 0.5 ? 'night' : 'wild');
    const list = BIRDS[biome] || BIRDS_NEW[biome], h = Math.sin(x * 0.0137) * 43758.5453;
    return list[Math.floor((h - Math.floor(h)) * list.length)];
  }

  // bird facing left (towards the runner); (cx, cy) centre of the hitbox
  function drawBird(g, b, cx, cy, t) {
    g.save(); g.translate(cx, cy);
    g.lineCap = 'round'; g.lineJoin = 'round';
    if (b.pet) { g.scale(-1, 1); drawPet(g, b.pet, 0, b.dy, t); g.restore(); return; }   // bats, drones, ghosts reuse the pet drawings
    if (b.fish) {   // swims towards the runner
      const wag = Math.sin(t * 10) * 3;
      g.fillStyle = b.fin; g.beginPath(); g.moveTo(10, 0); g.lineTo(19, -7 + wag); g.lineTo(19, 7 + wag); g.closePath(); g.fill();
      g.beginPath(); g.moveTo(-2, -6); g.quadraticCurveTo(4, -13, 8, -6); g.fill();
      const fg = g.createLinearGradient(0, -8, 0, 8); fg.addColorStop(0, shade(b.body, 1.2)); fg.addColorStop(1, shade(b.body, 0.8));
      g.fillStyle = fg; g.beginPath(); g.ellipse(0, 0, 12, 7.5, 0, 0, Math.PI * 2); g.fill();
      if (b.stripes) { g.fillStyle = 'rgba(255,255,255,0.8)'; g.fillRect(-2, -7, 2.5, 14); g.fillRect(4, -6, 2.5, 12); }
      g.fillStyle = b.fin; g.beginPath(); g.moveTo(2, 2); g.lineTo(7, 6 + wag * 0.4); g.lineTo(5, 1); g.fill();
      g.fillStyle = '#fff'; g.beginPath(); g.arc(-6, -1.5, 2.6, 0, Math.PI * 2); g.fill();
      g.fillStyle = '#111'; g.beginPath(); g.arc(-6.6, -1.5, 1.4, 0, Math.PI * 2); g.fill();
      g.strokeStyle = 'rgba(0,0,0,0.4)'; g.lineWidth = 0.8; g.beginPath(); g.arc(-10, 1.5, 1.6, -0.5, 1.2); g.stroke();
      g.restore(); return;
    }
    if (b.ufo) {   // mini alien on a mini UFO
      const tilt = Math.sin(t * 3) * 0.08;
      g.rotate(tilt);
      g.fillStyle = 'rgba(160,255,200,0.25)'; g.beginPath(); g.moveTo(-7, 6); g.lineTo(7, 6); g.lineTo(11, 16); g.lineTo(-11, 16); g.fill();
      g.fillStyle = 'rgba(180,230,255,0.55)'; g.beginPath(); g.arc(0, -3, 8, Math.PI, 0); g.fill();
      g.fillStyle = '#7ed957'; g.beginPath(); g.arc(0, -3, 4.5, 0, Math.PI * 2); g.fill();
      g.strokeStyle = '#7ed957'; g.lineWidth = 1.2; g.beginPath(); g.moveTo(0, -7); g.lineTo(-2, -12); g.stroke();
      g.fillStyle = '#ff4081'; g.beginPath(); g.arc(-2, -12.5, 1.4, 0, Math.PI * 2); g.fill();
      g.fillStyle = '#111'; g.beginPath(); g.ellipse(-1.8, -3.5, 1.3, 1.8, 0, 0, Math.PI * 2); g.closePath(); g.ellipse(1.6, -3.5, 1.3, 1.8, 0, 0, Math.PI * 2); g.fill();
      const grd = g.createLinearGradient(0, -2, 0, 6);
      grd.addColorStop(0, '#cfd8dc'); grd.addColorStop(1, '#607d8b');
      g.fillStyle = grd; g.beginPath(); g.ellipse(0, 2, 17, 5, 0, 0, Math.PI * 2); g.fill();
      for (let i = 0; i < 5; i++) {
        g.fillStyle = Math.floor(t * 8 + i) % 2 ? '#ffeb3b' : '#ff5252';
        g.beginPath(); g.arc(-12 + i * 6, 3, 1.4, 0, Math.PI * 2); g.fill();
      }
      g.restore(); return;
    }
    const s = b.big ? 1.15 : 1;
    g.scale(s, s);
    const flap = Math.sin(t * 18);
    // tail
    g.fillStyle = b.wing;
    const tl = b.longTail ? 20 : 11;
    g.beginPath(); g.moveTo(10, -1); g.lineTo(10 + tl, -5 + (b.longTail ? -2 : 0)); g.lineTo(10 + tl, 3); g.closePath(); g.fill();
    if (b.tip) { g.fillStyle = b.tip; g.fillRect(10 + tl - 2.5, -5, 2.5, 8); }
    // far wing (behind body)
    g.fillStyle = shade(b.wing, 0.75);
    g.beginPath(); g.moveTo(-1, -3); g.quadraticCurveTo(6, -14 - flap * 6, 13, -9 - flap * 7); g.lineTo(6, -1); g.fill();
    // body + belly
    const grd = g.createLinearGradient(0, -9, 0, 9);
    grd.addColorStop(0, shade(b.body, 1.15)); grd.addColorStop(1, shade(b.body, 0.85));
    g.fillStyle = grd; g.beginPath(); g.ellipse(2, 0, 13, 8.5, -0.08, 0, Math.PI * 2); g.fill();
    g.fillStyle = b.belly; g.beginPath(); g.ellipse(-1, 3.5, 9, 5, -0.1, 0, Math.PI * 2); g.fill();
    if (b.spots) { g.fillStyle = shade(b.body, 0.7); for (let i = 0; i < 4; i++) g.fillRect(-5 + i * 3, 2 + (i % 2) * 2, 1.5, 1.5); }
    if (b.bars) { g.strokeStyle = '#37474f'; g.lineWidth = 1.2; g.beginPath(); g.moveTo(4, -3); g.lineTo(9, -1); g.moveTo(5, 0); g.lineTo(10, 2); g.stroke(); }
    // head
    const hx = -11, hy = -4, hr = b.owl ? 7.5 : 6;
    if (b.ruff) { g.fillStyle = b.ruff; g.beginPath(); g.ellipse(-6, -1, 5, 6, 0, 0, Math.PI * 2); g.fill(); }
    if (b.neck) { g.fillStyle = b.neck; g.beginPath(); g.ellipse(-7, 0, 4, 5, 0, 0, Math.PI * 2); g.fill(); }
    g.fillStyle = b.head; g.beginPath(); g.arc(hx, hy, hr, 0, Math.PI * 2); g.fill();
    if (b.cap) { g.fillStyle = b.cap; g.beginPath(); g.arc(hx, hy, hr, Math.PI * 1.05, Math.PI * 1.95); g.fill(); }
    if (b.cheek) { g.fillStyle = '#fafafa'; g.beginPath(); g.ellipse(hx - 0.5, hy + 1.5, 3.2, 2.4, 0, 0, Math.PI * 2); g.fill(); }
    if (b.crest) {
      g.fillStyle = b.stripes ? '#ff7043' : b.head;
      g.beginPath(); g.moveTo(hx - 2, hy - 5); g.lineTo(hx + 7, hy - 12); g.lineTo(hx + 4, hy - 4); g.fill();
      if (b.stripes) { g.fillStyle = '#212121'; g.fillRect(hx + 5, hy - 11, 2, 2); }
    }
    // beak (the owl's is in the middle of its face, pointing down)
    g.fillStyle = b.beak;
    const bl = b.longBeak ? 10 : 6;
    if (!b.owl) { g.beginPath(); g.moveTo(hx - hr + 1.5, hy - 1.5); g.lineTo(hx - hr - bl, hy + 1); g.lineTo(hx - hr + 1.5, hy + 2.2); g.closePath(); g.fill(); }
    // eye(s)
    if (b.mask) { g.fillStyle = '#111'; g.beginPath(); g.ellipse(hx - 2, hy - 0.5, 3.6, 2.2, 0, 0, Math.PI * 2); g.fill(); }
    if (b.owl) {
      for (const s2 of [-1, 1]) {   // ear tufts, face disc, two eyes side by side
        g.fillStyle = b.head; g.beginPath(); g.moveTo(hx + s2 * 2.5, hy - 5.5); g.lineTo(hx + s2 * 5, hy - 11); g.lineTo(hx + s2 * 6.2, hy - 4); g.closePath(); g.fill();
      }
      for (const s2 of [-1, 1]) {
        g.fillStyle = '#efe3d3'; g.beginPath(); g.ellipse(hx + s2 * 3, hy - 0.6, 3.3, 3.5, 0, 0, Math.PI * 2); g.fill();
        g.fillStyle = '#ffca28'; g.beginPath(); g.arc(hx + s2 * 3, hy - 0.8, 2.2, 0, Math.PI * 2); g.fill();
        g.fillStyle = '#111'; g.beginPath(); g.arc(hx + s2 * 3, hy - 0.8, 1.2, 0, Math.PI * 2); g.fill();
        g.fillStyle = '#fff'; g.beginPath(); g.arc(hx + s2 * 3 - 0.6, hy - 1.5, 0.5, 0, Math.PI * 2); g.fill();
      }
      g.fillStyle = b.beak; g.beginPath(); g.moveTo(hx - 1.2, hy + 1); g.lineTo(hx + 1.2, hy + 1); g.lineTo(hx, hy + 4); g.closePath(); g.fill();
    } else {
      g.fillStyle = '#fff'; g.beginPath(); g.arc(hx - 2, hy - 1.5, 2.1, 0, Math.PI * 2); g.fill();
      g.fillStyle = '#111'; g.beginPath(); g.arc(hx - 2.6, hy - 1.5, 1.1, 0, Math.PI * 2); g.fill();
    }
    // near wing (flapping)
    const wg = g.createLinearGradient(0, -14, 0, 4);
    wg.addColorStop(0, shade(b.wing, 1.2)); wg.addColorStop(1, b.wing);
    g.fillStyle = wg;
    g.beginPath(); g.moveTo(-3, -2); g.quadraticCurveTo(4, -16 - flap * 8, 15, -8 - flap * 9); g.quadraticCurveTo(8, -2, 4, 1); g.closePath(); g.fill();
    if (b.stripes) { g.strokeStyle = '#fafafa'; g.lineWidth = 1.3; g.beginPath(); g.moveTo(3, -5 - flap * 3); g.lineTo(9, -6 - flap * 5); g.stroke(); }
    g.restore();
  }

  function drawMagnetIcon(g, x, y, s) {
    g.save(); g.translate(x, y); g.scale(s, s);
    g.lineCap = 'butt'; g.strokeStyle = '#e53935'; g.lineWidth = 7;
    g.beginPath(); g.arc(0, 0, 8, Math.PI, Math.PI * 2); g.lineTo(8, 9); g.moveTo(-8, 0); g.lineTo(-8, 9); g.stroke();
    g.fillStyle = '#cfd4dc'; g.fillRect(-11.5, 6, 7, 5); g.fillRect(4.5, 6, 7, 5);
    g.restore();
  }

  function drawHeart(g, x, y, s, col) {
    g.save(); g.translate(x, y); g.scale(s, s);
    g.fillStyle = col;
    g.beginPath(); g.moveTo(0, 7);
    g.bezierCurveTo(-12, -1, -7, -11, 0, -4);
    g.bezierCurveTo(7, -11, 12, -1, 0, 7);
    g.fill(); g.restore();
  }

  function drawCoins() {
    for (const st of LV.stars || []) {   // 1.0.45: a level star — big, glowing, slowly turning
      if (st.got) continue;
      const x = sx(st.x); if (x < -30 || x > viewW + 30) continue;
      const y = groundY - st.y + Math.sin(time * 3 + st.x) * 2;
      ctx.save(); ctx.translate(x, y); ctx.rotate(Math.sin(time * 2 + st.x) * 0.3);
      const hg = ctx.createRadialGradient(0, 0, 2, 0, 0, 22); hg.addColorStop(0, 'rgba(255,236,120,0.75)'); hg.addColorStop(1, 'rgba(255,236,120,0)');
      ctx.fillStyle = hg; ctx.fillRect(-22, -22, 44, 44);
      const sg = ctx.createRadialGradient(-3, -4, 1, 0, 0, 13); sg.addColorStop(0, '#fffde7'); sg.addColorStop(0.5, '#ffd600'); sg.addColorStop(1, '#ff8f00');
      ctx.fillStyle = sg; starPath(ctx, 0, 0, 13); ctx.fill(); ctx.strokeStyle = '#e65100'; ctx.lineWidth = 1.4; ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,0.8)'; ctx.beginPath(); ctx.ellipse(-3.5, -4.5, 2.5, 1.4, -0.6, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    }
    for (const c of LV.coins) {
      if (c.got) continue;
      const x = sx(c.x);
      if (x < -20 || x > viewW + 20) continue;
      const y = groundY - c.y + Math.sin(time * 3 + c.x * 0.05) * 1.2;
      drawCoinAt(ctx, x, y, c.v, time * 4 + c.x * 0.02, c.x);
    }
  }
  // 1.0.47: coins turn in 3D (you see the rim when they are edge-on), have a raised rim, an embossed centre
  // (a star on gold), a sweeping shine and a sparkle now and then; crystals are cut gems with facets and a glow
  function drawCoinAt(g, x, y, v, ang, seed) {
    if (v >= 25) {   // a cut crystal
      const w = 0.35 + 0.65 * Math.abs(Math.cos(ang * 0.5)), pul = 0.6 + 0.4 * Math.sin(ang * 0.8 + seed);
      const halo = g.createRadialGradient(x, y, 2, x, y, 22); halo.addColorStop(0, `rgba(120,230,255,${0.45 * pul})`); halo.addColorStop(1, 'rgba(120,230,255,0)');
      g.fillStyle = halo; g.fillRect(x - 22, y - 22, 44, 44);
      const T = y - 12, M = y - 4, B = y + 13, R = 10 * w, r2 = 5 * w;
      const facets = [   // crown (top) and pavilion (bottom) faces, light to dark
        [[x - r2, T], [x + r2, T], [x + R, M], [x - R, M], '#b3f5ff'],
        [[x - R, M], [x - r2, T], [x - R * 0.2, M], '#7fe3ff'],
        [[x + R, M], [x + r2, T], [x + R * 0.2, M], '#4fc3f7'],
        [[x - R, M], [x, B], [x - R * 0.25, M], '#4dd0e1'],
        [[x - R * 0.25, M], [x, B], [x + R * 0.25, M], '#29b6f6'],
        [[x + R * 0.25, M], [x, B], [x + R, M], '#0288d1']
      ];
      for (const f of facets) { const col = f[f.length - 1]; g.fillStyle = col; g.beginPath(); f.slice(0, -1).forEach(([px, py], i) => i ? g.lineTo(px, py) : g.moveTo(px, py)); g.closePath(); g.fill(); }
      g.strokeStyle = '#01579b'; g.lineWidth = 1.2; g.beginPath(); g.moveTo(x - r2, T); g.lineTo(x + r2, T); g.lineTo(x + R, M); g.lineTo(x, B); g.lineTo(x - R, M); g.closePath(); g.stroke();
      g.strokeStyle = 'rgba(255,255,255,0.6)'; g.lineWidth = 0.6; g.beginPath(); g.moveTo(x - R, M); g.lineTo(x + R, M); g.stroke();
      g.fillStyle = 'rgba(255,255,255,0.85)'; g.beginPath(); g.moveTo(x - r2 * 0.6, T + 1.5); g.lineTo(x, T + 1.5); g.lineTo(x - R * 0.45, M - 1); g.closePath(); g.fill();
      const sp = Math.sin(ang * 1.3 + seed);
      if (sp > 0.75) { const a = (sp - 0.75) * 4; g.fillStyle = `rgba(255,255,255,${a})`; g.save(); g.translate(x + R * 0.5, T + 2); g.rotate(ang); g.fillRect(-4, -0.6, 8, 1.2); g.fillRect(-0.6, -4, 1.2, 8); g.restore(); }
      return;
    }
    const gold = v >= 5, r = gold ? 11 : 8.5, cs = Math.cos(ang), w = Math.max(0.12, Math.abs(cs));
    const C = gold ? { hi: '#fff6c2', mid: '#ffcc1a', lo: '#c98a00', edge: '#a86a00', emb: '#e0a400' } : { hi: '#ffffff', mid: '#d5dbe4', lo: '#8c95a3', edge: '#6f7785', emb: '#b8c0cc' };
    const thick = (gold ? 2.6 : 2) * (1 - w);
    // the rim seen from the side when the coin is turned
    if (thick > 0.2) { g.fillStyle = C.edge; g.beginPath(); g.ellipse(x + (cs > 0 ? -thick : thick) * 0.6, y, r * w, r, 0, 0, Math.PI * 2); g.fill(); g.fillRect(x - thick * 0.6, y - r, thick * 1.2, r * 2); }
    const fg = g.createRadialGradient(x - r * w * 0.4, y - r * 0.45, 1, x, y, r * 1.1); fg.addColorStop(0, C.hi); fg.addColorStop(0.5, C.mid); fg.addColorStop(1, C.lo);
    g.fillStyle = fg; g.beginPath(); g.ellipse(x, y, r * w, r, 0, 0, Math.PI * 2); g.fill();
    g.strokeStyle = C.edge; g.lineWidth = 1.4; g.stroke();
    g.strokeStyle = C.emb; g.lineWidth = 1; g.beginPath(); g.ellipse(x, y, r * w * 0.72, r * 0.72, 0, 0, Math.PI * 2); g.stroke();   // raised rim
    if (w > 0.35) {   // the embossed centre: a star on gold, a dot on silver
      g.save(); g.translate(x, y); g.scale(w, 1);
      if (gold) { g.fillStyle = C.lo; starPath(g, 0.6, 0.7, r * 0.42); g.fill(); g.fillStyle = '#ffe066'; starPath(g, 0, 0, r * 0.42); g.fill(); }
      else { g.fillStyle = C.lo; g.beginPath(); g.arc(0.5, 0.6, r * 0.24, 0, Math.PI * 2); g.fill(); g.fillStyle = '#eef1f6'; g.beginPath(); g.arc(0, 0, r * 0.24, 0, Math.PI * 2); g.fill(); }
      g.restore();
    }
    // a shine that sweeps across as it turns, and a sparkle now and then
    g.save(); g.beginPath(); g.ellipse(x, y, r * w, r, 0, 0, Math.PI * 2); g.clip();
    const sx2 = x + Math.sin(ang) * r * w; g.fillStyle = 'rgba(255,255,255,0.55)'; g.beginPath(); g.moveTo(sx2 - 2, y - r); g.lineTo(sx2 + 2, y - r); g.lineTo(sx2 - 1, y + r); g.lineTo(sx2 - 5, y + r); g.closePath(); g.fill();
    g.restore();
    const sp = Math.sin(ang * 0.7 + seed * 0.3);
    if (sp > 0.85) { const a = (sp - 0.85) * 6.6; g.fillStyle = `rgba(255,255,255,${a})`; g.save(); g.translate(x + r * 0.45 * w, y - r * 0.5); g.fillRect(-3.5, -0.5, 7, 1); g.fillRect(-0.5, -3.5, 1, 7); g.restore(); }
  }

  function drawFinish() {
    if (!isFinite(LV.len)) return;
    const x = sx(LV.len);
    if (x < -40 || x > viewW + 40) return;
    ctx.fillStyle = '#555'; ctx.fillRect(x - 2, groundY - 120, 4, 120);
    const cs = 10;
    for (let r = 0; r < 4; r++) for (let k = 0; k < 5; k++) {
      ctx.fillStyle = (r + k) % 2 ? '#111' : '#fff';
      const wave = Math.sin(time * 6 + k * 0.8) * 2;
      ctx.fillRect(x + 2 + k * cs, groundY - 120 + r * cs + wave, cs, cs);
    }
  }

  // ---------- Stickman with clothes ----------
  // g: 2D context, (x, foot): feet position, look: {color, hat, shorts, shoes}
  // 1.0.39: poses of the newer emotes. For side i (0 near, 1 far): l / a = [upper, lower] angles of leg / arm (0 = down, π = up, +π/2 = forward)
  const EMO_POSE = {
    clap: (t, i) => { const w = Math.abs(Math.sin(t * 14)) * 0.35; return { l: i ? [-0.18, -0.12] : [0.18, 0.12], a: i ? [1.35 - w, 2.0 - w] : [1.45 + w, 2.1 + w] }; },
    jumpjack: (t, i) => { const k = Math.abs(Math.sin(t * 6)); return { l: i ? [-0.15 - k * 0.45, -0.1 - k * 0.45] : [0.15 + k * 0.45, 0.1 + k * 0.45], a: i ? [0.4 + k * 2.3, 0.4 + k * 2.3] : [-0.4 - k * 2.3, -0.4 - k * 2.3], hop: -k * 6 }; },
    shrug: (t, i) => ({ l: i ? [-0.18, -0.12] : [0.18, 0.12], a: i ? [-0.9, -2.4] : [0.9, 2.4], hop: -Math.abs(Math.sin(t * 3)) * 1.5 }),
    salute: (t, i) => ({ l: i ? [-0.1, -0.05] : [0.1, 0.05], a: i ? [0.15, 0.1] : [2.2, 3.95] }),
    robotdance: (t, i) => { const b = Math.sin(t * 6 + i * Math.PI) > 0; return { l: i ? [-0.2, -0.2] : [0.2, 0.2], a: b ? [1.57, 3.14] : [1.57, 1.57], hop: (Math.floor(t * 6) % 2) * -1.5 }; },
    guitar: (t, i) => ({ l: i ? [-0.45, -0.3] : [0.45, 0.3], a: i ? [1.0, 1.5] : [0.7, 1.7 + Math.sin(t * 22) * 0.35] }),
    kick: (t, i) => { const k = Math.max(0, Math.sin(t * 5)); return { l: i ? [-0.15, -0.1] : [0.2 + k * 1.4, 0.2 + k * 1.4], a: i ? [-0.8, -0.4] : [0.9, 1.4] }; },
    dab: (t, i) => ({ l: i ? [-0.25, -0.15] : [0.25, 0.15], a: i ? [-2.3, -2.3] : [2.6, 4.3] }),
    heartpose: (t, i) => ({ l: i ? [-0.15, -0.1] : [0.15, 0.1], a: i ? [Math.PI + 0.55, Math.PI - 0.9] : [Math.PI - 0.55, Math.PI + 0.9] }),
    karate: (t, i) => { const pn = Math.sin(t * 8) > 0 ? i : 1 - i; return { l: i ? [-0.55, -0.35] : [0.55, 0.35], a: pn ? [1.57, 1.57] : [0.5, 2.6] }; },
    yoga: (t, i) => ({ l: i ? [1.1, -1.4] : [0, 0], a: [Math.PI - 0.12 * (i ? -1 : 1), Math.PI], hop: Math.sin(t * 2) * 0.6 }),
    tada: (t, i) => ({ l: i ? [-0.3, -0.2] : [0.3, 0.2], a: i ? [Math.PI + 0.75, Math.PI + 0.75] : [Math.PI - 0.75, Math.PI - 0.75], hop: -Math.abs(Math.sin(t * 4)) * 3 }),
    sit: (t, i) => ({ l: i ? [1.45, 0.05] : [1.55, 0.15], a: i ? [0.9, 1.6] : [1.0, 1.6], hop: 9 }),
    roar: (t, i) => { const k = Math.min(1, (t % 1.6) / 0.25); return { l: i ? [-0.5, -0.25] : [0.5, 0.3], a: i ? [1.25 + k * 0.2, 1.75 + k * 0.35] : [1.4 + k * 0.2, 1.95 + k * 0.35], hop: -Math.abs(Math.sin(t * 30)) * k * 0.8 }; }
  };
  // =====================================================================
  //  Accessories (1.0.44, redrawn): shaded from a lit upper-left, darker undersides, highlights,
  //  thin outlines, cloth that waves in a few segments. P = { neck, sh, hip, head, arms, legs }.
  // =====================================================================
  const accLG = (g, x0, y0, x1, y1, c, k1, k2) => { const gr = g.createLinearGradient(x0, y0, x1, y1); gr.addColorStop(0, shade(c, k1 || 1.3)); gr.addColorStop(1, shade(c, k2 || 0.72)); return gr; };
  const accLine = (g, pts, c, w) => { g.strokeStyle = c; g.lineWidth = w; g.lineCap = 'round'; g.lineJoin = 'round'; g.beginPath(); pts.forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y)); g.stroke(); };
  function drawAccBack(g, acc, P, t, mode) {
    const { neck, sh, hip } = P;
    if (acc === 'cape') {   // cloth in segments: each lower point waves a little later than the one above
      const w = k => Math.sin(t * 9 - k * 1.3) * (1.5 + k * 1.6);
      const top = { x: sh.x + 1, y: sh.y - 3 }, A = { x: sh.x - 10 + w(1), y: sh.y + 9 }, B = { x: sh.x - 19 + w(2), y: sh.y + 21 }, C = { x: sh.x - 7 + w(2) * 0.6, y: sh.y + 25 };
      g.fillStyle = accLG(g, top.x, top.y, B.x, B.y, '#c62828', 1.25, 0.65);
      g.beginPath(); g.moveTo(top.x, top.y); g.quadraticCurveTo(A.x - 3, A.y - 3, B.x, B.y); g.quadraticCurveTo((B.x + C.x) / 2, B.y + 3 + w(3) * 0.3, C.x, C.y);
      g.quadraticCurveTo(sh.x - 2, sh.y + 10, sh.x + 3, sh.y + 1); g.closePath(); g.fill();
      g.strokeStyle = 'rgba(80,0,0,0.45)'; g.lineWidth = 0.7; g.beginPath(); g.moveTo(sh.x - 2, sh.y + 2); g.quadraticCurveTo(A.x, A.y + 2, (B.x + C.x) / 2, B.y + 2); g.stroke();
      g.fillStyle = '#ffc107'; g.beginPath(); g.arc(sh.x + 1.5, sh.y - 2, 1.4, 0, Math.PI * 2); g.fill();
    } else if (acc === 'backpack') {
      const x = neck.x - 14, y = neck.y + 2;
      g.fillStyle = accLG(g, x, y, x + 10, y + 18, '#ff9800'); roundRectOn(g, x, y, 10, 18, 3.5); g.fill();
      g.strokeStyle = '#bf360c'; g.lineWidth = 0.5; g.stroke();
      g.fillStyle = accLG(g, x, y + 9, x + 10, y + 16, '#f57c00', 1.1, 0.7); roundRectOn(g, x + 1, y + 9, 8, 7, 2); g.fill();
      g.fillStyle = '#e65100'; roundRectOn(g, x + 0.5, y + 1, 9, 5, 2); g.fill();
      g.fillStyle = '#cfd8dc'; g.fillRect(x + 4, y + 4.5, 2, 2.4);
      g.fillStyle = 'rgba(255,255,255,0.3)'; g.fillRect(x + 1.6, y + 2, 1.2, 14);
    } else if (acc === 'wings') {   // feathered wings: three rows of feathers, the far wing paler and higher
      const fl = Math.sin(t * 8) * 4;
      for (const k of [1, 0]) {
        const bx = sh.x - 1, by = sh.y + 2, tipX = sh.x - 28 - k * 2, tipY = sh.y - 10 - fl - k * 3;
        g.fillStyle = accLG(g, bx, tipY, bx, by + 10, k ? '#dfe7f1' : '#ffffff', 1.05, 0.88);
        g.beginPath(); g.moveTo(bx, by); g.quadraticCurveTo(sh.x - 14, sh.y - 17 - fl - k * 3, tipX, tipY);
        for (let q = 0; q < 5; q++) { const fx = tipX + q * 5.2, fy = tipY + 5 + q * 3.2; g.quadraticCurveTo(fx - 2, fy + 3.5, fx + 1.5, fy + 1); }
        g.lineTo(bx - 1, by + 8); g.closePath(); g.fill();
        g.strokeStyle = 'rgba(120,144,170,0.6)'; g.lineWidth = 0.5; g.stroke();
        g.strokeStyle = 'rgba(144,164,190,0.55)'; for (let q = 1; q < 4; q++) { g.beginPath(); g.moveTo(bx - 2, by + 2); g.quadraticCurveTo(sh.x - 10 - q * 3, sh.y - 6 - fl * 0.5, tipX + q * 6, tipY + 6 + q * 2); g.stroke(); }
      }
    } else if (acc === 'jetpack') {   // two metal tanks, nozzles, flame when in the air
      for (const dx of [-15, -9.5]) {
        g.fillStyle = accLG(g, neck.x + dx, 0, neck.x + dx + 5.5, 0, '#90a4ae', 1.4, 0.6); roundRectOn(g, neck.x + dx, neck.y + 1, 5.5, 19, 2.6); g.fill();
        g.fillStyle = '#546e7a'; g.fillRect(neck.x + dx + 0.5, neck.y + 6, 4.5, 1.2); g.fillRect(neck.x + dx + 0.5, neck.y + 13, 4.5, 1.2);
        g.fillStyle = '#37474f'; g.beginPath(); g.moveTo(neck.x + dx + 0.8, neck.y + 20); g.lineTo(neck.x + dx + 4.7, neck.y + 20); g.lineTo(neck.x + dx + 4, neck.y + 23); g.lineTo(neck.x + dx + 1.5, neck.y + 23); g.fill();
        if (mode === 'jump') {
          const fh = 9 + Math.sin(t * 60 + dx) * 3, fx = neck.x + dx + 2.75, fy = neck.y + 23;
          const fg = g.createLinearGradient(0, fy, 0, fy + fh); fg.addColorStop(0, '#fff59d'); fg.addColorStop(0.5, '#ffa726'); fg.addColorStop(1, 'rgba(244,67,54,0)');
          g.fillStyle = fg; g.beginPath(); g.moveTo(fx - 2, fy); g.quadraticCurveTo(fx, fy + fh * 1.2, fx + 2, fy); g.fill();
        }
      }
      g.fillStyle = '#263238'; g.fillRect(neck.x - 10, neck.y + 4, 1.5, 12);
    } else if (acc === 'sword') {   // 1.0.46: hilt sticking up behind the shoulder, the scabbard running down the back to below the hip
      const H = { x: neck.x - 6, y: neck.y - 8 }, T = { x: hip.x - 10, y: hip.y + 1 };
      const L = Math.hypot(T.x - H.x, T.y - H.y), ang = Math.atan2(T.y - H.y, T.x - H.x);
      g.save(); g.translate(H.x, H.y); g.rotate(ang);
      g.fillStyle = '#ffca28'; g.beginPath(); g.arc(-1.4, 0, 1.6, 0, Math.PI * 2); g.fill();                       // pommel
      g.fillStyle = '#4e342e'; g.fillRect(0, -1.1, 6.5, 2.2);                                                      // grip
      g.strokeStyle = '#8d6e63'; g.lineWidth = 0.5; for (let q = 0.6; q < 6.4; q += 1.3) { g.beginPath(); g.moveTo(q, -1.1); g.lineTo(q + 0.8, 1.1); g.stroke(); }
      g.fillStyle = accLG(g, 6.5, -4.5, 7.5, 4.5, '#ffd54f', 1.2, 0.7); roundRectOn(g, 6.5, -4.4, 1.8, 8.8, 0.8); g.fill();   // cross-guard
      g.fillStyle = accLG(g, 0, -2.2, 0, 2.2, '#6d4c41', 1.35, 0.65); roundRectOn(g, 8.3, -2, L - 8.3, 4, 1.4); g.fill();      // scabbard
      g.fillStyle = '#ffc107'; g.fillRect(8.3, -2.1, 1.6, 4.2); g.fillRect(L * 0.55, -2.1, 1.2, 4.2);
      g.beginPath(); g.moveTo(L - 3, -2.1); g.lineTo(L + 1.2, 0); g.lineTo(L - 3, 2.1); g.closePath(); g.fill();   // chape
      g.fillStyle = 'rgba(255,255,255,0.25)'; g.fillRect(10, -1.6, L - 14, 0.7);
      g.restore();
    } else if (acc === 'butterfly') {   // two pairs of wings with veins and spots, flapping
      const fl = 0.55 + 0.45 * Math.abs(Math.sin(t * 7));
      for (const k of [1, 0]) {
        g.save(); g.translate(sh.x - 1, sh.y + 4); g.scale(fl * (k ? 0.85 : 1), 1);
        const wg = g.createLinearGradient(-26, -14, 0, 10);
        wg.addColorStop(0, k ? '#7e57c2' : '#ab47bc'); wg.addColorStop(0.5, k ? '#ef6c00' : '#ff9800'); wg.addColorStop(1, '#ffd54f');
        g.fillStyle = wg; g.strokeStyle = '#3e2723'; g.lineWidth = 0.8;
        g.beginPath(); g.moveTo(0, 0); g.bezierCurveTo(-8, -22, -28, -20, -22, -4); g.bezierCurveTo(-20, 2, -8, 2, 0, 0); g.fill(); g.stroke();
        g.beginPath(); g.moveTo(0, 1); g.bezierCurveTo(-6, 6, -18, 14, -12, 17); g.bezierCurveTo(-6, 18, -2, 8, 0, 1); g.fill(); g.stroke();
        g.strokeStyle = 'rgba(62,39,35,0.5)'; g.lineWidth = 0.5; for (const [x2, y2] of [[-20, -12], [-15, -16], [-22, -4], [-12, 13]]) { g.beginPath(); g.moveTo(0, 0); g.quadraticCurveTo(x2 * 0.5, y2 * 0.4, x2, y2); g.stroke(); }
        g.fillStyle = '#fff'; g.beginPath(); g.arc(-17, -10, 1.8, 0, Math.PI * 2); g.fill(); g.beginPath(); g.arc(-11, -14, 1.3, 0, Math.PI * 2); g.fill();
        g.fillStyle = '#3e2723'; g.beginPath(); g.arc(-14, -6, 1.4, 0, Math.PI * 2); g.fill();
        g.restore();
      }
    } else if (acc === 'guitarback') {   // a guitar slung on the back, strings and frets
      g.save(); g.translate(neck.x - 9, neck.y + 12); g.rotate(-0.6);
      g.fillStyle = '#5d4037'; g.fillRect(-1.1, -21, 2.2, 15); g.fillStyle = '#3e2723'; roundRectOn(g, -2.2, -24, 4.4, 4, 1); g.fill();
      g.fillStyle = '#d7ccc8'; for (let q = 0; q < 4; q++) g.fillRect(-1.1, -19 + q * 3.4, 2.2, 0.4);
      const bg2 = g.createRadialGradient(-2, -1, 1, 0, 1, 9); bg2.addColorStop(0, '#ffab91'); bg2.addColorStop(1, '#d84315');
      g.fillStyle = bg2; g.beginPath(); g.ellipse(0, 4, 6, 7, 0, 0, Math.PI * 2); g.fill(); g.beginPath(); g.ellipse(0, -4, 4.6, 5, 0, 0, Math.PI * 2); g.fill();
      g.strokeStyle = '#4e342e'; g.lineWidth = 0.5; g.beginPath(); g.ellipse(0, 4, 6, 7, 0, 0, Math.PI * 2); g.stroke();
      g.fillStyle = '#3e2723'; g.beginPath(); g.arc(0, 0.5, 1.9, 0, Math.PI * 2); g.fill(); g.fillRect(-2, 7, 4, 1.2);
      g.strokeStyle = 'rgba(255,255,255,0.65)'; g.lineWidth = 0.25; for (const sx3 of [-0.6, 0, 0.6]) { g.beginPath(); g.moveTo(sx3, -22); g.lineTo(sx3, 7.5); g.stroke(); }
      g.restore();
      accLine(g, [[neck.x + 1, neck.y], [hip.x - 7, hip.y + 2]], '#212121', 1.1);
    } else if (acc === 'shieldback') {   // a round wooden shield: planks, iron rim, a metal boss
      const sx2 = neck.x - 9, sy2 = neck.y + 10;
      g.save(); g.beginPath(); g.arc(sx2, sy2, 9, 0, Math.PI * 2); g.clip();
      g.fillStyle = accLG(g, sx2 - 9, sy2 - 9, sx2 + 9, sy2 + 9, '#a1887f', 1.25, 0.65); g.fillRect(sx2 - 9, sy2 - 9, 18, 18);
      g.strokeStyle = 'rgba(78,52,46,0.65)'; g.lineWidth = 0.8; for (const dx of [-4.5, 0, 4.5]) { g.beginPath(); g.moveTo(sx2 + dx, sy2 - 9); g.lineTo(sx2 + dx, sy2 + 9); g.stroke(); }
      g.restore();
      g.strokeStyle = accLG(g, sx2 - 9, sy2 - 9, sx2 + 9, sy2 + 9, '#b0bec5', 1.4, 0.6); g.lineWidth = 1.8; g.beginPath(); g.arc(sx2, sy2, 8.6, 0, Math.PI * 2); g.stroke();
      const bg2 = g.createRadialGradient(sx2 - 1, sy2 - 1, 0.3, sx2, sy2, 3); bg2.addColorStop(0, '#fafafa'); bg2.addColorStop(1, '#78909c');
      g.fillStyle = bg2; g.beginPath(); g.arc(sx2, sy2, 2.8, 0, Math.PI * 2); g.fill();
      g.fillStyle = '#eceff1'; for (let q = 0; q < 6; q++) { const a = q / 6 * Math.PI * 2; g.beginPath(); g.arc(sx2 + Math.cos(a) * 7.2, sy2 + Math.sin(a) * 7.2, 0.6, 0, Math.PI * 2); g.fill(); }
    }
  }
  function drawAccFront(g, acc, P, t) {
    const { neck, sh, hip, arms } = P;
    if (acc === 'backpack') {   // the shoulder strap with a buckle
      accLine(g, [[neck.x - 5, neck.y + 3], [neck.x + 1, neck.y + 15]], '#bf360c', 2.2);
      accLine(g, [[neck.x - 4.6, neck.y + 3.6], [neck.x + 0.8, neck.y + 14]], '#ff8a65', 0.6);
      g.fillStyle = '#cfd8dc'; g.fillRect(neck.x - 2.6, neck.y + 8.5, 2.4, 2);
    } else if (acc === 'gloves' || acc === 'mittens') {
      for (const a of arms) {
        const ang = Math.atan2(a.e.y - a.k.y, a.e.x - a.k.x);
        g.save(); g.translate(a.e.x, a.e.y); g.rotate(ang);
        if (acc === 'gloves') {   // puffy cartoon gloves with a rolled cuff and finger lines
          g.fillStyle = accLG(g, -3, -3, 3, 3, '#fafafa', 1, 0.8); g.beginPath(); g.ellipse(0.8, 0, 3.6, 3.1, 0, 0, Math.PI * 2); g.fill();
          g.strokeStyle = '#9e9e9e'; g.lineWidth = 0.5; g.stroke();
          g.beginPath(); g.moveTo(1.5, -1); g.lineTo(3.5, -1); g.moveTo(1.5, 0.4); g.lineTo(3.8, 0.4); g.stroke();
          g.fillStyle = '#eeeeee'; roundRectOn(g, -4, -2.2, 2.4, 4.4, 1); g.fill(); g.stroke();
        } else {   // knitted mittens: thumb, ribbed cuff, a white stripe
          g.fillStyle = accLG(g, -3, -3, 3, 3, '#e53935', 1.2, 0.75); g.beginPath(); g.ellipse(0.8, 0, 3.6, 3, 0, 0, Math.PI * 2); g.fill();
          g.beginPath(); g.ellipse(0.2, -2.6, 1.3, 1.6, -0.5, 0, Math.PI * 2); g.fill();
          g.fillStyle = '#fafafa'; g.fillRect(0.2, -2.8, 1, 5.6);
          g.fillStyle = '#eeeeee'; roundRectOn(g, -4.2, -2.4, 2.6, 4.8, 1); g.fill();
          g.strokeStyle = 'rgba(0,0,0,0.15)'; g.lineWidth = 0.4; for (let q = -3.8; q < -1.8; q += 0.8) { g.beginPath(); g.moveTo(q, -2.2); g.lineTo(q, 2.2); g.stroke(); }
        }
        g.restore();
      }
    } else if (acc === 'bowtie') {   // two folded wings and a knot
      const bx = neck.x + 1.5, by = neck.y + 2.5;
      for (const sd of [-1, 1]) {
        g.fillStyle = accLG(g, bx, by - 3, bx, by + 3, '#d81b60', sd < 0 ? 1.1 : 1.35, 0.7);
        g.beginPath(); g.moveTo(bx, by); g.quadraticCurveTo(bx + sd * 2.4, by - 3.8, bx + sd * 5, by - 3.2); g.lineTo(bx + sd * 4.4, by); g.lineTo(bx + sd * 5, by + 3.2); g.quadraticCurveTo(bx + sd * 2.4, by + 3.8, bx, by); g.fill();
        g.strokeStyle = 'rgba(136,14,79,0.6)'; g.lineWidth = 0.5; g.beginPath(); g.moveTo(bx + sd * 1.2, by - 0.6); g.lineTo(bx + sd * 3.8, by - 1.5); g.stroke();
      }
      g.fillStyle = '#ad1457'; roundRectOn(g, bx - 1.2, by - 1.5, 2.4, 3, 0.8); g.fill();
    } else if (acc === 'tie') {   // knot, a long blade with diagonal stripes and a highlight
      const tx2 = neck.x + (hip.x - neck.x) * 0.58, ty2 = neck.y + (hip.y - neck.y) * 0.58;
      g.fillStyle = accLG(g, neck.x - 2, neck.y, neck.x + 2, neck.y + 4, '#c62828', 1.2, 0.7);
      g.beginPath(); g.moveTo(neck.x - 1.8, neck.y + 0.8); g.lineTo(neck.x + 1.8, neck.y + 0.8); g.lineTo(neck.x + 1.1, neck.y + 3.2); g.lineTo(neck.x - 1.1, neck.y + 3.2); g.closePath(); g.fill();
      g.save(); g.beginPath(); g.moveTo(neck.x - 1.1, neck.y + 3.2); g.lineTo(tx2 - 2.6, ty2 - 1.5); g.lineTo(tx2, ty2 + 2); g.lineTo(tx2 + 2.6, ty2 - 1.5); g.lineTo(neck.x + 1.1, neck.y + 3.2); g.closePath();
      g.fillStyle = accLG(g, neck.x - 3, neck.y, neck.x + 3, ty2, '#c62828', 1.25, 0.75); g.fill(); g.clip();
      g.strokeStyle = '#ffeb3b'; g.lineWidth = 0.8; for (let q = 0; q < 4; q++) { const yy = neck.y + 5 + q * 3.2; g.beginPath(); g.moveTo(neck.x - 5, yy + 2); g.lineTo(neck.x + 5, yy - 2); g.stroke(); }
      g.restore();
      accLine(g, [[neck.x - 0.6, neck.y + 4], [tx2 - 1, ty2 - 2.5]], 'rgba(255,255,255,0.35)', 0.5);
    } else if (acc === 'sword') {   // the baldric across the chest
      accLine(g, [[neck.x - 3, neck.y - 1], [neck.x + 2, neck.y + 4], [hip.x - 2, hip.y - 2]], '#5d4037', 1.5);
      g.fillStyle = '#ffc107'; g.fillRect(neck.x + 0.8, neck.y + 3, 2, 2);
    } else if (acc === 'satchel') {   // a stitched strap across the body and a leather bag at the hip
      accLine(g, [[neck.x + 2, neck.y], [hip.x - 6, hip.y + 1]], '#5d4037', 1.8);
      g.setLineDash([0.8, 0.8]); accLine(g, [[neck.x + 2, neck.y], [hip.x - 6, hip.y + 1]], '#a1887f', 0.4); g.setLineDash([]);
      g.fillStyle = accLG(g, hip.x - 11, hip.y - 2, hip.x - 2, hip.y + 6, '#8d6e63', 1.2, 0.7); roundRectOn(g, hip.x - 11, hip.y - 2, 9, 7.5, 2); g.fill();
      g.fillStyle = accLG(g, hip.x - 11, hip.y - 2, hip.x - 2, hip.y + 2, '#6d4c41', 1.2, 0.8); roundRectOn(g, hip.x - 11.3, hip.y - 2.3, 9.6, 3.6, 1.6); g.fill();
      g.fillStyle = '#ffc107'; g.fillRect(hip.x - 7.3, hip.y + 0.4, 1.6, 1.8);
    } else if (acc === 'garland') {   // a string of glowing, blinking bulbs with caps
      const pts = [[neck.x - 4, neck.y + 1], [hip.x + 5, hip.y - 7], [hip.x - 4, hip.y - 1], [hip.x + 3, hip.y + 2]];
      accLine(g, pts, '#2e7d32', 0.9);
      const lc = ['#ff5252', '#ffeb3b', '#40c4ff', '#69f0ae', '#e040fb'];
      for (let k = 0; k < 7; k++) {
        const f = k / 6 * 3, sg2 = Math.min(2, Math.floor(f)), u2 = f - sg2, a2 = pts[sg2], b2 = pts[sg2 + 1];
        const lx = a2[0] + (b2[0] - a2[0]) * u2, ly = a2[1] + (b2[1] - a2[1]) * u2, on = Math.sin(performance.now() / 180 + k * 1.3) > -0.2;
        g.fillStyle = '#1b5e20'; g.fillRect(lx - 0.7, ly - 0.4, 1.4, 1.2);
        if (on) { g.save(); g.shadowColor = lc[k % 5]; g.shadowBlur = 4; }
        g.fillStyle = on ? lc[k % 5] : 'rgba(90,90,90,0.8)'; g.beginPath(); g.ellipse(lx, ly + 1.6, 1.3, 1.8, 0, 0, Math.PI * 2); g.fill();
        if (on) g.restore();
        g.fillStyle = 'rgba(255,255,255,0.6)'; g.fillRect(lx - 0.6, ly + 0.8, 0.5, 0.8);
      }
    } else if (acc === 'binoculars') {   // 1.0.45: field binoculars on a strap
      accLine(g, [[neck.x - 3, neck.y - 1], [neck.x - 1.5, neck.y + 8]], '#3e2723', 1); accLine(g, [[neck.x + 4, neck.y - 1], [neck.x + 4.5, neck.y + 8]], '#3e2723', 1);
      const bx = neck.x + 1.5, by = neck.y + 10;
      for (const dx of [-2.6, 2.6]) {
        g.fillStyle = accLG(g, bx + dx - 2.2, by - 3.5, bx + dx + 2.2, by + 3.5, '#33691e', 1.3, 0.65); roundRectOn(g, bx + dx - 2.3, by - 3.6, 4.6, 7.4, 1.4); g.fill();
        g.fillStyle = '#212121'; g.fillRect(bx + dx - 2.4, by + 2.4, 4.8, 1.6);
        g.fillStyle = '#90caf9'; g.beginPath(); g.ellipse(bx + dx, by + 4.3, 1.6, 0.7, 0, 0, Math.PI * 2); g.fill();
      }
      g.fillStyle = '#212121'; g.fillRect(bx - 0.6, by - 2.6, 1.2, 4.2);
      g.fillStyle = 'rgba(255,255,255,0.35)'; g.fillRect(bx - 4.3, by - 3, 0.8, 4.6); g.fillRect(bx + 0.9, by - 3, 0.8, 4.6);
    } else if (acc === 'medal') {   // a striped ribbon and a gold medal with a star
      for (const [x0, x1, c] of [[-3, 0.5, '#1e88e5'], [4, 1, '#e53935']]) { accLine(g, [[neck.x + x0, neck.y - 1], [neck.x + x1, neck.y + 9]], c, 2); accLine(g, [[neck.x + x0, neck.y - 1], [neck.x + x1, neck.y + 9]], 'rgba(255,255,255,0.5)', 0.5); }
      const mg = g.createRadialGradient(neck.x, neck.y + 11, 0.5, neck.x + 1, neck.y + 12, 4); mg.addColorStop(0, '#fff8e1'); mg.addColorStop(0.5, '#ffca28'); mg.addColorStop(1, '#ff8f00');
      g.fillStyle = mg; g.beginPath(); g.arc(neck.x + 1, neck.y + 12, 3.4, 0, Math.PI * 2); g.fill();
      g.strokeStyle = '#e65100'; g.lineWidth = 0.4; g.stroke();
      g.fillStyle = '#fff59d'; starPath(g, neck.x + 1, neck.y + 12, 1.6); g.fill();
    } else if (acc === 'scarf') {   // a striped knitted scarf: wrap, two fluttering tails with fringe
      const w1 = Math.sin(t * 10) * 2, w2 = Math.sin(t * 10 - 1) * 2.6;
      g.fillStyle = accLG(g, neck.x - 5, neck.y - 1, neck.x + 5, neck.y + 3, '#e53935', 1.25, 0.75); roundRectOn(g, neck.x - 5, neck.y - 1, 10, 4, 2); g.fill();
      for (const [dx, dy, ww] of [[-3, 1, w1], [-3, 2.5, w2]]) {
        g.fillStyle = accLG(g, neck.x - 13, neck.y, neck.x - 3, neck.y + 6, '#e53935', 1.1, 0.7);
        g.beginPath(); g.moveTo(neck.x + dx, neck.y + dy - 1.5); g.quadraticCurveTo(neck.x - 8, neck.y + dy + ww * 0.5, neck.x - 13, neck.y + dy + 2 + ww); g.lineTo(neck.x - 12.6, neck.y + dy + 4.6 + ww); g.quadraticCurveTo(neck.x - 7.5, neck.y + dy + 2.6 + ww * 0.5, neck.x + dx, neck.y + dy + 1.5); g.closePath(); g.fill();
        g.strokeStyle = '#ffffff'; g.lineWidth = 0.9; g.beginPath(); g.moveTo(neck.x - 8, neck.y + dy - 0.5 + ww * 0.45); g.lineTo(neck.x - 8.3, neck.y + dy + 2.7 + ww * 0.5); g.stroke();
        g.strokeStyle = '#ef9a9a'; g.lineWidth = 0.5; for (let q = 0; q < 3; q++) { g.beginPath(); g.moveTo(neck.x - 12.8 - q * 0.1, neck.y + dy + 2.4 + ww + q * 0.9); g.lineTo(neck.x - 14.5, neck.y + dy + 2.8 + ww + q * 0.9); g.stroke(); }
      }
      g.strokeStyle = '#ffffff'; g.lineWidth = 1; g.beginPath(); g.moveTo(neck.x + 1, neck.y - 0.8); g.lineTo(neck.x + 1, neck.y + 2.8); g.stroke();
    }
  }
  function drawAccFace(g, acc, head, t) {
    const hx = head.x, hy = head.y;
    if (acc === 'glasses') {   // round frames, tinted lenses with a reflection, an arm to the ear
      for (const [cx, r] of [[hx + 2.6, 2.7], [hx + 7.6, 2.3]]) {
        const lg2 = g.createLinearGradient(cx - r, hy - 1 - r, cx + r, hy - 1 + r); lg2.addColorStop(0, 'rgba(120,180,230,0.9)'); lg2.addColorStop(1, 'rgba(20,40,80,0.95)');
        g.fillStyle = lg2; g.beginPath(); g.arc(cx, hy - 1, r, 0, Math.PI * 2); g.fill();
        g.strokeStyle = '#212121'; g.lineWidth = 0.9; g.stroke();
        g.fillStyle = 'rgba(255,255,255,0.75)'; g.beginPath(); g.ellipse(cx - r * 0.35, hy - 1 - r * 0.4, r * 0.35, r * 0.2, -0.6, 0, Math.PI * 2); g.fill();
      }
      accLine(g, [[hx + 5.2, hy - 1.2], [hx + 5.4, hy - 1.4]], '#212121', 1);
      accLine(g, [[hx - 0.1, hy - 1.5], [hx - 6, hy - 2.2], [hx - 7, hy - 0.8]], '#212121', 0.8);
    } else if (acc === 'headband') {   // a sweatband with a stripe; the tails flutter
      g.save(); g.beginPath(); g.arc(hx, hy, 8.3, 0, Math.PI * 2); g.clip();
      g.fillStyle = accLG(g, hx, hy - 6, hx, hy - 2, '#e53935', 1.25, 0.7); g.fillRect(hx - 9, hy - 6, 18, 3.6);
      g.fillStyle = 'rgba(255,255,255,0.85)'; g.fillRect(hx - 9, hy - 4.5, 18, 0.7);
      g.restore();
      const w1 = Math.sin(t * 10) * 1.6, w2 = Math.sin(t * 10 - 0.8) * 1.8;
      accLine(g, [[hx - 8, hy - 4.5], [hx - 11, hy - 3 + w1 * 0.5], [hx - 13.5, hy - 1.5 + w1]], '#c62828', 1.8);
      accLine(g, [[hx - 8, hy - 3.8], [hx - 10.5, hy - 0.5 + w2 * 0.5], [hx - 12, hy + 2 + w2]], '#b71c1c', 1.6);
    } else if (acc === 'mask') {   // a hero's domino mask: eye holes, a shine, ties
      g.save(); g.beginPath(); g.arc(hx, hy, 8.3, 0, Math.PI * 2); g.clip();
      g.fillStyle = accLG(g, hx, hy - 4.5, hx, hy + 1, '#d32f2f', 1.3, 0.7); g.beginPath(); g.moveTo(hx - 9, hy - 4); g.quadraticCurveTo(hx, hy - 5.5, hx + 9, hy - 4.2); g.lineTo(hx + 9, hy + 0.6); g.quadraticCurveTo(hx + 4, hy + 1.8, hx - 9, hy + 0.6); g.closePath(); g.fill();
      g.restore();
      g.fillStyle = '#fafafa'; g.beginPath(); g.ellipse(hx + 4.6, hy - 1.7, 1.8, 1.2, 0.15, 0, Math.PI * 2); g.fill();
      g.fillStyle = '#212121'; g.beginPath(); g.arc(hx + 5.1, hy - 1.7, 0.7, 0, Math.PI * 2); g.fill();
      g.fillStyle = 'rgba(255,255,255,0.4)'; g.fillRect(hx - 5, hy - 4, 6, 0.8);
      const w1 = Math.sin(t * 9) * 2;
      g.fillStyle = '#b71c1c'; g.beginPath(); g.moveTo(hx - 8, hy - 3); g.quadraticCurveTo(hx - 11, hy - 4 + w1 * 0.4, hx - 14.5, hy - 6 + w1); g.lineTo(hx - 13.5, hy - 3.5 + w1); g.quadraticCurveTo(hx - 11, hy - 1.5, hx - 8, hy - 0.5); g.fill();
    }
  }

  function drawStick(g, x, foot, mode, t, col, alpha, look, outline) {
    g.save();
    g.globalAlpha = alpha;
    g.translate(x, foot);
    g.lineCap = 'round'; g.lineJoin = 'round';
    const ph = t * 15;
    const bob = mode === 'run' ? -Math.abs(Math.sin(ph)) * 2 : 0;
    const slide = mode === 'slide';
    // slide: low, torso leaning back, front leg straight along the ground, back leg folded, one hand on the ground
    const sv = slide ? Math.sin(t * 45) * 0.6 : 0;
    const EP = EMO_POSE[mode] ? EMO_POSE[mode](t, 0) : null;
    // 1.0.46: an emote doesn't snap into its pose — on the game screen and the preview it eases in over 0.35 s with a
    // little overshoot, and while it is held the body breathes
    const isEmo = !!EP || ['dance', 'flag', 'wave', 'cheer', 'bow'].includes(mode);
    let ek = 1;
    if (isEmo && g.__live) {
      const now = performance.now();
      if (g.__emoMode !== mode) { g.__emoMode = mode; g.__emoAt = now; }
      const u = Math.min(1, (now - g.__emoAt) / 350), v = u - 1;
      ek = 1 + 2.4 * v * v * v + 1.4 * v * v;   // ease-out with a small overshoot
    } else if (g.__live) g.__emoMode = mode;
    const breathe = isEmo ? Math.sin(t * 3.2) * 0.7 : 0;
    const hop = (mode === 'cheer' ? -Math.abs(Math.sin(t * 8)) * 7 : EP && EP.hop ? EP.hop : 0) * ek + breathe;
    const hip = slide ? { x: -2, y: -8 + sv } : { x: 0, y: -27 + bob + hop };
    const neck = slide ? { x: -19, y: -15 + sv } : mode === 'bow' ? { x: 15, y: -40 } : { x: 4, y: -47 + bob + hop };
    const head = slide ? { x: neck.x - 7, y: neck.y - 4 } : mode === 'bow' ? { x: neck.x + 7, y: neck.y - 3 } : { x: neck.x + 3, y: neck.y - 9 };
    const sh = slide ? { x: neck.x + 2, y: neck.y + 1 } : { x: neck.x - 0.5, y: neck.y + 4 };
    const joint = (from, a1, a2, len) => {
      const k = { x: from.x + Math.sin(a1) * len, y: from.y + Math.cos(a1) * len };
      return { f: from, k, e: { x: k.x + Math.sin(a2) * len, y: k.y + Math.cos(a2) * len } };
    };
    const legs = [], arms = [];
    const P3 = (f, kx, ky, ex, ey) => ({ f, k: { x: f.x + kx, y: f.y + ky }, e: { x: f.x + ex, y: f.y + ey } });
    if (slide) {
      const w = Math.sin(t * 30) * 0.8;
      legs.push(P3(hip, 12, 3, 25 + w, 6));      // front leg stretched forward
      legs.push(P3(hip, 8, 7, -2, 8));            // back leg folded under
      arms.push(P3(sh, -6, 7, -10, 14));          // hand touching the ground behind
      arms.push(P3(sh, 8, -6, 17, -8 + w));       // other arm forward for balance
    }
    for (const s of (slide ? [] : [0, Math.PI])) {
      if (mode === 'run') {
        const th = Math.sin(ph + s) * 0.75, back = Math.max(0, Math.cos(ph + s)) * 1.2;
        legs.push(joint(hip, th, th - 0.15 - back, 13.5));
        const a = -Math.sin(ph + s) * 0.9;
        arms.push(joint(sh, a, a + 1.1, 11));
      } else if (mode === 'stand') {
        legs.push(joint(hip, s ? -0.18 : 0.18, s ? -0.12 : 0.12, 13.5));
        arms.push(joint(sh, s ? -0.35 : 0.35, s ? -0.2 : 0.2, 11));
      } else if (mode === 'dance') {
        const w = Math.sin(t * 10);
        legs.push(joint(hip, s ? -0.3 - w * 0.2 : 0.3 + w * 0.2, s ? -0.1 : 0.1, 13.5));
        const a = (s ? Math.PI - 0.5 : Math.PI + 0.5) + w * 0.4;
        arms.push(joint(sh, a, a + (s ? 0.3 : -0.3), 11));
      } else if (mode === 'flag') {
        legs.push(joint(hip, s ? -0.18 : 0.18, s ? -0.12 : 0.12, 13.5));
        arms.push(s ? joint(sh, Math.PI - 0.25, Math.PI - 0.1, 11) : joint(sh, 0.35, 0.2, 11));
      } else if (mode === 'wave') {
        legs.push(joint(hip, s ? -0.18 : 0.18, s ? -0.12 : 0.12, 13.5));
        arms.push(s ? joint(sh, Math.PI - 0.7, Math.PI - 0.2 + Math.sin(t * 12) * 0.6, 11) : joint(sh, 0.3, 0.2, 11));
      } else if (mode === 'cheer') {
        legs.push(joint(hip, s ? -0.35 : 0.35, s ? -0.25 : 0.25, 13.5));
        const a = s ? Math.PI - 0.35 : Math.PI + 0.35;
        arms.push(joint(sh, a, a, 11));
      } else if (EMO_POSE[mode]) {
        const P = EMO_POSE[mode](t, s ? 1 : 0);
        legs.push(joint(hip, P.l[0], P.l[1], 13.5));
        arms.push(joint(sh, P.a[0], P.a[1], 11));
      } else if (mode === 'bow') {
        legs.push(joint(hip, s ? -0.1 : 0.1, s ? -0.05 : 0.05, 13.5));
        arms.push(joint(sh, s ? 0.25 : 0.45, s ? 0.1 : 0.3, 11));
      } else {
        const th = s ? 0.2 : 1.0;
        legs.push(joint(hip, th, th - 1.3, 13));
        const a = s ? 2.4 : 2.9;
        arms.push(joint(sh, a, a - 0.4, 11));
      }
    }
    if (isEmo && ek < 1) {   // blend the limbs from a calm standing pose into the emote
      for (const [arr, from, a0, a1, len] of [[legs, hip, 0.18, 0.12, 13.5], [arms, sh, 0.35, 0.2, 11]])
        arr.forEach((l, i) => {
          const sd = i ? -1 : 1, st = joint(from, a0 * sd, a1 * sd, len);
          for (const key of ['k', 'e']) { l[key] = { x: st[key].x + (l[key].x - st[key].x) * ek, y: st[key].y + (l[key].y - st[key].y) * ek }; }
        });
    }
    const skeleton = (lw, c, extra) => {
      g.strokeStyle = c; g.fillStyle = c; g.lineWidth = lw;
      for (const l of [...legs, ...arms]) {
        g.beginPath(); g.moveTo(l.f.x, l.f.y); g.lineTo(l.k.x, l.k.y); g.lineTo(l.e.x, l.e.y); g.stroke();
      }
      g.beginPath(); g.moveTo(hip.x, hip.y); g.lineTo(neck.x, neck.y); g.stroke();
      g.beginPath(); g.arc(head.x, head.y, 8 + extra, 0, Math.PI * 2); g.fill();
    };
    // 1.0.18: the body has depth — far limbs darker, limbs darker towards hands/feet,
    // a light edge on the lit (upper-left) side, a round shaded head with a highlight
    const limb = (l, c, w) => {
      g.strokeStyle = c; g.lineWidth = w;
      g.beginPath(); g.moveTo(l.f.x, l.f.y); g.lineTo(l.k.x, l.k.y); g.lineTo(l.e.x, l.e.y); g.stroke();
    };
    const lower = (l, c, w) => { g.strokeStyle = c; g.lineWidth = w; g.beginPath(); g.moveTo(l.k.x, l.k.y); g.lineTo(l.e.x, l.e.y); g.stroke(); };
    const shadedBody = (col, gem) => {
      const far = [legs[1], arms[1]].filter(Boolean), near = [legs[0], arms[0]].filter(Boolean);
      const now = performance.now() / 1000;

      for (const l of far) limb(l, col, 4);
      g.shadowBlur = 0;
      for (const l of far) { limb(l, 'rgba(0,0,0,0.32)', 4); lower(l, 'rgba(0,0,0,0.12)', 4); }

      g.strokeStyle = col; g.lineWidth = 4;
      g.beginPath(); g.moveTo(hip.x, hip.y); g.lineTo(neck.x, neck.y); g.stroke();
      g.fillStyle = col; g.beginPath(); g.arc(head.x, head.y, 8, 0, Math.PI * 2); g.fill();
      for (const l of near) limb(l, col, 4);
      g.shadowBlur = 0;
      for (const l of near) lower(l, 'rgba(0,0,0,0.13)', 4);
      // lit edge
      g.save(); g.translate(-0.7, -0.9);
      g.lineCap = 'round';
      g.strokeStyle = 'rgba(255,255,255,0.3)'; g.lineWidth = 1.3;
      g.beginPath(); g.moveTo(hip.x, hip.y); g.lineTo(neck.x, neck.y); g.stroke();
      for (const l of near) { g.beginPath(); g.moveTo(l.f.x, l.f.y); g.lineTo(l.k.x, l.k.y); g.stroke(); }
      g.strokeStyle = 'rgba(255,255,255,0.14)';
      for (const l of near) { g.beginPath(); g.moveTo(l.k.x, l.k.y); g.lineTo(l.e.x, l.e.y); g.stroke(); }
      g.restore();
      // head: light from the upper left, shadow at the lower right
      const hg = g.createRadialGradient(head.x - 3, head.y - 3.5, 0.5, head.x, head.y, 8.5);
      hg.addColorStop(0, 'rgba(255,255,255,0.42)'); hg.addColorStop(0.45, 'rgba(255,255,255,0.06)');
      hg.addColorStop(0.75, 'rgba(0,0,0,0)'); hg.addColorStop(1, 'rgba(0,0,0,0.3)');
      g.fillStyle = hg; g.beginPath(); g.arc(head.x, head.y, 8, 0, Math.PI * 2); g.fill();
      g.fillStyle = 'rgba(255,255,255,0.55)'; g.beginPath(); g.ellipse(head.x - 3, head.y - 4, 2, 1.3, -0.6, 0, Math.PI * 2); g.fill();
      if (!gem) return;
      // gems: a bright sheen sweeping over the body and twinkling glints
      const ph = (now * 0.7) % 1.7 - 0.35;
      const sg = g.createLinearGradient(-22, -72, 22, 4);
      const st = (o, c) => { if (o >= 0 && o <= 1) sg.addColorStop(o, c); };
      sg.addColorStop(0, 'rgba(255,255,255,0)'); sg.addColorStop(1, 'rgba(255,255,255,0)');
      st(ph - 0.1, 'rgba(255,255,255,0)'); st(ph, 'rgba(255,255,255,0.9)'); st(ph + 0.1, 'rgba(255,255,255,0)');
      g.strokeStyle = sg; g.fillStyle = sg; g.lineWidth = 3;
      for (const l of [...near, ...far]) { g.beginPath(); g.moveTo(l.f.x, l.f.y); g.lineTo(l.k.x, l.k.y); g.lineTo(l.e.x, l.e.y); g.stroke(); }
      g.beginPath(); g.moveTo(hip.x, hip.y); g.lineTo(neck.x, neck.y); g.stroke();
      g.beginPath(); g.arc(head.x, head.y, 7, 0, Math.PI * 2); g.fill();
      const pts = [head, neck, hip, near[0] && near[0].k, near[1] && near[1].e, far[0] && far[0].e].filter(Boolean);
      g.fillStyle = '#fff';
      pts.forEach((q, i) => {
        const a = Math.max(0, Math.sin(now * 5 + i * 2.1));
        if (a < 0.6) return;
        g.globalAlpha = alpha * (a - 0.6) * 2.5;
        starPath(g, q.x + (i % 2 ? 2 : -2), q.y - 2, 2.2 + a * 1.6); g.fill();
      });
      g.globalAlpha = alpha;
    };
    const LS = lockedSlots(look);   // slots the premium character already covers are not drawn
    const acc = look && !LS.includes('acc') && look.acc, cos = look && findItem('color', look.color);
    // things worn on the back go behind the body (1.0.44: redrawn, see drawAccBack)
    if (acc) drawAccBack(g, acc, { neck, sh, hip, head, arms, legs }, t, mode);
    const costume = cos && cos.costume, CP = { hip, neck, head, sh, legs, arms };
    if (costume) drawCostume(g, costume, CP, t, mode, 'back');
    if (outline) skeleton(7.5, outline, 1.8);
    shadedBody(col, cos && cos.gem);
    if (costume) drawCostume(g, costume, CP, t, mode, 'front');
    if (acc) drawAccFront(g, acc, { neck, sh, hip, head, arms, legs }, t);
    if (mode === 'guitar') {   // an air guitar (well, a visible one)
      g.save(); g.translate(hip.x + 3, hip.y - 6); g.rotate(-0.5);
      g.fillStyle = '#ff7043'; g.beginPath(); g.ellipse(0, 0, 6, 4.5, 0, 0, Math.PI * 2); g.fill();
      g.fillStyle = '#5d4037'; g.fillRect(4, -1, 14, 2); g.fillStyle = '#212121'; g.beginPath(); g.arc(0, 0, 1.4, 0, Math.PI * 2); g.fill();
      g.restore();
    }
    if (mode === 'heartpose') drawHeart(g, head.x + 1, head.y - 16, 0.9, '#ff4d6d');
    if (mode === 'roar') {   // sound waves out of the mouth
      const k = (t % 1.6) / 1.6;
      g.lineWidth = 1.4; g.lineCap = 'round';
      for (let q = 0; q < 3; q++) { const f = (k * 3 + q) % 3 / 3; g.strokeStyle = `rgba(255,160,0,${0.9 * (1 - f)})`; g.beginPath(); g.arc(head.x + 8, head.y + 1, 4 + f * 16, -0.6, 0.6); g.stroke(); }
    }
    if (mode === 'tada') for (let q = 0; q < 2; q++) { const hn = arms[q].e, a = Math.max(0, Math.sin(t * 8 + q * 2)); g.fillStyle = `rgba(255,214,0,${a})`; starPath(g, hn.x + (q ? -3 : 3), hn.y - 4, 2.5); g.fill(); }
    if (mode === 'karate') { g.strokeStyle = '#212121'; g.lineWidth = 2.5; g.beginPath(); g.moveTo(hip.x - 4, hip.y - 1); g.lineTo(hip.x + 4, hip.y - 1); g.stroke(); }
    if (mode === 'flag') {
      const hnd = arms[1].e;
      g.strokeStyle = '#555'; g.lineWidth = 2;
      g.beginPath(); g.moveTo(hnd.x, hnd.y + 6); g.lineTo(hnd.x, hnd.y - 24); g.stroke();
      for (let r2 = 0; r2 < 2; r2++) for (let k = 0; k < 3; k++) {
        g.fillStyle = (r2 + k) % 2 ? '#111' : '#fff';
        g.fillRect(hnd.x + 1 + k * 5, hnd.y - 24 + r2 * 5 + Math.sin(t * 8 + k) * 1.2, 5, 5);
      }
    }

    // shorts: a fabric panel per leg (back leg a shade darker), waistband and hems
    const shorts = look && !LS.includes('shorts') && findItem('shorts', look.shorts);
    if (shorts) drawShorts(g, shorts, hip, neck, legs);

    // shoes: a short forward block at each foot
    const shoes = look && !LS.includes('shoes') && findItem('shoes', look.shoes);
    if (shoes) {
      g.lineCap = 'round';
      for (const l of [legs[1], legs[0]].filter(Boolean)) {   // far shoe first, the near one over it
        // the shoe turns with the shin; while pushing off, the toe box bends back so the toe stays on the ground
        const ang = Math.max(-1.5, Math.min(1.0, Math.atan2(l.e.y - l.k.y, l.e.x - l.k.x) - Math.PI / 2));
        const flex = mode === 'run' ? Math.max(0, Math.min(0.9, (ang - 0.15) * 1.2)) : 0;
        g.save(); g.translate(l.e.x, l.e.y); g.rotate(ang);
        const ca = Math.cos(-ang), sa = Math.sin(-ang), kx0 = l.k.x - l.e.x, ky0 = l.k.y - l.e.y;
        drawShoe(g, shoes.id, { x: kx0 * ca - ky0 * sa, y: kx0 * sa + ky0 * ca }, flex, l === legs[1], l.e.y >= -2.5 && mode !== 'jump');
        g.restore();
      }
    }

    // face
    if (acc) drawAccFace(g, acc, head, t);

    // hats (1.0.41: redrawn — light from the upper left, shaded undersides, a shadow on the head under brims;
    // the hat turns with the head, so it stays on in a slide or a bow)
    const hat = look && !LS.includes('hat') && findItem('hat', look.hat);
    if (hat) {
      const tilt = Math.atan2(head.x - neck.x, neck.y - head.y) - Math.atan2(3, 9);
      g.save(); g.translate(head.x, head.y); g.rotate(tilt);
      drawHat(g, hat.id, t, col);
      g.restore();
    }
    g.restore();
  }

  // a hat around the head centre (0,0), head radius 8, facing right
  function drawHat(g, id, t, col) {
    const vg = (y0, y1, c, k1, k2) => { const gr = g.createLinearGradient(0, y0, 0, y1); gr.addColorStop(0, shade(c, k1 || 1.3)); gr.addColorStop(1, shade(c, k2 || 0.72)); return gr; };
    const hg = (x0, x1, c) => { const gr = g.createLinearGradient(x0, 0, x1, 0); gr.addColorStop(0, shade(c, 0.75)); gr.addColorStop(0.35, shade(c, 1.3)); gr.addColorStop(1, shade(c, 0.7)); return gr; };
    const headShadow = (y, h) => {   // a soft shadow on the head right under a brim / band
      g.save(); g.beginPath(); g.arc(0, 0, 8, 0, Math.PI * 2); g.clip();
      const sg = g.createLinearGradient(0, y, 0, y + h); sg.addColorStop(0, 'rgba(0,0,0,0.35)'); sg.addColorStop(1, 'rgba(0,0,0,0)');
      g.fillStyle = sg; g.fillRect(-9, y, 18, h); g.restore();
    };
    const outline = c => { g.strokeStyle = shade(c, 0.5); g.lineWidth = 0.5; g.stroke(); };
    const gloss = (x0, y0, x1, y1, a) => { g.strokeStyle = `rgba(255,255,255,${a || 0.55})`; g.lineWidth = 0.9; g.lineCap = 'round'; g.beginPath(); g.moveTo(x0, y0); g.quadraticCurveTo((x0 + x1) / 2 - 1, Math.min(y0, y1) - 1, x1, y1); g.stroke(); };
    switch (id) {
      case 'cap': {   // baseball cap: panelled dome, button, visor forward
        headShadow(-2.5, 4);
        g.beginPath(); g.moveTo(-8.7, -1); g.arc(0, -1, 8.7, Math.PI, 0); g.closePath(); g.fillStyle = vg(-10, -1, '#e53935'); g.fill(); outline('#e53935');
        g.strokeStyle = 'rgba(0,0,0,0.25)'; g.lineWidth = 0.5; g.beginPath(); g.moveTo(0, -9.7); g.quadraticCurveTo(-3, -5, -4, -1); g.moveTo(0, -9.7); g.quadraticCurveTo(3, -5, 4, -1); g.stroke();
        g.fillStyle = '#c62828'; g.beginPath(); g.ellipse(0, -9.9, 1.4, 0.8, 0, 0, Math.PI * 2); g.fill();
        g.fillStyle = vg(-2.6, 0.6, '#c62828', 1.1, 0.6); g.beginPath(); g.moveTo(5.5, -2.4); g.quadraticCurveTo(12, -3.4, 15.5, -1); g.quadraticCurveTo(11, 0.6, 5, -0.2); g.closePath(); g.fill(); outline('#c62828');
        gloss(-6, -5.5, -1.5, -8.6); break;
      }
      case 'fedora': {
        headShadow(-5, 4);
        g.fillStyle = vg(-7.5, -4.5, '#5d4037', 1.1, 0.6); g.beginPath(); g.ellipse(0.5, -5.6, 13, 2.6, -0.04, 0, Math.PI * 2); g.fill(); outline('#5d4037');
        g.beginPath(); g.moveTo(-6.5, -6); g.lineTo(-5.5, -14.5); g.quadraticCurveTo(-1, -12.5, 0.5, -14.8); g.quadraticCurveTo(3, -12.6, 6, -14.2); g.lineTo(7, -6); g.closePath();
        g.fillStyle = hg(-6.5, 7, '#6d4c41'); g.fill(); outline('#6d4c41');
        g.fillStyle = '#212121'; g.fillRect(-6.4, -8.6, 13.3, 2.4); g.fillStyle = 'rgba(255,255,255,0.18)'; g.fillRect(-6.4, -8.6, 13.3, 0.7);
        gloss(-4.5, -9.5, -3.8, -13.6, 0.35); break;
      }
      case 'cowboy': {   // brim curled up at the front and back, creased crown, band with a concho
        headShadow(-5, 4);
        g.beginPath(); g.moveTo(-17, -10.5); g.quadraticCurveTo(-9, -3.5, 0, -4.2); g.quadraticCurveTo(9, -3.5, 17, -10.5); g.quadraticCurveTo(9, -5.6, 0, -6.6); g.quadraticCurveTo(-9, -5.6, -17, -10.5); g.closePath();
        g.fillStyle = vg(-10, -3.5, '#b0743a', 1.15, 0.7); g.fill(); outline('#b0743a');
        g.beginPath(); g.moveTo(-7.2, -6.4); g.lineTo(-6.5, -15.5); g.quadraticCurveTo(0, -12.8, 6.5, -15.5); g.lineTo(7.2, -6.4); g.closePath();
        g.fillStyle = hg(-7.2, 7.2, '#c08040'); g.fill(); outline('#b0743a');
        g.strokeStyle = 'rgba(80,45,15,0.6)'; g.lineWidth = 0.7; g.beginPath(); g.moveTo(0, -13.6); g.lineTo(0, -10); g.stroke();
        g.fillStyle = '#5d3a1a'; g.fillRect(-7, -8.6, 14, 2); g.fillStyle = '#cfd8dc'; g.beginPath(); g.arc(3.5, -7.6, 1.1, 0, Math.PI * 2); g.fill(); break;
      }
      case 'safari': {   // 1.0.45: a pith helmet — a khaki dome, a green band, a short all-round brim, a vent on top
        headShadow(-5, 4);
        g.fillStyle = vg(-8, -3.5, '#d7c29a', 1.1, 0.72); g.beginPath(); g.ellipse(0.5, -5.4, 12.5, 2.8, 0, 0, Math.PI * 2); g.fill(); outline('#d7c29a');
        g.beginPath(); g.moveTo(-8.6, -5.6); g.bezierCurveTo(-8.8, -15, -4, -17.5, 0.5, -17.5); g.bezierCurveTo(5, -17.5, 9.8, -15, 9.6, -5.6); g.closePath();
        g.fillStyle = hg(-8.6, 9.6, '#dcc8a0'); g.fill(); outline('#d7c29a');
        g.strokeStyle = 'rgba(120,95,55,0.45)'; g.lineWidth = 0.6; for (const dx of [-4, 0.5, 5]) { g.beginPath(); g.moveTo(dx * 0.6, -17.2); g.quadraticCurveTo(dx * 1.2, -12, dx * 1.6, -7.5); g.stroke(); }
        g.fillStyle = vg(-9, -6.5, '#558b2f', 1.2, 0.75); g.fillRect(-8.7, -8.6, 18.3, 2.6);
        g.fillStyle = vg(-19, -17, '#bfa77a', 1.2, 0.8); g.beginPath(); g.ellipse(0.5, -17.6, 2, 0.9, 0, 0, Math.PI * 2); g.fill();
        g.strokeStyle = 'rgba(255,255,255,0.45)'; g.lineWidth = 0.8; g.beginPath(); g.arc(-1, -11, 6.5, Math.PI * 1.15, Math.PI * 1.55); g.stroke(); break;
      }
      case 'tophat': {
        headShadow(-5, 4);
        g.fillStyle = vg(-7, -4.5, '#212121', 1.4, 0.8); g.beginPath(); g.ellipse(0, -5.6, 12, 2.4, 0, 0, Math.PI * 2); g.fill();
        g.fillStyle = hg(-6.5, 6.5, '#2b2b2b'); g.fillRect(-6.5, -23.5, 13, 18);
        g.fillStyle = vg(-25, -22, '#333333', 1.5, 1); g.beginPath(); g.ellipse(0, -23.5, 6.5, 1.5, 0, 0, Math.PI * 2); g.fill();
        g.fillStyle = vg(-11, -8, '#c62828', 1.3, 0.75); g.fillRect(-6.5, -11, 13, 3);
        g.fillStyle = 'rgba(255,255,255,0.22)'; g.fillRect(-4.5, -22.5, 1.6, 11); break;
      }
      case 'beanie': {   // knitted, ribbed cuff, fluffy pompom
        g.beginPath(); g.moveTo(-8.9, -2); g.arc(0, -2, 8.9, Math.PI, 0); g.closePath(); g.fillStyle = vg(-11, -2, '#1e88e5'); g.fill(); outline('#1e88e5');
        g.strokeStyle = 'rgba(13,71,161,0.45)'; g.lineWidth = 0.6; for (const x of [-5, -2, 1, 4]) { g.beginPath(); g.moveTo(x, -3); g.quadraticCurveTo(x * 0.6, -8, x * 0.25, -10.4); g.stroke(); }
        g.fillStyle = vg(-4, 0, '#fafafa', 1, 0.8); roundRectOn(g, -9.4, -4.2, 18.8, 3.8, 1.6); g.fill();
        g.strokeStyle = 'rgba(0,0,0,0.12)'; g.lineWidth = 0.5; for (let x = -8; x <= 8; x += 2) { g.beginPath(); g.moveTo(x, -4); g.lineTo(x, -0.6); g.stroke(); }
        for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2; g.fillStyle = k % 2 ? '#fafafa' : '#e3e8ef'; g.beginPath(); g.arc(Math.cos(a) * 1.6, -12.6 + Math.sin(a) * 1.6, 1.8, 0, Math.PI * 2); g.fill(); }
        gloss(-6, -6, -2, -9.5, 0.4); break;
      }
      case 'crown': {
        g.beginPath(); g.moveTo(-8, -5); g.lineTo(-8.5, -15.5); g.lineTo(-4, -10.5); g.lineTo(0, -17.5); g.lineTo(4, -10.5); g.lineTo(8.5, -15.5); g.lineTo(8, -5); g.closePath();
        g.fillStyle = hg(-8.5, 8.5, '#ffc107'); g.fill(); outline('#ffb300');
        g.fillStyle = vg(-8, -4.5, '#ffb300', 1.2, 0.8); g.fillRect(-8.2, -8, 16.4, 3);
        for (const [x, c] of [[-4.5, '#1e88e5'], [0, '#e53935'], [4.5, '#43a047']]) { g.fillStyle = c; g.beginPath(); g.arc(x, -6.5, 1.1, 0, Math.PI * 2); g.fill(); g.fillStyle = 'rgba(255,255,255,0.7)'; g.fillRect(x - 0.5, -7.2, 0.6, 0.6); }
        for (const [x, y] of [[-8.5, -15.5], [0, -17.5], [8.5, -15.5]]) { g.fillStyle = '#fff8e1'; g.beginPath(); g.arc(x, y, 1, 0, Math.PI * 2); g.fill(); }
        gloss(-6.5, -9, -6.8, -13, 0.6); break;
      }
      case 'beret': {   // a soft disc tilted, drooping over the side
        headShadow(-4, 3);
        g.beginPath(); g.ellipse(-1.5, -6.6, 10.5, 4.2, -0.18, 0, Math.PI * 2); g.fillStyle = vg(-11, -2.5, '#c62828'); g.fill(); outline('#c62828');
        g.fillStyle = 'rgba(0,0,0,0.18)'; g.beginPath(); g.ellipse(-1, -4.2, 9, 1.6, -0.18, 0, Math.PI); g.fill();
        g.fillStyle = '#8e1c1c'; g.fillRect(-1.6, -12.2, 1.8, 2.6);
        gloss(-8, -7.5, -3, -10, 0.4); break;
      }
      case 'chef': {   // tall pleated toque
        g.fillStyle = vg(-14, -5, '#fafafa', 1, 0.82); g.fillRect(-6.8, -14, 13.6, 9);
        g.strokeStyle = 'rgba(120,144,156,0.5)'; g.lineWidth = 0.5; for (const x of [-3.5, 0, 3.5]) { g.beginPath(); g.moveTo(x, -13.5); g.lineTo(x, -5.5); g.stroke(); }
        for (const [x, y, r] of [[-5, -16, 4.8], [5, -16, 4.8], [0, -19.5, 5.8]]) { g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fillStyle = vg(y - r, y + r, '#ffffff', 1, 0.86); g.fill(); g.strokeStyle = 'rgba(144,164,174,0.6)'; g.lineWidth = 0.5; g.stroke(); }
        g.fillStyle = '#eceff1'; g.fillRect(-7, -7.5, 14, 2.5); break;
      }
      case 'headphones': {   // 1.0.44: pink bunny ears on a headband (the old headphones / elf ears item)
        const sway = Math.sin(t * 6) * 0.08;
        g.strokeStyle = '#f06292'; g.lineWidth = 1.8; g.lineCap = 'round'; g.beginPath(); g.arc(0, 0, 8.7, Math.PI * 1.12, Math.PI * 1.88); g.stroke();
        for (const [bx, a0, k] of [[-3.2, -0.32, 0.86], [2.4, 0.12, 1]]) {
          g.save(); g.translate(bx, -8); g.rotate(a0 + sway * k);
          const eg = g.createLinearGradient(-3, 0, 3, 0); eg.addColorStop(0, shade('#f8bbd0', 1.1 * k)); eg.addColorStop(1, shade('#f48fb1', 0.85 * k));
          g.fillStyle = eg; g.beginPath(); g.moveTo(-2.6, 0); g.quadraticCurveTo(-4, -9, -0.5, -15.5); g.quadraticCurveTo(3, -9, 2.6, 0); g.closePath(); g.fill();
          g.fillStyle = shade('#ec407a', k); g.beginPath(); g.moveTo(-1.2, -1); g.quadraticCurveTo(-2, -8, -0.4, -12.5); g.quadraticCurveTo(1.4, -8, 1.2, -1); g.closePath(); g.fill();
          g.strokeStyle = 'rgba(255,255,255,0.55)'; g.lineWidth = 0.6; g.beginPath(); g.moveTo(-2.2, -2); g.quadraticCurveTo(-3.2, -9, -0.8, -14.2); g.stroke();
          g.restore();
        }
        break;
      }
      case 'viking': {
        for (const s2 of [-1, 1]) {   // ivory horns with rings
          g.beginPath(); g.moveTo(s2 * 6.5, -5.5); g.quadraticCurveTo(s2 * 14, -7, s2 * 13, -16.5); g.quadraticCurveTo(s2 * 10, -9.5, s2 * 4.5, -8.5); g.closePath();
          g.fillStyle = vg(-17, -5, '#f3ead6', 1.05, 0.78); g.fill(); g.strokeStyle = '#bcaaa4'; g.lineWidth = 0.5; g.stroke();
          g.strokeStyle = 'rgba(141,110,99,0.55)'; for (const k of [0.35, 0.6]) { g.beginPath(); g.moveTo(s2 * (6 + k * 6), -6 - k * 3); g.lineTo(s2 * (5 + k * 6), -8.5 - k * 3); g.stroke(); }
        }
        g.beginPath(); g.moveTo(-8.8, -2); g.arc(0, -2, 8.8, Math.PI, 0); g.closePath(); g.fillStyle = vg(-11, -2, '#b0bec5', 1.3, 0.65); g.fill(); outline('#90a4ae');
        g.fillStyle = vg(-4, -1, '#8d6e63', 1.2, 0.75); g.fillRect(-9, -4, 18, 2.6);
        g.fillStyle = '#eceff1'; for (const x of [-6, -2, 2, 6]) { g.beginPath(); g.arc(x, -2.7, 0.6, 0, Math.PI * 2); g.fill(); }
        g.fillStyle = vg(-11, -5, '#90a4ae', 1.2, 0.8); g.fillRect(-0.9, -10.8, 1.8, 7);
        gloss(-6, -5, -2, -9.6, 0.65); break;
      }
      case 'wizard': {   // a cone bent at the tip, with stars and a moon
        headShadow(-5, 4);
        g.fillStyle = vg(-7.5, -4.5, '#4527a0', 1.15, 0.7); g.beginPath(); g.ellipse(0, -5.6, 12.5, 2.6, 0, 0, Math.PI * 2); g.fill();
        g.beginPath(); g.moveTo(-7.5, -6); g.quadraticCurveTo(-2, -20, 2, -27); g.quadraticCurveTo(6, -31, 10, -28); g.quadraticCurveTo(5, -27.5, 4.5, -23); g.lineTo(7.5, -6); g.closePath();
        g.fillStyle = hg(-7.5, 8, '#5e35b1'); g.fill(); outline('#4527a0');
        g.fillStyle = '#ffeb3b'; starPath(g, 0.5, -14, 2.4); g.fill(); starPath(g, 3.2, -20, 1.4); g.fill();
        g.beginPath(); g.arc(-3, -9.5, 1.8, 0.6, Math.PI * 1.6); g.arc(-2.3, -9.8, 1.4, Math.PI * 1.6, 0.6, true); g.fill();
        g.fillStyle = '#ffd54f'; g.beginPath(); g.arc(10.5, -28, 1.3, 0, Math.PI * 2); g.fill(); break;
      }
      case 'santa': {   // red hat falling back, fluffy white trim and pompom
        const sw2 = Math.sin(t * 8) * 1.5;
        g.beginPath(); g.moveTo(-8, -5); g.quadraticCurveTo(-2, -22, -12 + sw2, -17); g.lineTo(-9, -13); g.quadraticCurveTo(0, -14, 8, -5); g.closePath();
        g.fillStyle = vg(-20, -5, '#d32f2f', 1.25, 0.7); g.fill(); outline('#b71c1c');
        g.fillStyle = 'rgba(0,0,0,0.15)'; g.beginPath(); g.moveTo(2, -13); g.quadraticCurveTo(6, -9, 8, -5); g.lineTo(3, -6); g.fill();
        for (let x = -9; x <= 9; x += 2.4) { g.fillStyle = x % 4.8 ? '#fafafa' : '#eceff1'; g.beginPath(); g.arc(x, -5.4, 2, 0, Math.PI * 2); g.fill(); }
        for (let k = 0; k < 7; k++) { const a = k / 7 * Math.PI * 2; g.fillStyle = k % 2 ? '#fafafa' : '#e3e8ef'; g.beginPath(); g.arc(-12.5 + sw2 + Math.cos(a) * 1.5, -16.5 + Math.sin(a) * 1.5, 1.7, 0, Math.PI * 2); g.fill(); }
        break;
      }
      case 'pirate': {   // 1.0.43: an afro (the old tricorn item) — curls around the top and back, the face stays open
        const hc = '#3e2723', cx = -3.6, cy = -8, R = 9.8;
        g.fillStyle = hc; g.beginPath(); g.arc(cx, cy, R, 0, Math.PI * 2); g.fill();
        g.fillStyle = shade(hc, 0.75); for (let k = 0; k < 10; k++) { const a = Math.PI * (0.45 + k * 0.17); g.beginPath(); g.arc(cx + Math.cos(a) * R, cy + Math.sin(a) * R, 2.5, 0, Math.PI * 2); g.fill(); }
        g.fillStyle = shade(hc, 1.4); for (const [x, y] of [[-9, -13], [-4, -16], [1, -14], [-11, -7], [-6, -10.5], [-1.5, -10]]) { g.beginPath(); g.arc(x, y, 1.3, 0, Math.PI * 2); g.fill(); }
        g.fillStyle = 'rgba(255,255,255,0.18)'; g.beginPath(); g.ellipse(-7, -14, 3.6, 2.2, -0.4, 0, Math.PI * 2); g.fill();
        break;
      }
      case 'party': {   // striped cone with a pompom and an elastic
        g.strokeStyle = '#cfd8dc'; g.lineWidth = 0.5; g.beginPath(); g.moveTo(-6, -6); g.quadraticCurveTo(-7, 0, -4, 5); g.stroke();
        g.save(); g.beginPath(); g.moveTo(-6.5, -6); g.lineTo(1, -25); g.lineTo(7, -6); g.closePath(); g.clip();
        g.fillStyle = hg(-7, 7, '#7c4dff'); g.fillRect(-8, -26, 16, 21);
        g.fillStyle = '#ffeb3b'; for (let q = 0; q < 4; q++) { g.beginPath(); g.moveTo(-8, -9 - q * 5); g.lineTo(8, -13 - q * 5); g.lineTo(8, -11 - q * 5); g.lineTo(-8, -7 - q * 5); g.fill(); }
        g.fillStyle = 'rgba(0,0,0,0.18)'; g.fillRect(3, -26, 5, 21);
        g.restore();
        for (let k = 0; k < 7; k++) { const a = k / 7 * Math.PI * 2; g.fillStyle = k % 2 ? '#ff4081' : '#f50057'; g.beginPath(); g.arc(1 + Math.cos(a) * 1.3, -25.5 + Math.sin(a) * 1.3, 1.5, 0, Math.PI * 2); g.fill(); }
        break;
      }
      case 'propeller': {   // cap with coloured segments and a spinning propeller
        headShadow(-2.5, 4);
        const segs = ['#1e88e5', '#e53935', '#fdd835', '#43a047'];
        segs.forEach((c, k) => { g.beginPath(); g.moveTo(0, -1); g.arc(0, -1, 8.7, Math.PI + k * Math.PI / 4, Math.PI + (k + 1) * Math.PI / 4); g.closePath(); g.fillStyle = vg(-10, -1, c, 1.25, 0.8); g.fill(); });
        g.fillStyle = vg(-2.5, 0.5, '#1565c0', 1.1, 0.65); g.beginPath(); g.moveTo(5.5, -2.4); g.quadraticCurveTo(11.5, -3.2, 14.5, -1); g.quadraticCurveTo(10.5, 0.4, 5, -0.2); g.closePath(); g.fill();
        g.strokeStyle = '#616161'; g.lineWidth = 1.2; g.beginPath(); g.moveTo(0, -9.6); g.lineTo(0, -13); g.stroke();
        const pr2 = Math.cos(performance.now() / 40) * 8;
        g.fillStyle = 'rgba(255,235,59,0.35)'; g.beginPath(); g.ellipse(0, -13.4, 8.4, 1.7, 0, 0, Math.PI * 2); g.fill();
        g.fillStyle = '#ffeb3b'; g.beginPath(); g.ellipse(0, -13.5, Math.abs(pr2) + 0.6, 1.3, 0, 0, Math.PI * 2); g.fill();
        g.fillStyle = '#e53935'; g.beginPath(); g.arc(0, -13.5, 1, 0, Math.PI * 2); g.fill();
        gloss(-6, -5.5, -1.5, -8.6, 0.45); break;
      }
      case 'antlers': {   // headband with two branching antlers
        g.strokeStyle = vg(-10, -3, '#5d4037', 1.2, 0.8); g.lineWidth = 1.8; g.beginPath(); g.arc(0, 0, 8.6, Math.PI * 1.1, Math.PI * 1.9); g.stroke();
        for (const s2 of [-1, 1]) {
          const bx = s2 * 5, by = -7;
          g.strokeStyle = s2 < 0 ? '#8d6e63' : '#a1887f'; g.lineWidth = 2.2; g.lineCap = 'round';
          g.beginPath(); g.moveTo(bx, by); g.lineTo(bx + s2 * 2, by - 9); g.lineTo(bx + s2 * 6, by - 13); g.moveTo(bx + s2 * 1.4, by - 6); g.lineTo(bx + s2 * 5, by - 7); g.moveTo(bx + s2 * 2, by - 9); g.lineTo(bx - s2 * 0.5, by - 13); g.stroke();
          g.strokeStyle = 'rgba(255,255,255,0.35)'; g.lineWidth = 0.6; g.beginPath(); g.moveTo(bx - 0.5, by - 1); g.lineTo(bx + s2 * 1.5 - 0.5, by - 8.5); g.stroke();
        }
        break;
      }
      case 'halo': {   // floating, glowing ring (unchanged)
        const hb = Math.sin(performance.now() / 300) * 1.2;
        g.save(); g.shadowColor = 'rgba(255,214,0,0.95)'; g.shadowBlur = 8;
        g.strokeStyle = '#ffe082'; g.lineWidth = 2.4; g.beginPath(); g.ellipse(0.5, -14 + hb, 8.5, 2.6, -0.08, 0, Math.PI * 2); g.stroke();
        g.restore();
        g.strokeStyle = 'rgba(255,255,255,0.8)'; g.lineWidth = 0.8; g.beginPath(); g.ellipse(0.5, -14 + hb, 8.5, 2.6, -0.08, Math.PI * 1.1, Math.PI * 1.6); g.stroke();
        break;
      }
      case 'laurel': {   // laurel wreath with a golden ribbon
        for (const s2 of [-1, 1]) for (let k = 0; k < 6; k++) {
          const a = Math.PI * 1.5 + s2 * (0.3 + k * 0.2), lx = Math.cos(a) * 8.8, ly = -1 + Math.sin(a) * 8.8;
          g.save(); g.translate(lx, ly); g.rotate(a + s2 * 0.9);
          g.fillStyle = vg(-1.5, 1.5, k % 2 ? '#7cb342' : '#558b2f', 1.3, 0.8); g.beginPath(); g.ellipse(0, 0, 3.2, 1.4, 0, 0, Math.PI * 2); g.fill();
          g.strokeStyle = 'rgba(30,60,10,0.5)'; g.lineWidth = 0.4; g.beginPath(); g.moveTo(-3, 0); g.lineTo(3, 0); g.stroke(); g.restore();
        }
        g.fillStyle = '#ffc107'; g.beginPath(); g.arc(-8.5, 1.5, 1.6, 0, Math.PI * 2); g.fill();
        g.strokeStyle = '#ffb300'; g.lineWidth = 1.2; g.beginPath(); g.moveTo(-8.5, 1.5); g.lineTo(-11, 6); g.moveTo(-8.5, 1.5); g.lineTo(-7, 6.5); g.stroke(); break;
      }
      case 'flowercrown': {   // leafy band with five flowers
        g.strokeStyle = vg(-10, -2, '#558b2f', 1.2, 0.8); g.lineWidth = 2; g.beginPath(); g.arc(0, -1, 8.6, Math.PI * 1.08, Math.PI * 1.92); g.stroke();
        const fc = ['#ec407a', '#fff176', '#ab47bc', '#ff8a65', '#4fc3f7'];
        for (let k = 0; k < 5; k++) {
          const a = Math.PI * (1.12 + k * 0.19), fx = Math.cos(a) * 8.8, fy = -1 + Math.sin(a) * 8.8;
          g.fillStyle = '#7cb342'; g.beginPath(); g.ellipse(fx + 2.4, fy + 0.6, 1.9, 0.9, a, 0, Math.PI * 2); g.fill();
          for (let q = 0; q < 5; q++) { g.fillStyle = q < 2 ? shade(fc[k], 1.25) : fc[k]; g.beginPath(); g.arc(fx + Math.cos(q * 1.26) * 1.5, fy + Math.sin(q * 1.26) * 1.5, 1.2, 0, Math.PI * 2); g.fill(); }
          g.fillStyle = '#fff59d'; g.beginPath(); g.arc(fx, fy, 0.9, 0, Math.PI * 2); g.fill();
        }
        break;
      }
    }
  }

  // 1.0.42: what each premium character already wears — those shop slots can't be changed while it is on
  const COSTUME_SLOTS = {
    ninja: ['hat', 'acc'], pirate: ['hat', 'acc'], knight: ['hat', 'acc'], astronaut: ['hat', 'acc'], hero: ['acc', 'shoes'],
    robot: ['hat', 'acc'], vampire: ['hat', 'acc'], mummy: ['hat', 'acc', 'shorts'], warrior: ['hat', 'acc'], samurai: ['hat'],
    clown: ['hat', 'acc', 'shoes'], detective: ['hat', 'acc'], firefighter: ['hat'],
    starknight: ['acc'], spider: ['hat', 'acc'], darkhero: ['hat', 'acc'], plumber: ['hat', 'shoes'], superwarrior: ['hat', 'acc'], ghosthunter: ['acc'], cybersamurai: ['hat', 'acc'], zombiepirate: ['hat', 'acc'], wizardkid: ['acc'], luchador: ['hat', 'acc'], catstronaut: ['hat', 'acc'], pumpkin: ['hat', 'acc'], snowgangster: ['hat', 'acc'], dinosuit: ['hat', 'acc'], dj: ['hat', 'acc'], ghostknight: ['hat', 'acc'], lavagolem: ['hat', 'acc'], iceking: ['hat', 'acc'], alien: ['hat', 'acc'], pharaoh: ['hat', 'acc', 'shorts'], hacker: ['hat', 'acc'], angel: ['hat', 'acc'], demon: ['hat', 'acc'], racer: ['hat', 'acc'], rockstar: ['hat', 'acc']
  };
  const lockedSlots = look => { const c = look && findItem('color', look.color); return (c && c.costume && COSTUME_SLOTS[c.costume]) || []; };
  const slotLocked = cat => lockedSlots(save.look).includes(cat);
  // ---------- Paid characters: clothes / heads drawn over the stick body ----------
  // =====================================================================
  //  1.0.50: premium characters, redrawn from scratch — each is a full outfit drawn over the stick body
  //  (back layer behind it, front layer over it), with its own running and jumping effects.
  //  Only nods to well-known genres, never real characters: no names, logos or exact looks.
  // =====================================================================
  const skLG = (g, x0, y0, x1, y1, cols) => { const gr = g.createLinearGradient(x0, y0, x1, y1); cols.forEach((c, i) => gr.addColorStop(i / (cols.length - 1), c)); return gr; };
  const skRG = (g, x, y, r, cols) => { const gr = g.createRadialGradient(x - r * 0.35, y - r * 0.4, r * 0.08, x, y, r); cols.forEach((c, i) => gr.addColorStop(i / (cols.length - 1), c)); return gr; };
  const skC = (g, x, y, r, f) => { g.fillStyle = f; g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill(); };
  const skE = (g, x, y, rx, ry, rot, f) => { g.fillStyle = f; g.beginPath(); g.ellipse(x, y, Math.max(0.1, rx), Math.max(0.1, ry), rot || 0, 0, Math.PI * 2); g.fill(); };
  const skL = (g, pts, c, w) => { g.strokeStyle = c; g.lineWidth = w; g.lineCap = 'round'; g.lineJoin = 'round'; g.beginPath(); pts.forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y)); g.stroke(); };
  const skP = (g, pts, f) => { g.fillStyle = f; g.beginPath(); pts.forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y)); g.closePath(); g.fill(); };
  const skAt = (a, b, f) => ({ x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f });
  const skLimb = (l, f) => f < 0.5 ? skAt(l.f, l.k, f * 2) : skAt(l.k, l.e, (f - 0.5) * 2);
  // a limb (or a part of it) painted over: sleeves, boots, gloves
  const skPaint = (g, l, f0, f1, c, w) => {   // 1.0.52: with a darker underside and a light streak along the top
    const pts = []; for (let f = f0; f <= f1 + 1e-6; f += 0.125) { const q = skLimb(l, Math.min(f, 1)); pts.push([q.x, q.y]); }
    skL(g, pts, c, w);
    if (w > 2 && c[0] === '#') { skL(g, pts.map(([x, y]) => [x + w * 0.18, y + w * 0.18]), shade(c, 0.72), w * 0.35); skL(g, pts.map(([x, y]) => [x - w * 0.2, y - w * 0.2]), 'rgba(255,255,255,0.28)', w * 0.22); }
  };
  const skGlow = (g, col, blur, fn) => { g.save(); g.shadowColor = col; g.shadowBlur = blur; fn(); g.restore(); };
  // the torso as a filled shape (a suit), wider at the shoulders
  function skTorso(g, P, fill, w0, w1) {
    const { hip, neck } = P, dx = neck.x - hip.x, dy = neck.y - hip.y, L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L;
    const pts = [[neck.x + nx * w0, neck.y + ny * w0], [neck.x - nx * w0, neck.y - ny * w0], [hip.x - nx * w1, hip.y - ny * w1], [hip.x + nx * w1, hip.y + ny * w1]];
    skP(g, pts, fill);
    // 1.0.52: a fine dark outline, a lit edge on the back side, a soft shadow under the chin and a fold at the waist
    g.save(); g.beginPath(); pts.forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y)); g.closePath();
    g.strokeStyle = 'rgba(0,0,0,0.35)'; g.lineWidth = 0.6; g.stroke(); g.clip();
    const sh0 = g.createLinearGradient(neck.x, neck.y, neck.x, neck.y + 6); sh0.addColorStop(0, 'rgba(0,0,0,0.28)'); sh0.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = sh0; g.fillRect(neck.x - 12, neck.y - 1, 24, 8);
    g.strokeStyle = 'rgba(255,255,255,0.22)'; g.lineWidth = 1.2; g.beginPath(); g.moveTo(pts[1][0] + nx * 0.6, pts[1][1] + ny * 0.6); g.lineTo(pts[2][0] + nx * 0.6, pts[2][1] + ny * 0.6); g.stroke();
    const wf = skAt(hip, neck, 0.32); g.strokeStyle = 'rgba(0,0,0,0.18)'; g.lineWidth = 0.6; g.beginPath(); g.moveTo(wf.x - nx * w1 * 0.8, wf.y - ny * w1 * 0.8); g.quadraticCurveTo(wf.x, wf.y + 1.2, wf.x + nx * w1 * 0.6, wf.y + ny * w1 * 0.6); g.stroke();
    g.restore();
    return { nx, ny };
  }
  // a cape on the back: segments wave one after another
  function skCape(g, P, t, c1, c2, len, opt) {
    const { sh } = P, o = opt || {}, L = len || 26, w = k => Math.sin(t * 9 - k * 1.3) * (1.4 + k * 1.5);
    const A = { x: sh.x - 10 + w(1), y: sh.y + L * 0.35 }, B = { x: sh.x - 20 + w(2), y: sh.y + L * 0.85 }, Cc = { x: sh.x - 5 + w(2) * 0.6, y: sh.y + L };
    g.fillStyle = skLG(g, sh.x, sh.y, B.x, B.y, [c1, c2]);
    g.beginPath(); g.moveTo(sh.x + 2, sh.y - 3); g.quadraticCurveTo(A.x - 3, A.y - 3, B.x, B.y);
    if (o.scallop) { for (let q = 1; q <= 4; q++) { const f = q / 4, ex = B.x + (Cc.x - B.x) * f, ey = B.y + (Cc.y - B.y) * f; g.quadraticCurveTo(ex - 2, ey - 6, ex, ey); } }
    else g.quadraticCurveTo((B.x + Cc.x) / 2, B.y + 3, Cc.x, Cc.y);
    g.quadraticCurveTo(sh.x - 2, sh.y + 10, sh.x + 3, sh.y + 1); g.closePath(); g.fill();
    if (o.inner) { g.fillStyle = o.inner; g.beginPath(); g.moveTo(sh.x + 1, sh.y - 2); g.quadraticCurveTo(sh.x - 6, sh.y + 6, sh.x - 11 + w(1) * 0.5, sh.y + L * 0.6); g.lineTo(sh.x - 3, sh.y + 4); g.closePath(); g.fill(); }
    g.strokeStyle = 'rgba(0,0,0,0.25)'; g.lineWidth = 0.6; g.beginPath(); g.moveTo(sh.x - 2, sh.y + 2); g.quadraticCurveTo(A.x, A.y + 2, (B.x + Cc.x) / 2, B.y + 1); g.stroke();
  }
  // a whole head covered (mask / helmet / hood) with light from the upper left
  const skHead = (g, h, cols, r) => {   // 1.0.52: the head with a rim light and a fine outline
    const R = r || 8.3; skC(g, h.x, h.y, R, skRG(g, h.x, h.y, R, cols));
    g.strokeStyle = 'rgba(0,0,0,0.35)'; g.lineWidth = 0.6; g.beginPath(); g.arc(h.x, h.y, R, 0, Math.PI * 2); g.stroke();
    g.strokeStyle = 'rgba(255,255,255,0.35)'; g.lineWidth = 0.9; g.beginPath(); g.arc(h.x, h.y, R - 0.8, Math.PI * 1.05, Math.PI * 1.45); g.stroke();
  };
  const skEyeW = (g, x, y, rx, ry, rot) => { skE(g, x, y, rx + 0.6, ry + 0.6, rot, '#111'); skE(g, x, y, rx, ry, rot, '#fafafa'); skE(g, x - rx * 0.3, y - ry * 0.35, rx * 0.35, ry * 0.25, rot, 'rgba(255,255,255,0.9)'); };

  const SKINS2 = {
    // ------------------------------------------------------------------ 1
    starknight: { col: '#5d4037', slots: ['acc'],
      back: (g, P, t) => skCape(g, P, t, '#4e342e', '#2b1a12', 30),
      front: (g, P, t, mode) => {
        const { hip, neck, head: h, arms, legs } = P;
        for (const l of legs) skPaint(g, l, 0.7, 1, '#3e2723', 4.6);   // boots
        skTorso(g, P, skLG(g, neck.x - 6, 0, neck.x + 6, 0, ['#e6d3b3', '#c8ad85', '#a88d64']), 5, 4.5);   // tunic
        skL(g, [[neck.x - 3, neck.y], [hip.x + 3, hip.y - 4]], '#8d6e63', 2.2); skL(g, [[neck.x + 3, neck.y], [hip.x - 2, hip.y - 4]], '#a1887f', 2.2);   // crossed folds
        const b = skAt(hip, neck, 0.22); skL(g, [[b.x - 5, b.y], [b.x + 5, b.y]], '#4e342e', 2.6); skC(g, b.x + 1, b.y, 1.3, '#bdbdbd');   // belt
        for (const a of arms) skPaint(g, a, 0.1, 0.62, '#bcaa8a', 4.4);   // wide sleeves
        skHead(g, h, ['#f1c27d', '#e0ac69', '#b07a45']); skC(g, h.x + 3.5, h.y - 1, 0.9, '#111');
        skP(g, [[h.x - 7, h.y - 4], [h.x - 3, h.y - 9], [h.x + 4, h.y - 8.5], [h.x + 7, h.y - 5], [h.x + 2, h.y - 6], [h.x - 4, h.y - 5]], '#4e342e');   // hair
        // the beam sword: a hilt and a humming, glowing blade
        const hd = arms[0].e, ang = -1.1 + Math.sin(t * 3) * 0.08 + (mode === 'jump' ? -0.5 : 0), L = 26 + Math.sin(t * 40) * 0.6;
        g.save(); g.translate(hd.x, hd.y); g.rotate(ang);
        g.fillStyle = skLG(g, 0, -1.6, 0, 1.6, ['#eceff1', '#78909c']); g.fillRect(-3, -1.6, 8, 3.2); g.fillStyle = '#263238'; g.fillRect(-1, -1.7, 1.2, 3.4); g.fillRect(2, -1.7, 1.2, 3.4);
        skGlow(g, '#00e5ff', 12, () => { g.fillStyle = 'rgba(0,229,255,0.55)'; g.fillRect(5, -2.4, L, 4.8); });
        g.fillStyle = '#e0f7fa'; g.fillRect(5, -1, L, 2); g.restore();
      },
      jump: (out, x, y) => { for (let k = 0; k < 8; k++) { const a = Math.PI * (0.1 + 0.8 * k / 7); out.push({ k: 'r', a, x: x + Math.cos(a) * 8, y: y + 20 + Math.sin(a) * 8, vx: Math.cos(a) * 160, vy: Math.sin(a) * 160, g: 0, life: 0.4, l0: 0.4, r: 8, col: '#80deea' }); } } },
    // ------------------------------------------------------------------ 2
    spider: { col: '#212121', slots: ['hat', 'acc'],
      front: (g, P, t) => {
        const { hip, neck, head: h, arms, legs } = P;
        skGlow(g, '#1de9b6', 5, () => { for (const l of legs) skPaint(g, l, 0.15, 0.85, '#00bfa5', 1.6); for (const a of arms) skPaint(g, a, 0.1, 0.5, '#00bfa5', 1.4); });   // glowing teal seams
        const { nx, ny } = skTorso(g, P, skLG(g, neck.x - 6, neck.y, neck.x + 6, hip.y, ['#424242', '#212121', '#0a0a0a']), 4.5, 3.8);
        skP(g, [[hip.x - nx * 3.8, hip.y - ny * 3.8], [hip.x - nx * 2.6, hip.y - ny * 2.6], [neck.x - nx * 3, neck.y - ny * 3 + 6], [neck.x - nx * 4.5, neck.y - ny * 4.5 + 4]], '#00897b');
        const c = skAt(hip, neck, 0.62);   // a little spider emblem
        skGlow(g, '#1de9b6', 6, () => { skE(g, c.x, c.y, 1.4, 2, 0, '#1de9b6'); skL(g, [[c.x - 3, c.y - 2], [c.x, c.y], [c.x + 3, c.y - 2]], '#1de9b6', 0.6); skL(g, [[c.x - 3, c.y + 2.5], [c.x, c.y], [c.x + 3, c.y + 2.5]], '#1de9b6', 0.6); });
        skHead(g, h, ['#4f4f4f', '#212121', '#000000']);
        g.save(); g.beginPath(); g.arc(h.x, h.y, 8.3, 0, Math.PI * 2); g.clip(); g.strokeStyle = 'rgba(29,233,182,0.55)'; g.lineWidth = 0.45;   // the web pattern
        for (let a = 0; a < 8; a++) { g.beginPath(); g.moveTo(h.x + 2, h.y); g.lineTo(h.x + 2 + Math.cos(a * 0.785) * 12, h.y + Math.sin(a * 0.785) * 12); g.stroke(); }
        for (const r2 of [3, 6, 9]) { g.beginPath(); g.arc(h.x + 2, h.y, r2, 0, Math.PI * 2); g.stroke(); }
        g.restore();
        skGlow(g, '#1de9b6', 6, () => { skE(g, h.x + 1.2, h.y - 1, 2.2, 3, -0.5, '#e0fff8'); skE(g, h.x + 6.3, h.y - 1, 1.7, 2.6, 0.5, '#e0fff8'); });
      },
      jump: (out, x, y) => { out.push({ k: 'web', x: x + 4, y: y + 40, vx: 90, vy: 260, g: 0, life: 0.5, l0: 0.5, col: '#a7ffeb' }); } },
    // ------------------------------------------------------------------ 3
    darkhero: { col: '#263238', slots: ['hat', 'acc'],
      back: (g, P, t) => skCape(g, P, t, '#37474f', '#101418', 34, { scallop: 1, inner: '#1c2329' }),
      front: (g, P, t) => {
        const { hip, neck, head: h, arms, legs } = P;
        skTorso(g, P, skLG(g, neck.x - 6, neck.y, neck.x + 6, hip.y, ['#546e7a', '#37474f', '#1c262b']), 5, 4);
        const c = skAt(hip, neck, 0.66);   // a golden crescent on the chest
        skGlow(g, 'rgba(255,214,0,0.6)', 5, () => { skE(g, c.x, c.y, 3.6, 2.4, 0, '#ffd54f'); }); skE(g, c.x + 1.2, c.y - 0.6, 3, 2, 0, '#37474f');
        const b = skAt(hip, neck, 0.15);   // a utility belt with pouches
        skL(g, [[b.x - 5, b.y], [b.x + 5, b.y]], '#90a4ae', 2.4); for (const d of [-3.5, 0, 3.5]) { g.fillStyle = '#cfd8dc'; g.fillRect(b.x + d - 1, b.y - 0.5, 2, 2.6); }
        for (const a of arms) skPaint(g, a, 0.7, 1, '#212121', 4.4);   // gauntlets
        for (const l of legs) skPaint(g, l, 0.7, 1, '#212121', 4.6);
        skHead(g, h, ['#546e7a', '#37474f', '#1c262b']);
        g.fillStyle = '#e0ac69'; g.beginPath(); g.arc(h.x, h.y, 8.3, 0.15, 1.2); g.lineTo(h.x + 1, h.y + 2); g.closePath(); g.fill();   // the jaw
        g.fillStyle = skLG(g, 0, h.y - 12, 0, h.y + 8, ['#455a64', '#1c262b']); g.beginPath(); g.moveTo(h.x + 5, h.y - 7.5); g.quadraticCurveTo(h.x - 6, h.y - 13, h.x - 11, h.y - 2); g.quadraticCurveTo(h.x - 11, h.y + 6, h.x - 6, h.y + 8); g.quadraticCurveTo(h.x - 8, h.y, h.x - 4, h.y - 6); g.closePath(); g.fill();   // a deep hood
        const w2 = Math.sin(t * 10) * 2; skL(g, [[P.neck.x - 3, P.neck.y + 1], [P.neck.x - 9, P.neck.y + 3 + w2 * 0.5], [P.neck.x - 15, P.neck.y + 6 + w2]], '#b71c1c', 2.6);   // a crimson scarf
        skGlow(g, '#ffffff', 4, () => { skP(g, [[h.x + 1.5, h.y - 2.2], [h.x + 5, h.y - 2.6], [h.x + 4.5, h.y - 1.2], [h.x + 2, h.y - 1]], '#fafafa'); skP(g, [[h.x + 6, h.y - 2.6], [h.x + 8.3, h.y - 2.4], [h.x + 8, h.y - 1.2], [h.x + 6.2, h.y - 1.3]], '#fafafa'); });
      },
      fx: (out, x, y) => { if (Math.random() < 0.3) out.push({ k: 'c', grow: 1, x: x - 10, y: y + 10 + Math.random() * 30, vx: -40, vy: 10, g: 0, life: 0.6, l0: 0.6, r: 3, col: 'rgba(30,35,45,0.35)' }); } },
    // ------------------------------------------------------------------ 4
    plumber: { col: '#1e40af', slots: ['hat', 'shoes'],
      front: (g, P, t) => {
        const { hip, neck, head: h, arms, legs } = P;
        for (const a of arms) skPaint(g, a, 0, 0.82, '#00897b', 4.4);   // teal sleeves
        const { nx, ny } = skTorso(g, P, skLG(g, neck.x - 6, 0, neck.x + 6, 0, ['#26a69a', '#00796b']), 4.6, 4);
        skP(g, [[neck.x + nx * 2.5, neck.y + ny * 2.5 + 7], [neck.x - nx * 2.5, neck.y - ny * 2.5 + 7], [hip.x - nx * 4, hip.y - ny * 4], [hip.x + nx * 4, hip.y + ny * 4]], skLG(g, 0, neck.y, 0, hip.y, ['#8d6e63', '#4e342e']));   // brown work overalls
        for (const sd of [-1, 1]) { const q = { x: neck.x + nx * sd * 2.5, y: neck.y + ny * sd * 2.5 + 7 }; skC(g, q.x, q.y, 1.2, '#cfd8dc'); skL(g, [[q.x, q.y], [neck.x + nx * sd * 3.5, neck.y + ny * sd * 3.5]], '#4e342e', 1.6); }
        { const pk = skAt(hip, neck, 0.3); g.fillStyle = '#3e2723'; g.fillRect(pk.x - 1, pk.y - 1.5, 4, 3); }   // a pocket
        for (const a of arms) skC(g, a.e.x, a.e.y, 2.6, skRG(g, a.e.x, a.e.y, 2.6, ['#ffffff', '#e0e0e0']));   // white gloves
        for (const l of legs) skE(g, l.e.x + 2, l.e.y - 0.5, 3.6, 2.2, 0, skLG(g, 0, l.e.y - 2, 0, l.e.y + 2, ['#8d6e63', '#4e342e']));
        skHead(g, h, ['#ffe0bd', '#f1c27d', '#c68642']);
        skE(g, h.x + 7.5, h.y + 1.2, 2.6, 2.2, 0, skRG(g, h.x + 7.5, h.y + 1.2, 2.6, ['#ffd2b0', '#e8a27a']));   // a big nose
        skP(g, [[h.x + 2, h.y + 3], [h.x + 5, h.y + 2.2], [h.x + 9.5, h.y + 3], [h.x + 8, h.y + 5.6], [h.x + 5.5, h.y + 4.6], [h.x + 3, h.y + 5.6]], '#4e342e');   // the moustache
        skC(g, h.x + 4, h.y - 1.8, 1, '#1565c0');
        g.fillStyle = skLG(g, 0, h.y - 12, 0, h.y - 3, ['#ffb74d', '#ef6c00']); g.beginPath(); g.arc(h.x, h.y - 2.5, 8.6, Math.PI, 0); g.lineTo(h.x + 13, h.y - 2.5); g.quadraticCurveTo(h.x + 12, h.y - 0.5, h.x + 7, h.y - 1.5); g.closePath(); g.fill();   // an orange cap
        skL(g, [[h.x - 3, h.y - 4.5], [h.x + 1.5, h.y - 8.5]], '#eceff1', 1.2); skC(g, h.x + 2, h.y - 9, 1.4, '#eceff1'); skC(g, h.x + 2.4, h.y - 9.4, 0.6, '#ef6c00');   // a wrench badge
      },
      jump: (out, x, y) => { out.push({ k: 'coinpop', x: x + 2, y: y + 70, vx: 0, vy: 180, g: 0.45, life: 0.55, l0: 0.55, col: '#ffcc1a' }); } },
    // ------------------------------------------------------------------ 5
    superwarrior: { col: '#ef6c00', slots: ['hat', 'acc'],
      back: (g, P, t) => {   // an aura of golden flame around the whole figure
        const { hip, head: h } = P, pul = 0.7 + 0.3 * Math.sin(t * 14);
        for (let k = 0; k < 9; k++) {
          const a = -Math.PI / 2 + (k - 4) * 0.32, L = 34 + Math.sin(t * 18 + k * 1.7) * 6;
          const bx = (hip.x + h.x) / 2, by = (hip.y + h.y) / 2 + 12;
          g.fillStyle = `rgba(${170 + (k % 2) * 40},90,255,${0.2 * pul})`;
          g.beginPath(); g.moveTo(bx - 9, by + 14); g.quadraticCurveTo(bx + Math.cos(a) * L * 0.6 - 4, by + Math.sin(a) * L * 0.6, bx + Math.cos(a) * L, by + Math.sin(a) * L); g.quadraticCurveTo(bx + Math.cos(a) * L * 0.6 + 4, by + Math.sin(a) * L * 0.6, bx + 9, by + 14); g.fill();
        }
      },
      front: (g, P, t) => {
        const { hip, neck, head: h, arms, legs } = P;
        skTorso(g, P, skLG(g, neck.x - 6, neck.y, neck.x + 6, hip.y, ['#ef5350', '#c62828', '#7f0000']), 5, 4.2);
        skP(g, [[neck.x - 2.5, neck.y - 0.5], [neck.x + 3, neck.y - 0.5], [neck.x + 0.3, neck.y + 5]], '#212121');   // undershirt
        const b = skAt(hip, neck, 0.18); skL(g, [[b.x - 5, b.y], [b.x + 5, b.y]], '#212121', 3); skL(g, [[b.x - 4, b.y], [b.x - 7, b.y + 5]], '#212121', 1.6);
        for (const a of arms) { skPaint(g, a, 0.78, 0.92, '#212121', 4.6); }
        for (const l of legs) skPaint(g, l, 0.8, 1, '#212121', 4.6);
        skHead(g, h, ['#ffe0bd', '#f1c27d', '#c68642']); skL(g, [[h.x + 2.5, h.y - 2], [h.x + 5, h.y - 2.6]], '#111', 1); skC(g, h.x + 4.3, h.y - 0.8, 0.9, '#7c4dff');
        // golden spiky hair, flickering with energy
        const sp = [[-9, -2], [-12, -10], [-6, -9], [-7, -19], [-1, -11], [2, -21], [4, -11], [10, -17], [8, -7], [12, -6], [8.5, -3]];
        skGlow(g, '#b388ff', 9, () => { skP(g, [[h.x - 8, h.y], ...sp.map(([dx, dy]) => [h.x + dx + Math.sin(t * 20 + dx) * 0.5, h.y + dy]), [h.x + 7, h.y - 3]], skLG(g, 0, h.y - 20, 0, h.y, ['#ffffff', '#e1e4f0', '#9fa8da'])); });
      },
      fx: (out, x, y) => { if (Math.random() < 0.5) out.push({ k: 'k', x: x + (Math.random() - 0.5) * 18, y: y + 10 + Math.random() * 50, vx: -60, vy: 120 + Math.random() * 120, g: 0, life: 0.3, l0: 0.3, col: Math.random() < 0.5 ? '#e1bee7' : '#b388ff' }); },
      jump: (out, x, y) => { for (let k = 0; k < 3; k++) out.push({ k: 'o', grow: 1, x, y: y + 4, vx: 0, vy: 0, g: 0, life: 0.35 + k * 0.1, l0: 0.35 + k * 0.1, r: 8 + k * 4, col: k ? 'rgba(179,136,255,0.85)' : '#f3e5f5' }); } },
    // ------------------------------------------------------------------ 6
    ghosthunter: { col: '#bcaa8a', slots: ['acc'],
      back: (g, P, t) => {   // the backpack: a frame, a cylinder, gauges and a blinking light
        const { neck } = P, x = neck.x - 16, y = neck.y + 1;
        g.fillStyle = skLG(g, x, 0, x + 11, 0, ['#90a4ae', '#455a64']); roundRectOn(g, x, y, 11, 20, 2); g.fill();
        g.fillStyle = skLG(g, x - 3, 0, x + 2, 0, ['#cfd8dc', '#607d8b']); roundRectOn(g, x - 3, y + 3, 4, 15, 2); g.fill();
        g.fillStyle = '#263238'; g.fillRect(x + 2, y + 3, 7, 4); skC(g, x + 4, y + 5, 1.2, '#eceff1'); skC(g, x + 7, y + 5, 1.2, '#eceff1'); skL(g, [[x + 4, y + 5], [x + 4.6 + Math.sin(t * 5) * 0.6, y + 4.2]], '#e53935', 0.5);
        const on = Math.sin(t * 7) > 0; skGlow(g, '#ff1744', on ? 8 : 0, () => skC(g, x + 5.5, y + 15, 1.6, on ? '#ff5252' : '#7f1d1d'));
      },
      front: (g, P, t, mode) => {
        const { hip, neck, head: h, arms, legs } = P;
        skTorso(g, P, skLG(g, neck.x - 6, 0, neck.x + 6, 0, ['#d7c4a3', '#bcaa8a', '#9c8a6a']), 4.8, 4.2);
        skL(g, [[neck.x - 2, neck.y + 1], [neck.x - 2, hip.y - 2]], 'rgba(90,70,40,0.5)', 0.7);   // the zip
        const pt = skAt(hip, neck, 0.65); g.fillStyle = '#eceff1'; g.fillRect(pt.x + 0.5, pt.y - 1.5, 4, 2.6); g.fillStyle = '#e53935'; g.fillRect(pt.x + 1, pt.y - 1, 3, 0.7);   // a name patch
        for (const l of legs) skPaint(g, l, 0.75, 1, '#3e2723', 4.6);
        for (const a of arms) skPaint(g, a, 0.8, 1, '#212121', 4);
        skHead(g, h, ['#ffe0bd', '#f1c27d', '#c68642']); skC(g, h.x + 4, h.y - 1, 0.9, '#111');
        skP(g, [[h.x - 8, h.y - 1], [h.x - 6, h.y - 8], [h.x + 2, h.y - 9.5], [h.x + 8, h.y - 5], [h.x + 2, h.y - 6.5], [h.x - 5, h.y - 4]], '#6d4c41');
        // the wand with a coiled hose; now and then a wavy beam
        const hd = arms[0].e; skL(g, [[neck.x - 10, neck.y + 14], [hd.x - 6, hd.y + 8], [hd.x, hd.y]], '#37474f', 1.2);
        g.save(); g.translate(hd.x, hd.y); g.rotate(-0.3); g.fillStyle = skLG(g, 0, -2, 0, 2, ['#cfd8dc', '#455a64']); g.fillRect(-2, -1.8, 12, 3.6); skC(g, 10, 0, 1.4, '#ffca28'); g.restore();
        if ((t % 2.4) < 0.9 || mode === 'jump') {
          const bx = hd.x + 10, by = hd.y - 3;
          skGlow(g, '#ff9800', 10, () => { g.strokeStyle = 'rgba(255,152,0,0.9)'; g.lineWidth = 1.6; g.beginPath(); for (let q = 0; q <= 30; q++) { const xx = bx + q * 1.4, yy = by - q * 0.4 + Math.sin(q * 0.9 + t * 30) * 2.4; q ? g.lineTo(xx, yy) : g.moveTo(xx, yy); } g.stroke(); });
          g.strokeStyle = 'rgba(79,195,247,0.85)'; g.lineWidth = 0.8; g.beginPath(); for (let q = 0; q <= 30; q++) { const xx = bx + q * 1.4, yy = by - q * 0.4 + Math.sin(q * 0.7 - t * 26) * 2; q ? g.lineTo(xx, yy) : g.moveTo(xx, yy); } g.stroke();
        }
      } },
    // ------------------------------------------------------------------ 7
    cybersamurai: { col: '#1a1a2e', slots: ['hat', 'acc'],
      back: (g, P, t) => {   // a neon katana across the back
        const { neck, hip } = P; g.save(); g.translate(neck.x - 6, neck.y - 8); g.rotate(Math.atan2(hip.y + 2 - neck.y + 8, hip.x - 10 - neck.x + 6));
        g.fillStyle = '#263238'; g.fillRect(-2, -1.4, 7, 2.8); g.fillStyle = '#ff4081'; g.fillRect(5, -2.4, 1.4, 4.8);
        skGlow(g, '#00e5ff', 10, () => { g.fillStyle = '#00e5ff'; g.fillRect(6.5, -1, 26, 2); }); g.fillStyle = '#e0f7fa'; g.fillRect(6.5, -0.4, 26, 0.8); g.restore();
      },
      front: (g, P, t) => {
        const { hip, neck, head: h, arms, legs, sh } = P, pul = 0.6 + 0.4 * Math.sin(t * 4);
        skTorso(g, P, skLG(g, neck.x - 6, neck.y, neck.x + 6, hip.y, ['#3a3a5a', '#1a1a2e', '#0d0d1a']), 5, 4.4);
        skGlow(g, '#00e5ff', 6, () => {
          g.strokeStyle = `rgba(0,229,255,${0.6 + 0.4 * pul})`; g.lineWidth = 0.9;
          const a = skAt(hip, neck, 0.85), b = skAt(hip, neck, 0.25); g.beginPath(); g.moveTo(a.x - 4, a.y); g.lineTo(a.x + 1, a.y + 4); g.lineTo(b.x + 1, b.y); g.stroke();
          for (const l of legs) { const q1 = skLimb(l, 0.2), q2 = skLimb(l, 0.45); g.beginPath(); g.moveTo(q1.x + 1.2, q1.y); g.lineTo(q2.x + 1.2, q2.y); g.stroke(); }
        });
        skGlow(g, '#ff4081', 6, () => { g.strokeStyle = `rgba(255,64,129,${0.5 + 0.5 * pul})`; g.lineWidth = 0.9; for (const a of arms) { const q1 = skLimb(a, 0.6), q2 = skLimb(a, 0.9); g.beginPath(); g.moveTo(q1.x, q1.y - 1); g.lineTo(q2.x, q2.y - 1); g.stroke(); } });
        g.fillStyle = skLG(g, sh.x - 6, sh.y - 3, sh.x + 4, sh.y + 4, ['#4a4a6a', '#1a1a2e']); g.beginPath(); g.ellipse(sh.x - 1, sh.y + 1, 6, 3.4, -0.3, 0, Math.PI * 2); g.fill();   // a shoulder plate
        skHead(g, h, ['#4a4a6a', '#25253d', '#0d0d1a']);
        skGlow(g, '#00e5ff', 10, () => { g.fillStyle = `rgba(0,229,255,${0.75 + 0.25 * pul})`; roundRectOn(g, h.x - 0.5, h.y - 3.2, 9.4, 3.2, 1.4); g.fill(); });   // the visor
        g.fillStyle = '#e0f7fa'; g.fillRect(h.x + 1 + ((t * 30) % 6), h.y - 2.6, 1.6, 2);
        skP(g, [[h.x - 6, h.y - 6], [h.x - 1, h.y - 13], [h.x + 1, h.y - 7]], '#ff4081');   // a crest
      },
      fx: (out, x, y) => { if (Math.random() < 0.35) out.push({ k: 'k', x: x - 6, y: y + 8 + Math.random() * 50, vx: -220, vy: 0, g: 0, life: 0.25, l0: 0.25, col: Math.random() < 0.5 ? '#00e5ff' : '#ff4081' }); } },
    // ------------------------------------------------------------------ 8
    zombiepirate: { col: '#7cb342', slots: ['hat', 'acc'],
      front: (g, P, t) => {
        const { hip, neck, head: h, arms, legs } = P;
        for (const l of legs) skPaint(g, l, 0.05, 0.6, '#5d4037', 4.6);   // ragged trousers
        const { nx, ny } = skTorso(g, P, skLG(g, neck.x - 6, 0, neck.x + 6, 0, ['#c62828', '#8e0000']), 5.4, 5);   // a torn red coat
        skP(g, [[hip.x - nx * 5, hip.y - ny * 5], [hip.x - nx * 5 - 2, hip.y + 5], [hip.x - nx * 2, hip.y + 2], [hip.x, hip.y + 6], [hip.x + nx * 2, hip.y + 2]], '#8e0000');
        for (let q = 0.3; q < 0.9; q += 0.2) { const c = skAt(hip, neck, q); skC(g, c.x + 2, c.y, 0.9, '#ffd54f'); }
        for (const a of arms) skPaint(g, a, 0, 0.6, '#b71c1c', 4.2);
        skHead(g, h, ['#aed581', '#7cb342', '#33691e']);
        skL(g, [[h.x - 2, h.y + 2], [h.x + 2, h.y + 4]], '#33691e', 0.7); for (const d of [-1, 0.5, 2]) skL(g, [[h.x + d - 0.5, h.y + 2.4 + d * 0.5], [h.x + d + 0.5, h.y + 3.6 + d * 0.5]], '#33691e', 0.5);   // stitches
        skL(g, [[h.x - 7, h.y - 5], [h.x + 8, h.y - 1]], '#111', 0.9); skE(g, h.x + 6, h.y - 1.2, 2.4, 2, 0, '#111');   // the eyepatch
        skGlow(g, '#b2ff59', 8, () => skC(g, h.x + 1.5, h.y - 1.5, 1.4, '#b2ff59'));
        g.fillStyle = skLG(g, 0, h.y - 14, 0, h.y - 5, ['#3e2723', '#1b0f0b']);   // the tricorn
        g.beginPath(); g.moveTo(h.x - 13, h.y - 6); g.quadraticCurveTo(h.x, h.y - 10, h.x + 13, h.y - 6); g.quadraticCurveTo(h.x + 9, h.y - 13, h.x, h.y - 15); g.quadraticCurveTo(h.x - 9, h.y - 13, h.x - 13, h.y - 6); g.fill();
        skL(g, [[h.x - 12, h.y - 6.2], [h.x, h.y - 9.6], [h.x + 12, h.y - 6.2]], '#ffd54f', 0.8);
        skC(g, h.x, h.y - 11.5, 1.6, '#fafafa'); skL(g, [[h.x - 1.5, h.y - 9.5], [h.x + 1.5, h.y - 9.5]], '#fafafa', 0.6);
        const hip2 = { x: hip.x + 2, y: hip.y }; g.save(); g.translate(hip2.x, hip2.y); g.rotate(0.9);   // a cutlass at the hip
        g.strokeStyle = '#ffca28'; g.lineWidth = 1.2; g.beginPath(); g.arc(0, 0, 2.6, -1.4, 1.4); g.stroke();
        g.fillStyle = skLG(g, 0, -1, 0, 1, ['#eceff1', '#90a4ae']); g.beginPath(); g.moveTo(2, -1); g.quadraticCurveTo(10, -2, 16, 0.5); g.lineTo(2, 1); g.fill(); g.restore();
      },
      fx: (out, x, y) => { if (Math.random() < 0.18) out.push({ k: 'c', grow: 1, x: x - 4, y: y + 50, vx: -30, vy: 30, g: 0, life: 0.7, l0: 0.7, r: 2.4, col: 'rgba(178,255,89,0.4)' }); } },
    // ------------------------------------------------------------------ 9
    wizardkid: { col: '#212121', slots: ['acc'],
      back: (g, P, t) => skCape(g, P, t, '#263238', '#0d0d0d', 28, { inner: '#7f0000' }),
      front: (g, P, t) => {
        const { hip, neck, head: h, arms } = P;
        skTorso(g, P, skLG(g, neck.x - 6, 0, neck.x + 6, 0, ['#424242', '#212121']), 5, 5);
        // the striped scarf: around the neck and a fluttering tail
        const w1 = Math.sin(t * 10) * 2;
        for (let q = 0; q < 6; q++) { const f = q / 6; skL(g, [[neck.x - 1 - f * 12, neck.y + 1 + f * 4 + w1 * f], [neck.x - 1 - (f + 0.17) * 12, neck.y + 1 + (f + 0.17) * 4 + w1 * (f + 0.17)]], q % 2 ? '#cfd8dc' : '#00796b', 3); }
        g.fillStyle = '#00796b'; roundRectOn(g, neck.x - 5, neck.y - 1.5, 10, 4, 2); g.fill(); g.fillStyle = '#cfd8dc'; g.fillRect(neck.x - 1, neck.y - 1.5, 2, 4);
        skHead(g, h, ['#ffe0bd', '#f1c27d', '#c68642']);
        skP(g, [[h.x - 8.5, h.y + 1], [h.x - 9, h.y - 5], [h.x - 5, h.y - 9.5], [h.x + 1, h.y - 10], [h.x + 7, h.y - 7], [h.x + 8.5, h.y - 3], [h.x + 5, h.y - 5.5], [h.x + 2, h.y - 4], [h.x - 1, h.y - 6], [h.x - 4, h.y - 3], [h.x - 6, h.y + 1]], '#1b1b1b');   // messy hair
        skGlow(g, '#ffd54f', 4, () => { g.fillStyle = '#ffe082'; starPath(g, h.x + 3, h.y - 5.6, 1.3); g.fill(); });   // a little glowing star mark
        g.strokeStyle = '#111'; g.lineWidth = 0.7; for (const ex of [2.3, 6.7]) { g.beginPath(); g.arc(h.x + ex, h.y - 0.8, 2, 0, Math.PI * 2); g.stroke(); } skL(g, [[h.x + 4.3, h.y - 0.9], [h.x + 4.7, h.y - 0.9]], '#111', 0.7);   // round glasses
        skC(g, h.x + 2.6, h.y - 0.7, 0.7, '#2e7d32'); skC(g, h.x + 7, h.y - 0.7, 0.6, '#2e7d32');
        const hd = arms[0].e; g.save(); g.translate(hd.x, hd.y); g.rotate(-0.7 + Math.sin(t * 4) * 0.2);   // the wand
        g.fillStyle = skLG(g, 0, -1, 12, 1, ['#5d4037', '#3e2723']); g.fillRect(-1, -0.8, 13, 1.6); skGlow(g, '#fff59d', 8, () => skC(g, 12.5, 0, 1.2, '#fffde7')); g.restore();
      },
      fx: (out, x, y) => { if (Math.random() < 0.4) out.push({ k: 's', x: x + 10, y: y + 32 + Math.random() * 8, vx: -50 + Math.random() * 30, vy: Math.random() * 40, g: 0, life: 0.5, l0: 0.5, r: 2 + Math.random() * 1.5, col: Math.random() < 0.5 ? '#fff59d' : '#ffffff' }); },
      jump: (out, x, y) => { for (let k = 0; k < 10; k++) { const a = Math.random() * Math.PI; out.push({ k: 's', x, y: y + 4, vx: Math.cos(a) * 140, vy: Math.sin(a) * 140, g: 0.3, life: 0.6, l0: 0.6, r: 3, col: ['#fff59d', '#ce93d8', '#80deea'][k % 3] }); } } },
    // ------------------------------------------------------------------ 10
    luchador: { col: '#e0a070', slots: ['hat', 'acc'],
      back: (g, P, t) => skCape(g, P, t, '#ffd54f', '#ff6f00', 18),
      front: (g, P, t) => {
        const { hip, neck, head: h, legs } = P;
        for (const l of legs) skPaint(g, l, 0, 0.75, '#7b1fa2', 4.6); for (const l of legs) skPaint(g, l, 0.75, 1, '#fafafa', 4.8);   // tights and boots
        skTorso(g, P, skLG(g, neck.x - 6, 0, neck.x + 6, 0, ['#f1c27d', '#d39a5c', '#a86d3a']), 5, 4.2);
        skL(g, [[neck.x - 2, neck.y + 6], [neck.x - 1, neck.y + 9]], 'rgba(120,70,30,0.4)', 0.7);
        const b = skAt(hip, neck, 0.18);   // the champion's belt
        g.fillStyle = '#212121'; g.fillRect(b.x - 5.5, b.y - 2, 11, 4); g.fillStyle = skRG(g, b.x + 1, b.y, 4, ['#fff8e1', '#ffca28', '#e65100']); g.beginPath(); g.ellipse(b.x + 1, b.y, 4, 3.2, 0, 0, Math.PI * 2); g.fill();
        skGlow(g, '#ffffff', 4, () => { g.fillStyle = '#fff59d'; starPath(g, b.x + 1, b.y, 1.6); g.fill(); });
        skHead(g, h, ['#ce93d8', '#8e24aa', '#4a148c']);   // the mask
        g.fillStyle = '#ffd54f'; for (const [ex, s2] of [[h.x + 2.3, -1], [h.x + 6.8, 1]]) { g.beginPath(); g.moveTo(ex - 3.4, h.y - 0.5); g.quadraticCurveTo(ex - 1, h.y - 5 - Math.abs(s2), ex + 3, h.y - 4); g.quadraticCurveTo(ex + 1.5, h.y + 1.6, ex - 3.4, h.y - 0.5); g.fill(); }
        skEyeW(g, h.x + 2.4, h.y - 1.3, 1.5, 1.2, 0); skEyeW(g, h.x + 6.6, h.y - 1.3, 1.2, 1, 0);
        skL(g, [[h.x - 8, h.y], [h.x - 2, h.y + 5], [h.x + 7, h.y + 5]], '#ffd54f', 0.9);
        skP(g, [[h.x - 3, h.y - 8], [h.x - 6, h.y - 13], [h.x, h.y - 9], [h.x + 4, h.y - 13], [h.x + 3, h.y - 8]], '#e53935');   // flames on top
      },
      jump: (out, x, y) => { for (let k = 0; k < 6; k++) { const a = Math.PI * (k / 5); out.push({ k: 's', x, y: y + 4, vx: Math.cos(a) * 150, vy: Math.sin(a) * 110, g: 0.5, life: 0.55, l0: 0.55, r: 3.4, col: k % 2 ? '#ffd54f' : '#ce93d8' }); } } },
    // ------------------------------------------------------------------ 11
    catstronaut: { col: '#eceff1', slots: ['hat', 'acc'],
      back: (g, P, t) => { const { neck } = P; g.fillStyle = skLG(g, neck.x - 16, 0, neck.x - 5, 0, ['#ffffff', '#b0bec5']); roundRectOn(g, neck.x - 16, neck.y + 1, 11, 19, 3); g.fill(); skL(g, [[neck.x - 13, neck.y + 1], [neck.x - 14, neck.y - 8]], '#90a4ae', 0.8); skGlow(g, '#ff1744', Math.sin(t * 5) > 0 ? 6 : 0, () => skC(g, neck.x - 14, neck.y - 9, 1.3, '#ff5252')); },
      front: (g, P, t) => {
        const { hip, neck, head: h, arms, legs } = P;
        skTorso(g, P, skLG(g, neck.x - 6, 0, neck.x + 6, 0, ['#ffffff', '#cfd8dc']), 5.4, 4.8);
        const c = skAt(hip, neck, 0.6); g.fillStyle = '#263238'; roundRectOn(g, c.x - 2, c.y - 2.5, 6, 5, 1); g.fill(); skC(g, c.x - 0.5, c.y - 1, 0.8, '#ff5252'); skC(g, c.x + 1.8, c.y - 1, 0.8, '#69f0ae'); skC(g, c.x + 0.6, c.y + 1.2, 0.8, '#40c4ff');
        for (const a of arms) skPaint(g, a, 0.85, 1, '#ff8f00', 4.4); for (const l of legs) skPaint(g, l, 0.8, 1, '#90a4ae', 5);
        // inside a fishbowl helmet: an orange cat
        skC(g, h.x, h.y, 7.4, skRG(g, h.x, h.y, 7.4, ['#ffcc80', '#fb8c00', '#c25e00']));
        for (const ex of [-4.4, 2.6]) skP(g, [[h.x + ex - 2, h.y - 5], [h.x + ex, h.y - 10], [h.x + ex + 2.2, h.y - 5.2]], '#fb8c00');
        skC(g, h.x + 2, h.y - 1, 1.1, '#111'); skC(g, h.x + 5.6, h.y - 1, 1, '#111'); skP(g, [[h.x + 4.5, h.y + 1.2], [h.x + 6, h.y + 1.2], [h.x + 5.2, h.y + 2.2]], '#f06292');
        g.strokeStyle = 'rgba(255,255,255,0.8)'; g.lineWidth = 0.4; for (const d of [-0.6, 0.6]) { g.beginPath(); g.moveTo(h.x + 6, h.y + 2); g.lineTo(h.x + 10, h.y + 1.6 + d); g.stroke(); }
        g.fillStyle = 'rgba(200,235,255,0.28)'; g.beginPath(); g.arc(h.x, h.y - 0.5, 11.5, 0, Math.PI * 2); g.fill();
        g.strokeStyle = 'rgba(255,255,255,0.75)'; g.lineWidth = 1; g.beginPath(); g.arc(h.x, h.y - 0.5, 11.5, 0, Math.PI * 2); g.stroke();
        g.strokeStyle = 'rgba(255,255,255,0.9)'; g.lineWidth = 1.4; g.beginPath(); g.arc(h.x, h.y - 0.5, 8.5, Math.PI * 1.1, Math.PI * 1.45); g.stroke();
        g.fillStyle = '#cfd8dc'; g.fillRect(neck.x - 5, neck.y - 0.5, 10, 2.4);
      },
      jump: (out, x, y) => { for (let k = 0; k < 7; k++) out.push({ k: 's', x: x + (Math.random() - 0.5) * 20, y: y + 4, vx: (Math.random() - 0.5) * 120, vy: 60 + Math.random() * 80, g: 0.1, life: 0.8, l0: 0.8, r: 2.4, col: '#fff59d' }); } },
    // ------------------------------------------------------------------ 12
    pumpkin: { col: '#212121', slots: ['hat', 'acc'],
      back: (g, P, t) => skCape(g, P, t, '#311b45', '#120a1a', 32, { scallop: 1 }),
      front: (g, P, t) => {
        const { hip, neck, head: h } = P;
        skTorso(g, P, skLG(g, neck.x - 6, 0, neck.x + 6, 0, ['#4a2c6b', '#2b1840']), 5, 4.6);
        skL(g, [[neck.x - 3, neck.y + 2], [neck.x + 3, neck.y + 2]], '#ff8f00', 1);
        // a pumpkin head with ribs and a flickering carved face
        for (const [dx, k3] of [[-4.5, 0.75], [4.5, 0.85], [0, 1]]) skE(g, h.x + dx, h.y, 5.6, 8.4, 0, skRG(g, h.x + dx, h.y, 8.4, [shade('#ffb74d', k3), shade('#f57c00', k3), shade('#bf360c', k3)]));
        g.fillStyle = '#33691e'; g.beginPath(); g.moveTo(h.x - 1, h.y - 7.5); g.quadraticCurveTo(h.x - 2, h.y - 12, h.x + 2, h.y - 13); g.lineTo(h.x + 1.5, h.y - 7.5); g.fill();
        const fl = 0.75 + 0.25 * Math.sin(t * 13) * Math.sin(t * 7);
        skGlow(g, '#ffab00', 10 * fl, () => {
          g.fillStyle = `rgba(255,${200 + 40 * fl | 0},60,${fl})`;
          skP(g, [[h.x + 1, h.y - 1], [h.x + 3, h.y - 4.5], [h.x + 4.6, h.y - 1]], g.fillStyle); skP(g, [[h.x + 5.5, h.y - 1], [h.x + 7.2, h.y - 4.2], [h.x + 8.4, h.y - 1]], g.fillStyle);
          g.beginPath(); g.moveTo(h.x, h.y + 2); g.lineTo(h.x + 9, h.y + 2); g.lineTo(h.x + 7.5, h.y + 5); g.lineTo(h.x + 6, h.y + 3.6); g.lineTo(h.x + 4.5, h.y + 5.4); g.lineTo(h.x + 3, h.y + 3.6); g.lineTo(h.x + 1.5, h.y + 5); g.closePath(); g.fill();
        });
        for (let k = 0; k < 2; k++) {   // two bats circling the head
          const a = t * 2.4 + k * Math.PI, bx = h.x + Math.cos(a) * 16, by = h.y - 8 + Math.sin(a) * 6, f = Math.sin(t * 22 + k) * 3;
          skE(g, bx, by, 1.4, 1.2, 0, '#111'); skP(g, [[bx, by], [bx - 5, by - 2 - f], [bx - 3, by + 0.5], [bx, by + 0.5]], '#111'); skP(g, [[bx, by], [bx + 5, by - 2 - f], [bx + 3, by + 0.5], [bx, by + 0.5]], '#111');
        }
      } },
    // ------------------------------------------------------------------ 13
    snowgangster: { col: '#f5f9ff', slots: ['hat', 'acc'],
      front: (g, P, t) => {
        const { hip, neck, head: h, arms } = P;
        const c1 = skAt(hip, neck, 0.35); skC(g, c1.x, c1.y, 8, skRG(g, c1.x, c1.y, 8, ['#ffffff', '#e3eef8', '#a9c1d9']));   // snowball body
        for (const q of [0.2, 0.45]) { const b = skAt(hip, neck, q); skC(g, b.x + 3, b.y, 1.1, '#212121'); }
        skHead(g, h, ['#ffffff', '#e8f0f8', '#b0c4de']);
        g.fillStyle = '#111'; roundRectOn(g, h.x - 0.5, h.y - 3.4, 4.6, 3, 1.2); g.fill(); roundRectOn(g, h.x + 5, h.y - 3.4, 4, 3, 1.2); g.fill(); skL(g, [[h.x + 4, h.y - 2.4], [h.x + 5, h.y - 2.4]], '#111', 0.7);   // shades
        g.fillStyle = 'rgba(255,255,255,0.5)'; g.fillRect(h.x + 0.4, h.y - 3, 1.2, 0.8);
        skP(g, [[h.x + 6, h.y + 0.5], [h.x + 15, h.y + 2], [h.x + 6, h.y + 3]], skLG(g, h.x + 6, 0, h.x + 15, 0, ['#ff7043', '#e64a19']));   // the carrot
        for (let q = 0; q < 4; q++) skC(g, h.x + 1 + q * 1.6, h.y + 4.6 - Math.sin(q * 0.9) * 0.6, 0.6, '#212121');
        g.fillStyle = skLG(g, 0, h.y - 14, 0, h.y - 6, ['#424242', '#111111']); g.beginPath(); g.ellipse(h.x, h.y - 6.5, 11, 2.2, -0.08, 0, Math.PI * 2); g.fill(); roundRectOn(g, h.x - 6, h.y - 14, 12, 8, 3); g.fill();   // fedora
        g.fillStyle = '#c62828'; g.fillRect(h.x - 6, h.y - 9, 12, 2);
        skL(g, [[neck.x - 4, neck.y + 1], [neck.x + 4, neck.y + 1]], '#c62828', 3.2);   // scarf
        const chain = []; for (let q = 0; q <= 10; q++) { const a = Math.PI * q / 10; chain.push([neck.x + Math.cos(a) * 5, neck.y + 2 + Math.sin(a) * 7]); }
        skGlow(g, '#ffd54f', 4, () => { skL(g, chain, '#ffca28', 1.3); skC(g, neck.x, neck.y + 9.5, 2.6, skRG(g, neck.x, neck.y + 9.5, 2.6, ['#fff8e1', '#ffca28', '#e65100'])); });
        g.fillStyle = '#5d4037'; g.font = '900 3.6px system-ui'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('$', neck.x, neck.y + 9.7);
        for (const a of arms) skPaint(g, a, 0, 1, '#6d4c41', 1.6);   // twig arms
      },
      jump: (out, x, y) => { for (let k = 0; k < 8; k++) out.push({ k: 's', x: x + (Math.random() - 0.5) * 20, y: y + 2, vx: (Math.random() - 0.5) * 140, vy: 40 + Math.random() * 90, g: 0.15, life: 0.7, l0: 0.7, r: 2.2, col: '#e3f2fd' }); } },
    // ------------------------------------------------------------------ 14
    dinosuit: { col: '#66bb6a', slots: ['hat', 'acc'],
      back: (g, P, t) => {
        const { hip, neck } = P, sw = Math.sin(t * 6) * 3;   // the tail and the back spikes
        g.fillStyle = skLG(g, hip.x - 20, hip.y, hip.x, hip.y, ['#43a047', '#66bb6a']);
        g.beginPath(); g.moveTo(hip.x - 2, hip.y - 4); g.quadraticCurveTo(hip.x - 12, hip.y - 1 + sw * 0.4, hip.x - 22, hip.y + 4 + sw); g.quadraticCurveTo(hip.x - 12, hip.y + 4, hip.x - 1, hip.y + 2); g.fill();
        for (let q = 0; q < 5; q++) { const f = 0.15 + q * 0.17, b = skAt(hip, neck, f); skP(g, [[b.x - 3.5, b.y + 1.6], [b.x - 7, b.y - 1.4], [b.x - 3, b.y - 2]], '#2e7d32'); }
      },
      front: (g, P, t) => {
        const { hip, neck, head: h, arms, legs } = P;
        skTorso(g, P, skLG(g, neck.x - 6, 0, neck.x + 6, 0, ['#81c784', '#43a047']), 5.4, 5.4);
        const c = skAt(hip, neck, 0.45); skE(g, c.x + 2, c.y, 3, 7, 0, '#e6ee9c'); for (let q = -2; q <= 2; q++) skL(g, [[c.x - 0.5, c.y + q * 2.6], [c.x + 4.5, c.y + q * 2.6]], 'rgba(130,140,40,0.4)', 0.5);
        for (const l of legs) skE(g, l.e.x + 2, l.e.y - 0.5, 3.6, 2.4, 0, '#43a047');
        skHead(g, h, ['#ffe0bd', '#f1c27d', '#c68642']); skC(g, h.x + 4, h.y + 0.5, 0.9, '#111'); skL(g, [[h.x + 3, h.y + 3.4], [h.x + 5.5, h.y + 3]], '#8d4f2f', 0.7);
        // the hood: a dino head with teeth over the face and big eyes on top
        g.fillStyle = skLG(g, 0, h.y - 14, 0, h.y, ['#81c784', '#388e3c']);
        g.beginPath(); g.moveTo(h.x - 9, h.y + 3); g.quadraticCurveTo(h.x - 11, h.y - 12, h.x + 2, h.y - 12); g.quadraticCurveTo(h.x + 14, h.y - 11, h.x + 14, h.y - 4); g.lineTo(h.x + 4, h.y - 3); g.quadraticCurveTo(h.x - 3, h.y - 4, h.x - 5, h.y + 3); g.closePath(); g.fill();
        g.fillStyle = '#fafafa'; for (let q = 0; q < 5; q++) { const x = h.x + 4 + q * 2; skP(g, [[x, h.y - 3.4], [x + 1, h.y - 1], [x + 2, h.y - 3.2]], '#fafafa'); }
        for (const ex of [-1, 5]) { skC(g, h.x + ex, h.y - 11, 2.4, '#fafafa'); skC(g, h.x + ex + 0.6, h.y - 11, 1.2, '#111'); }
        skC(g, h.x + 12.5, h.y - 7, 0.7, '#1b5e20');
      } },
    // ------------------------------------------------------------------ 15
    dj: { col: '#311b92', slots: ['hat', 'acc'],
      front: (g, P, t) => {
        const { hip, neck, head: h, arms } = P;
        const { nx, ny } = skTorso(g, P, skLG(g, neck.x - 6, neck.y, neck.x + 6, hip.y, ['#7c4dff', '#4527a0', '#1a0d5c']), 5.4, 4.6);   // the jacket
        for (const a of arms) skPaint(g, a, 0, 0.7, '#5e35b1', 4.4);
        skGlow(g, '#18ffff', 6, () => { skL(g, [[neck.x + nx * 5, neck.y + ny * 5 + 2], [hip.x + nx * 4.6, hip.y + ny * 4.6]], '#18ffff', 0.8); skL(g, [[neck.x - nx * 5, neck.y - ny * 5 + 2], [hip.x - nx * 4.6, hip.y - ny * 4.6]], '#ff4081', 0.8); });
        const c = skAt(hip, neck, 0.45);   // an equaliser on the chest, bouncing to the beat
        for (let q = 0; q < 5; q++) { const hh = 1.5 + Math.abs(Math.sin(t * 9 + q * 1.3)) * 5; g.fillStyle = `hsl(${120 + q * 50},100%,60%)`; g.fillRect(c.x - 3.5 + q * 1.6, c.y + 3 - hh, 1.1, hh); }
        skHead(g, h, ['#d7a27a', '#a86d3a', '#6d4020']); skC(g, h.x + 4, h.y - 1, 0.9, '#111'); skL(g, [[h.x + 3, h.y + 3.4], [h.x + 6, h.y + 2.6]], '#3e2723', 0.7);
        g.fillStyle = '#212121'; g.beginPath(); g.arc(h.x, h.y - 2, 8.6, Math.PI, 0); g.fill(); g.fillRect(h.x - 13, h.y - 3, 6, 1.6);   // a cap worn backwards
        const pul = 0.6 + 0.4 * Math.abs(Math.sin(t * 9));   // big glowing headphones
        skL(g, [[h.x - 7, h.y - 2], [h.x - 2, h.y - 11], [h.x + 5, h.y - 9]], '#263238', 1.6);
        skGlow(g, '#18ffff', 10 * pul, () => { skE(g, h.x - 6, h.y + 0.5, 3.4, 4.4, 0, '#263238'); skE(g, h.x - 6, h.y + 0.5, 2.2, 3, 0, `rgba(24,255,255,${pul})`); });
      },
      fx: (out, x, y) => { if (Math.random() < 0.08) out.push({ k: 't', txt: Math.random() < 0.5 ? '♪' : '♫', fs: 12, x: x + (Math.random() - 0.5) * 20, y: y + 60, vx: -30, vy: 40, g: 0, life: 0.9, l0: 0.9, col: ['#18ffff', '#ff4081', '#b388ff'][Math.floor(Math.random() * 3)] }); } },
    // ------------------------------------------------------------------ 16
    ghostknight: { col: '#80deea', slots: ['hat', 'acc'], alpha: 0.75,
      back: (g, P, t) => { for (let k = 0; k < 3; k++) { const ph = (t * 1.5 + k / 3) % 1; g.fillStyle = `rgba(128,222,234,${0.25 * (1 - ph)})`; g.beginPath(); g.ellipse(P.hip.x - 8 - ph * 20, P.hip.y - 10 + Math.sin(t * 3 + k) * 4, 5 + ph * 6, 3 + ph * 3, 0, 0, Math.PI * 2); g.fill(); } },
      front: (g, P, t) => {
        const { hip, neck, head: h, arms, sh } = P, pul = 0.7 + 0.3 * Math.sin(t * 3);
        skGlow(g, '#80deea', 10, () => {
          skTorso(g, P, skLG(g, neck.x - 6, neck.y, neck.x + 6, hip.y, [`rgba(224,247,250,${0.85 * pul})`, 'rgba(128,222,234,0.7)', 'rgba(38,166,154,0.6)']), 5.4, 4.6);
          skE(g, sh.x - 1, sh.y + 1, 6, 3.4, -0.3, 'rgba(178,235,242,0.85)');
          skC(g, h.x, h.y, 8.6, skRG(g, h.x, h.y, 8.6, ['rgba(224,247,250,0.95)', 'rgba(128,222,234,0.8)', 'rgba(0,131,143,0.75)']));
        });
        g.fillStyle = '#004d40'; g.fillRect(h.x - 1, h.y - 2.5, 10, 1.6); for (let q = 0; q < 3; q++) g.fillRect(h.x + 3 + q * 2, h.y - 1, 0.8, 4);   // the visor slit
        skGlow(g, '#ffffff', 6, () => { skC(g, h.x + 3, h.y - 1.7, 0.7, '#e0ffff'); skC(g, h.x + 7, h.y - 1.7, 0.6, '#e0ffff'); });
        const pw = Math.sin(t * 5) * 2; g.fillStyle = 'rgba(178,235,242,0.85)'; g.beginPath(); g.moveTo(h.x - 2, h.y - 8); g.quadraticCurveTo(h.x - 10, h.y - 16 + pw, h.x - 16, h.y - 9 + pw); g.quadraticCurveTo(h.x - 8, h.y - 11, h.x - 1, h.y - 6); g.fill();   // a spectral plume
        const hd = arms[0].e; g.save(); g.translate(hd.x, hd.y); g.rotate(-1.2); skGlow(g, '#80deea', 10, () => { g.fillStyle = 'rgba(224,247,250,0.95)'; g.beginPath(); g.moveTo(3, -1.4); g.lineTo(24, 0); g.lineTo(3, 1.4); g.fill(); }); g.fillStyle = '#4dd0e1'; g.fillRect(1, -3, 1.6, 6); g.restore();
      },
      fx: (out, x, y) => { if (Math.random() < 0.3) out.push({ k: 'c', grow: 1, x: x - 6, y: y + 10 + Math.random() * 40, vx: -50, vy: 20, g: 0, life: 0.7, l0: 0.7, r: 2.5, col: 'rgba(178,235,242,0.45)' }); } },
    // ------------------------------------------------------------------ 17
    lavagolem: { col: '#3e2723', slots: ['hat', 'acc'],
      front: (g, P, t) => {
        const { hip, neck, head: h, arms, legs } = P, pul = 0.6 + 0.4 * Math.sin(t * 3);
        skTorso(g, P, skLG(g, neck.x - 7, neck.y, neck.x + 7, hip.y, ['#6d4c41', '#3e2723', '#1b0f0b']), 6.5, 5);
        for (const l of [...legs, ...arms]) { const q = skLimb(l, 0.3); skE(g, q.x, q.y, 3.2, 2.6, 0.3, '#4e342e'); const q2 = skLimb(l, 0.78); skE(g, q2.x, q2.y, 3, 2.4, -0.3, '#3e2723'); }   // rock plates
        skGlow(g, '#ff6d00', 10 * pul, () => {
          g.strokeStyle = `rgba(255,${120 + 80 * pul | 0},20,0.95)`; g.lineWidth = 1.2;
          const a = skAt(hip, neck, 0.9), b = skAt(hip, neck, 0.5), c = skAt(hip, neck, 0.1);
          g.beginPath(); g.moveTo(a.x - 3, a.y); g.lineTo(b.x + 2, b.y); g.lineTo(c.x - 2, c.y); g.moveTo(b.x + 2, b.y); g.lineTo(b.x + 5, b.y + 3); g.stroke();
        });
        skHead(g, h, ['#795548', '#4e342e', '#1b0f0b']);
        skGlow(g, '#ffab00', 10, () => { skP(g, [[h.x + 1, h.y - 3], [h.x + 4.5, h.y - 2], [h.x + 1.5, h.y - 0.8]], '#ffcc80'); skP(g, [[h.x + 5.5, h.y - 2], [h.x + 8.4, h.y - 3], [h.x + 8, h.y - 0.8]], '#ffcc80'); skL(g, [[h.x + 1, h.y + 3], [h.x + 4, h.y + 4], [h.x + 7, h.y + 3]], `rgba(255,${150 + 60 * pul | 0},0,1)`, 1); });
        g.strokeStyle = 'rgba(255,111,0,0.8)'; g.lineWidth = 0.7; g.beginPath(); g.moveTo(h.x - 5, h.y - 6); g.lineTo(h.x - 2, h.y - 2); g.lineTo(h.x - 5, h.y + 3); g.stroke();
      },
      fx: (out, x, y) => { if (Math.random() < 0.5) out.push({ x: x + (Math.random() - 0.5) * 16, y: y + 10 + Math.random() * 50, vx: -40, vy: 60 + Math.random() * 60, g: 0, life: 0.6, l0: 0.6, sz: 2, col: Math.random() < 0.5 ? '#ff6d00' : '#ffab00' }); } },
    // ------------------------------------------------------------------ 18
    iceking: { col: '#b3e5fc', slots: ['hat', 'acc'],
      back: (g, P, t) => skCape(g, P, t, '#e1f5fe', '#4fc3f7', 30, { inner: '#ffffff' }),
      front: (g, P, t) => {
        const { hip, neck, head: h, arms } = P;
        skTorso(g, P, skLG(g, neck.x - 6, neck.y, neck.x + 6, hip.y, ['#ffffff', '#81d4fa', '#0288d1']), 5, 4.4);
        for (const q of [0.4, 0.6, 0.8]) { const c = skAt(hip, neck, q); skP(g, [[c.x - 2, c.y], [c.x, c.y - 2], [c.x + 2, c.y], [c.x, c.y + 2]], '#e1f5fe'); }
        skHead(g, h, ['#e1f5fe', '#b3e5fc', '#4fc3f7']); skC(g, h.x + 3, h.y - 1, 0.9, '#01579b'); skC(g, h.x + 6.6, h.y - 1, 0.8, '#01579b');
        skP(g, [[h.x - 2, h.y + 2], [h.x + 6, h.y + 3], [h.x + 2, h.y + 9], [h.x - 4, h.y + 5]], '#e3f2fd');   // a frosty beard
        skGlow(g, '#b3e5fc', 8, () => skP(g, [[h.x - 8, h.y - 6], [h.x - 7, h.y - 14], [h.x - 4, h.y - 8], [h.x - 1, h.y - 17], [h.x + 2, h.y - 8], [h.x + 5, h.y - 15], [h.x + 6, h.y - 7], [h.x + 9, h.y - 12], [h.x + 8.5, h.y - 5]], skLG(g, 0, h.y - 17, 0, h.y - 5, ['#ffffff', '#80deea', '#0097a7'])));   // ice crown
        const hd = arms[0].e; skL(g, [[hd.x - 1, hd.y + 12], [hd.x + 1, hd.y - 16]], '#b3e5fc', 1.6); skGlow(g, '#e1f5fe', 10, () => skP(g, [[hd.x - 3, hd.y - 16], [hd.x + 1, hd.y - 24], [hd.x + 5, hd.y - 16], [hd.x + 1, hd.y - 13]], '#e1f5fe'));   // the frozen staff
      },
      fx: (out, x, y) => { if (Math.random() < 0.35) out.push({ k: 's', x: x + (Math.random() - 0.5) * 30, y: y + 70, vx: -40, vy: -60, g: 0, life: 0.9, l0: 0.9, r: 2, col: '#e1f5fe' }); } },
    // ------------------------------------------------------------------ 19
    alien: { col: '#9ccc65', slots: ['hat', 'acc'],
      front: (g, P, t) => {
        const { hip, neck, head: h, arms } = P;
        skTorso(g, P, skLG(g, neck.x - 6, 0, neck.x + 6, 0, ['#eceff1', '#90a4ae']), 4.4, 4);
        skL(g, [[neck.x - 4.4, neck.y + 1], [neck.x + 4.4, neck.y + 1]], '#7c4dff', 2);
        skE(g, h.x + 1, h.y - 3, 10, 11, 0, skRG(g, h.x + 1, h.y - 3, 11, ['#ccff90', '#9ccc65', '#558b2f']));   // a big head
        skE(g, h.x + 1.5, h.y - 1, 3, 4.6, -0.5, '#111'); skE(g, h.x + 7.5, h.y - 1, 2.4, 4, 0.5, '#111');   // huge black eyes
        skE(g, h.x + 0.6, h.y - 2.8, 1, 1.4, -0.5, 'rgba(255,255,255,0.8)'); skE(g, h.x + 6.8, h.y - 2.8, 0.8, 1.2, 0.5, 'rgba(255,255,255,0.8)');
        skL(g, [[h.x + 3.5, h.y + 5], [h.x + 6, h.y + 4.6]], '#33691e', 0.7);
        for (const [dx, a] of [[-3, -0.4], [4, 0.3]]) { const ex = h.x + dx + Math.sin(a) * 8, ey = h.y - 13 - Math.cos(a) * 6 + Math.sin(t * 4 + dx) * 0.8; skL(g, [[h.x + dx, h.y - 12], [ex, ey]], '#689f38', 0.9); skGlow(g, '#ff4081', 8, () => skC(g, ex, ey, 1.4, '#ff80ab')); }
        const hd = arms[0].e; g.save(); g.translate(hd.x, hd.y); g.rotate(-0.25);   // a little ray gun
        g.fillStyle = skLG(g, 0, -2, 0, 2, ['#e1bee7', '#7b1fa2']); roundRectOn(g, -1, -2.2, 9, 3.6, 1.4); g.fill(); g.fillRect(0, 0, 2, 3.6);
        skGlow(g, '#69f0ae', 8, () => skC(g, 8.8, -0.4, 1.3, '#b9f6ca')); g.restore();
      },
      jump: (out, x, y) => { for (let k = 0; k < 3; k++) out.push({ k: 'o', grow: 1, x, y: y + 4 + k * 6, vx: 0, vy: 0, g: 0, life: 0.4 + k * 0.1, l0: 0.4 + k * 0.1, r: 6 + k * 3, col: 'rgba(105,240,174,0.85)' }); } },
    // ------------------------------------------------------------------ 20
    pharaoh: { col: '#c68642', slots: ['hat', 'acc', 'shorts'],
      front: (g, P, t) => {
        const { hip, neck, head: h, arms, legs } = P;
        g.fillStyle = skLG(g, hip.x - 6, hip.y - 3, hip.x + 6, hip.y + 8, ['#ffffff', '#e0e0e0']); g.beginPath(); g.moveTo(hip.x - 6, hip.y - 3); g.lineTo(hip.x + 6, hip.y - 3); g.lineTo(hip.x + 8, hip.y + 8); g.lineTo(hip.x - 6, hip.y + 8); g.closePath(); g.fill();   // a white kilt
        g.fillStyle = '#ffca28'; g.fillRect(hip.x - 6, hip.y - 3.5, 12, 1.8);
        skTorso(g, P, skLG(g, neck.x - 6, 0, neck.x + 6, 0, ['#e0a070', '#c68642', '#8d5524']), 4.4, 3.8);
        for (let q = 0; q < 4; q++) { const r = 5 + q * 1.8; g.strokeStyle = q % 2 ? '#1565c0' : '#ffca28'; g.lineWidth = 1.6; g.beginPath(); g.arc(neck.x, neck.y - 1, r, 0.15 * Math.PI, 0.85 * Math.PI); g.stroke(); }   // the broad collar
        for (const a of arms) skPaint(g, a, 0.4, 0.5, '#ffca28', 4.6);
        skHead(g, h, ['#e0a070', '#c68642', '#8d5524']);
        g.fillStyle = skLG(g, h.x - 10, 0, h.x + 9, 0, ['#ffd54f', '#ffb300']);   // the striped headdress
        g.beginPath(); g.moveTo(h.x - 3, h.y - 9); g.quadraticCurveTo(h.x + 9, h.y - 9, h.x + 7, h.y - 3); g.lineTo(h.x - 1, h.y - 3); g.lineTo(h.x - 6, h.y + 10); g.lineTo(h.x - 11, h.y + 9); g.quadraticCurveTo(h.x - 12, h.y - 7, h.x - 3, h.y - 9); g.fill();
        g.strokeStyle = '#1565c0'; g.lineWidth = 1; g.save(); g.clip(); for (let q = -14; q < 10; q += 3) { g.beginPath(); g.moveTo(h.x + q, h.y - 10); g.lineTo(h.x + q - 6, h.y + 10); g.stroke(); } g.restore();
        skGlow(g, '#ffd54f', 6, () => skC(g, h.x + 4.5, h.y - 7.5, 1.4, '#e53935'));
        skL(g, [[h.x + 1.5, h.y - 1.3], [h.x + 6.5, h.y - 1.3], [h.x + 8, h.y - 0.4]], '#111', 0.8); skC(g, h.x + 4, h.y - 1, 0.8, '#111');   // kohl-lined eye
        g.fillStyle = '#1565c0'; g.fillRect(h.x + 3.5, h.y + 5, 1.6, 4);   // a ceremonial beard
        const hd = arms[0].e; skL(g, [[hd.x, hd.y + 8], [hd.x + 1, hd.y - 8]], '#ffca28', 1.4); g.strokeStyle = '#1565c0'; g.lineWidth = 1.4; g.beginPath(); g.arc(hd.x + 3.5, hd.y - 8, 2.6, Math.PI, 0); g.stroke();   // the crook
      } },
    // ------------------------------------------------------------------ 21
    hacker: { col: '#212121', slots: ['hat', 'acc'],
      front: (g, P, t) => {
        const { hip, neck, head: h, arms } = P;
        skTorso(g, P, skLG(g, neck.x - 6, neck.y, neck.x + 6, hip.y, ['#37474f', '#212121']), 5.4, 5);
        const k2 = skAt(hip, neck, 0.25); g.fillStyle = '#263238'; g.fillRect(k2.x - 3, k2.y - 2, 6, 3.6);   // the hoodie pocket
        skL(g, [[neck.x + 1, neck.y + 1], [neck.x + 1.5, neck.y + 7]], '#90a4ae', 0.6); skL(g, [[neck.x + 3, neck.y + 1], [neck.x + 3.4, neck.y + 6]], '#90a4ae', 0.6);
        skHead(g, h, ['#ffe0bd', '#f1c27d', '#c68642']);
        g.fillStyle = skLG(g, 0, h.y - 11, 0, h.y + 6, ['#455a64', '#212121']); g.beginPath(); g.arc(h.x - 0.5, h.y - 0.5, 10, Math.PI * 0.55, Math.PI * 1.95); g.quadraticCurveTo(h.x + 4, h.y - 8, h.x + 1, h.y - 4); g.quadraticCurveTo(h.x - 3, h.y + 2, h.x - 4, h.y + 9); g.closePath(); g.fill();   // the hood
        g.fillStyle = '#0b1a0b'; roundRectOn(g, h.x + 0.5, h.y - 3.6, 9, 3.6, 1.4); g.fill();   // a visor scrolling green code
        g.save(); g.beginPath(); g.rect(h.x + 0.5, h.y - 3.6, 9, 3.6); g.clip(); g.fillStyle = '#00e676'; g.font = '700 2.4px monospace'; for (let q = 0; q < 6; q++) g.fillText(((t * 3 + q) | 0) % 2 ? '1' : '0', h.x + 1 + q * 1.5, h.y - 1.4 + Math.sin(t * 6 + q) * 0.8); g.restore();
        skGlow(g, '#00e676', 6, () => { g.strokeStyle = 'rgba(0,230,118,0.9)'; g.lineWidth = 0.5; roundRectOn(g, h.x + 0.5, h.y - 3.6, 9, 3.6, 1.4); g.stroke(); });
      },
      fx: (out, x, y) => { if (Math.random() < 0.25) out.push({ k: 't', txt: Math.random() < 0.5 ? '0' : '1', fs: 9, x: x + (Math.random() - 0.5) * 30, y: y + 20 + Math.random() * 50, vx: -40, vy: 20, g: 0, life: 0.6, l0: 0.6, col: '#00e676' }); } },
    // ------------------------------------------------------------------ 22
    angel: { col: '#fafafa', slots: ['hat', 'acc'],
      back: (g, P, t) => {   // big feathered wings, flapping slowly
        const { sh } = P, fl = Math.sin(t * 4) * 5;
        for (const k of [1, 0]) {
          g.fillStyle = skLG(g, sh.x, sh.y - 30, sh.x, sh.y + 10, [k ? '#eceff1' : '#ffffff', k ? '#cfd8dc' : '#e3f2fd']);
          g.beginPath(); g.moveTo(sh.x, sh.y + 2); g.quadraticCurveTo(sh.x - 16, sh.y - 26 - fl - k * 4, sh.x - 34 - k * 2, sh.y - 16 - fl);
          for (let q = 0; q < 5; q++) { const fx = sh.x - 34 + q * 7, fy = sh.y - 10 - fl + q * 4; g.quadraticCurveTo(fx - 2, fy + 5, fx + 2, fy + 2); }
          g.lineTo(sh.x - 1, sh.y + 10); g.closePath(); g.fill(); g.strokeStyle = 'rgba(144,164,190,0.6)'; g.lineWidth = 0.5; g.stroke();
        }
      },
      front: (g, P, t) => {
        const { hip, neck, head: h } = P;
        skTorso(g, P, skLG(g, neck.x - 6, 0, neck.x + 6, 0, ['#ffffff', '#e3f2fd', '#bbdefb']), 4.6, 6);   // a robe
        skL(g, [[neck.x - 2, neck.y + 2], [hip.x - 3, hip.y + 4]], 'rgba(144,164,190,0.6)', 0.7); const b = skAt(hip, neck, 0.4); skL(g, [[b.x - 5, b.y], [b.x + 5, b.y]], '#ffd54f', 1.4);
        skHead(g, h, ['#fff3e0', '#ffe0bd', '#e0ac69']); skC(g, h.x + 4, h.y - 1, 0.9, '#5d4037'); skL(g, [[h.x + 3, h.y + 3], [h.x + 5, h.y + 3.6], [h.x + 6.5, h.y + 2.8]], '#a1887f', 0.6);
        skP(g, [[h.x - 8, h.y], [h.x - 7, h.y - 8], [h.x, h.y - 10], [h.x + 7, h.y - 7], [h.x + 2, h.y - 6], [h.x - 4, h.y - 3]], '#ffe082');   // golden curls
        const pul = 0.75 + 0.25 * Math.sin(t * 3);
        skGlow(g, '#fff59d', 12 * pul, () => { g.strokeStyle = `rgba(255,236,120,${pul})`; g.lineWidth = 2; g.beginPath(); g.ellipse(h.x, h.y - 13 + Math.sin(t * 2) * 0.8, 7, 2, 0, 0, Math.PI * 2); g.stroke(); });
      },
      fx: (out, x, y) => { if (Math.random() < 0.15) out.push({ k: 'l', x: x - 12, y: y + 40 + Math.random() * 20, vx: -30, vy: 10, g: 0.05, life: 1, l0: 1, col: '#ffffff' }); } },
    // ------------------------------------------------------------------ 23
    demon: { col: '#c62828', slots: ['hat', 'acc'],
      back: (g, P, t) => {
        const { sh, hip } = P, fl = Math.sin(t * 7) * 4;   // bat wings and a spade-tipped tail
        for (const k of [1, 0]) { g.fillStyle = k ? '#4a0000' : '#7f0000'; g.beginPath(); g.moveTo(sh.x, sh.y + 2); g.lineTo(sh.x - 12, sh.y - 18 - fl - k * 3); g.lineTo(sh.x - 26 - k * 2, sh.y - 8 - fl); for (let q = 0; q < 3; q++) g.quadraticCurveTo(sh.x - 22 + q * 7, sh.y - 2 - fl * 0.5, sh.x - 18 + q * 7, sh.y + 4 - q); g.closePath(); g.fill(); }
        const sw = Math.sin(t * 5) * 3; skL(g, [[hip.x - 2, hip.y], [hip.x - 10, hip.y + 4], [hip.x - 16, hip.y - 2 + sw]], '#b71c1c', 1.4); skP(g, [[hip.x - 16, hip.y - 6 + sw], [hip.x - 20, hip.y - 1 + sw], [hip.x - 16, hip.y + 1 + sw], [hip.x - 12, hip.y - 1 + sw]], '#b71c1c');
      },
      front: (g, P, t) => {
        const { hip, neck, head: h, legs } = P;
        skTorso(g, P, skLG(g, neck.x - 6, neck.y, neck.x + 6, hip.y, ['#e53935', '#b71c1c', '#7f0000']), 4.6, 4);
        for (const l of legs) skPaint(g, l, 0.75, 1, '#212121', 4.6);
        skHead(g, h, ['#ef5350', '#c62828', '#7f0000']);
        for (const [dx, s2] of [[-4, -1], [3, 1]]) skP(g, [[h.x + dx - 2, h.y - 6], [h.x + dx + s2 * 3, h.y - 15], [h.x + dx + 2, h.y - 6.5]], skLG(g, 0, h.y - 15, 0, h.y - 6, ['#fafafa', '#9e9e9e']));   // horns
        skGlow(g, '#ffea00', 8, () => { skP(g, [[h.x + 1, h.y - 2.6], [h.x + 4.5, h.y - 1.4], [h.x + 1.5, h.y - 0.6]], '#ffea00'); skP(g, [[h.x + 5.6, h.y - 1.4], [h.x + 8.6, h.y - 2.6], [h.x + 8.2, h.y - 0.6]], '#ffea00'); });
        skL(g, [[h.x + 1.5, h.y + 3], [h.x + 4.5, h.y + 4.6], [h.x + 8, h.y + 3]], '#3e0000', 0.8); skP(g, [[h.x + 3, h.y + 3.8], [h.x + 3.6, h.y + 5.6], [h.x + 4.2, h.y + 4.1]], '#fafafa');
      },
      fx: (out, x, y) => { if (Math.random() < 0.6) out.push({ k: 'c', fire: 1, x: x + (Math.random() - 0.5) * 12, y: y + 2, vx: -50, vy: 60 + Math.random() * 40, g: 0, life: 0.35, l0: 0.35, r: 3 + Math.random() * 2, col: '#ffd23f' }); } },
    // ------------------------------------------------------------------ 24
    racer: { col: '#e53935', slots: ['hat', 'acc'],
      front: (g, P, t) => {
        const { hip, neck, head: h, arms, legs } = P;
        for (const l of legs) skPaint(g, l, 0, 1, 'rgba(255,255,255,0.85)', 1.1);
        const { nx, ny } = skTorso(g, P, skLG(g, neck.x - 6, neck.y, neck.x + 6, hip.y, ['#ff5252', '#e53935', '#b71c1c']), 5, 4.2);
        skL(g, [[neck.x + nx * 1.5, neck.y + ny * 1.5], [hip.x + nx * 1.5, hip.y + ny * 1.5]], '#fafafa', 1.4);
        const p1 = skAt(hip, neck, 0.7), p2 = skAt(hip, neck, 0.42); g.fillStyle = '#fdd835'; g.fillRect(p1.x - 4, p1.y - 1.5, 3.4, 2.4); g.fillStyle = '#1e88e5'; g.fillRect(p2.x + 0.5, p2.y - 1.5, 3.6, 2.4); g.fillStyle = '#212121'; g.fillRect(p2.x - 4, p2.y - 1.2, 2.6, 1.8);   // sponsor patches
        for (const a of arms) skPaint(g, a, 0.85, 1, '#212121', 4.2);
        skHead(g, h, ['#ff8a80', '#e53935', '#8e0000']);   // the helmet
        g.fillStyle = '#fafafa'; g.beginPath(); g.arc(h.x, h.y, 8.3, Math.PI * 1.2, Math.PI * 1.45); g.lineTo(h.x, h.y); g.closePath(); g.fill();
        g.fillStyle = skLG(g, h.x, h.y - 4, h.x + 9, h.y + 2, ['#263238', '#0d47a1']); g.beginPath(); g.moveTo(h.x - 0.5, h.y - 3.6); g.lineTo(h.x + 8.4, h.y - 3.6); g.quadraticCurveTo(h.x + 9.4, h.y, h.x + 7.5, h.y + 2.6); g.lineTo(h.x - 0.5, h.y + 2.6); g.closePath(); g.fill();
        g.fillStyle = 'rgba(255,255,255,0.55)'; g.fillRect(h.x + 1, h.y - 3, 4, 0.9);
      },
      fx: (out, x, y) => { if (Math.random() < 0.6) out.push({ k: 'k', x: x - 14, y: y + 10 + Math.random() * 50, vx: -360, vy: 0, g: 0, life: 0.18, l0: 0.18, col: 'rgba(255,255,255,0.8)' }); } },
    // ------------------------------------------------------------------ 25
    rockstar: { col: '#212121', slots: ['hat', 'acc'],
      back: (g, P, t) => {   // an electric guitar slung on the back
        const { neck } = P; g.save(); g.translate(neck.x - 9, neck.y + 13); g.rotate(-0.6);
        g.fillStyle = '#212121'; g.fillRect(-1.1, -24, 2.2, 18); g.fillStyle = '#fafafa'; for (let q = 0; q < 5; q++) g.fillRect(-1.1, -22 + q * 3.4, 2.2, 0.4);
        g.fillStyle = skLG(g, -7, 0, 7, 0, ['#ff1744', '#880e4f']); g.beginPath(); g.moveTo(0, -7); g.quadraticCurveTo(8, -9, 6, 0); g.quadraticCurveTo(9, 6, 0, 8); g.quadraticCurveTo(-9, 6, -6, 0); g.quadraticCurveTo(-8, -9, 0, -7); g.fill();
        g.fillStyle = '#fafafa'; g.fillRect(-3, -1, 6, 1.2); g.fillRect(-3, 2.4, 6, 1.2); g.restore();
      },
      front: (g, P, t) => {
        const { hip, neck, head: h, arms } = P;
        skTorso(g, P, skLG(g, neck.x - 6, neck.y, neck.x + 6, hip.y, ['#424242', '#212121', '#0a0a0a']), 5.2, 4.4);   // a leather jacket
        skP(g, [[neck.x - 1, neck.y], [neck.x + 3.5, neck.y + 3], [neck.x + 0.5, neck.y + 8]], '#fafafa');
        for (let q = 0.3; q < 0.9; q += 0.2) { const c = skAt(hip, neck, q); skC(g, c.x - 2, c.y, 0.6, '#cfd8dc'); }
        skHead(g, h, ['#ffe0bd', '#f1c27d', '#c68642']);
        skGlow(g, '#e040fb', 6, () => skP(g, [[h.x - 8, h.y + 2], [h.x - 13, h.y - 6], [h.x - 7, h.y - 7], [h.x - 8, h.y - 15], [h.x - 2, h.y - 9], [h.x + 1, h.y - 17], [h.x + 3, h.y - 9], [h.x + 9, h.y - 13], [h.x + 7, h.y - 6], [h.x + 2, h.y - 6], [h.x - 4, h.y - 3]], skLG(g, 0, h.y - 17, 0, h.y, ['#ea80fc', '#aa00ff', '#4a148c'])));   // spiky purple hair
        for (const [ex, r2] of [[h.x + 2.5, 2.4], [h.x + 7, 2]]) { g.fillStyle = '#111'; starPath(g, ex, h.y - 1, r2 + 0.6); g.fill(); g.fillStyle = 'rgba(255,64,129,0.8)'; starPath(g, ex, h.y - 1, r2); g.fill(); }   // star-shaped shades
        skL(g, [[h.x + 3, h.y + 3.4], [h.x + 7, h.y + 2.4]], '#3e2723', 0.8);
        const hd = arms[1] ? arms[1].e : arms[0].e; skP(g, [[hd.x - 2, hd.y - 4], [hd.x, hd.y - 1], [hd.x + 2, hd.y - 4], [hd.x, hd.y]], '#fafafa');   // the "horns" hand
      },
      jump: (out, x, y) => { for (let k = 0; k < 14; k++) { const a = Math.PI * (0.15 + 0.7 * k / 13); out.push({ k: 'k', x, y: y + 4, vx: Math.cos(a) * 220, vy: Math.sin(a) * 260, g: 0.6, life: 0.5, l0: 0.5, col: k % 2 ? '#ffeb3b' : '#ff6d00' }); } } }
  };
  // how a premium character is described on its card (RU / EN)
  const SKIN_INFO = {
    starknight: ['Звёздный рыцарь', 'Плащ-накидка до пят, туника с поясом и меч-луч, который гудит и светится. В прыжке — вспышка из голубых лучей.', 'Star knight', 'A long cloak, a belted tunic and a humming glowing beam sword. A burst of blue rays when you jump.'],
    spider: ['Паук-герой', 'Чёрный костюм со светящимися бирюзовыми швами, узор паутины на маске, сияющие линзы и паучок на груди. В прыжке выстреливает паутиной.', 'Spider hero', 'A black suit with glowing teal seams, a web pattern on the mask, shining lenses and a spider on the chest. Shoots a web when you jump.'],
    darkhero: ['Тёмный мститель', 'Зубчатый плащ, глубокий капюшон, маска со светящимися глазами, багровый шарф, золотой полумесяц на груди и пояс с гаджетами. За тобой тянется тёмная дымка.', 'Dark avenger', 'A scalloped cape, a deep hood, a mask with glowing eyes, a crimson scarf, a golden crescent on the chest and a utility belt. A dark haze trails behind.'],
    plumber: ['Пиксельный водопроводчик', 'Оранжевая кепка с гаечным ключом, пышные усы, рабочий комбинезон и белые перчатки. В прыжке из-под тебя выскакивает монетка.', 'Pixel plumber', 'An orange cap with a wrench badge, a big moustache, work overalls and white gloves. A coin pops out when you jump.'],
    superwarrior: ['Супер-воин', 'Серебряные волосы торчком, багровое кимоно, вокруг — фиолетовая аура, при беге летят искры. В прыжке — энергетическая волна.', 'Super warrior', 'Spiky silver hair, a crimson gi, a violet aura around you and sparks while you run. An energy wave when you jump.'],
    ghosthunter: ['Охотник за привидениями', 'Комбинезон с нашивкой, ранец с манометрами и мигающей лампой, шланг к излучателю — он то и дело стреляет волнистым лучом.', 'Ghost hunter', 'A jumpsuit with a patch, a backpack with gauges and a blinking light, a hose to the wand — it fires a wavy beam now and then.'],
    cybersamurai: ['Неоновый самурай', 'Тёмная броня с неоновыми линиями, светящийся визор, гребень и неоновая катана за спиной. За тобой летят неоновые росчерки.', 'Neon samurai', 'Dark armour with neon lines, a glowing visor, a crest and a neon katana on the back. Neon streaks fly behind you.'],
    zombiepirate: ['Пират-зомби', 'Зелёная кожа со швами, рваный красный камзол, треуголка с черепом, повязка, горящий глаз и абордажная сабля. Оставляет зелёный дымок.', 'Zombie pirate', 'Stitched green skin, a torn red coat, a skull tricorn, an eyepatch, a glowing eye and a cutlass. Leaves a green mist.'],
    wizardkid: ['Юный волшебник', 'Круглые очки, светящаяся звёздочка на лбу, лохматые волосы, бирюзово-серебряный шарф и мантия. Палочка сыплет искрами, в прыжке — звездопад.', 'Young wizard', 'Round glasses, a glowing star mark, messy hair, a teal-and-silver scarf and a robe. The wand sheds sparkles; a shower of stars when you jump.'],
    luchador: ['Лучадор', 'Яркая маска с огнём вокруг глаз, золотой пояс чемпиона, плащ и белые сапоги. В прыжке — фейерверк звёзд.', 'Luchador', 'A bright mask with flames around the eyes, a gold champion belt, a cape and white boots. Stars burst when you jump.'],
    catstronaut: ['Котонавт', 'Рыжий кот в стеклянном шлеме-аквариуме, скафандр с пультом на груди и ранец с антенной. В прыжке — россыпь звёзд.', 'Catstronaut', 'A ginger cat in a fishbowl helmet, a spacesuit with a chest panel and a backpack with an antenna. Stars scatter when you jump.'],
    pumpkin: ['Тыквоголовый', 'Голова-тыква с мерцающим вырезанным лицом, фиолетовый плащ с рваным краем и две летучие мыши, кружащие вокруг.', 'Pumpkin head', 'A pumpkin head with a flickering carved face, a tattered purple cape and two bats circling around.'],
    snowgangster: ['Снеговик-гангстер', 'Шляпа с красной лентой, тёмные очки, морковка, красный шарф и золотая цепь. В прыжке — снежинки.', 'Snowman gangster', 'A fedora with a red band, dark shades, a carrot nose, a red scarf and a gold chain. Snowflakes when you jump.'],
    dinosuit: ['Дино-кигуруми', 'Пижама-кигуруми: капюшон-голова с зубками и глазами, гребень на спине и хвост, который виляет.', 'Dino onesie', 'A dinosaur onesie: a hood with teeth and eyes, spikes down the back and a wagging tail.'],
    dj: ['Диджей', 'Светящиеся наушники, неоновая куртка, кепка козырьком назад и эквалайзер на груди, который прыгает в такт. Вокруг летят ноты.', 'DJ', 'Glowing headphones, a neon jacket, a backwards cap and an equaliser on the chest that bounces to the beat. Notes float around.'],
    ghostknight: ['Призрачный рыцарь', 'Полупрозрачные светящиеся доспехи, шлем со щелью, призрачный плюмаж и меч из света. Тает дымкой на бегу.', 'Ghost knight', 'See-through glowing armour, a slit helmet, a spectral plume and a sword of light. Melts into mist as you run.'],
    lavagolem: ['Лавовый голем', 'Каменное тело с раскалёнными трещинами, которые пульсируют, огненные глаза и искры при беге.', 'Lava golem', 'A stone body with glowing cracks that pulse, fiery eyes and embers while you run.'],
    iceking: ['Ледяной король', 'Корона изо льда, морозная мантия, ледяная борода и посох с кристаллом. За ним кружатся снежинки.', 'Ice king', 'A crown of ice, a frosty mantle, an icy beard and a staff with a crystal. Snowflakes swirl behind.'],
    alien: ['Пришелец', 'Огромная голова, чёрные глаза, антенны со светящимися шариками и бластер. В прыжке — зелёные кольца.', 'Alien', 'A huge head, black eyes, antennae with glowing tips and a ray gun. Green rings when you jump.'],
    pharaoh: ['Фараон', 'Полосатый золотой головной убор с камнем, широкое ожерелье, белая юбка-схенти и посох-крюк.', 'Pharaoh', 'A striped golden headdress with a jewel, a broad collar, a white kilt and a crook.'],
    hacker: ['Хакер', 'Тёмная толстовка с капюшоном и визор, по которому бегут зелёные цифры. Вокруг вылетают нули и единицы.', 'Hacker', 'A dark hoodie and a visor with green code running across. Zeros and ones fly off around you.'],
    angel: ['Ангел', 'Большие перьевые крылья, белая мантия, золотые кудри и сияющий нимб. За тобой летят перья.', 'Angel', 'Big feathered wings, a white robe, golden curls and a shining halo. Feathers drift behind you.'],
    demon: ['Демон', 'Рога, перепончатые крылья, хвост с наконечником и горящие глаза. Под ногами — языки пламени.', 'Demon', 'Horns, bat wings, a spade-tipped tail and burning eyes. Flames flicker at your feet.'],
    racer: ['Гонщик', 'Гоночный комбинезон с полосой и нашивками, шлем с тонированным визором. На бегу — линии скорости.', 'Racer', 'A racing suit with a stripe and patches, a helmet with a tinted visor. Speed lines as you run.'],
    rockstar: ['Рок-звезда', 'Кожаная куртка, фиолетовый ирокез, очки-звёзды и электрогитара за спиной. В прыжке — пиротехника.', 'Rock star', 'A leather jacket, a purple mohawk, star shades and an electric guitar on the back. Pyro sparks when you jump.'],
    robot: ['Робот', 'Металлическое тело, экран-визор с мигающими глазами и антенна с огоньком.', 'Robot', 'A metal body, a screen visor with blinking eyes and an antenna with a light.'],
    vampire: ['Вампир', 'Чёрный плащ с красной подкладкой, бледное лицо, красные глаза и клыки.', 'Vampire', 'A black cape with a red lining, a pale face, red eyes and fangs.'],
    clown: ['Клоун', 'Разноцветный парик, красный нос и огромные красные ботинки.', 'Clown', 'A rainbow wig, a red nose and huge red shoes.']
  };

  // 1.0.52: outfits of the background people (drawn with the real stickman, so they walk properly; not sold)
  Object.assign(SKINS2, {
    cr_gnome: { front: (g, P, t) => {
      const { hip, neck, head: h, arms } = P;
      skTorso(g, P, skLG(g, neck.x - 6, 0, neck.x + 6, 0, [shade(crVar.top || '#2e7d32', 1.2), crVar.top || '#2e7d32']), 5.5, 6);
      const b = skAt(hip, neck, 0.25); skL(g, [[b.x - 6, b.y], [b.x + 6, b.y]], '#3e2723', 2.4); g.fillStyle = '#ffca28'; g.fillRect(b.x - 1.2, b.y - 1.4, 2.4, 2.8);
      skHead(g, h, ['#ffe0bd', '#f1c27d', '#c68642']); skC(g, h.x + 6.4, h.y + 0.6, 2, '#ef9a9a'); skC(g, h.x + 3.4, h.y - 1.6, 0.9, '#111');
      g.fillStyle = skLG(g, 0, h.y, 0, h.y + 14, ['#ffffff', '#cfd8dc']); g.beginPath(); g.moveTo(h.x - 3, h.y + 1); g.quadraticCurveTo(h.x + 5, h.y + 4, h.x + 8, h.y + 1.5); g.quadraticCurveTo(h.x + 6, h.y + 14, h.x + 1, h.y + 15); g.quadraticCurveTo(h.x - 3, h.y + 8, h.x - 3, h.y + 1); g.fill();
      const hc = crVar.hat || '#e53935'; g.fillStyle = skLG(g, h.x - 8, 0, h.x + 8, 0, [shade(hc, 1.25), shade(hc, 0.7)]);
      g.beginPath(); g.moveTo(h.x - 9, h.y - 2); g.quadraticCurveTo(h.x - 4, h.y - 12, h.x - 8 + Math.sin(t * 5), h.y - 22); g.quadraticCurveTo(h.x + 2, h.y - 12, h.x + 9, h.y - 2); g.closePath(); g.fill();
      const hd = arms[0].e; g.save(); g.translate(hd.x, hd.y); g.rotate(-1.4 + Math.sin(t * 6) * 0.4);
      g.strokeStyle = '#8d6e63'; g.lineWidth = 1.4; g.beginPath(); g.moveTo(0, 3); g.lineTo(0, -11); g.stroke(); g.strokeStyle = skLG(g, -6, 0, 6, 0, ['#eceff1', '#78909c']); g.lineWidth = 2; g.beginPath(); g.moveTo(-6, -10); g.quadraticCurveTo(0, -14, 6, -10); g.stroke(); g.restore();
    } },
    cr_thief: { front: (g, P, t) => {
      const { hip, neck, head: h, sh } = P;
      g.fillStyle = skLG(g, sh.x - 16, sh.y, sh.x - 4, sh.y + 16, ['#bcaaa4', '#6d4c41']); g.beginPath(); g.ellipse(sh.x - 9, sh.y + 6, 7, 8, -0.4, 0, Math.PI * 2); g.fill();
      g.fillStyle = '#fafafa'; g.font = '900 7px system-ui'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('$', sh.x - 9, sh.y + 7);
      skTorso(g, P, skLG(g, neck.x - 6, 0, neck.x + 6, 0, ['#455a64', '#212121']), 5, 4.4);
      for (let q = 0.2; q < 1; q += 0.25) { const a = skAt(hip, neck, q); skL(g, [[a.x - 4.5, a.y], [a.x + 4.5, a.y]], '#fafafa', 1.2); }   // a striped jumper
      skHead(g, h, ['#ffe0bd', '#f1c27d', '#c68642']);
      g.fillStyle = '#212121'; roundRectOn(g, h.x - 2, h.y - 3.4, 11, 3.4, 1.4); g.fill(); skC(g, h.x + 2.5, h.y - 1.7, 0.9, '#fafafa'); skC(g, h.x + 6.6, h.y - 1.7, 0.8, '#fafafa');
      g.fillStyle = '#37474f'; g.beginPath(); g.arc(h.x, h.y - 2, 8.6, Math.PI, 0); g.fill(); g.fillRect(h.x - 9, h.y - 3, 18, 1.6);
    } },
    cr_police: { front: (g, P, t) => {
      const { hip, neck, head: h, arms } = P;
      skTorso(g, P, skLG(g, neck.x - 6, 0, neck.x + 6, 0, ['#1e88e5', '#0d47a1']), 5, 4.4);
      const c = skAt(hip, neck, 0.7); skGlow(g, '#ffd54f', 3, () => { g.fillStyle = '#ffd54f'; starPath(g, c.x + 2, c.y, 1.8); g.fill(); });
      const b = skAt(hip, neck, 0.18); skL(g, [[b.x - 5, b.y], [b.x + 5, b.y]], '#212121', 2.2);
      skHead(g, h, ['#ffe0bd', '#f1c27d', '#c68642']); skC(g, h.x + 4, h.y - 1, 0.9, '#111'); skL(g, [[h.x + 2.6, h.y + 3], [h.x + 6, h.y + 2.6]], '#5d4037', 1.2);
      g.fillStyle = skLG(g, 0, h.y - 12, 0, h.y - 3, ['#1565c0', '#0d47a1']); g.beginPath(); g.moveTo(h.x - 8, h.y - 4); g.lineTo(h.x - 9, h.y - 11); g.lineTo(h.x + 8, h.y - 11); g.lineTo(h.x + 8, h.y - 4); g.closePath(); g.fill();
      g.fillStyle = '#212121'; g.beginPath(); g.moveTo(h.x - 2, h.y - 4.2); g.lineTo(h.x + 13, h.y - 4.2); g.quadraticCurveTo(h.x + 11, h.y - 2.2, h.x + 4, h.y - 2.6); g.fill(); skC(g, h.x + 1, h.y - 8, 1.4, '#ffd54f');
      const hd = arms[0].e; skL(g, [[hd.x, hd.y], [hd.x + 3, hd.y - 6]], '#212121', 1.6);
    } },
    cr_cowboy: { front: (g, P, t) => {
      const { hip, neck, head: h } = P;
      skTorso(g, P, skLG(g, neck.x - 6, 0, neck.x + 6, 0, ['#e57373', '#c62828']), 5, 4.2);
      skP(g, [[neck.x - 5, neck.y + 1], [neck.x + 5, neck.y + 1], [hip.x + 4, hip.y - 4], [hip.x - 4, hip.y - 4]], 'rgba(121,85,72,0.85)');   // a leather vest
      skHead(g, h, ['#ffe0bd', '#f1c27d', '#c68642']); skC(g, h.x + 4, h.y - 1, 0.9, '#111'); skP(g, [[h.x + 2, h.y + 2.6], [h.x + 7, h.y + 2.2], [h.x + 6, h.y + 3.6]], '#6d4c41');
      skP(g, [[neck.x - 2, neck.y - 1], [neck.x + 4, neck.y - 1], [neck.x + 1, neck.y + 4]], '#ffca28');   // a bandana
      g.fillStyle = skLG(g, 0, h.y - 16, 0, h.y - 4, ['#a1764b', '#5d4037']); g.beginPath(); g.moveTo(h.x - 15, h.y - 7); g.quadraticCurveTo(h.x, h.y - 2, h.x + 15, h.y - 7); g.quadraticCurveTo(h.x, h.y - 5, h.x - 15, h.y - 7); g.fill();
      roundRectOn(g, h.x - 6.5, h.y - 15, 13, 9, 3); g.fill(); g.fillStyle = '#3e2723'; g.fillRect(h.x - 6.5, h.y - 8.6, 13, 1.6);
    } },
    cr_witch: { back: (g, P, t) => skCape(g, P, t, '#4a148c', '#1a0033', 22), front: (g, P, t) => {
      const { hip, neck, head: h } = P;
      skTorso(g, P, skLG(g, neck.x - 6, 0, neck.x + 6, 0, ['#6a1b9a', '#311b45']), 5, 7);
      skHead(g, h, ['#c5e1a5', '#9ccc65', '#558b2f']); skC(g, h.x + 4, h.y - 1, 1, '#ff5722'); skP(g, [[h.x + 6, h.y - 0.5], [h.x + 11, h.y + 2], [h.x + 6.5, h.y + 2]], '#8bc34a');
      skP(g, [[h.x - 8, h.y - 2], [h.x - 11, h.y + 8], [h.x - 6, h.y + 6], [h.x - 4, h.y + 9], [h.x - 3, h.y + 1]], '#212121');   // hair
      g.fillStyle = '#212121'; g.beginPath(); g.ellipse(h.x, h.y - 6, 13, 2.4, -0.1, 0, Math.PI * 2); g.fill();
      g.beginPath(); g.moveTo(h.x - 7, h.y - 6.5); g.quadraticCurveTo(h.x - 2, h.y - 16, h.x - 9 + Math.sin(t * 4) * 1.5, h.y - 24); g.quadraticCurveTo(h.x + 1, h.y - 15, h.x + 7, h.y - 6.5); g.fill();
      g.fillStyle = '#ab47bc'; g.fillRect(h.x - 6.5, h.y - 9.5, 13, 2); skC(g, h.x + 1, h.y - 8.5, 1.1, '#ffd54f');
      g.strokeStyle = '#8d6e63'; g.lineWidth = 1.6; g.beginPath(); g.moveTo(hip.x - 18, hip.y + 2); g.lineTo(hip.x + 14, hip.y - 4); g.stroke();   // the broom
      g.fillStyle = skLG(g, hip.x - 26, 0, hip.x - 16, 0, ['#c49a3a', '#ffd54f']); g.beginPath(); g.moveTo(hip.x - 17, hip.y + 2); g.lineTo(hip.x - 27, hip.y - 2 + Math.sin(t * 10)); g.lineTo(hip.x - 27, hip.y + 7 + Math.sin(t * 10)); g.closePath(); g.fill();
    } },
    cr_ginger: { front: (g, P, t) => {
      const { hip, neck, head: h, arms, legs } = P;
      skTorso(g, P, skLG(g, neck.x - 6, 0, neck.x + 6, 0, ['#d7965a', '#a0612a']), 5, 5);
      for (const l of [...arms, ...legs]) { const q = skLimb(l, 0.85); skL(g, [[q.x - 2, q.y - 1], [q.x + 2, q.y + 1]], '#fafafa', 0.9); skL(g, [[q.x - 2, q.y + 1.5], [q.x + 2, q.y + 3.5]], '#fafafa', 0.6); }
      for (const q of [0.35, 0.6]) { const c = skAt(hip, neck, q); skC(g, c.x + 1, c.y, 1.3, q > 0.5 ? '#e53935' : '#43a047'); }
      skHead(g, h, ['#e0a46a', '#b5651d', '#7a3f12']); skC(g, h.x + 2.5, h.y - 1.4, 1, '#fafafa'); skC(g, h.x + 6.4, h.y - 1.4, 0.9, '#fafafa');
      g.strokeStyle = '#fafafa'; g.lineWidth = 0.8; g.beginPath(); g.arc(h.x + 4.4, h.y + 1, 3, 0.3, Math.PI - 0.3); g.stroke();
      g.strokeStyle = 'rgba(255,255,255,0.8)'; g.lineWidth = 0.6; g.beginPath(); g.arc(h.x, h.y, 7.3, 0, Math.PI * 2); g.setLineDash([1.2, 1]); g.stroke(); g.setLineDash([]);
    } },
    cr_mummy: { front: (g, P, t) => {
      const { hip, neck, head: h, arms, legs } = P;
      skTorso(g, P, skLG(g, neck.x - 6, 0, neck.x + 6, 0, ['#efe6d2', '#c9bb98']), 4.6, 4.2);
      for (const l of [...arms, ...legs, { f: hip, k: skAt(hip, neck, 0.5), e: neck }])
        for (let f = 0.1; f < 1; f += 0.16) { const a = skLimb(l, f); skL(g, [[a.x - 2.6, a.y - 1.2], [a.x + 2.6, a.y + 1.4]], 'rgba(150,130,95,0.8)', 0.7); }
      skHead(g, h, ['#f5efe0', '#d9cdb0', '#a8987a']);
      for (const yy of [-5, -2, 1, 4]) skL(g, [[h.x - 8, h.y + yy], [h.x + 8, h.y + yy + 1.4]], 'rgba(150,130,95,0.8)', 0.7);
      skGlow(g, '#ff1744', 6, () => skC(g, h.x + 4, h.y - 1, 1.1, '#ff5252'));
      const wv = Math.sin(t * 8) * 2; skL(g, [[hip.x - 2, hip.y - 4], [hip.x - 8, hip.y - 1 + wv], [hip.x - 12, hip.y + 2 + wv]], '#d9cdb0', 1.2);   // a loose bandage
    } },
    cr_ninja: { front: (g, P, t) => {
      const { hip, neck, head: h } = P;
      skTorso(g, P, skLG(g, neck.x - 6, 0, neck.x + 6, 0, ['#37474f', '#151a1d']), 4.8, 4.2);
      const b = skAt(hip, neck, 0.25); skL(g, [[b.x - 5, b.y], [b.x + 5, b.y]], '#b71c1c', 2);
      skHead(g, h, ['#455a64', '#263238', '#101418']);
      g.fillStyle = '#ffe0bd'; roundRectOn(g, h.x - 0.5, h.y - 3.6, 9.4, 3.6, 1.4); g.fill(); skC(g, h.x + 2.6, h.y - 1.8, 0.9, '#111'); skC(g, h.x + 6.8, h.y - 1.8, 0.8, '#111');
      g.fillStyle = '#b71c1c'; g.fillRect(h.x - 8.3, h.y - 7, 16.6, 2.4); const wv = Math.sin(t * 12) * 1.5; skL(g, [[h.x - 8, h.y - 6], [h.x - 13, h.y - 4 + wv], [h.x - 17, h.y - 5 + wv * 1.4]], '#b71c1c', 1.6);
      const n2 = P.neck; g.save(); g.translate(n2.x - 6, n2.y - 6); g.rotate(0.9); g.fillStyle = '#212121'; g.fillRect(0, -1, 24, 2); g.fillStyle = '#b71c1c'; g.fillRect(-4, -1.2, 4, 2.4); g.restore();
    } },
    cr_cupid: { back: (g, P, t) => { const { sh } = P, f = Math.sin(t * 14) * 3; for (const k of [1, 0]) { g.fillStyle = k ? '#eceff1' : '#ffffff'; g.beginPath(); g.ellipse(sh.x - 7 - k, sh.y - 3 - f, 7, 3.4, -0.7 - f * 0.08, 0, Math.PI * 2); g.fill(); g.beginPath(); g.ellipse(sh.x - 5 - k, sh.y + 2 - f * 0.5, 5, 2.4, -0.3, 0, Math.PI * 2); g.fill(); } },
      front: (g, P, t) => {
        const { hip, neck, head: h, arms } = P;
        g.fillStyle = '#fafafa'; g.beginPath(); g.moveTo(hip.x - 5, hip.y - 3); g.lineTo(hip.x + 5, hip.y - 3); g.lineTo(hip.x + 4, hip.y + 3); g.lineTo(hip.x - 4, hip.y + 3); g.closePath(); g.fill();
        skHead(g, h, ['#ffe9d6', '#ffd2b0', '#e0a070']); skC(g, h.x + 4, h.y - 1, 0.9, '#5d4037'); skC(g, h.x + 6.5, h.y + 1.6, 1.4, 'rgba(255,128,150,0.5)');
        for (const [dx, dy] of [[-6, -4], [-3, -7], [1, -8], [4, -7], [-7, 0]]) skC(g, h.x + dx, h.y + dy, 2.2, skRG(g, h.x + dx, h.y + dy, 2.2, ['#fff59d', '#ffca28']));
        const hd = arms[0].e; g.strokeStyle = '#ffb300'; g.lineWidth = 1; g.beginPath(); g.arc(hd.x + 1, hd.y, 5, -1.2, 1.2); g.stroke(); skL(g, [[hd.x - 2, hd.y], [hd.x + 8, hd.y]], '#e53935', 0.8); drawHeart(g, hd.x + 9, hd.y, 0.35, '#e53935');
      } },
    cr_astro: { back: (g, P) => { const { neck } = P; g.fillStyle = skLG(g, neck.x - 15, 0, neck.x - 5, 0, ['#ffffff', '#b0bec5']); roundRectOn(g, neck.x - 15, neck.y + 1, 10, 18, 3); g.fill(); },
      front: (g, P, t) => {
        const { hip, neck, head: h } = P;
        skTorso(g, P, skLG(g, neck.x - 6, 0, neck.x + 6, 0, ['#ffffff', '#cfd8dc']), 5.2, 4.8);
        const c = skAt(hip, neck, 0.6); g.fillStyle = '#263238'; roundRectOn(g, c.x - 2, c.y - 2, 6, 4.4, 1); g.fill(); skC(g, c.x, c.y, 0.7, Math.sin(t * 5) > 0 ? '#69f0ae' : '#1b5e20');
        skC(g, h.x, h.y, 9.4, skRG(g, h.x, h.y, 9.4, ['#ffffff', '#e0e0e0', '#9e9e9e']));
        g.fillStyle = skLG(g, h.x, h.y - 5, h.x + 9, h.y + 4, ['#ffd54f', '#e65100']); g.beginPath(); g.ellipse(h.x + 3, h.y, 6, 5, 0, 0, Math.PI * 2); g.fill();
        g.fillStyle = 'rgba(255,255,255,0.7)'; g.beginPath(); g.ellipse(h.x + 1.5, h.y - 2.4, 2.4, 1.2, -0.4, 0, Math.PI * 2); g.fill();
      } }
  });

  for (const [k, v] of Object.entries(SKIN_INFO)) { TEXT.ru.items['c_' + k] = v[0]; TEXT.en.items['c_' + k] = v[2]; }
  const PET_INFO = {
    unicorn: ['Единорог', 'Светящийся золотой рог, радужная грива и хвост прядями, за ним сыплются искры.', 'Unicorn', 'A glowing golden horn, a rainbow mane and tail in strands; sparkles fall behind it.'],
    phoenix: ['Феникс', 'Птица из пламени: огненный хвост, пылающий хохолок, за ней летят угольки.', 'Phoenix', 'A bird of flame: a fiery tail, a blazing crest and embers flying behind.'],
    dino: ['Динозаврик', 'Маленький тираннозавр с гребнем и зубками, хвост качается волной, на бегу поднимает пыль.', 'Little dino', 'A little T-rex with spikes and teeth, a tail swaying in a wave, kicking up dust as it runs.'],
    kitsune: ['Кицунэ', 'Лиса-дух: три пушистых хвоста с голубыми огоньками на кончиках и красная метка на лбу. За ней плывут огоньки.', 'Kitsune', 'A fox spirit: three bushy tails tipped with blue fox-fire and a red mark on the forehead. Wisps float behind her.'],
    pegasus: ['Пегас', 'Белый конь с серебристо-голубой гривой и большими перьевыми крыльями, которые машут на бегу.', 'Pegasus', 'A white horse with a silver-blue mane and big feathered wings that beat as it runs.'],
    axolotl: ['Аксолотль', 'Розовый аксолотль с пушистыми жабрами, улыбкой и румянцем, хвост-плавник виляет.', 'Axolotl', 'A pink axolotl with frilly gills, a smile and blushing cheeks; its finned tail wiggles.'],
    capybara: ['Капибара', 'Невозмутимая капибара с мандаринкой на голове. Идёт не спеша, полуприкрыв глаза.', 'Capybara', 'An unbothered capybara with a mandarin on its head. Walks slowly with sleepy eyes.'],
    redpanda: ['Красная панда', 'Рыжая шерсть, белые пятна на мордочке и толстый полосатый хвост.', 'Red panda', 'Rusty fur, white face marks and a thick ringed tail.'],
    golem: ['Кристальный голем', 'Каменный малыш с переливающимися кристаллами на спине и светящимися глазами.', 'Crystal golem', 'A little stone fellow with shimmering crystals on its back and glowing eyes.'],
    maneki: ['Кот удачи', 'Белый кот с золотой монетой и колокольчиком скачет за тобой и машет лапкой.', 'Lucky cat', 'A white cat with a gold coin and a bell hops after you, waving its paw.'],
    spiritcat: ['Кот-дух', 'Полупрозрачный светящийся кот парит над землёй, вместо хвоста — два туманных завитка.', 'Spirit cat', 'A see-through glowing cat floating above the ground, with two misty curls for a tail.'],
    bunnyking: ['Кролик-король', 'Кролик в золотой короне и красной мантии с горностаем скачет за тобой.', 'Bunny king', 'A rabbit in a gold crown and a red ermine cape hops after you.'],
    mech: ['Мини-мех', 'Оранжевый шагающий робот со стеклянной кабиной и крошечным пилотом. В прыжке включает реактивный двигатель.', 'Mini mech', 'An orange walking robot with a glass cockpit and a tiny pilot. Fires a thruster when it jumps.'],
    kraken: ['Малыш-кракен', 'Фиолетовый осьминожка парит рядом и волной шевелит шестью щупальцами, пуская пузыри.', 'Baby kraken', 'A purple octopus floats beside you, waving six tentacles in turn and blowing bubbles.'],
    griffin: ['Грифон', 'Орлиная голова и крылья на теле льва, хвост с кисточкой.', 'Griffin', "An eagle's head and wings on a lion's body, a tufted tail."]
  };
  for (const [k, v] of Object.entries(PET_INFO)) { TEXT.ru.items['p_' + k] = v[0]; TEXT.en.items['p_' + k] = v[2]; }
  const skinOf = look => { const c = look && findItem('color', look.color); return c && c.costume && SKINS2[c.costume] ? SKINS2[c.costume] : null; };
  function drawCostume(g, c, P, t, mode, layer) {
    const SK2 = SKINS2[c];
    if (SK2) { g.save(); g.lineCap = 'round'; g.lineJoin = 'round'; if (layer === 'back') { if (SK2.back) SK2.back(g, P, t, mode); } else if (SK2.front) SK2.front(g, P, t, mode); g.restore(); return; }
    const { hip, neck, head: h, sh, legs, arms } = P;
    const seg = (a, b, col, w) => { g.strokeStyle = col; g.lineWidth = w; g.beginPath(); g.moveTo(a.x, a.y); g.lineTo(b.x, b.y); g.stroke(); };
    const at = (a, b, f) => ({ x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f });
    const circ = (x, y, r, col) => { g.fillStyle = col; g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill(); };
    const cape = (col, inner) => {
      const wv = Math.sin(t * 9) * 3;
      g.fillStyle = col; g.beginPath(); g.moveTo(sh.x + 2, sh.y - 3);
      g.quadraticCurveTo(sh.x - 13, sh.y + 8, sh.x - 21 - wv, sh.y + 24);
      g.lineTo(sh.x - 6 - wv * 0.5, sh.y + 26); g.quadraticCurveTo(sh.x - 3, sh.y + 10, sh.x + 3, sh.y + 1); g.closePath(); g.fill();
      if (inner) { g.fillStyle = inner; g.beginPath(); g.moveTo(sh.x + 1, sh.y - 2); g.quadraticCurveTo(sh.x - 6, sh.y + 6, sh.x - 10 - wv * 0.5, sh.y + 16); g.lineTo(sh.x - 4, sh.y + 4); g.closePath(); g.fill(); }
    };
    g.lineCap = 'round'; g.lineJoin = 'round';
    if (layer === 'back') {
      if (c === 'hero') cape('#d32f2f');
      if (c === 'vampire') cape('#111111', '#b71c1c');
      if (c === 'astronaut') { g.fillStyle = '#cfd8dc'; roundRectOn(g, neck.x - 14, neck.y + 2, 9, 17, 3); g.fill(); }
      return;
    }
    const ex = h.x + 3, ey = h.y - 1;   // where the eyes are
    switch (c) {
      case 'zombie':
        seg(hip, neck, '#5d4037', 7);
        g.fillStyle = '#3e2723'; const zt = at(hip, neck, 0.5); g.fillRect(zt.x - 3, zt.y - 1, 3, 3);
        circ(ex, ey, 2.3, '#fff'); circ(ex + 0.5, ey, 1, '#d50000');
        g.strokeStyle = '#33691e'; g.lineWidth = 1; g.beginPath(); g.moveTo(h.x - 4, h.y - 5); g.lineTo(h.x + 1, h.y - 6); g.stroke();
        break;
      case 'ninja':
        g.fillStyle = '#ffe0b2'; g.fillRect(h.x - 1, h.y - 3.5, 9, 3.5);
        circ(ex + 1, h.y - 2, 1, '#111'); circ(ex + 4, h.y - 2, 1, '#111');
        g.fillStyle = '#d32f2f'; g.fillRect(h.x - 8.3, h.y - 7, 16.6, 2.4);
        seg({ x: h.x - 8, y: h.y - 6 }, { x: h.x - 15, y: h.y - 3 + Math.sin(t * 12) * 2 }, '#d32f2f', 1.8);
        seg(hip, neck, '#1a1a1a', 7);
        break;
      case 'pirate': {
        seg(hip, neck, '#fafafa', 7);
        for (const f of [0.25, 0.55, 0.85]) { const q = at(hip, neck, f); seg({ x: q.x - 3.5, y: q.y }, { x: q.x + 3.5, y: q.y }, '#d32f2f', 1.6); }
        g.fillStyle = '#c62828'; g.beginPath(); g.arc(h.x, h.y - 1, 8.6, Math.PI, 0); g.closePath(); g.fill();
        seg({ x: h.x - 8, y: h.y - 2 }, { x: h.x - 13, y: h.y + 3 }, '#c62828', 2);
        g.strokeStyle = '#111'; g.lineWidth = 1; g.beginPath(); g.moveTo(h.x - 7, h.y - 4); g.lineTo(h.x + 8, h.y + 1); g.stroke();
        circ(ex + 1, ey, 2.4, '#111'); circ(h.x - 3, h.y + 5, 1.3, '#ffc107');
        break;
      }
      case 'knight': {
        seg(hip, neck, '#cfd8dc', 8);
        const kg = g.createLinearGradient(h.x - 9, 0, h.x + 9, 0); kg.addColorStop(0, '#eceff1'); kg.addColorStop(1, '#78909c');
        g.fillStyle = kg; g.beginPath(); g.arc(h.x, h.y, 9.2, 0, Math.PI * 2); g.fill();
        g.fillStyle = '#263238'; g.fillRect(h.x + 1, h.y - 2.5, 8, 2.2);
        g.fillStyle = '#d32f2f'; g.beginPath(); g.moveTo(h.x - 2, h.y - 8); g.quadraticCurveTo(h.x - 10, h.y - 18, h.x - 14, h.y - 8); g.quadraticCurveTo(h.x - 8, h.y - 12, h.x - 2, h.y - 8); g.fill();
        break;
      }
      case 'astronaut':
        seg(hip, neck, '#fafafa', 8); circ(at(hip, neck, 0.6).x + 1, at(hip, neck, 0.6).y, 1.6, '#1e88e5');
        g.fillStyle = 'rgba(150,205,255,0.35)'; g.beginPath(); g.arc(h.x, h.y, 11, 0, Math.PI * 2); g.fill();
        g.strokeStyle = '#eceff1'; g.lineWidth = 2; g.stroke();
        g.fillStyle = 'rgba(255,255,255,0.7)'; g.beginPath(); g.ellipse(h.x + 4, h.y - 5, 3, 1.6, -0.6, 0, Math.PI * 2); g.fill();
        break;
      case 'hero': {
        seg(hip, neck, '#1565c0', 7);
        const em = at(hip, neck, 0.65); g.fillStyle = '#ffd600';
        g.beginPath(); g.moveTo(em.x, em.y - 3); g.lineTo(em.x + 3, em.y); g.lineTo(em.x, em.y + 3); g.lineTo(em.x - 3, em.y); g.closePath(); g.fill();
        g.fillStyle = '#111'; g.beginPath(); g.ellipse(ex, ey, 4.5, 2.2, 0, 0, Math.PI * 2); g.fill();
        circ(ex + 1, ey, 0.9, '#fff');
        seg(legs[0].e, legs[0].k, '#d32f2f', 5); seg(legs[1].e, legs[1].k, '#d32f2f', 5);
        break;
      }
      case 'robot':
        seg(hip, neck, '#607d8b', 8);
        g.fillStyle = '#90a4ae'; roundRectOn(g, h.x - 8.5, h.y - 8.5, 17, 16, 3); g.fill();
        g.fillStyle = '#263238'; g.fillRect(h.x - 1, h.y - 3, 9, 4);
        circ(h.x + 1.5, h.y - 1, 1.3, Math.sin(t * 6) > 0 ? '#00e5ff' : '#18ffff'); circ(h.x + 5.5, h.y - 1, 1.3, '#00e5ff');
        seg({ x: h.x, y: h.y - 8.5 }, { x: h.x, y: h.y - 13 }, '#607d8b', 1.4); circ(h.x, h.y - 14, 1.8, '#ff1744');
        break;
      case 'vampire':
        seg(hip, neck, '#111', 7);
        circ(h.x, h.y, 8, '#eceff1');
        g.fillStyle = '#111'; g.beginPath(); g.arc(h.x, h.y - 1, 8.3, Math.PI * 1.05, Math.PI * 1.95); g.lineTo(h.x + 1, h.y - 4); g.closePath(); g.fill();
        circ(ex, ey, 1.2, '#d50000');
        g.fillStyle = '#fff'; g.beginPath(); g.moveTo(h.x + 3, h.y + 3.5); g.lineTo(h.x + 4, h.y + 6); g.lineTo(h.x + 5, h.y + 3.5); g.fill();
        g.fillStyle = '#b71c1c'; g.beginPath(); g.moveTo(neck.x - 5, neck.y - 1); g.lineTo(neck.x - 1, neck.y + 4); g.lineTo(neck.x + 4, neck.y - 2); g.fill();
        break;
      case 'mummy':
        for (const l of [...legs, ...arms, { f: hip, k: at(hip, neck, 0.5), e: neck }])
          for (const f of [0.2, 0.45, 0.7, 0.95]) {
            const a = f < 0.5 ? at(l.f, l.k, f * 2) : at(l.k, l.e, (f - 0.5) * 2);
            seg({ x: a.x - 2.4, y: a.y - 1.2 }, { x: a.x + 2.4, y: a.y + 1.2 }, '#bcaaa4', 1.1);
          }
        for (const yy of [-5, -1, 3]) seg({ x: h.x - 7, y: h.y + yy }, { x: h.x + 7, y: h.y + yy + 1.5 }, '#bcaaa4', 1.1);
        circ(ex + 1, ey - 1, 1.3, '#111');
        break;
      case 'skeleton':
        circ(ex - 0.5, ey - 1, 2.2, '#111'); circ(ex + 4, ey - 1, 1.8, '#111');
        g.fillStyle = '#111'; g.fillRect(ex + 1.5, ey + 2, 1.2, 1.6);
        for (const f of [0.35, 0.55, 0.75]) { const q = at(hip, neck, f); seg({ x: q.x - 4, y: q.y }, { x: q.x + 4, y: q.y }, '#424242', 1.2); }
        break;
      case 'warrior':
        seg(hip, neck, '#6d4c41', 7);
        g.fillStyle = '#ece3d0';
        g.beginPath(); g.moveTo(h.x - 7, h.y - 5); g.quadraticCurveTo(h.x - 14, h.y - 8, h.x - 13, h.y - 16); g.quadraticCurveTo(h.x - 10, h.y - 9, h.x - 5, h.y - 8); g.fill();
        g.beginPath(); g.moveTo(h.x + 7, h.y - 5); g.quadraticCurveTo(h.x + 14, h.y - 8, h.x + 13, h.y - 16); g.quadraticCurveTo(h.x + 10, h.y - 9, h.x + 5, h.y - 8); g.fill();
        g.fillStyle = '#90a4ae'; g.beginPath(); g.arc(h.x, h.y - 2, 8.8, Math.PI, 0); g.closePath(); g.fill();
        g.fillStyle = '#ff8f00'; g.beginPath(); g.moveTo(h.x - 2, h.y + 2); g.quadraticCurveTo(h.x + 4, h.y + 14, h.x + 9, h.y + 2); g.fill();
        break;
      case 'samurai':
        seg(hip, neck, '#212121', 8);
        for (const f of [0.3, 0.6]) { const q = at(hip, neck, f); seg({ x: q.x - 4, y: q.y }, { x: q.x + 4, y: q.y }, '#d32f2f', 2); }
        g.fillStyle = '#263238'; g.beginPath(); g.arc(h.x, h.y - 1, 9, Math.PI, 0); g.closePath(); g.fill();
        g.fillRect(h.x - 11, h.y - 2, 22, 2.4);
        g.strokeStyle = '#ffc107'; g.lineWidth = 2; g.beginPath(); g.arc(h.x, h.y - 10, 6, Math.PI * 1.15, Math.PI * 1.85); g.stroke();
        break;
      case 'clown':
        seg(hip, neck, '#7b1fa2', 7);
        for (const f of [0.3, 0.7]) { const q = at(hip, neck, f); circ(q.x, q.y, 1.4, '#ffeb3b'); }
        circ(h.x - 7, h.y - 3, 4, '#e91e63'); circ(h.x - 5, h.y - 8, 3.5, '#03a9f4'); circ(h.x + 2, h.y - 9, 3.5, '#4caf50');
        circ(h.x + 8.5, h.y + 1, 2.6, '#f44336'); circ(ex - 1, ey - 1.5, 1.1, '#111');
        for (const l of legs) { g.fillStyle = '#e53935'; g.beginPath(); g.ellipse(l.e.x + 4, l.e.y, 6, 2.6, 0, 0, Math.PI * 2); g.fill(); }
        break;
      case 'detective': {
        seg(hip, neck, '#a1887f', 9);
        const bl = at(hip, neck, 0.25); seg({ x: bl.x - 4.5, y: bl.y }, { x: bl.x + 4.5, y: bl.y }, '#5d4037', 1.8);
        g.fillStyle = '#6d4c41'; g.beginPath(); g.ellipse(h.x, h.y - 6, 11, 2.6, 0, 0, Math.PI * 2); g.fill();
        roundRectOn(g, h.x - 7, h.y - 13, 14, 8, 3); g.fill();
        const hd = arms[0].e; g.strokeStyle = '#5d4037'; g.lineWidth = 1.6; g.beginPath(); g.moveTo(hd.x, hd.y); g.lineTo(hd.x + 4, hd.y - 4); g.stroke();
        g.strokeStyle = '#ffc107'; g.lineWidth = 1.4; g.beginPath(); g.arc(hd.x + 6.5, hd.y - 6.5, 3.4, 0, Math.PI * 2); g.stroke();
        break;
      }
      case 'firefighter': {
        seg(hip, neck, '#c62828', 8);
        for (const f of [0.3, 0.7]) { const q = at(hip, neck, f); seg({ x: q.x - 4, y: q.y }, { x: q.x + 4, y: q.y }, '#ffee58', 1.8); }
        g.fillStyle = '#ffc107'; g.beginPath(); g.arc(h.x, h.y - 2, 9, Math.PI, 0); g.closePath(); g.fill();
        g.beginPath(); g.ellipse(h.x - 1, h.y - 2, 13, 2.6, 0, 0, Math.PI * 2); g.fill();
        g.fillStyle = '#b71c1c'; g.fillRect(h.x - 1.5, h.y - 10, 3, 5);
        break;
      }
    }
  }

  function shade(hex, k) {   // k < 1 darker, k > 1 lighter
    let ch;
    if (hex[0] === 'r') ch = hex.match(/[\d.]+/g).slice(0, 3).map(Number);   // 1.0.44: also takes an rgb() made by shade()
    else { const n = parseInt(hex.slice(1), 16); ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
    const f = v => Math.max(0, Math.min(255, Math.round(k < 1 ? v * k : v + (255 - v) * (k - 1))));
    return `rgb(${ch.map(f).join(',')})`;
  }

  function shortsPattern(g, it, top, m, pn, pt, back) {
    const P = (f, side) => ({ x: top.x + (m.x - top.x) * f + pn.x * side, y: top.y + (m.y - top.y) * f + pn.y * side });
    const dot = (q, r, c) => { g.fillStyle = c; g.beginPath(); g.arc(q.x, q.y, r, 0, Math.PI * 2); g.fill(); };
    const dark = back ? 0.8 : 1;
    switch (it.pat) {
      case 'dots': for (const [f, sd] of [[0.2, -2.5], [0.45, 2.5], [0.7, -1.5], [0.9, 3]]) dot(P(f, sd), 1.4, back ? '#e0d4e6' : '#fff'); break;
      case 'stars': g.fillStyle = shade('#ffeb3b', dark); for (const [f, sd] of [[0.25, -2], [0.6, 2.5], [0.85, -2.5]]) { const q = P(f, sd); starPath(g, q.x, q.y, 1.8); g.fill(); } break;
      case 'zebra': case 'tiger':
        g.strokeStyle = it.pat === 'zebra' ? '#212121' : '#3e2723'; g.lineWidth = it.pat === 'zebra' ? 1.6 : 1.2;
        for (const f of [0.2, 0.42, 0.64, 0.86]) { const a2 = P(f, -6), b2 = P(f + 0.1, 0), c2 = P(f, 6); g.beginPath(); g.moveTo(a2.x, a2.y); g.lineTo(b2.x, b2.y); g.lineTo(c2.x, c2.y); g.stroke(); } break;
      case 'flowers': for (const [f, sd, c] of [[0.25, -2, '#ffeb3b'], [0.6, 2, '#ff80ab'], [0.88, -2.5, '#fff']]) { const q = P(f, sd); for (let k = 0; k < 5; k++) dot({ x: q.x + Math.cos(k * 1.26) * 1.4, y: q.y + Math.sin(k * 1.26) * 1.4 }, 1, c); dot(q, 0.7, '#ff7043'); } break;
      case 'checker': g.fillStyle = '#212121'; for (let a2 = 0; a2 < 5; a2++) for (let b2 = -3; b2 < 3; b2++) if ((a2 + b2) % 2 === 0) { const q = P(a2 * 0.22, b2 * 2.2); g.fillRect(q.x - 1.1, q.y - 1.1, 2.2, 2.2); } break;
      case 'rainbow': RAINBOW.forEach((c, k) => { g.strokeStyle = c; g.lineWidth = 2; const a2 = P(0.12 + k * 0.16, -7), b2 = P(0.12 + k * 0.16, 7); g.beginPath(); g.moveTo(a2.x, a2.y); g.lineTo(b2.x, b2.y); g.stroke(); }); break;
      case 'leopard': for (const [f, sd] of [[0.2, -2], [0.4, 2.5], [0.62, -1], [0.85, 2]]) { const q = P(f, sd); g.strokeStyle = '#4e342e'; g.lineWidth = 0.9; g.beginPath(); g.arc(q.x, q.y, 1.4, 0.3, 5.5); g.stroke(); } break;
      case 'glow': g.fillStyle = 'rgba(255,255,255,0.45)'; { const a2 = P(0, -3.5), b2 = P(1, -3.5); g.fillRect(Math.min(a2.x, b2.x) - 0.6, Math.min(a2.y, b2.y), 1.2, Math.abs(b2.y - a2.y) + 0.1); } break;
      case 'metal': { const gr = g.createLinearGradient(top.x - 6, 0, top.x + 6, 0); gr.addColorStop(0, 'rgba(255,255,255,0)'); gr.addColorStop(0.5, 'rgba(255,255,255,0.6)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(top.x - 12, top.y - 2, 24, 24); } break;
      case 'frayed': g.strokeStyle = '#eceff1'; g.lineWidth = 0.7; for (let k = -2; k <= 2; k++) { const a2 = P(0.98, k * 2), b2 = P(1.08, k * 2 + 0.6); g.beginPath(); g.moveTo(a2.x, a2.y); g.lineTo(b2.x, b2.y); g.stroke(); } dot(P(0.55, 1.5), 1.2, '#e3f2fd'); break;
      case 'pin': g.strokeStyle = 'rgba(255,255,255,0.85)'; g.lineWidth = 0.8; for (const sd of [-3.5, 0, 3.5]) { const a2 = P(0, sd), b2 = P(1, sd); g.beginPath(); g.moveTo(a2.x, a2.y); g.lineTo(b2.x, b2.y); g.stroke(); } break;
      case 'cargo': {   // a big side pocket with a buttoned flap
        const a2 = P(0.42, 0.6), b2 = P(0.42, 5.2), c2 = P(0.84, 5.2), d2 = P(0.84, 0.6);
        g.fillStyle = shade(it.col, back ? 0.68 : 0.86); g.beginPath(); g.moveTo(a2.x, a2.y); g.lineTo(b2.x, b2.y); g.lineTo(c2.x, c2.y); g.lineTo(d2.x, d2.y); g.closePath(); g.fill();
        g.strokeStyle = 'rgba(80,60,30,0.6)'; g.lineWidth = 0.5; g.stroke();
        const e2 = P(0.54, 0.4), f2 = P(0.54, 5.4); g.fillStyle = shade(it.col, back ? 0.62 : 0.78); g.beginPath(); g.moveTo(a2.x, a2.y); g.lineTo(b2.x, b2.y); g.lineTo(f2.x, f2.y); g.lineTo(e2.x, e2.y); g.closePath(); g.fill();
        dot(P(0.52, 2.9), 0.7, '#5d4037'); break;
      }
      case 'galaxy': for (const [f, sd, c, r2] of [[0.2, -2, '#fff', 0.6], [0.4, 3, '#fff', 0.5], [0.55, -3, '#b39ddb', 1.3], [0.8, 2, '#fff', 0.6]]) dot(P(f, sd), r2, c); dot(P(0.7, -0.5), 1.8, '#ff7043'); break;
    }
  }
  // =====================================================================
  //  Shoes (1.0.40, redrawn): a real side profile — heel, arch, toe box, a sole with thickness —
  //  shaded from a lit top to a darker bottom, a gloss highlight, a contact shadow under the sole.
  //  Physics: the shoe turns with the shin, and during push-off the toe box bends at the ball of
  //  the foot so the toe stays flat on the ground (heel up, toe down) instead of the whole shoe tilting.
  //  Frame: ankle at (0,0), toe towards +x, ground under the sole at y ≈ 3.6. kk = the knee in this frame.
  // =====================================================================
  const SHOE = {   // upper, sole, collar height (0 low … 1 knee-high), toe shape, extra details
    sneakers:  { up: '#e53935', sole: '#fafafa', collar: 0.05, toe: 'round', cap: '#fafafa', laces: '#fafafa' },
    runners:   { up: '#fafafa', sole: '#eceff1', collar: 0.05, toe: 'round', soleH: 1.6, stripe: '#1e88e5', laces: '#90a4ae' },
    boots:     { up: '#6d4c41', sole: '#3e2723', collar: 0.42, toe: 'round', laces: '#d7ccc8', heel: 1 },
    flippers:  { up: '#26a69a', sole: '#00796b', collar: 0.05, toe: 'round', fin: '#4db6ac' },
    rollers:   { up: '#e53935', sole: '#455a64', collar: 0.3, toe: 'round', laces: '#fafafa', wheels: '#ffeb3b' },
    goldkicks: { up: '#ffc107', sole: '#fafafa', collar: 0.05, toe: 'round', metal: 1, laces: '#fff8e1' },
    slippers:  { up: '#f48fb1', sole: '#f8bbd0', collar: 0, toe: 'round', open: 1, pompom: '#ffffff' },
    sandals:   { up: null, sole: '#8d6e63', collar: 0, toe: 'round', straps: '#6d4c41' },
    skates:    { up: '#fafafa', sole: '#cfd8dc', collar: 0.35, toe: 'round', laces: '#90a4ae', blade: '#b0bec5' },
    cowboyboots: { up: '#8d5a35', sole: '#3e2723', collar: 0.5, toe: 'pointy', heel: 1.6, stitch: '#ffcc80', spur: '#bdbdbd' },
    clownshoes: { up: '#e53935', sole: '#fdd835', collar: 0.05, toe: 'big', laces: '#1e88e5' },
    rainboots: { up: '#fdd835', sole: '#5d4037', collar: 0.55, toe: 'round', gloss: 1 },
    cleats:    { up: '#212121', sole: '#212121', collar: 0.05, toe: 'round', stripe: '#43a047', studs: '#fafafa', laces: '#fafafa' },
    ballet:    { up: '#f8bbd0', sole: '#f48fb1', collar: 0, toe: 'pointy', ribbons: '#f48fb1', satin: 1 },
    spaceboots: { up: '#eceff1', sole: '#607d8b', collar: 0.32, toe: 'round', soleH: 2.2, glow: '#00e5ff', panel: '#b0bec5' },
    flipflops: { up: null, sole: '#26c6da', collar: 0, toe: 'round', thong: '#fafafa' },
    hightops:  { up: '#212121', sole: '#fafafa', collar: 0.3, toe: 'round', cap: '#fafafa', laces: '#fafafa', badge: '#fafafa' },
    firekicks: { up: '#ff5722', sole: '#212121', collar: 0.05, toe: 'round', flame: 1, laces: '#ffeb3b' },
    bunnyslippers: { up: '#fafafa', sole: '#eceff1', collar: 0, toe: 'big', open: 1, bunny: 1 },
    hikers:    { up: '#8d6e63', sole: '#3e2723', collar: 0.36, toe: 'round', soleH: 1.7, heel: 0.6, cap: '#5d4037', laces: '#ff8f00' }
  };
  function drawShoe(g, id, kk, flex, dark, onGround) {
    const d = SHOE[id]; if (!d) return;
    // the stick foot (0,0) lands inside the shoe, above the sole, so the round end of the leg can't poke out
    g.save(); g.scale(0.82, 0.82); g.translate(0.4, -1.4);
    kk = { x: kk.x / 0.82 - 0.4, y: kk.y / 0.82 + 1.4 };
    const sh = (c, k) => shade(c, (dark ? 0.76 : 1) * k);
    const BX = 3.6, BY = 3.6;                                   // ball of the foot: the toe box bends here
    const cf = Math.cos(-flex), sf = Math.sin(-flex);
    const P = (x, y) => x <= BX ? [x, y] : [BX + (x - BX) * cf - (y - BY) * sf, BY + (x - BX) * sf + (y - BY) * cf];
    const big = d.toe === 'big', pointy = d.toe === 'pointy';
    const toeX = big ? 12.5 : pointy ? 10.5 : 9.2, soleH = d.soleH || 1.1;
    const kl = Math.hypot(kk.x, kk.y) || 1, ux = kk.x / kl, uy = kk.y / kl;   // up the shin
    const cH = d.collar * 13;                                    // collar height along the shin
    // contact shadow (only when the sole is near the ground in this frame)
    if (onGround) { g.fillStyle = 'rgba(0,0,0,0.18)'; g.beginPath(); g.ellipse(3, BY + soleH + 0.8, 6.5, 1.1, 0, 0, Math.PI * 2); g.fill(); }
    // --- sole (with thickness) ---
    const solePath = () => {
      g.beginPath();
      const pts = [[-3.6, BY - 0.2], [toeX - 1, BY - 0.2], [toeX + 0.3, BY + 0.3], [toeX - 0.6, BY + soleH], [-3.2, BY + soleH], [-4, BY + soleH * 0.5]];
      pts.forEach(([x, y], i) => { const q = P(x, y); i ? g.lineTo(q[0], q[1]) : g.moveTo(q[0], q[1]); });
      g.closePath();
    };
    if (d.heel) {   // a raised heel block
      const q1 = P(-3.6, BY), q2 = P(-0.6, BY);
      g.fillStyle = sh(d.sole, 0.85); g.fillRect(q1[0], q1[1], q2[0] - q1[0], soleH + d.heel * 1.4);
    }
    solePath();
    const sg = g.createLinearGradient(0, BY - 0.2, 0, BY + soleH); sg.addColorStop(0, sh(d.sole, 1.1)); sg.addColorStop(1, sh(d.sole, 0.72));
    g.fillStyle = sg; g.fill();
    { const a1 = P(-3.2, BY + soleH), a2 = P(toeX - 0.6, BY + soleH); g.strokeStyle = sh(d.sole, 0.5); g.lineWidth = 0.5; g.beginPath(); g.moveTo(a1[0], a1[1]); g.lineTo(a2[0], a2[1]); g.stroke(); }
    if (d.studs) { g.fillStyle = d.studs; for (const x of [-2.5, 0.8, 4.5, 7.5]) { const q = P(x, BY + soleH); g.fillRect(q[0] - 0.6, q[1], 1.2, 1.1); } }
    if (d.blade) {   // skate blade on two posts
      g.strokeStyle = sh('#90a4ae', 1); g.lineWidth = 0.9;
      for (const x of [-1.5, 6]) { const a1 = P(x, BY + soleH), a2 = P(x, BY + soleH + 2.2); g.beginPath(); g.moveTo(a1[0], a1[1]); g.lineTo(a2[0], a2[1]); g.stroke(); }
      const b1 = P(-3.8, BY + soleH + 2.4), b2 = P(9.5, BY + soleH + 2.4); g.strokeStyle = sh(d.blade, 1.2); g.lineWidth = 1.2; g.beginPath(); g.moveTo(b1[0], b1[1]); g.lineTo(b2[0], b2[1]); g.quadraticCurveTo(b2[0] + 1.6, b2[1] - 0.5, b2[0] + 1, b2[1] - 1.6); g.stroke();
    }
    if (d.wheels) {   // inline wheels with hubs
      for (const x of [-2, 2.2, 6.4]) { const q = P(x, BY + soleH + 1.6); g.fillStyle = sh(d.wheels, 1); g.beginPath(); g.arc(q[0], q[1], 1.9, 0, Math.PI * 2); g.fill(); g.fillStyle = sh('#455a64', 1); g.beginPath(); g.arc(q[0], q[1], 0.7, 0, Math.PI * 2); g.fill(); }
    }
    if (d.fin) {   // long swim fin with ribs
      const f0 = P(6, BY - 1), f1 = P(17, BY - 1.4), f2 = P(18, BY + 1.6), f3 = P(6, BY + 1);
      const fg = g.createLinearGradient(f0[0], 0, f1[0], 0); fg.addColorStop(0, sh(d.fin, 1)); fg.addColorStop(1, 'rgba(77,182,172,0.55)');
      g.fillStyle = fg; g.beginPath(); g.moveTo(f0[0], f0[1]); g.lineTo(f1[0], f1[1]); g.quadraticCurveTo(f2[0] + 1, (f1[1] + f2[1]) / 2, f2[0], f2[1]); g.lineTo(f3[0], f3[1]); g.closePath(); g.fill();
      g.strokeStyle = sh('#00796b', 1); g.lineWidth = 0.5; for (const k of [0.35, 0.65]) { const a1 = P(6 + 11 * k, BY - 1.2), a2 = P(6 + 12 * k, BY + 1.3); g.beginPath(); g.moveTo(a1[0], a1[1]); g.lineTo(a2[0], a2[1]); g.stroke(); }
    }
    // --- the upper ---
    if (d.up) {
      const topY = big ? -3.6 : -2.6, toeTop = big ? BY - 4.6 : pointy ? BY - 1.6 : BY - 2.8;
      g.beginPath();
      const start = P(-3.4, BY - 0.2); g.moveTo(start[0], start[1]);
      const hb = P(-4.1, BY - 2.2); g.lineTo(hb[0], hb[1]);                       // heel counter
      // collar: low shoes end at the ankle, boots go up the shin
      const cb = { x: -3 + ux * cH, y: topY + uy * cH }, cfr = { x: 1.6 + ux * cH, y: topY + 0.4 + uy * cH };
      g.lineTo(cb.x, cb.y); g.lineTo(cfr.x, cfr.y);
      const ins = P(3, -1.2 + (big ? -1.5 : 0)); g.lineTo(ins[0], ins[1]);          // instep
      const tt = P(toeX - (big ? 3.5 : 2.2), toeTop), tip = P(toeX + 0.3, BY + 0.2);
      g.quadraticCurveTo(tt[0], tt[1], tip[0], tip[1]);                            // toe box
      const sf2 = P(toeX - 1, BY - 0.2); g.lineTo(sf2[0], sf2[1]);
      g.closePath();
      const ug = g.createLinearGradient(0, -3.5 + Math.min(0, uy * cH), 0, BY);
      ug.addColorStop(0, sh(d.up, d.metal ? 1.55 : 1.28)); ug.addColorStop(0.55, sh(d.up, 1)); ug.addColorStop(1, sh(d.up, 0.72));
      g.fillStyle = ug; g.fill();
      g.strokeStyle = sh(d.up, 0.55); g.lineWidth = 0.45; g.stroke();
      if (d.open) {   // slippers: the foot opening on top
        const o1 = P(-2.2, -0.4), o2 = P(2.8, -0.2); g.fillStyle = sh(d.up, 0.6); g.beginPath(); g.ellipse((o1[0] + o2[0]) / 2, (o1[1] + o2[1]) / 2 + 0.4, 2.8, 0.9, 0, 0, Math.PI * 2); g.fill();
      }
      if (d.cap) {   // rubber toe cap
        const c1 = P(toeX - 3.2, BY - 0.2), c2 = P(toeX - 1.8, BY - 2.4), c3 = P(toeX + 0.3, BY + 0.2);
        g.fillStyle = sh(d.cap, 0.95); g.beginPath(); g.moveTo(c1[0], c1[1]); g.quadraticCurveTo(c2[0], c2[1], c3[0], c3[1]); g.closePath(); g.fill();
      }
      if (d.stripe) {   // side stripe
        const a1 = P(-2.6, BY - 1.1), a2 = P(2, BY - 2.4), a3 = P(5.5, BY - 0.9); g.strokeStyle = sh(d.stripe, 1); g.lineWidth = 1.1;
        g.beginPath(); g.moveTo(a1[0], a1[1]); g.quadraticCurveTo(a2[0], a2[1], a3[0], a3[1]); g.stroke();
      }
      if (d.laces) {   // laces crossing the instep
        g.strokeStyle = sh(d.laces, 1); g.lineWidth = 0.55;
        for (let k = 0; k < 3; k++) { const a1 = P(0.8 + k * 1.1, -1.6 + k * 0.9), a2 = P(1.9 + k * 1.1, -0.8 + k * 0.9); g.beginPath(); g.moveTo(a1[0], a1[1]); g.lineTo(a2[0], a2[1]); g.stroke(); }
      }
      if (d.stitch) {   // western stitching
        g.strokeStyle = d.stitch; g.lineWidth = 0.4; g.setLineDash([0.8, 0.7]);
        g.beginPath(); g.moveTo(-2.6 + ux * cH * 0.8, -1 + uy * cH * 0.8); g.quadraticCurveTo(0, -2, 1 + ux * cH * 0.4, -0.5 + uy * cH * 0.4); g.stroke(); g.setLineDash([]);
      }
      if (d.panel) { const a1 = P(-2.5, BY - 2.2), a2 = P(4, BY - 2.2); g.fillStyle = sh(d.panel, 1); g.fillRect(a1[0], a1[1], a2[0] - a1[0], 1.2); }
      if (d.glow) { g.save(); g.shadowColor = d.glow; g.shadowBlur = 4; const a1 = P(-2.5, BY - 0.9), a2 = P(toeX - 1.5, BY - 0.9); g.strokeStyle = d.glow; g.lineWidth = 0.8; g.beginPath(); g.moveTo(a1[0], a1[1]); g.lineTo(a2[0], a2[1]); g.stroke(); g.restore(); }
      if (d.badge) { g.fillStyle = sh(d.badge, 1); g.beginPath(); g.arc(-2 + ux * cH * 0.6, -0.6 + uy * cH * 0.6, 1.1, 0, Math.PI * 2); g.fill(); }
      if (d.flame) {   // a flame decal on the side
        const a1 = P(-3, BY - 0.8), a2 = P(1, BY - 3), a3 = P(2.4, BY - 1.4), a4 = P(4.5, BY - 2.6), a5 = P(5.5, BY - 0.6);
        g.fillStyle = sh('#ffca28', 1); g.beginPath(); g.moveTo(a1[0], a1[1]); g.quadraticCurveTo(a2[0], a2[1], a3[0], a3[1]); g.quadraticCurveTo(a4[0], a4[1], a5[0], a5[1]); g.closePath(); g.fill();
      }
      if (d.pompom) { const q = P(toeX - 3, BY - 3); g.fillStyle = d.pompom; g.beginPath(); g.arc(q[0], q[1], 1.5, 0, Math.PI * 2); g.fill(); }
      if (d.bunny) {   // ears, eyes and a pink nose on the toe
        const e1 = P(toeX - 4.5, BY - 5), e2 = P(toeX - 3, BY - 5.4);
        for (const e of [e1, e2]) { g.fillStyle = sh('#fafafa', 1); g.beginPath(); g.ellipse(e[0], e[1] - 2.4, 1.1, 2.8, 0.25, 0, Math.PI * 2); g.fill(); g.fillStyle = '#f8bbd0'; g.beginPath(); g.ellipse(e[0], e[1] - 2.2, 0.5, 2, 0.25, 0, Math.PI * 2); g.fill(); }
        const ey = P(toeX - 2.2, BY - 2.6), ns = P(toeX + 0.2, BY - 1.2);
        g.fillStyle = '#212121'; g.beginPath(); g.arc(ey[0], ey[1], 0.6, 0, Math.PI * 2); g.fill(); g.fillStyle = '#ff80ab'; g.beginPath(); g.arc(ns[0], ns[1], 0.6, 0, Math.PI * 2); g.fill();
      }
      // gloss: a soft highlight along the top (stronger on metal, rubber and satin)
      const h1 = P(-1.5, -1.4), h2 = P(toeX - 2.6, BY - (big ? 3.8 : pointy ? 1.6 : 2.4));
      g.strokeStyle = `rgba(255,255,255,${d.metal || d.gloss || d.satin ? 0.75 : 0.4})`; g.lineWidth = d.metal || d.gloss ? 0.9 : 0.6;
      g.beginPath(); g.moveTo(h1[0], h1[1]); g.quadraticCurveTo((h1[0] + h2[0]) / 2, Math.min(h1[1], h2[1]) - 0.6, h2[0], h2[1]); g.stroke();
      if (d.metal) { const q = P(toeX - 3.5, BY - 2.2); const a = Math.max(0, Math.sin(performance.now() / 260)); if (a > 0.6) { g.fillStyle = `rgba(255,255,255,${(a - 0.6) * 2.5})`; starPath(g, q[0], q[1], 1.5); g.fill(); } }
    }
    if (d.straps) {   // sandals: two straps over the foot
      g.strokeStyle = sh(d.straps, 1); g.lineWidth = 1.2;
      for (const x of [0, 4.5]) { const a1 = P(x - 1.2, BY - 0.2), a2 = P(x + 0.4, BY - 2.6), a3 = P(x + 1.8, BY - 0.2); g.beginPath(); g.moveTo(a1[0], a1[1]); g.quadraticCurveTo(a2[0], a2[1], a3[0], a3[1]); g.stroke(); }
      g.beginPath(); g.moveTo(-3, BY - 0.4); g.lineTo(-1.5 + ux * 3, -0.5 + uy * 3); g.stroke();
    }
    if (d.thong) {   // flip-flops: a Y strap
      const a1 = P(5, BY - 0.2), a2 = P(3, BY - 2.4), a3 = P(-0.5, BY - 0.6), a4 = P(1.5, BY - 0.6);
      g.strokeStyle = d.thong; g.lineWidth = 0.9; g.beginPath(); g.moveTo(a1[0], a1[1]); g.lineTo(a2[0], a2[1]); g.lineTo(a3[0], a3[1]); g.moveTo(a2[0], a2[1]); g.lineTo(a4[0], a4[1]); g.stroke();
    }
    if (d.ribbons) {   // ballet ribbons crossing up the shin
      g.strokeStyle = sh(d.ribbons, 1); g.lineWidth = 0.7;
      g.beginPath(); g.moveTo(-1, -1.2); g.lineTo(ux * 6 + 1.4, uy * 6); g.moveTo(1.4, -1.2); g.lineTo(ux * 9 - 1.2, uy * 9); g.stroke();
    }
    if (d.spur) { const q = P(-4.3, BY - 0.6); g.strokeStyle = d.spur; g.lineWidth = 0.6; g.beginPath(); g.moveTo(q[0] + 0.6, q[1]); g.lineTo(q[0] - 1.6, q[1]); g.stroke(); g.beginPath(); g.arc(q[0] - 2.4, q[1], 0.9, 0, Math.PI * 2); g.stroke(); }
    g.restore();
  }

  // Shorts (1.0.44, redrawn): each leg is a cloth tube that flares a little at the hem, shaded across its
  // width (lit from the back/upper side), with a crease, a highlight, a stitched cuff, a crotch gusset and
  // a waistband with elastic ribs, belt loops (denim) or a drawstring (sport / pyjamas). Patterns are clipped.
  function drawShorts(g, it, hip, neck, legs) {
    const nrm = (x, y) => { const l = Math.hypot(x, y) || 1; return { x: x / l, y: y / l }; };
    const tor = nrm(neck.x - hip.x, neck.y - hip.y), pt = { x: -tor.y, y: tor.x };
    const top = { x: hip.x + tor.x * 4.5, y: hip.y + tor.y * 4.5 };
    const add = (a, v, k) => ({ x: a.x + v.x * k, y: a.y + v.y * k });
    const lerpP = (a, b, f) => ({ x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f });
    const denim = it.id === 'jeans' || it.id === 'denimcut', soft = it.id === 'pajama' || it.id === 'sport' || it.id === 'pinky';
    const metal = it.pat === 'metal';
    const panel = (l, back) => {
      const d = nrm(l.k.x - l.f.x, l.k.y - l.f.y), len = Math.hypot(l.k.x - l.f.x, l.k.y - l.f.y);
      let pn = { x: -d.y, y: d.x };
      if (pn.x * pt.x + pn.y * pt.y < 0) pn = { x: -pn.x, y: -pn.y };   // same side as the waist edge (no twisted shape)
      const m = { x: l.f.x + d.x * len * 0.55, y: l.f.y + d.y * len * 0.55 };   // 1.0.46: a little shorter and slimmer
      const k = back ? 0.76 : 1, W = 4.4, H = 4.7;
      const A = add(top, pt, W), B = add(top, pt, -W), C = add(m, pn, -H), D = add(m, pn, H);
      const mid = lerpP(top, m, 0.5);
      const path = () => {
        g.beginPath(); g.moveTo(A.x, A.y); g.lineTo(B.x, B.y);
        const sb = add(lerpP(B, C, 0.5), pn, -0.9); g.quadraticCurveTo(sb.x, sb.y, C.x, C.y);   // the cloth bulges a little
        const hm = add(m, d, -0.6); g.quadraticCurveTo(hm.x, hm.y, D.x, D.y);                  // a softly curved hem
        const sf = add(lerpP(A, D, 0.5), pn, 0.9); g.quadraticCurveTo(sf.x, sf.y, A.x, A.y);
        g.closePath();
      };
      path();
      const gr = g.createLinearGradient(B.x, B.y, D.x, D.y);   // lit back edge → shaded front/bottom
      gr.addColorStop(0, shade(it.col, k * (metal ? 1.5 : 1.22))); gr.addColorStop(0.5, shade(it.col, k)); gr.addColorStop(1, shade(it.col, k * 0.7));
      g.fillStyle = gr; g.fill();
      if (it.pat) { g.save(); path(); g.clip(); shortsPattern(g, it, top, m, pn, pt, back); g.restore(); }
      g.save(); path(); g.clip();
      // a crease from the crotch, a shadow under the waistband, a highlight down the lit side
      const c1 = add(top, pt, 1.5), c2 = add(mid, pn, 1), c3 = add(m, pn, 2.2);
      g.strokeStyle = `rgba(0,0,0,${soft ? 0.22 : 0.16})`; g.lineWidth = 0.8; g.beginPath(); g.moveTo(c1.x, c1.y); g.quadraticCurveTo(c2.x, c2.y, c3.x, c3.y); g.stroke();
      if (soft) { const f1 = add(lerpP(top, m, 0.55), pn, -2.5), f2 = add(m, pn, -1.5); g.beginPath(); g.moveTo(f1.x, f1.y); g.lineTo(f2.x, f2.y); g.stroke(); }
      { const s1 = add(top, tor, -1.6), e1 = add(s1, pt, -W), e2 = add(s1, pt, W);
        g.fillStyle = 'rgba(0,0,0,0.18)'; g.beginPath(); g.moveTo(A.x, A.y); g.lineTo(B.x, B.y); g.lineTo(e1.x, e1.y); g.lineTo(e2.x, e2.y); g.closePath(); g.fill(); }
      const h1 = add(lerpP(B, C, 0.15), pt, 1.2), h2 = add(lerpP(B, C, 0.8), pn, 1.4);
      g.strokeStyle = `rgba(255,255,255,${metal ? 0.6 : back ? 0.14 : 0.3})`; g.lineWidth = metal ? 1.2 : 0.8; g.beginPath(); g.moveTo(h1.x, h1.y); g.lineTo(h2.x, h2.y); g.stroke();
      // the cuff: a band at the hem with a darker fold above it
      const u1 = add(C, d, 1.8), u2 = add(D, d, 1.8);
      g.fillStyle = it.id === 'sport' ? shade('#ffffff', k) : shade(it.col, k * (denim ? 1.15 : 0.82));
      g.beginPath(); g.moveTo(C.x, C.y); g.lineTo(D.x, D.y); g.lineTo(u2.x, u2.y); g.lineTo(u1.x, u1.y); g.closePath(); g.fill();
      g.strokeStyle = 'rgba(0,0,0,0.25)'; g.lineWidth = 0.5; g.beginPath(); g.moveTo(u1.x, u1.y); g.lineTo(u2.x, u2.y); g.stroke();
      if (denim || it.id === 'camo') { g.strokeStyle = 'rgba(255,214,120,0.85)'; g.lineWidth = 0.45; g.setLineDash([1, 0.9]); const v1 = add(u1, d, -0.8), v2 = add(u2, d, -0.8); g.beginPath(); g.moveTo(v1.x, v1.y); g.lineTo(v2.x, v2.y); g.stroke(); g.setLineDash([]); }
      g.restore();
      path(); g.strokeStyle = shade(it.col, k * 0.5); g.lineWidth = 0.45; g.stroke();
      return { m, pn, d };
    };
    const back = panel(legs[1], true);
    const front = panel(legs[0], false);
    // waistband
    const wbC = it.id === 'sport' ? '#ffffff' : it.pat === 'zebra' || it.pat === 'checker' ? '#212121' : shade(it.col, denim ? 0.85 : 0.68);
    const w1 = add(top, pt, 4.8), w2 = add(top, pt, -4.8), w3 = add(w2, tor, 2.2), w4 = add(w1, tor, 2.2);
    const wg = g.createLinearGradient(w3.x, w3.y, w2.x, w2.y); wg.addColorStop(0, shade(wbC, 1.2)); wg.addColorStop(1, shade(wbC, 0.78));
    g.fillStyle = wg; g.beginPath(); g.moveTo(w1.x, w1.y); g.lineTo(w2.x, w2.y); g.lineTo(w3.x, w3.y); g.lineTo(w4.x, w4.y); g.closePath(); g.fill();
    g.strokeStyle = shade(wbC, 0.55); g.lineWidth = 0.45; g.stroke();
    if (denim || it.id === 'camo' || it.id === 'plaid') {   // belt loops and a button
      g.strokeStyle = shade(wbC, 0.6); g.lineWidth = 1;
      for (const k of [-3.1, 2.6]) { const a = add(top, pt, k), b = add(a, tor, 2.3); g.beginPath(); g.moveTo(a.x, a.y); g.lineTo(b.x, b.y); g.stroke(); }
      const bt = add(add(top, pt, 3.8), tor, 1.1); g.fillStyle = '#cfa349'; g.beginPath(); g.arc(bt.x, bt.y, 0.9, 0, Math.PI * 2); g.fill();
    } else {   // elastic ribs
      g.strokeStyle = 'rgba(0,0,0,0.16)'; g.lineWidth = 0.4;
      for (let k = -3.9; k <= 3.9; k += 1.3) { const a = add(top, pt, k), b = add(a, tor, 2.2); g.beginPath(); g.moveTo(a.x, a.y); g.lineTo(b.x, b.y); g.stroke(); }
    }
    if (it.id === 'sport' || it.id === 'pajama' || it.id === 'pinky') {   // a drawstring bow at the front
      const q = add(add(top, pt, 3.2), tor, 1), cs = it.id === 'sport' ? '#1e88e5' : '#ffffff';
      g.strokeStyle = cs; g.lineWidth = 0.6; g.beginPath(); g.moveTo(q.x, q.y); g.lineTo(q.x - 0.6, q.y + 3.2); g.moveTo(q.x, q.y); g.lineTo(q.x + 0.9, q.y + 2.8); g.stroke();
      g.fillStyle = cs; g.beginPath(); g.arc(q.x, q.y, 0.7, 0, Math.PI * 2); g.fill();
    }
    if (it.id === 'stripes' || it.id === 'sport') {   // side stripes down both legs
      for (const [p, a] of [[back, 0.7], [front, 1]]) {
        const s1 = add(top, pt, 3.4), s2 = add(p.m, p.pn, 3.5);
        g.strokeStyle = `rgba(255,255,255,${a})`; g.lineWidth = 1.4; g.beginPath(); g.moveTo(s1.x, s1.y); g.lineTo(s2.x, s2.y); g.stroke();
        if (it.id === 'sport') { g.strokeStyle = `rgba(30,136,229,${a})`; g.lineWidth = 0.5; g.beginPath(); g.moveTo(s1.x, s1.y); g.lineTo(s2.x, s2.y); g.stroke(); }
      }
    }
    if (it.id === 'camo') {
      for (const p of [back, front]) for (const [f, c2, rr, sd] of [[0.22, '#3f4f22', 2.2, -2], [0.45, '#a3ad6b', 1.8, 2.5], [0.7, '#2e3a18', 1.9, -1], [0.85, '#a3ad6b', 1.3, 3]]) {
        const q = add(lerpP(top, p.m, f), p.pn, sd); g.fillStyle = c2;
        g.beginPath(); g.ellipse(q.x, q.y, rr * 1.2, rr * 0.8, f * 3, 0, Math.PI * 2); g.fill();
      }
    }
    if (it.id === 'plaid') {
      for (const p of [back, front]) {
        g.strokeStyle = 'rgba(0,0,0,0.3)'; g.lineWidth = 1;
        for (const f of [0.3, 0.68]) { const q = lerpP(top, p.m, f); g.beginPath(); g.moveTo(q.x - p.pn.x * 5.5, q.y - p.pn.y * 5.5); g.lineTo(q.x + p.pn.x * 5.5, q.y + p.pn.y * 5.5); g.stroke(); }
        g.strokeStyle = 'rgba(255,235,59,0.65)'; g.lineWidth = 0.6;
        for (const sd of [-2.2, 2.2]) { const a = add(top, pt, sd), b = add(p.m, p.pn, sd); g.beginPath(); g.moveTo(a.x, a.y); g.lineTo(b.x, b.y); g.stroke(); }
      }
    }
    if (denim) {   // stitching, a back pocket, a rivet
      g.strokeStyle = 'rgba(255,214,120,0.85)'; g.lineWidth = 0.5; g.setLineDash([1.2, 1]);
      const s1 = add(top, pt, -1), s2 = add(front.m, front.pn, -0.5); g.beginPath(); g.moveTo(s1.x, s1.y); g.lineTo(s2.x, s2.y); g.stroke();
      const p1 = add(add(top, pt, -4.5), tor, -1.2), p2 = add(lerpP(top, back.m, 0.45), back.pn, -3.5), p3 = add(lerpP(top, back.m, 0.45), back.pn, -0.5);
      g.beginPath(); g.moveTo(p1.x, p1.y); g.lineTo(p2.x, p2.y); g.lineTo(p3.x, p3.y); g.stroke(); g.setLineDash([]);
      const rv = add(add(top, pt, 3.5), tor, -1.4); g.fillStyle = '#cfa349'; g.beginPath(); g.arc(rv.x, rv.y, 0.55, 0, Math.PI * 2); g.fill();
    }
  }

  function roundRectOn(g, x, y, w, h, r) {
    g.beginPath();
    g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r);
    g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath();
  }
  const roundRect = (x, y, w, h, r) => roundRectOn(ctx, x, y, w, h, r);

  // ---------- Cosmetics: trails, jump effects, pets, particles ----------
  const RAINBOW = ['#e53935', '#fb8c00', '#fdd835', '#43a047', '#1e88e5', '#8e24aa'];

  function cosmeticsStep(dt) {
    petHist.push([time, player.y]);   // 1.0.47: the pet repeats the stickman's jump 0.12 s later — the same fast fall
    while (petHist.length > 1 && petHist[1][0] <= time - 0.12) petHist.shift();
    petY = petHist[0][1];
    {   // 1.0.46: is the pet jumping, falling or just landing?
      const pv = dt > 0 ? (petY - petPrevY) / dt : 0; petPrevY = petY;
      const air = petY > 3 && Math.abs(pv) > 25;
      if (petWasAir && petY <= 3) petLandT = 0.18;
      petWasAir = air || (petWasAir && petY > 3);
      petLandT = Math.max(0, petLandT - dt);
      petAct = { air, up: pv > 0, land: petLandT / 0.18 };
    }
    // premium stickmen sparkle
    const cItem = findItem('color', gl().color);
    if (cItem && cItem.gem && player.visible && Math.random() < dt * 20)
      particles.push({ k: 's', x: dist + (Math.random() - 0.5) * 28, y: player.y + 6 + Math.random() * 58, vx: -30 - Math.random() * 30, vy: 10 + Math.random() * 30, g: 0,
                       life: 0.6, l0: 0.6, r: 2.5 + Math.random() * 2.5, col: Math.random() < 0.6 ? '#fff' : cItem.col });
    { const sk = skinOf(gl()); if (sk && sk.fx && player.visible && state === 'play' && Math.random() < dt * 30) sk.fx(particles, dist, player.y); }   // the character's own running effect
    { const pf = PET_FX[gl().pet]; if (pf && state === 'play' && Math.random() < dt * 14) pf(particles, dist - 40, petY + (PET_FLY.includes(gl().pet) ? 60 : 10)); }   // a premium pet's own trail
    const tr = gl().trail;
    if (!tr || !player.visible) { trailHist.length = 0; return; }
    const hy = player.y + (sliding() ? 10 : 30);
    if (tr === 'rainbow' || tr === 'aurora') {
      trailHist.push({ x: dist, y: hy });
      while (trailHist.length && trailHist[0].x < dist - 170) trailHist.shift();
      if (trailHist.length > 400) trailHist.splice(0, trailHist.length - 400);
      return;
    }
    trailT -= dt;
    if (trailT > 0) return;
    trailT = trailSpawn(tr, dist - 8, hy, particles);
  }

  // pushes one trail particle at (x, hy) into out; returns the time until the next one
  let pawSide = 0;
  const PET_FX = {
    p_phoenix: (o, x, y) => o.push({ k: 'c', fire: 1, x: x - 8, y: y + (Math.random() - 0.5) * 6, vx: -40, vy: 20, g: 0, life: 0.5, l0: 0.5, r: 2 + Math.random() * 1.5, col: '#ffd23f' }),
    p_unicorn: (o, x, y) => o.push({ k: 's', x: x - 10, y: y + Math.random() * 10, vx: -30, vy: 10, g: 0, life: 0.6, l0: 0.6, r: 2.2, col: ['#ff80ab', '#fff59d', '#80deea', '#b388ff'][Math.floor(Math.random() * 4)] }),
    p_dino: (o, x, y) => { if (y < 14) o.push({ k: 'c', grow: 1, x: x - 4, y: 2, vx: -30, vy: 20, g: 0, life: 0.4, l0: 0.4, r: 2.2, col: 'rgba(190,170,140,0.6)' }); },
    p_kitsune: (o, x, y) => o.push({ k: 'c', x: x - 18, y: y + 6 + Math.random() * 8, vx: -20, vy: 30, g: 0, life: 0.7, l0: 0.7, r: 1.8, col: 'rgba(64,196,255,0.85)' }),
    p_spiritcat: (o, x, y) => o.push({ k: 'c', grow: 1, x: x - 14, y: y + 4 + Math.random() * 6, vx: -30, vy: 20, g: 0, life: 0.6, l0: 0.6, r: 2, col: 'rgba(178,235,242,0.5)' }),
    p_kraken: (o, x, y) => o.push({ k: 'o', x: x + 4, y: y - 10, vx: -10, vy: 40, g: 0, life: 0.9, l0: 0.9, r: 1.5 + Math.random() * 2, col: 'rgba(179,157,219,0.9)' }),
    p_golem: (o, x, y) => o.push({ k: 's', x: x - 4, y: y + 16, vx: -30, vy: 20, g: 0, life: 0.5, l0: 0.5, r: 1.6, col: ['#b388ff', '#80d8ff', '#ea80fc'][Math.floor(Math.random() * 3)] }),
    p_pegasus: (o, x, y) => o.push({ k: 'l', x: x - 10, y: y + 14, vx: -30, vy: 10, g: 0.05, life: 0.9, l0: 0.9, col: '#ffffff' }),
    p_maneki: (o, x, y) => { if (Math.random() < 0.2) o.push({ k: 'coinpop', x: x, y: y + 20, vx: -20, vy: 120, g: 0.4, life: 0.5, l0: 0.5, col: '#ffcc1a' }); }
  };
  function trailSpawn(tr, x, hy, out) {
    const next = { paws: 0.13, petals: 0.09, bluefire: 0.025, pixels: 0.04, musictrail: 0.15, shadowtrail: 0.04, tinsel: 0.03, goldtrail: 0.035, comet: 0.02, bubbles: 0.09, fire: 0.025, hearts: 0.12, lightning: 0.06, smoke: 0.05, snow: 0.06, leaves: 0.1, startrail: 0.06 }[tr] || 0.03;
    if (tr === 'petals') out.push({ k: 'l', x, y: hy + (Math.random() - 0.5) * 18, vx: -40, vy: 6, g: 0.08, life: 0.9, l0: 0.9, col: Math.random() < 0.6 ? '#f8bbd0' : '#fce4ec' });
    if (tr === 'bluefire') out.push({ k: 'c', fire: 2, x, y: hy - 6 + Math.random() * 8, vx: -40 - Math.random() * 40, vy: 30 + Math.random() * 50, g: 0, life: 0.5, l0: 0.5, r: 4 + Math.random() * 2.5, col: '#80d8ff' });
    if (tr === 'pixels') out.push({ x, y: hy + (Math.random() - 0.5) * 20, vx: -50, vy: 0, g: 0, life: 0.6, l0: 0.6, sz: 3.5, col: ['#e53935', '#43a047', '#1e88e5', '#fdd835', '#8e24aa'][Math.floor(Math.random() * 5)] });
    if (tr === 'musictrail') out.push({ k: 't', txt: Math.random() < 0.5 ? '♪' : '♫', fs: 12, x, y: hy + (Math.random() - 0.5) * 16, vx: -40, vy: 30, g: 0, life: 0.8, l0: 0.8, col: ['#7c4dff', '#ec407a', '#00897b'][Math.floor(Math.random() * 3)] });
    if (tr === 'shadowtrail') out.push({ k: 'c', grow: 1, x, y: hy - 4 + (Math.random() - 0.5) * 10, vx: -30, vy: 0, g: 0, life: 0.6, l0: 0.6, r: 4, col: 'rgba(40,30,60,0.45)' });
    if (tr === 'tinsel') {   // shiny multi-coloured tinsel bits
      const tc = ['#e53935', '#ffd54f', '#43a047', '#40c4ff', '#e1bee7'];
      out.push({ x, y: hy + (Math.random() - 0.5) * 18, vx: -40 - Math.random() * 30, vy: (Math.random() - 0.5) * 40, g: 0.15, life: 0.7, l0: 0.7, sz: 2.5, col: tc[Math.floor(Math.random() * 5)] });
      if (Math.random() < 0.3) out.push({ k: 's', x, y: hy + (Math.random() - 0.5) * 14, vx: -30, vy: 0, g: 0, life: 0.5, l0: 0.5, r: 2.5, col: '#fffde7' });
    }
    if (tr === 'paws') {   // prints stay where the feet were, left / right in turn
      pawSide = 1 - pawSide;
      out.push({ k: 'p', x: x + 6, y: 2 + pawSide * 3, vx: 0, vy: 0, g: 0, life: 1.4, l0: 1.4, r: 3, col: 'rgba(110,70,35,0.8)' });
    }
    if (tr === 'goldtrail') {
      out.push({ k: 's', x, y: hy + (Math.random() - 0.5) * 20, vx: -30 - Math.random() * 30, vy: (Math.random() - 0.5) * 30, g: 0, life: 0.6, l0: 0.6, r: 2.2 + Math.random() * 2, col: Math.random() < 0.6 ? '#ffd54f' : '#fff8e1' });
      out.push({ k: 'c', x, y: hy + (Math.random() - 0.5) * 12, vx: -20, vy: -10, g: 0.1, life: 0.5, l0: 0.5, r: 1.4, col: 'rgba(255,193,7,0.9)' });
    }
    if (tr === 'comet') {
      out.push({ k: 'c', x, y: hy + (Math.random() - 0.5) * 8, vx: -20, vy: 0, g: 0, life: 0.5, l0: 0.5, r: 4.5, col: Math.random() < 0.5 ? 'rgba(179,229,252,0.95)' : 'rgba(255,255,255,0.95)' });
      if (Math.random() < 0.25) out.push({ k: 's', x, y: hy + (Math.random() - 0.5) * 14, vx: -60, vy: (Math.random() - 0.5) * 40, g: 0, life: 0.5, l0: 0.5, r: 3, col: '#e1f5fe' });
    }
    if (tr === 'smoke') out.push({ k: 'c', grow: 1, x, y: hy - 8, vx: -30, vy: 20, g: 0, life: 0.7, l0: 0.7, r: 4, col: 'rgba(160,160,170,0.45)' });
    if (tr === 'snow') out.push({ k: 'c', x, y: hy + (Math.random() - 0.3) * 24, vx: -20, vy: -10, g: 0.05, life: 0.9, l0: 0.9, r: 2.2, col: '#ffffff' });
    if (tr === 'leaves') out.push({ k: 'l', x, y: hy + (Math.random() - 0.5) * 18, vx: -50, vy: 10, g: 0.1, life: 0.9, l0: 0.9, col: ['#66bb6a', '#ffa726', '#ef5350', '#d4e157'][Math.floor(Math.random() * 4)] });
    if (tr === 'startrail') out.push({ k: 's', x, y: hy + (Math.random() - 0.5) * 16, vx: -40, vy: 0, g: 0, life: 0.6, l0: 0.6, r: 3.5, col: Math.random() < 0.5 ? '#ffd54f' : '#fff59d' });
    if (tr === 'hearts') out.push({ k: 'h', x, y: hy, vx: -30, vy: 30 + Math.random() * 30, g: 0, life: 0.8, l0: 0.8, col: Math.random() < 0.5 ? '#ff4d6d' : '#ff8fab' });
    if (tr === 'lightning') out.push({ k: 'z', x, y: hy + (Math.random() - 0.5) * 20, vx: -60, vy: 0, g: 0, life: 0.18, l0: 0.18, r: 10, col: '#fff176' });
    if (tr === 'fire') out.push({ k: 'c', fire: 1, x, y: hy - 6 + Math.random() * 8, vx: -40 - Math.random() * 40, vy: 30 + Math.random() * 50, g: 0, life: 0.5, l0: 0.5, r: 4 + Math.random() * 2.5, col: '#ffd23f' });
    else if (tr === 'sparks') out.push({ k: 'k', x, y: hy + (Math.random() - 0.5) * 20, vx: -80 - Math.random() * 160, vy: (Math.random() - 0.2) * 200, g: 0.6, life: 0.4, l0: 0.4, col: Math.random() < 0.5 ? '#fff59d' : '#ffca28' });
    else if (tr === 'bubbles') out.push({ k: 'o', x, y: hy + (Math.random() - 0.5) * 16, vx: -30, vy: 40 + Math.random() * 30, g: 0, life: 0.9, l0: 0.9, r: 3 + Math.random() * 4, col: 'rgba(130,200,255,0.95)' });
    return next;
  }

  const AURORA = ['rgba(105,240,174,0.55)', 'rgba(64,196,255,0.45)', 'rgba(179,136,255,0.5)'];
  function drawTrail() {
    const tr = gl().trail;
    if (tr === 'aurora' && trailHist.length > 1) {   // three soft waving bands of light
      ctx.lineCap = 'round';
      AURORA.forEach((col, i) => {
        ctx.strokeStyle = col; ctx.lineWidth = 6 - i;
        ctx.beginPath();
        trailHist.forEach((h, j) => { const X = sx(h.x), Y = groundY - h.y + (i - 1) * 6 + Math.sin(j * 0.15 + time * 5 + i) * 3; if (j) ctx.lineTo(X, Y); else ctx.moveTo(X, Y); });
        ctx.stroke();
      });
      return;
    }
    if (tr !== 'rainbow' || trailHist.length < 2) return;
    ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.globalAlpha = 0.85;
    RAINBOW.forEach((col, i) => {
      ctx.strokeStyle = col; ctx.beginPath();
      trailHist.forEach((h, j) => { const X = sx(h.x), Y = groundY - h.y + (i - 2.5) * 3; if (j) ctx.lineTo(X, Y); else ctx.moveTo(X, Y); });
      ctx.stroke();
    });
    ctx.globalAlpha = 1;
  }

  function jumpFx() {   // 1.0.49: the burst moves on with the stickman for a moment, so it is under him, not under the pet
    const n0 = particles.length; jumpFx0();
    const sk = skinOf(gl()); if (sk && sk.jump) sk.jump(particles, dist, player.y);   // the character's own jump effect
    const v = (state === 'play' ? baseSpeed() * slow : 150) * 0.9;
    for (let i = n0; i < particles.length; i++) particles[i].vx += v;
  }
  function jumpFx0() {
    const j = gl().jump;
    if (!j) return;
    const y = player.y + 2;
    if (j === 'cloud') for (let k = 0; k < 7; k++)
      particles.push({ k: 'c', x: dist + (Math.random() - 0.5) * 10, y, vx: (Math.random() - 0.5) * 160, vy: Math.random() * 30, g: 0, life: 0.5, l0: 0.5, r: 5 + Math.random() * 3, col: 'rgba(255,255,255,0.95)' });
    else if (j === 'stars') for (let k = 0; k < 6; k++) {
      const a = Math.random() * Math.PI;
      particles.push({ k: 's', x: dist, y, vx: Math.cos(a) * 150, vy: Math.sin(a) * 120, g: 0.5, life: 0.6, l0: 0.6, r: 5, col: '#ffd23f' });
    }
    else if (j === 'puff') for (let k = 0; k < 8; k++)
      particles.push({ k: 'c', grow: 1, x: dist + (Math.random() - 0.5) * 14, y: y + 2, vx: (Math.random() - 0.5) * 140, vy: Math.random() * 40, g: 0, life: 0.5, l0: 0.5, r: 4, col: 'rgba(200,190,170,0.75)' });
    else if (j === 'rings') for (let k = 0; k < 2; k++)
      particles.push({ k: 'o', grow: 1, x: dist, y: y + 2 + k * 6, vx: 0, vy: -20, g: 0, life: 0.45 + k * 0.1, l0: 0.45 + k * 0.1, r: 6, col: '#4fc3f7' });
    else if (j === 'love') for (let k = 0; k < 6; k++) {
      const a = Math.random() * Math.PI;
      particles.push({ k: 'h', x: dist, y: y + 6, vx: Math.cos(a) * 130, vy: Math.sin(a) * 110, g: 0.3, life: 0.7, l0: 0.7, col: '#ff4d6d' });
    }
    else if (j === 'confetti') for (let k = 0; k < 12; k++)
      particles.push({ x: dist, y: y + 6, vx: (Math.random() - 0.5) * 400, vy: 100 + Math.random() * 180, g: 0.6, life: 0.8, l0: 0.8, sz: 4, col: `hsl(${Math.floor(Math.random() * 360)},90%,60%)` });
    else if (j === 'splash') for (let k = 0; k < 12; k++) { const a = Math.PI * (0.1 + 0.8 * k / 11); particles.push({ k: 'c', x: dist, y: y + 1, vx: Math.cos(a) * 160, vy: Math.sin(a) * 180, g: 0.8, life: 0.55, l0: 0.55, r: 2.2, col: k % 2 ? '#4fc3f7' : '#b3e5fc' }); }
    else if (j === 'leafjump') for (let k = 0; k < 8; k++) particles.push({ k: 'l', x: dist + (Math.random() - 0.5) * 14, y: y + 4, vx: (Math.random() - 0.5) * 160, vy: 60 + Math.random() * 80, g: 0.2, life: 0.8, l0: 0.8, col: ['#ef6c00', '#c62828', '#f9a825', '#7cb342'][k % 4] });
    else if (j === 'bolt') for (let k = 0; k < 4; k++) particles.push({ k: 'z', x: dist + (k - 1.5) * 10, y: y + 8, vx: (k - 1.5) * 40, vy: 30, g: 0, life: 0.25, l0: 0.25, r: 9, col: '#ffeb3b' });
    else if (j === 'flowerburst') for (let k = 0; k < 10; k++) { const a = Math.random() * Math.PI; particles.push({ k: 'c', x: dist, y: y + 4, vx: Math.cos(a) * 140, vy: Math.sin(a) * 130, g: 0.4, life: 0.7, l0: 0.7, r: 2.6, col: ['#ff80ab', '#fff59d', '#ce93d8', '#ffffff'][k % 4] }); }
    else if (j === 'portal') for (let k = 0; k < 3; k++) particles.push({ k: 'o', grow: 1, x: dist, y: y + 2 + k * 3, vx: 0, vy: 0, g: 0, life: 0.4 + k * 0.1, l0: 0.4 + k * 0.1, r: 6 + k * 2, col: k % 2 ? '#e040fb' : '#7c4dff' });
    else if (j === 'coinburst') for (let k = 0; k < 8; k++) { const a = Math.PI * (0.15 + 0.7 * k / 7); particles.push({ k: 'c', x: dist, y: y + 6, vx: Math.cos(a) * 140, vy: Math.sin(a) * 200, g: 0.7, life: 0.7, l0: 0.7, r: 3, col: k % 2 ? '#ffcc1a' : '#ffe082' }); }
    else if (j === 'feathers') for (let k = 0; k < 6; k++) particles.push({ k: 'l', x: dist + (Math.random() - 0.5) * 16, y: y + 6, vx: (Math.random() - 0.5) * 100, vy: 40 + Math.random() * 40, g: 0.05, life: 1, l0: 1, col: k % 2 ? '#ffffff' : '#eceff1' });
    else if (j === 'icejump') for (let k = 0; k < 7; k++) { const a = Math.PI * (k / 6); particles.push({ k: 's', x: dist, y: y + 3, vx: Math.cos(a) * 130, vy: Math.sin(a) * 110, g: 0.5, life: 0.55, l0: 0.55, r: 3, col: k % 2 ? '#b3e5fc' : '#e1f5fe' }); }
    else if (j === 'bubblejump') for (let k = 0; k < 7; k++) particles.push({ k: 'o', x: dist + (Math.random() - 0.5) * 18, y: y + 4, vx: (Math.random() - 0.5) * 80, vy: 60 + Math.random() * 70, g: 0, life: 0.8, l0: 0.8, r: 2 + Math.random() * 3, col: 'rgba(130,200,255,0.95)' });
    else if (j === 'snowburst') {
      for (let k = 0; k < 14; k++) { const a = Math.PI * (k / 13); particles.push({ k: 'c', x: dist, y: y + 2, vx: Math.cos(a) * (120 + Math.random() * 80), vy: Math.sin(a) * (80 + Math.random() * 100), g: 0.4, life: 0.6, l0: 0.6, r: 2 + Math.random() * 1.5, col: '#ffffff' }); }
      for (let k = 0; k < 3; k++) particles.push({ k: 's', x: dist + (k - 1) * 12, y: y + 10, vx: (k - 1) * 40, vy: 90, g: 0.2, life: 0.6, l0: 0.6, r: 3.5, col: '#e3f2fd' });
    }
    else if (j === 'sunburst') {   // a little sun flares under the feet and throws out rays
      particles.push({ k: 'c', x: dist, y: y + 4, vx: 0, vy: 0, g: 0, life: 0.35, l0: 0.35, r: 9, col: 'rgba(255,214,0,0.9)' });
      for (let k = 0; k < 10; k++) { const a = Math.PI * (k / 9); particles.push({ k: 'r', a, x: dist + Math.cos(a) * 8, y: y + 4 + Math.sin(a) * 8, vx: Math.cos(a) * 170, vy: Math.sin(a) * 170, g: 0, life: 0.45, l0: 0.45, r: 9, col: k % 2 ? '#ffb300' : '#ffe082' }); }
    }
    else if (j === 'shockwave') {
      for (let k = 0; k < 3; k++) particles.push({ k: 'o', grow: 1, x: dist, y: y + 1, vx: 0, vy: 0, g: 0, life: 0.35 + k * 0.12, l0: 0.35 + k * 0.12, r: 8 + k * 4, col: k ? 'rgba(129,212,250,0.8)' : 'rgba(255,255,255,0.95)' });
      for (let k = 0; k < 10; k++) particles.push({ k: 'c', x: dist + (Math.random() - 0.5) * 10, y, vx: (k % 2 ? 1 : -1) * (120 + Math.random() * 120), vy: 20 + Math.random() * 40, g: 0.4, life: 0.4, l0: 0.4, r: 2.5, col: 'rgba(200,190,170,0.8)' });
    }
    else if (j === 'fireworks') {
      const base = Math.floor(Math.random() * 360);
      for (let k = 0; k < 16; k++) {
        const a = k / 16 * Math.PI * 2, sp2 = 150 + Math.random() * 60;
        particles.push({ k: 'c', x: dist, y: y + 30, vx: Math.cos(a) * sp2, vy: Math.sin(a) * sp2, g: 0.35, life: 0.7, l0: 0.7, r: 2.6, col: `hsl(${(base + k * 22) % 360},95%,62%)` });
      }
      for (let k = 0; k < 4; k++) particles.push({ k: 's', x: dist, y: y + 30, vx: (Math.random() - 0.5) * 120, vy: (Math.random() - 0.5) * 120, g: 0, life: 0.6, l0: 0.6, r: 4, col: '#fff59d' });
      particles.push({ k: 'o', grow: 1, x: dist, y: y + 30, vx: 0, vy: 0, g: 0, life: 0.4, l0: 0.4, r: 8, col: 'rgba(255,255,255,0.9)' });
    }
    else if (j === 'notes') for (let k = 0; k < 3; k++)
      particles.push({ k: 't', txt: k % 2 ? '♪' : '♫', x: dist - 6 + k * 8, y: y + 10, vx: (Math.random() - 0.5) * 60, vy: 70 + Math.random() * 40, g: 0, life: 0.8, l0: 0.8, col: '#7c4dff' });
  }

  function starPath(g, x, y, r) {
    g.beginPath();
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r;
      g.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr);
    }
    g.closePath();
  }

  // 1.0.46: a bit of nature for every particle — air drag, light things flutter and tumble, smoke and fire rise,
  // bubbles wobble, stars and squares spin; fading in and out is smooth
  function partNature(q, dt) {
    if (q.age === undefined) { q.age = 0; q.seed = Math.random() * 6.28; q.rot = Math.random() * 6.28; q.spin = (Math.random() - 0.5) * 6; }
    q.age += dt;
    const light = q.k === 'l' || q.k === 'o' || q.grow;
    const drag = light ? 2.2 : q.k === 'c' || q.k === 's' ? 1.1 : 0.5;
    q.vx *= Math.max(0, 1 - drag * dt); if (light) q.vy *= Math.max(0, 1 - drag * 0.6 * dt);
    if (q.k === 'l') { q.x += Math.sin(q.age * 7 + q.seed) * 26 * dt; q.vy -= 40 * dt; q.rot += q.spin * 1.4 * dt; }   // flutters and tumbles down slowly
    else if (q.k === 'o') { q.x += Math.sin(q.age * 9 + q.seed) * 14 * dt; q.vy += 20 * dt; }                       // bubbles wobble up
    else if (q.grow) q.vy += 22 * dt;                                                                                 // smoke rises
    else q.rot += q.spin * dt;
    if (q.fire) q.vy += 60 * dt;
  }
  const FIRE_COLS = [[255, 245, 180], [255, 200, 60], [255, 120, 20], [200, 40, 20], [70, 60, 60]];
  const BLUE_COLS = [[235, 250, 255], [130, 216, 255], [41, 121, 255], [30, 60, 200], [50, 50, 80]];
  function drawParticle(g, q, X, Y) {
    const f0 = q.l0 ? Math.max(0, Math.min(1, q.life / q.l0)) : Math.min(1, q.life * 2);
    const fin = q.age !== undefined && q.age < 0.06 ? q.age / 0.06 : 1;   // a quick fade-in, then a smooth fade-out
    g.globalAlpha = Math.max(0, Math.min(1, Math.pow(f0, 0.7) * 1.25)) * fin;
    if (q.fire) {   // fire changes colour as it burns: white-yellow → orange → red → smoke
      const C = q.fire === 2 ? BLUE_COLS : FIRE_COLS, u = (1 - f0) * (C.length - 1), i0 = Math.min(C.length - 2, Math.floor(u)), w = u - i0;
      const cc = C[i0].map((v, j) => Math.round(v + (C[i0 + 1][j] - v) * w)); q.col = `rgb(${cc.join(',')})`;
    }
    g.fillStyle = q.col; g.strokeStyle = q.col;
    const f = q.l0 ? Math.max(0.2, q.life / q.l0) : 1;
    if (!q.k) { const s = (q.sz || 6) * (0.6 + 0.4 * f); g.save(); g.translate(X, Y); g.rotate(q.rot || 0); g.fillRect(-s / 2, -s / 2, s, s); g.restore(); }
    else if (q.k === 'k') {   // a spark: a short bright streak along its motion
      const L = Math.min(9, Math.hypot(q.vx, q.vy) * 0.025) + 1; const a = Math.atan2(-q.vy, q.vx);
      g.lineWidth = 1.6; g.lineCap = 'round'; g.beginPath(); g.moveTo(X, Y); g.lineTo(X - Math.cos(a) * L, Y - Math.sin(a) * L); g.stroke();
    }
    else if (q.k === 'c') { g.beginPath(); g.arc(X, Y, q.grow ? q.r * (1 + (1 - f) * 1.6) : q.r * (0.4 + 0.6 * f), 0, Math.PI * 2); g.fill(); }
    else if (q.k === 'o') { g.lineWidth = 1.5; g.beginPath(); g.arc(X, Y, q.grow ? q.r * (1 + (1 - f) * 2.5) : q.r, 0, Math.PI * 2); g.stroke(); }
    else if (q.k === 'l') {   // a leaf / petal / feather: a pointed shape that tumbles (it turns edge-on now and then)
      g.save(); g.translate(X, Y); g.rotate(q.rot !== undefined ? q.rot : q.x * 0.05); g.scale(1, 0.35 + 0.65 * Math.abs(Math.cos((q.age || 0) * 5 + (q.seed || 0))));
      g.beginPath(); g.moveTo(-4.5, 0); g.quadraticCurveTo(0, -3, 4.5, 0); g.quadraticCurveTo(0, 3, -4.5, 0); g.fill();
      g.strokeStyle = 'rgba(0,0,0,0.18)'; g.lineWidth = 0.5; g.beginPath(); g.moveTo(-3.5, 0); g.lineTo(3.5, 0); g.stroke(); g.restore();
    }
    else if (q.k === 's') { g.save(); g.translate(X, Y); g.rotate((q.rot || 0) * 0.5); starPath(g, 0, 0, q.r * f); g.fill(); g.restore(); }
    else if (q.k === 'h') drawHeart(g, X, Y, 0.55 + 0.25 * f, q.col);
    else if (q.k === 'z') {
      g.lineWidth = 2; g.beginPath(); g.moveTo(X + q.r, Y - q.r);
      g.lineTo(X + 2, Y - 2); g.lineTo(X + 5, Y + 1); g.lineTo(X - q.r, Y + q.r); g.stroke();
    }
    else if (q.k === 't') { g.font = `800 ${q.fs || 14}px system-ui, sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(q.txt, X, Y); }
    else if (q.k === 'web') {   // a shot of web: a line from the hand and a small web at its end
      const L = (1 - f) * 30 + 6; g.lineWidth = 1; g.beginPath(); g.moveTo(X - L * 0.35, Y + L); g.lineTo(X, Y); g.stroke();
      for (let a = 0; a < 6; a++) { g.beginPath(); g.moveTo(X, Y); g.lineTo(X + Math.cos(a * 1.05) * 5, Y + Math.sin(a * 1.05) * 5); g.stroke(); } g.beginPath(); g.arc(X, Y, 3, 0, Math.PI * 2); g.stroke();
    }
    else if (q.k === 'coinpop') { drawCoinAt(g, X, Y, 5, (q.age || 0) * 18, 0); }
    else if (q.k === 'p') {   // a paw print: a pad and four toes
      const r = q.r; g.beginPath(); g.ellipse(X, Y, r, r * 0.8, 0, 0, Math.PI * 2); g.fill();
      for (const [dx, dy] of [[-1.25, -1.1], [-0.45, -1.55], [0.45, -1.55], [1.25, -1.1]]) { g.beginPath(); g.ellipse(X + dx * r, Y + dy * r, r * 0.36, r * 0.42, 0, 0, Math.PI * 2); g.fill(); }
    }
    else if (q.k === 'r') {   // a sun ray flying out from the centre
      g.lineWidth = 2.2; g.lineCap = 'round'; const L = q.r * f;
      g.beginPath(); g.moveTo(X - Math.cos(q.a) * L, Y + Math.sin(q.a) * L); g.lineTo(X, Y); g.stroke();
    }
  }

  // pets: (x, y) = the ground point under the pet
  // =====================================================================
  //  Pets — 1.0.19: all redrawn: shading, a real walk / flight cycle, blinking.
  //  (x, y) is the point on the ground under the pet, facing right; still = standing (after the finish).
  // =====================================================================
  const pE = (g, x, y, rx, ry, rot, fill) => { g.fillStyle = fill; g.beginPath(); g.ellipse(x, y, Math.max(0.1, rx), Math.max(0.1, ry), rot || 0, 0, Math.PI * 2); g.fill(); };
  const vGrad = (g, y0, y1, a, b) => { const gr = g.createLinearGradient(0, y0, 0, y1); gr.addColorStop(0, a); gr.addColorStop(1, b); return gr; };
  const rGrad = (g, x, y, r, col, k1, k2) => {
    const gr = g.createRadialGradient(x - r * 0.35, y - r * 0.4, r * 0.1, x, y, r * 1.05);
    gr.addColorStop(0, shade(col, k1 || 1.25)); gr.addColorStop(1, shade(col, k2 || 0.8)); return gr;
  };
  const line = (g, pts, col, w) => {
    g.strokeStyle = col; g.lineWidth = w; g.lineCap = 'round'; g.lineJoin = 'round';
    g.beginPath(); g.moveTo(pts[0], pts[1]); for (let i = 2; i < pts.length; i += 2) g.lineTo(pts[i], pts[i + 1]); g.stroke();
  };
  // eye with a highlight; blinks now and then; kind: 'slit' (cats) / 'round' iris / plain dark
  function petEye(g, x, y, r, t, iris, kind, seed) {
    if (((t + (seed || 0)) % 3.4) < 0.13) { line(g, [x - r, y, x, y + r * 0.45, x + r, y], '#111', Math.max(0.8, r * 0.45)); return; }
    if (iris) {
      pE(g, x, y, r, r, 0, iris);
      if (kind === 'slit') pE(g, x + r * 0.1, y, r * 0.32, r * 0.85, 0, '#111');
      else pE(g, x + r * 0.1, y + r * 0.05, r * 0.58, r * 0.62, 0, '#111');
    } else pE(g, x, y, r, r * 1.05, 0, '#141414');
    pE(g, x - r * 0.32, y - r * 0.38, r * 0.34, r * 0.34, 0, '#fff');
    pE(g, x + r * 0.35, y + r * 0.35, r * 0.14, r * 0.14, 0, 'rgba(255,255,255,0.7)');
  }
  // 1.0.44: a leg in three segments — upper (with a muscle), lower, and the paw bone. Front legs fold at the
  // wrist while the paw is lifted; hind legs have a backward hock like real dogs and cats. Joints are rounded.
  function petLeg(g, hx, hy, L, ph, still, front, col, w, paw, joint) {
    const sw = still ? 0 : Math.sin(ph) * 0.55;
    const lift = still ? 0 : Math.max(0, Math.cos(ph)) * (front ? 1.0 : 0.75);
    let a1, a2, a3, k = front ? 1 : 1.045;
    if (petAirPose > 0) { if (front) { a1 = 1.0; a2 = 0.75; a3 = 1.05; } else { a1 = -0.75; a2 = -1.0; a3 = -0.7; } }        // take-off: front legs reach, hind legs push back
    else if (petAirPose < 0) { if (front) { a1 = 0.55; a2 = 0.3; a3 = 0.45; } else { a1 = 0.65; a2 = -0.55; a3 = 0.35; } }   // coming down: legs ready to land
    else if (front) { a1 = sw; a2 = a1 - lift * 1.1; a3 = a2 + lift * 1.5 + 0.15; }
    else { a1 = sw + 0.25; a2 = a1 - 0.6 - lift * 0.6; a3 = a2 + 0.6 + lift * 0.9; }
    const u = L * 0.42 * k, m = L * 0.36 * k, lo = L * 0.22 * k;
    const kx = hx + Math.sin(a1) * u, ky = hy + Math.cos(a1) * u;
    const jx = kx + Math.sin(a2) * m, jy = ky + Math.cos(a2) * m;
    const fx = jx + Math.sin(a3) * lo, fy = jy + Math.cos(a3) * lo;
    // the muscle of the upper leg (thigh / shoulder), then the bones, thinner towards the paw
    pE(g, (hx + kx) / 2, (hy + ky) / 2 - 0.4, w * (front ? 0.75 : 0.95), u * 0.62, -a1, col);
    line(g, [hx, hy, kx, ky], col, w * 1.1);
    line(g, [kx, ky, jx, jy], col, w * 0.88);
    line(g, [jx, jy, fx, fy], col, w * 0.74);
    if (joint) { pE(g, kx, ky, w * 0.55, w * 0.55, 0, joint); pE(g, jx, jy, w * 0.42, w * 0.42, 0, joint); }
    else pE(g, jx, jy, w * 0.4, w * 0.4, 0, shade(col[0] === '#' || col[0] === 'r' ? col : '#888888', 0.88));
    if (paw) { pE(g, fx + 0.9, fy - w * 0.12, w * 0.7, w * 0.44, 0, paw); line(g, [fx + 0.6, fy - w * 0.45, fx + 0.9, fy + w * 0.2], 'rgba(0,0,0,0.18)', 0.4); }
  }
  // 1.0.44: a tail made of a chain of segments. A wave runs from the root to the tip (each segment moves a little
  // later than the one before), so it swishes like a real tail. o: n segments, len, w0→w1 widths (or prof(f)),
  // a = root direction (rad, canvas), curl = bend per segment, root = swing at the root, amp / lag = the wave,
  // fq = speed, flick = only now and then (deer), tip / tipFrom = tip colour, r = overrides while running.
  function tailChain(g, x, y, t, run, o) {
    if (run && o.r) o = Object.assign({}, o, o.r);
    const n = o.n || 6, sl = o.len / n, fq = o.fq || 4, ph0 = o.ph || 0;
    const rootSw = o.flick ? Math.pow(Math.max(0, Math.sin(fq * t * 0.5 + ph0)), 6) * (o.root || 0) : (o.root || 0) * Math.sin(fq * t + ph0);
    let a = o.a + rootSw, px = x, py = y;
    const pts = [[x, y]];
    for (let i = 0; i < n; i++) {
      a += (o.curl || 0) + (o.amp || 0) * Math.sin(fq * t - (i + 1) * (o.lag || 0.6) + ph0);
      px += Math.cos(a) * sl; py += Math.sin(a) * sl; pts.push([px, py]);
    }
    const W = f => o.prof ? o.prof(f) : o.w0 + (o.w1 - o.w0) * f;
    // one smooth tapered shape along the chain (no seams between segments)
    const shape = (i0, dy) => {
      const L2 = [], R2 = [];
      for (let j = i0; j <= n; j++) {
        const pa = pts[Math.max(0, j - 1)], pb = pts[Math.min(n, j + 1)];
        const dx = pb[0] - pa[0], dyy = pb[1] - pa[1], dl = Math.hypot(dx, dyy) || 1, h = W(j / n) / 2;
        L2.push([pts[j][0] - dyy / dl * h, pts[j][1] + dx / dl * h + dy]); R2.push([pts[j][0] + dyy / dl * h, pts[j][1] - dx / dl * h + dy]);
      }
      g.beginPath(); L2.forEach(([qx, qy], j) => j ? g.lineTo(qx, qy) : g.moveTo(qx, qy));
      const e = pts[n], ang = Math.atan2(pts[n][1] - pts[n - 1][1], pts[n][0] - pts[n - 1][0]);
      g.arc(e[0], e[1] + dy, W(1) / 2, ang + Math.PI / 2, ang - Math.PI / 2, true);
      for (let j = R2.length - 1; j >= 0; j--) g.lineTo(R2[j][0], R2[j][1]);
      const a0 = Math.atan2(pts[i0 + 1][1] - pts[i0][1], pts[i0 + 1][0] - pts[i0][0]);
      g.arc(pts[i0][0], pts[i0][1] + dy, W(i0 / n) / 2, a0 - Math.PI / 2, a0 + Math.PI / 2, true);
      g.closePath(); g.fill();
    };
    if (o.under) { g.fillStyle = o.under; shape(0, 0.8); }
    g.fillStyle = o.col; shape(0, 0);
    if (o.tip) { g.fillStyle = o.tip; shape(Math.min(n - 1, Math.round((o.tipFrom || 0.8) * n)), 0); }
    if (W(0.5) > 2.2) {   // a soft highlight along the top
      g.strokeStyle = 'rgba(255,255,255,0.22)'; g.lineWidth = W(0.5) * 0.28; g.lineCap = 'round'; g.lineJoin = 'round';
      g.beginPath(); for (let j = 0; j < n; j++) { const q = [pts[j][0], pts[j][1] - W(j / n) * 0.22]; j ? g.lineTo(q[0], q[1]) : g.moveTo(q[0], q[1]); } g.stroke();
    }
    return pts;
  }
  // furry outline (westie, panda...): a ring of small tufts
  function fluff(g, x, y, rx, ry, n, amp, col, ph) {
    g.fillStyle = col; g.beginPath();
    for (let i = 0; i <= n * 2; i++) {
      const a = i / (n * 2) * Math.PI * 2, k = i % 2 ? 1 + amp : 1 - amp * 0.2;
      const px2 = x + Math.cos(a) * rx * k, py2 = y + Math.sin(a) * ry * k + (i % 2 ? Math.sin((ph || 0) + i) * 0.3 : 0);
      i ? g.lineTo(px2, py2) : g.moveTo(px2, py2);
    }
    g.closePath(); g.fill();
  }
  // four-legged walker: far legs (darker) → tail → body → near legs → head
  function quad(g, t, still, o) {
    const ph = t * (o.f || 13), run = !still;
    const bob = run ? -Math.abs(Math.sin(ph)) * (o.bounce || 1.6) : Math.sin(t * 2.4) * 0.35;
    const by = -o.L - o.ry * 0.35 + bob;
    const hipX = -o.rx * 0.6, shX = o.rx * 0.58, legY = by + o.ry * 0.4;
    const legC = o.legCol || o.col, farC = shade(legC, 0.7);
    petShadow(g, o.rx + 4, 2.2, 0, 'rgba(0,0,0,0.15)');
    petLeg(g, hipX + 2, legY, o.L, ph + Math.PI, still, false, farC, o.w, o.paw && shade(o.paw, 0.75), o.joint);
    petLeg(g, shX + 2, legY, o.L, ph, still, true, farC, o.w, o.paw && shade(o.paw, 0.75), o.joint);
    const sway = run ? Math.sin(ph) : Math.sin(t * 3);
    if (o.tail) o.tail(g, -o.rx * 0.85, by - o.ry * 0.25, sway, run);
    if (o.under) o.under(g, by, ph);
    const bodyG = vGrad(g, by - o.ry - 1, by + o.ry + 1, shade(o.col, 1.2), shade(o.col, 0.78));
    pE(g, 0, by, o.rx, o.ry, 0, bodyG);
    // 1.0.44: the spine flexes — the haunch and the chest rise and fall in turn with the steps
    const hB = run ? Math.sin(ph) * 0.7 : 0, cB = run ? Math.sin(ph + Math.PI) * 0.7 : Math.sin(t * 2.4) * 0.2;
    if (!o.noFlex) { pE(g, hipX + 1, by + hB * 0.6, o.rx * 0.46, o.ry * 1.02 + hB * 0.3, 0.08, bodyG); pE(g, shX - 1, by + cB * 0.6, o.rx * 0.44, o.ry * 0.98 + cB * 0.3, -0.08, bodyG); }
    if (o.belly) pE(g, o.rx * 0.1, by + o.ry * 0.45, o.rx * 0.7, o.ry * 0.42, 0, o.belly);
    if (o.marks) o.marks(g, by, ph);
    petLeg(g, hipX, legY, o.L, ph, still, false, legC, o.w, o.paw, o.joint);
    petLeg(g, shX, legY, o.L, ph + Math.PI, still, true, legC, o.w, o.paw, o.joint);
    const hb = run ? Math.sin(ph * 2 + 0.6) * 0.7 : Math.sin(t * 1.3) * 0.5;
    const hx0 = shX + (o.hdx === undefined ? 4 : o.hdx), hy0 = by - o.ry - (o.hdy === undefined ? 2.5 : o.hdy) + hb;
    if (!o.noNeck) {   // a neck from the shoulders to the head; it stretches as the head bobs
      const nx = (shX + hx0) / 2, ny = (by - o.ry * 0.3 + hy0 + 2) / 2, na = Math.atan2(hy0 + 2 - (by - o.ry * 0.3), hx0 - shX);
      pE(g, nx, ny, Math.hypot(hx0 - shX, hy0 + 2 - by + o.ry * 0.3) * 0.55 + 1.5, o.ry * 0.55, na, bodyG);
    }
    o.head(g, hx0, hy0, t, run, ph);
  }
  // cat head, 3/4 view
  function catHead(g, x, y, t, o) {
    const r = o.r || 6.2;
    for (const [ex, back] of [[-3.4, 1], [2.6, 0]]) {
      g.fillStyle = back ? shade(o.col, 0.78) : o.col;
      g.beginPath(); g.moveTo(x + ex - 2.9, y - r * 0.5); g.lineTo(x + ex + 0.3, y - r - 5.2); g.lineTo(x + ex + 3.1, y - r * 0.45); g.closePath(); g.fill();
      if (o.inner) { g.fillStyle = back ? shade(o.inner, 0.85) : o.inner; g.beginPath(); g.moveTo(x + ex - 1.3, y - r * 0.6); g.lineTo(x + ex + 0.3, y - r - 3.2); g.lineTo(x + ex + 1.8, y - r * 0.6); g.closePath(); g.fill(); }
    }
    pE(g, x, y, r, r * 0.92, 0, rGrad(g, x, y, r, o.col));
    if (o.stripes) for (const k of [-1, 0, 1]) line(g, [x - 1 + k * 2, y - r * 0.92, x - 0.6 + k * 1.6, y - r * 0.45], o.stripes, 1.1);
    pE(g, x + r * 0.42, y + r * 0.38, r * 0.5, r * 0.36, 0, o.muzzle || shade(o.col, 1.25));
    const er = o.eyeR || r * 0.3;
    petEye(g, x - r * 0.05, y - r * 0.12, er, t, o.iris, o.pupil || 'slit', o.seed);
    petEye(g, x + r * 0.62, y - r * 0.15, er * 0.82, t, o.iris, o.pupil || 'slit', o.seed);
    if (o.grumpy) { line(g, [x - r * 0.42, y - r * 0.55, x + r * 0.22, y - r * 0.38], shade(o.col, 0.6), 1); line(g, [x + r * 0.45, y - r * 0.42, x + r * 0.9, y - r * 0.55], shade(o.col, 0.6), 0.9); }
    g.fillStyle = o.nose || '#f48fb1';
    g.beginPath(); g.moveTo(x + r * 0.62, y + r * 0.12); g.lineTo(x + r * 0.98, y + r * 0.12); g.lineTo(x + r * 0.8, y + r * 0.34); g.closePath(); g.fill();
    line(g, [x + r * 0.55, y + r * 0.55, x + r * 0.8, y + r * 0.42, x + r * 1.02, y + r * 0.55], shade(o.col, 0.55), 0.7);
    if (!o.noWhisk) {
      g.globalAlpha *= 0.7;
      for (const dy of [-0.6, 0.5]) line(g, [x + r * 0.95, y + r * 0.35, x + r * 1.75, y + r * 0.3 + dy], o.whisk || '#fafafa', 0.5);
      g.globalAlpha /= 0.7;
    }
  }
  // dog / fox head, 3/4 view; ear: 'flop' | 'up' | 'fold'
  function dogHead(g, x, y, t, run, o) {
    const r = o.r || 6;
    const earSw = run ? Math.sin(t * 26) * 0.25 : Math.sin(t * 2) * 0.08;
    if (o.ear === 'up' || o.ear === 'fold') {   // back ear
      g.fillStyle = shade(o.earCol || o.col, 0.75);
      g.beginPath(); g.moveTo(x - r * 0.85, y - r * 0.35); g.lineTo(x - r * 0.55, y - r - 5); g.lineTo(x - r * 0.05, y - r * 0.6); g.closePath(); g.fill();
    }
    if (o.ear === 'flop') { g.save(); g.translate(x - r * 0.45, y - r * 0.55); g.rotate(earSw); pE(g, -1, 4.2, 2.6, 5.2, 0.35, shade(o.earCol || o.col, 0.85)); g.restore(); }
    pE(g, x, y, r, r * 0.92, 0, rGrad(g, x, y, r, o.col));
    if (o.patch) o.patch(g, x, y, r);
    // snout
    pE(g, x + r * 0.9, y + r * 0.3, r * (o.long ? 0.85 : 0.62), r * 0.42, o.long ? 0.12 : 0, o.snout || shade(o.col, 1.2));
    const nx = x + r * (o.long ? 1.65 : 1.42), ny = y + r * (o.long ? 0.22 : 0.12);
    pE(g, nx, ny, 1.7, 1.25, 0, o.nose || '#151515');
    pE(g, nx - 0.5, ny - 0.5, 0.55, 0.4, 0, 'rgba(255,255,255,0.6)');
    line(g, [nx - 0.8, ny + 1.2, nx - 2.2, y + r * 0.62, x + r * 0.55, y + r * 0.58], 'rgba(0,0,0,0.45)', 0.6);
    if (run && o.tongue !== false) pE(g, x + r * 0.95, y + r * 0.82 + Math.sin(t * 26) * 0.4, 1.4, 2.1, 0.2, '#ff6f91');
    petEye(g, x + r * 0.15, y - r * 0.2, o.eyeR || r * 0.26, t, o.iris, 'round', o.seed);
    petEye(g, x + r * 0.7, y - r * 0.24, (o.eyeR || r * 0.26) * 0.8, t, o.iris, 'round', o.seed);
    if (o.ear === 'flop') { g.save(); g.translate(x - r * 0.1, y - r * 0.6); g.rotate(earSw * 1.2); pE(g, -0.5, 4.5, 2.8, 5.6, 0.25, o.earCol || shade(o.col, 0.9)); g.restore(); }
    if (o.ear === 'up') {
      g.fillStyle = o.earCol || o.col;
      g.beginPath(); g.moveTo(x - r * 0.35, y - r * 0.55); g.lineTo(x + 0.2, y - r - 5.5); g.lineTo(x + r * 0.35, y - r * 0.6); g.closePath(); g.fill();
      if (o.earIn) { g.fillStyle = o.earIn; g.beginPath(); g.moveTo(x - r * 0.15, y - r * 0.65); g.lineTo(x + 0.2, y - r - 3.5); g.lineTo(x + r * 0.2, y - r * 0.68); g.closePath(); g.fill(); }
      if (o.earTip) { g.fillStyle = o.earTip; g.beginPath(); g.moveTo(x - 0.9, y - r - 3); g.lineTo(x + 0.2, y - r - 5.5); g.lineTo(x + 1.1, y - r - 3.1); g.closePath(); g.fill(); }
    }
    if (o.ear === 'fold') {   // Jack Russell: the tip folds forward
      g.fillStyle = o.earCol || o.col;
      g.beginPath(); g.moveTo(x - r * 0.4, y - r * 0.7); g.lineTo(x + r * 0.05, y - r - 2.6 + earSw * 2); g.lineTo(x + r * 0.45, y - r * 0.15); g.lineTo(x + r * 0.15, y - r * 0.6); g.closePath(); g.fill();
      line(g, [x - r * 0.35, y - r * 0.72, x + r * 0.05, y - r - 2.4 + earSw * 2], shade(o.earCol || o.col, 1.3), 0.7);
    }
  }
  // flapping wing: base (x, y), points back; up -1..1. 1.0.44: two parts joined at the wrist — the hand part
  // swings further than the arm and folds in on the upstroke, a bone line marks the leading edge
  function petWing(g, x, y, len, up, c1, c2, feathers) {
    const fold = up > 0 ? up * 0.35 : 0;                                           // folds in a little going up
    const wx = x - len * 0.42, wy = y - len * 0.42 * up * 0.8 - 0.5;               // wrist
    const tx = wx - len * (0.42 - fold * 0.25), ty = wy - len * 0.42 * up * 1.25 - 0.8 + fold * 2;   // tip
    g.fillStyle = vGrad(g, Math.min(y, ty) - 2, Math.max(y, ty) + 4, c1, c2);
    g.beginPath(); g.moveTo(x + 1, y - 1);
    g.quadraticCurveTo((x + wx) / 2, Math.min(y, wy) - 1.5, wx, wy);
    g.quadraticCurveTo((wx + tx) / 2, Math.min(wy, ty) - 1.2, tx, ty);
    if (feathers) {
      for (let k = 1; k <= 4; k++) {
        const bul = Math.sin(Math.PI * k / 4.4) * len * 0.22;   // the feathered trailing edge has width
        const fx = tx + (x - tx) * k / 4.4 - bul, fy = ty + (y + 3 - ty) * k / 4.4 + bul * 0.5;
        g.quadraticCurveTo(fx - 2.2, fy + 3.4 - k * 0.2, fx, fy + 0.6);
      }
      g.lineTo(x, y + 3);
    } else { g.quadraticCurveTo((wx + tx) / 2, (wy + ty) / 2 + 4, wx, wy + 3.5); g.quadraticCurveTo((x + wx) / 2, y + 4, x, y + 3); }
    g.closePath(); g.fill();
    line(g, [x + 0.5, y - 0.6, wx, wy, tx, ty], 'rgba(0,0,0,0.22)', 0.7);          // the bones of the wing
    pE(g, wx, wy, 0.8, 0.8, 0, 'rgba(0,0,0,0.18)');
  }
  const flapOf = ph => Math.sin(ph) + 0.25 * Math.sin(2 * ph);   // quick downstroke, slower upstroke

  // pet sub-section of the coin shop: pets of the developer and friends (fixed price, owner on the card)
  const PET_OWNER = { d_bonya: 'CR4YNE', d_dixon: 'xxennekk', d_kurt: { ru: 'семья Zeit', en: 'the Zeit family' },
    d_lilu: { ru: 'семья CR4YNE', en: 'the CR4YNE family' }, d_sonya: 'Насики', d_asya: 'Насики',
    d_yosya: 'EZOKEYNE (Onitham)', d_onya: { ru: 'xxennekk и Leska', en: 'xxennekk & Leska' } };
  const petOwner = id => { const o = PET_OWNER[id]; return !o ? '' : typeof o === 'string' ? o : (S === TEXT.ru ? o.ru : o.en); };

  // lift: how high the pet is off the ground right now — its shadow stays on the ground
  let petLift = 0, petAirPose = 0, petT0 = null;
  const PET_FLY = ['bird', 'owl', 'bat', 'bee', 'drone', 'ghost', 'dragon', 'p_phoenix', 'p_jelly', 'lvl_star', 'p_kraken'];
  // the shadow stays flat on the ground whatever the pet's body does (lean, squash)
  const petShadow = (g, rx, ry, rot, fill) => { g.save(); g.setTransform(petT0); pE(g, 0, 0.5 + petLift, rx, ry, 0, fill); g.restore(); };
  // act (in the run only): { air, up, land } — 1.0.46: walking pets take off leaning back with the hind legs pushing,
  // come down leaning forward with the front legs reaching out, and squash a little on landing
  function drawPet(g, id, x, y, t, still, lift, act) {
    petLift = lift || 0;
    g.save(); g.translate(x, y);
    petT0 = g.getTransform();
    petAirPose = 0;
    if (act && !PET_FLY.includes(id)) {
      if (act.air) {
        petAirPose = act.up ? 1 : -1;
        g.translate(0, -10); g.rotate(act.up ? -0.2 : 0.14); g.scale(act.up ? 0.95 : 1.02, act.up ? 1.06 : 0.99); g.translate(0, 10);
      } else if (act.land > 0) { const k = act.land; g.scale(1 + 0.24 * k, 1 - 0.24 * k); }   // a firm squash on landing
    }
    g.lineCap = 'round'; g.lineJoin = 'round';
    const ph = t * 13;
    if (id === 'cat') {
      quad(g, t, still, { L: 9, w: 2.6, rx: 10.5, ry: 5.6, col: '#ff9f43', belly: '#ffe0b2', paw: '#ffe0b2',
        marks: (g, by) => { for (const k of [-5, -1.5, 2]) line(g, [k, by - 5.2, k - 1.2, by - 1.5], '#e07b1a', 1.4); },
        tail: (g, tx, ty, s, run) => { const q = tailChain(g, tx, ty, t, run, { n: 7, len: 16, w0: 3, w1: 2.1, a: -2.05, curl: 0.17, amp: 0.3, lag: 0.75, fq: 2.2, col: '#f08a2c', tip: '#e07b1a', tipFrom: 0.85, r: { a: -2.7, curl: 0.09, amp: 0.2, fq: 6 } }); pE(g, q[7][0], q[7][1], 1.3, 1.3, 0, '#e07b1a'); },   // a cat: a slow S-swish, the tip curls
        head: (g, hx, hy, t) => catHead(g, hx, hy, t, { col: '#ff9f43', inner: '#ffab91', iris: '#8bc34a', muzzle: '#ffe8c8', stripes: '#e07b1a' }) });
    } else if (id === 'd_yosya') {   // Йося — Russian Blue: plush slate coat, amber eyes, a slightly grumpy look
      quad(g, t, still, { L: 8.5, w: 2.8, rx: 10.5, ry: 6.3, col: '#7d8fa3', belly: '#8d9db0', paw: '#8a9aad', f: 12,
        under: (g, by) => fluff(g, 0, by + 0.5, 10.6, 6.3, 16, 0.08, '#6f8196', 0),
        tail: (g, tx, ty, s, run) => tailChain(g, tx, ty, t, run, { n: 7, len: 15, w0: 3.6, w1: 2.6, a: -2.3, curl: 0.15, amp: 0.38, lag: 0.8, fq: 1.5, col: '#71839a', r: { a: -2.75, curl: 0.08, amp: 0.2, fq: 5.5 } }),   // a grumpy, slow lash
        head: (g, hx, hy, t) => catHead(g, hx, hy, t, { col: '#7d8fa3', r: 6.6, inner: '#f4a6b6', iris: '#ffc21a', pupil: 'round', muzzle: '#9babbd', nose: '#4a4f57', grumpy: 1, whisk: '#dfe6ee', seed: 1.1 }) });
    } else if (id === 'd_onya') {   // Оня — black cat in his lime-green hoodie with cartoon eyes and an antenna on the hood
      quad(g, t, still, { L: 8.5, w: 2.6, rx: 10.5, ry: 6, col: '#9be22d', legCol: '#1b1b1f', paw: '#26262c', f: 13,
        tail: (g, tx, ty, s, run) => tailChain(g, tx, ty, t, run, { n: 7, len: 15, w0: 3, w1: 2, a: -2.2, curl: 0.18, amp: 0.32, lag: 0.7, fq: 2.6, col: '#1b1b1f', ph: 1, r: { a: -2.7, curl: 0.1, amp: 0.22, fq: 6.5 } }),
        marks: (g, by) => { line(g, [-9, by + 4.6, 9.5, by + 4.6], '#7cc21a', 1.6); pE(g, 2, by + 1, 3.2, 1.6, 0, '#8bd424'); line(g, [0.5, by - 1, 3.5, by - 1], '#6fae16', 0.8); },
        head: (g, hx, hy, t, run) => {
          // hood behind the head
          pE(g, hx - 1.2, hy - 0.6, 7.6, 7.2, 0, rGrad(g, hx - 1.2, hy - 0.6, 7.6, '#9be22d'));
          catHead(g, hx + 0.6, hy + 0.6, t, { col: '#1b1b1f', r: 5.6, iris: '#ff9f1a', pupil: 'round', eyeR: 2.1, muzzle: '#2a2a30', nose: '#3a3a42', whisk: '#9e9e9e', seed: 2.3 });
          // hood rim over the forehead, with its own cartoon eyes and a little antenna
          g.strokeStyle = '#8bd424'; g.lineWidth = 2.4; g.beginPath(); g.arc(hx - 0.2, hy + 0.2, 6.6, Math.PI * 1.02, Math.PI * 1.85); g.stroke();
          for (const ex of [-3.2, 1.2]) { pE(g, hx + ex, hy - 7.2, 2, 2, 0, '#fff'); pE(g, hx + ex + 0.5, hy - 7, 0.95, 1.05, 0, '#111'); }
          const aw = run ? Math.sin(t * 20) * 1.2 : Math.sin(t * 3) * 0.6;
          line(g, [hx - 1.2, hy - 8, hx - 1.6 + aw, hy - 12.5], '#7cc21a', 1);
          pE(g, hx - 1.6 + aw, hy - 13, 1.3, 1.3, 0, '#c6ff63');
        } });
    } else if (id === 'dog') {
      quad(g, t, still, { L: 9, w: 2.9, rx: 11, ry: 6, col: '#a1774f', belly: '#c9a27a', paw: '#c9a27a',
        tail: (g, tx, ty, s, run) => tailChain(g, tx, ty, t, run, { n: 5, len: 12, w0: 3, w1: 1.9, a: -2.15, curl: 0.12, root: 0.45, amp: 0.15, lag: 0.35, fq: 10, col: '#8d6440', r: { fq: 15, root: 0.5 } }),   // a dog: a quick happy wag from the root
        head: (g, hx, hy, t, run) => dogHead(g, hx, hy, t, run, { col: '#a1774f', snout: '#c9a27a', ear: 'up', earCol: '#8d6440', earIn: '#e8b9a0', earTip: '#6d4c41' }) });
    } else if (id === 'd_dixon') {   // Диксон — West Highland White Terrier: white wiry coat, pointy ears, carrot tail
      quad(g, t, still, { L: 7.5, w: 3, rx: 10.5, ry: 6.2, col: '#f6f6ef', paw: '#ececdf', f: 14, bounce: 1.8,
        under: (g, by, ph) => fluff(g, 0, by + 0.8, 11.2, 6.8, 18, 0.12, '#dcdccf', ph),
        marks: (g, by) => { for (const k of [-6, -2, 2, 6]) line(g, [k, by + 4, k - 0.8, by + 7.2], '#e4e4d8', 1.2); },
        tail: (g, tx, ty, s, run) => tailChain(g, tx, ty, t, run, { n: 4, len: 10, w0: 4.2, w1: 1.2, a: -1.85, curl: 0.04, root: 0.3, amp: 0.06, lag: 0.25, fq: 13, col: '#f2f2e8', under: '#dcdccf', r: { fq: 19 } }),   // a westie's carrot: stiff, a fast short wag
        head: (g, hx, hy, t, run) => {
          fluff(g, hx + 0.6, hy + 0.4, 7.4, 7, 14, 0.14, '#e8e8dc', t);
          dogHead(g, hx, hy, t, run, { col: '#f8f8f2', r: 6.2, snout: '#ffffff', ear: 'up', earCol: '#f4f4ea', earIn: '#f0c8c0', nose: '#111', seed: 0.7 });
        } });
    } else if (id === 'd_kurt') {   // Курт — Jack Russell: white, tan patches on the head and ears, folded ears, very lively
      quad(g, t * 1.12, still, { L: 9, w: 2.6, rx: 10.5, ry: 5.6, col: '#fbfbf7', paw: '#f0ede4', f: 14, bounce: 2.6,
        marks: (g, by) => { pE(g, -5.5, by - 2.2, 3.6, 2.6, 0.2, '#c98b4a'); },
        tail: (g, tx, ty, s, run) => tailChain(g, tx, ty, t, run, { n: 4, len: 11, w0: 2.8, w1: 1.8, a: -1.95, curl: 0.06, root: 0.55, amp: 0.1, lag: 0.3, fq: 20, col: '#f2f0e8', r: { fq: 26 } }),   // a Jack Russell: the fastest wag
        head: (g, hx, hy, t, run) => dogHead(g, hx, hy, t, run, { col: '#fbfbf7', snout: '#ffffff', ear: 'fold', earCol: '#c27c3a', seed: 1.9,
          patch: (g, x, y, r) => { g.save(); g.beginPath(); g.ellipse(x, y, r, r * 0.92, 0, 0, Math.PI * 2); g.clip(); pE(g, x - r * 0.25, y - r * 0.25, r * 0.85, r * 0.8, 0, '#c98b4a'); pE(g, x + r * 0.15, y - r * 0.3, r * 0.42, r * 0.38, 0, '#a86a32'); g.restore(); } }) });
    } else if (id === 'fox') {
      quad(g, t, still, { L: 9.5, w: 2.4, rx: 11, ry: 5.4, col: '#f07a22', legCol: '#3e2723', paw: '#2b1c18', belly: '#fff3e6',
        tail: (g, tx, ty, s, run) => tailChain(g, tx, ty, t, run, { n: 8, len: 20, prof: f => 3 + 6.5 * Math.sin(Math.min(1, f * 1.05) * Math.PI * 0.82), a: -2.75, curl: -0.02, amp: 0.12, lag: 0.85, fq: 2.2, col: '#f07a22', under: '#c9561a', tip: '#fff8ee', tipFrom: 0.86, r: { a: -2.95, amp: 0.1, fq: 5 } }),   // a fox: a heavy bushy brush that floats behind
        head: (g, hx, hy, t, run) => dogHead(g, hx, hy, t, run, { col: '#f07a22', snout: '#fff3e6', ear: 'up', earIn: '#ffd0a8', earTip: '#2b1c18', long: 1, tongue: false, iris: '#ffb300',
          patch: (g, x, y, r) => pE(g, x + r * 0.3, y + r * 0.55, r * 0.7, r * 0.35, 0, '#fff3e6') }) });
    } else if (id === 'p_unicorn') {
      quad(g, t, still, { L: 12, w: 2.6, rx: 12, ry: 6.2, col: '#fafafa', paw: '#b39ddb', f: 11, noNeck: 1,
        under: () => {},
        tail: (g, tx, ty, s, run) => ['#ef5350', '#ffca28', '#66bb6a', '#42a5f5', '#ab47bc'].forEach((c2, k) => tailChain(g, tx + 1, ty + k * 0.6, t, run, { n: 6, len: 13 + k * 0.6, w0: 1.8, w1: 1.2, a: -2.75 + k * 0.08, curl: -0.2, amp: 0.2, lag: 0.9, fq: 2, ph: k * 0.45, col: c2, r: { a: -2.9 + k * 0.08, curl: -0.06, amp: 0.25, fq: 7 } })),   // hair strands flowing one after another
        hdx: 5, hdy: 5,
        head: (g, hx, hy, t, run, ph) => {
          // neck + long horse head
          pE(g, hx - 1, hy + 4, 3.6, 6, 0.5, '#f4f1fb');
          pE(g, hx + 3, hy, 4.6, 4, 0.35, rGrad(g, hx + 3, hy, 5, '#fafafa', 1.05, 0.85));
          pE(g, hx + 7.5, hy + 2.4, 3.4, 2.6, 0.35, '#f3eefb');
          pE(g, hx + 9.5, hy + 2.9, 0.6, 0.5, 0, '#9575cd');
          petEye(g, hx + 3.8, hy - 1, 1.4, t, null, null, 0.4);
          g.fillStyle = vGrad(g, hy - 14, hy - 3, '#fff59d', '#ffb300');
          g.save(); g.shadowColor = '#fff59d'; g.shadowBlur = 8 + 4 * Math.sin(t * 3); g.beginPath(); g.moveTo(hx + 1.5, hy - 3); g.lineTo(hx + 5, hy - 14); g.lineTo(hx + 4.2, hy - 2.6); g.closePath(); g.fill(); g.restore();
          for (let k = 0; k < 3; k++) line(g, [hx + 2.2 + k * 0.6, hy - 5 - k * 3, hx + 4.2 + k * 0.4, hy - 6 - k * 3], '#ffa000', 0.6);
          pE(g, hx + 0.5, hy - 3.2, 1.2, 2.4, -0.4, '#ece6f7');
          ['#ef5350', '#ffca28', '#66bb6a', '#42a5f5', '#ab47bc'].forEach((c2, k) => {
            const w2 = run ? Math.sin(ph + k) * 1.4 : Math.sin(t * 2 + k) * 0.6;
            line(g, [hx - 0.5 - k * 1.2, hy - 3 + k * 1.6, hx - 4 - k * 1.3 + w2, hy + k * 1.9], c2, 1.7);
          });
        } });
    } else if (id === 'p_robopup') {
      quad(g, t, still, { L: 8.5, w: 2.4, rx: 10.5, ry: 5.6, col: '#a7b6bf', legCol: '#607d8b', paw: '#37474f', joint: '#263238',
        marks: (g, by) => { g.strokeStyle = 'rgba(38,50,56,0.55)'; g.lineWidth = 0.7; g.strokeRect(-5, by - 3, 8, 5); pE(g, 6, by - 1.5, 1.1, 1.1, 0, Math.sin(t * 5) > 0 ? '#00e5ff' : '#004d57'); },
        tail: (g, tx, ty, s, run) => {   // a robot: a stiff jointed antenna-tail with a blinking tip
          const q = tailChain(g, tx, ty, t, run, { n: 4, len: 10, w0: 1.6, w1: 1.3, a: -1.95, curl: 0.05, root: 0.4, amp: 0.05, lag: 0.1, fq: 16, col: '#546e7a', r: { fq: 24 } });
          for (let k = 1; k < 4; k++) pE(g, q[k][0], q[k][1], 1, 1, 0, '#263238');
          pE(g, q[4][0], q[4][1], 1.4, 1.4, 0, Math.sin(t * 6) > 0 ? '#ff5252' : '#b71c1c');
        },
        head: (g, hx, hy, t, run) => {
          g.fillStyle = '#78909c'; g.fillRect(hx - 4, hy - 9.5, 2.4, 5); g.fillRect(hx + 0.2, hy - 9.5, 2.4, 5);
          g.fillStyle = rGrad(g, hx + 1, hy, 7, '#b0bec5'); roundRectOn(g, hx - 5, hy - 5.5, 12, 10, 3); g.fill();
          g.fillStyle = '#90a4ae'; roundRectOn(g, hx + 4, hy - 0.5, 6, 4.5, 1.6); g.fill();
          pE(g, hx + 9.6, hy + 0.6, 1.2, 1, 0, '#263238');
          g.fillStyle = '#102027'; roundRectOn(g, hx - 1, hy - 3.5, 8, 3.2, 1.5); g.fill();
          g.save(); g.shadowColor = '#00e5ff'; g.shadowBlur = 6; g.fillStyle = '#18ffff';
          const sc = ((t * 1.5) % 1) * 5; g.fillRect(hx + sc, hy - 2.8, 2, 1.8); g.restore();
          line(g, [hx - 4, hy + 2, hx + 2, hy + 2], 'rgba(38,50,56,0.5)', 0.6);
        } });
    } else if (id === 'p_panda') {
      quad(g, t, still, { L: 7.5, w: 3.6, rx: 12, ry: 7.4, col: '#fafafa', legCol: '#222', paw: '#111', f: 9.5, bounce: 1.1, noFlex: 1, noNeck: 1,
        marks: (g, by) => { g.save(); g.beginPath(); g.ellipse(0, by, 12, 7.4, 0, 0, Math.PI * 2); g.clip(); pE(g, 5, by, 4.2, 8.5, 0.2, '#262626'); g.restore(); },
        tail: (g, tx, ty, s, run) => { const q = tailChain(g, tx, ty, t, run, { n: 2, len: 2.4, w0: 3.6, w1: 3.2, a: -2.6, root: 0.35, amp: 0.1, fq: 3, col: '#f2f2f2', r: { fq: 9 } }); pE(g, q[2][0], q[2][1], 1.8, 1.8, 0, '#f2f2f2'); },   // a panda: a tiny wiggling stub
        hdx: 3, hdy: 1,
        head: (g, hx, hy, t) => {
          for (const ex of [-4.6, 2.2]) pE(g, hx + ex, hy - 5.6, 2.6, 2.6, 0, ex < 0 ? '#111' : '#222');
          pE(g, hx, hy, 7, 6.2, 0, rGrad(g, hx, hy, 7, '#fafafa', 1.0, 0.86));
          pE(g, hx + 0.1, hy - 0.6, 2.2, 2.8, -0.5, '#222'); pE(g, hx + 4.2, hy - 0.8, 1.8, 2.4, 0.4, '#222');
          petEye(g, hx + 0.4, hy - 0.8, 1, t, null, null, 2.7); petEye(g, hx + 4.2, hy - 1, 0.85, t, null, null, 2.7);
          pE(g, hx + 4, hy + 3, 3, 2.2, 0, '#fff');
          pE(g, hx + 5.6, hy + 2, 1.2, 0.85, 0, '#111');
          line(g, [hx + 5.4, hy + 3, hx + 4.6, hy + 4, hx + 3.6, hy + 3.6], '#555', 0.5);
        } });
    } else if (id === 'p_dino') {   // little t-rex on two legs
      const run = !still, bob = run ? -Math.abs(Math.sin(ph)) * 1.4 : Math.sin(t * 2.4) * 0.3, by = -13 + bob;
      petShadow(g, 12, 2.2, 0, 'rgba(0,0,0,0.15)');
      petLeg(g, -1, by + 3, 11, ph + Math.PI, still, false, '#43a047', 3.4, '#2e7d32');
      tailChain(g, -4, by, t, run, { n: 7, len: 21, prof: f => 8 - 6.8 * f, a: -3.05, curl: 0.035, amp: 0.09, lag: 0.7, fq: 2.4, col: '#58b25c', under: '#3f9a44', r: { fq: 6.5, amp: 0.12 } });   // 1.0.44: the tail sways in a wave
      g.save(); g.translate(0, by); g.rotate(-0.25);
      pE(g, 0, 0, 9, 6.5, 0, vGrad(g, -6.5, 6.5, '#81d684', '#43a047'));
      pE(g, 1.5, 2.6, 6, 3.4, 0, '#d9f2c4');
      g.restore();
      g.fillStyle = '#2e7d32';
      for (const [sx2, sy2] of [[-9, -4.5], [-5, -7], [-1, -8.5], [3, -9.5]]) { g.beginPath(); g.moveTo(sx2 - 1.8, by + sy2 + 1.6); g.lineTo(sx2, by + sy2 - 2.2); g.lineTo(sx2 + 1.8, by + sy2 + 1.4); g.fill(); }
      for (const [sx2, sy2] of [[-4, -2], [1, -4], [-8, 0]]) pE(g, sx2, by + sy2, 1, 0.8, 0, '#388e3c');
      for (let q = 0; q < 4; q++) line(g, [-1 + q * 1.6, by + 0.5 + q * 0.7, 3 + q * 1.4, by + 0.2 + q * 0.7], 'rgba(120,150,60,0.45)', 0.5);   // belly scales
      petLeg(g, 1, by + 3, 11, ph, still, false, '#4caf50', 3.6, '#2e7d32');
      line(g, [5, by - 1, 7.5, by + 1.5, 9, by + 1], '#43a047', 1.4); line(g, [9, by + 1, 10.2, by + 0.4], '#fafafa', 0.6); line(g, [9, by + 1, 10, by + 1.8], '#fafafa', 0.6);   // tiny claws
      const hb = run ? Math.sin(ph * 2) * 0.6 : 0, hx = 9, hy = by - 9 + hb;
      pE(g, hx, hy, 6.6, 5, -0.15, rGrad(g, hx, hy, 6.6, '#66bb6a', 1.2, 0.8));
      pE(g, hx + 3.5, hy + 3, 4.4, 2, 0.05, '#4caf50');
      g.fillStyle = '#fff'; for (let k = 0; k < 4; k++) { g.beginPath(); g.moveTo(hx + 1 + k * 1.6, hy + 1.6); g.lineTo(hx + 1.8 + k * 1.6, hy + 3); g.lineTo(hx + 2.6 + k * 1.6, hy + 1.6); g.fill(); }
      petEye(g, hx + 1, hy - 2, 1.5, t, '#ffeb3b', 'slit', 0.9);
      pE(g, hx + 5.6, hy - 1, 0.5, 0.4, 0, '#1b5e20');
    } else if (id === 'penguin') {
      const run = !still, w = run ? Math.sin(ph * 0.75) * 0.13 : Math.sin(t * 1.5) * 0.03;
      const lf = run ? Math.max(0, Math.sin(ph * 0.75)) * 2 : 0, rf = run ? Math.max(0, -Math.sin(ph * 0.75)) * 2 : 0;
      petShadow(g, 9, 2, 0, 'rgba(0,0,0,0.15)');
      pE(g, -3, -0.6 - lf, 3.2, 1.3, 0, '#e65100');
      g.save(); g.rotate(w);
      pE(g, 0, -11.5, 8.2, 11, 0, vGrad(g, -22, 0, '#37474f', '#1c262b'));
      pE(g, 2, -9.5, 5.4, 8.4, 0, vGrad(g, -18, 0, '#ffffff', '#e3e9ee'));
      const fl = run ? Math.sin(ph * 1.5) * 0.4 : 0.1;
      g.save(); g.translate(-3.5, -14); g.rotate(0.3 + fl); pE(g, -1, 4.5, 2, 5.5, 0, '#263238'); g.restore();
      pE(g, 1, -21, 6, 5.8, 0, rGrad(g, 1, -21, 6, '#37474f', 1.3, 0.8));
      pE(g, 3.8, -21.6, 2.3, 2.3, 0, '#fff');
      petEye(g, 4.2, -21.6, 1.15, t, null, null, 1.5);
      pE(g, 6, -18.8, 1.1, 0.8, 0, 'rgba(255,138,128,0.55)');
      g.fillStyle = '#ff9800'; g.beginPath(); g.moveTo(6.3, -20.6); g.lineTo(10.5, -19.4); g.lineTo(6.3, -18.2); g.closePath(); g.fill();
      g.restore();
      pE(g, 3.5, -0.6 - rf, 3.2, 1.3, 0, '#ff9800');
    } else if (id === 'frog') {
      // sits, then hops: in the air the back legs stretch out
      const P = 0.95, p = still ? 0.9 : (t % P) / P, air = p < 0.45, k = air ? Math.sin(p / 0.45 * Math.PI) : 0;
      const hop = -k * 11, puff = !air ? 1 + Math.max(0, Math.sin(t * 9)) * 0.25 : 1;
      petShadow(g, 8 - k * 3, 2, 0, `rgba(0,0,0,${0.15 - k * 0.07})`);
      g.save(); g.translate(0, hop); g.rotate(air ? -0.25 * k : 0);
      if (air) { line(g, [-5, -3, -10, 1, -15, 3], '#388e3c', 2.6); pE(g, -15.5, 3.2, 2.2, 1, 0, '#2e7d32'); }
      else { pE(g, -5, -2.5, 4.2, 3.2, 0, '#43a047'); pE(g, -6, -0.6, 3.6, 1.1, 0, '#2e7d32'); }
      pE(g, 0, -6, 9, 6, 0, vGrad(g, -12, 0, '#7bd17f', '#3a9a3f'));
      for (const [sx2, sy2, r2] of [[-4, -8, 1.3], [-1, -10, 0.9], [-6, -5, 0.8]]) pE(g, sx2, sy2, r2, r2 * 0.8, 0, '#2e7d32');
      pE(g, 3.5, -3 + (puff - 1) * 2, 4.8 * puff, 3 * puff, 0, '#c8e6a0');
      line(g, [5, -2.5, 6.5, 0, 8, 0], '#388e3c', 1.8);
      for (const ex of [-1.8, 4.2]) { pE(g, ex, -11.5, 3.1, 3.1, 0, rGrad(g, ex, -11.5, 3.1, '#5cbf60')); petEye(g, ex + 0.5, -12, 1.7, t, '#ffd54f', 'round', 0.3); }
      line(g, [3, -6.5, 6, -5.6, 8.5, -6.4], '#1b5e20', 0.7);
      g.restore();
    } else if (id === 'reindeer') {   // a fawn: spotted back, little antlers, a bell on a red collar
      quad(g, t, still, { L: 11, w: 2.4, rx: 11, ry: 5.8, col: '#a1673f', belly: '#e9cfa8', paw: '#3e2723', f: 12, noNeck: 1,
        marks: (g, by) => { for (const [mx, my] of [[-6, -3], [-2, -4], [2, -3.5], [-4, -1], [0, -1.5]]) pE(g, mx, by + my, 1.1, 0.9, 0, '#f3e5d0'); },
        tail: (g, tx, ty, s, run) => tailChain(g, tx, ty, t, run, { n: 2, len: 4.5, w0: 3.8, w1: 3, a: -2.2, root: 0.9, flick: 1, amp: 0.05, fq: 3.2, col: '#f3e5d0', under: '#a1673f', r: { fq: 6 } }),   // a deer: a short tuft that flicks up now and then
        hdx: 5, hdy: 4,
        head: (g, hx, hy, t, run) => {
          pE(g, hx - 1, hy + 4, 3.2, 5, 0.5, '#9a6038');
          g.strokeStyle = '#d7b98a'; g.lineWidth = 1.4; g.lineCap = 'round';
          for (const s2 of [-1, 1]) { g.beginPath(); g.moveTo(hx + s2 * 1.5, hy - 3); g.lineTo(hx + s2 * 2.5 - 1, hy - 9); g.lineTo(hx + s2 * 5 - 1, hy - 11); g.moveTo(hx + s2 * 2 - 0.5, hy - 6.5); g.lineTo(hx + s2 * 4.5, hy - 7); g.stroke(); }
          pE(g, hx - 3.5, hy - 2.5, 1.6, 3, -0.6, '#8d5a35');
          pE(g, hx + 1.5, hy, 4.4, 3.8, 0.2, rGrad(g, hx + 1.5, hy, 4.4, '#a1673f'));
          pE(g, hx + 5.2, hy + 1.6, 2.6, 2, 0.2, '#c99a6b');
          pE(g, hx + 7.2, hy + 1.2, 1.2, 1, 0, '#212121');
          petEye(g, hx + 2.2, hy - 0.8, 1.3, t, null, null, 0.6);
          g.strokeStyle = '#d32f2f'; g.lineWidth = 1.6; g.beginPath(); g.moveTo(hx - 3, hy + 3.5); g.lineTo(hx + 1, hy + 5); g.stroke();
          pE(g, hx - 0.5, hy + 6.5, 1.5, 1.5, 0, '#ffd54f');
        } });
    } else if (id === 'lion') {   // 1.0.45: a lion cub — sandy coat, a fluffy young mane, a long tail with a dark tuft
      quad(g, t, still, { L: 9, w: 2.9, rx: 11, ry: 6, col: '#e0a854', belly: '#f6dcae', paw: '#f2cf94', f: 12.5,
        tail: (g, tx, ty, s, run) => { const q = tailChain(g, tx, ty, t, run, { n: 7, len: 17, w0: 2.4, w1: 1.5, a: -2.5, curl: -0.07, amp: 0.25, lag: 0.7, fq: 2.4, col: '#d39a48', r: { a: -2.8, amp: 0.2, fq: 6 } });
          pE(g, q[7][0], q[7][1], 2.4, 2, 0, '#6d4c41'); pE(g, q[7][0] - 0.5, q[7][1] - 0.6, 1, 0.8, 0, '#8d6e63'); },
        head: (g, hx, hy, t, run) => {
          fluff(g, hx - 0.8, hy + 0.4, 9.2, 8.6, 15, 0.16, '#a9632a', t); fluff(g, hx - 0.4, hy + 0.2, 8, 7.6, 13, 0.14, '#c47b35', t + 1);
          catHead(g, hx, hy, t, { col: '#e8b25e', r: 6, inner: '#c98a6a', iris: '#d79a1c', pupil: 'round', muzzle: '#f8e2b8', nose: '#5d4037', whisk: '#fff3e0', seed: 0.8 });
        } });
    } else if (id === 'snowman') {   // two snowballs, a big round head, rosy cheeks, a smile — hops along
      const P = 0.6, p = still ? 0.9 : (t % P) / P, hop = p < 0.5 ? -Math.sin(p / 0.5 * Math.PI) * 6 : 0, sq = p > 0.5 && p < 0.62 ? 0.88 : 1;
      petShadow(g, 9 + hop * 0.3, 2, 0, 'rgba(0,0,0,0.15)');
      g.save(); g.translate(0, hop); g.scale(1, sq);
      g.strokeStyle = '#6d4c41'; g.lineWidth = 1.2; g.beginPath(); g.moveTo(-6, -9); g.lineTo(-12, -13 + Math.sin(t * 9) * 2); g.moveTo(6, -9); g.lineTo(12, -14 - Math.sin(t * 9) * 2); g.stroke();
      pE(g, 0, -8, 9, 8.2, 0, rGrad(g, 0, -8, 9, '#f5f9ff', 1.0, 0.84));
      for (const yy of [-10, -5]) pE(g, 0.5, yy, 0.9, 0.9, 0, '#e53935');
      pE(g, 0.5, -22, 8, 7.6, 0, rGrad(g, 0.5, -22, 8, '#f5f9ff', 1.0, 0.86));
      g.fillStyle = '#e53935'; roundRectOn(g, -6.5, -16.5, 14, 3, 1.5); g.fill(); g.fillRect(-5, -15, 3, 5 + Math.sin(t * 6) * 0.8);
      pE(g, -3.5, -20.5, 1.7, 1, 0, 'rgba(255,128,150,0.6)'); pE(g, 5.5, -20.5, 1.7, 1, 0, 'rgba(255,128,150,0.6)');
      petEye(g, -1.2, -23.5, 1.3, t, null, null, 1.3); petEye(g, 3.4, -23.5, 1.2, t, null, null, 1.3);
      g.fillStyle = '#ff7043'; g.beginPath(); g.moveTo(1.4, -21.6); g.lineTo(6.5, -20.6); g.lineTo(1.4, -19.6); g.fill();
      g.strokeStyle = '#37474f'; g.lineWidth = 0.7; g.beginPath(); g.arc(1.2, -19.6, 2.4, 0.25, Math.PI - 0.25); g.stroke();
      g.restore();
    } else if (id === 'd_bonya') {   // 1.0.56: Боня (CR4YNE) — a plump, long "sausage" rabbit: near-black head and short
      // dwarf ears, dark chocolate back, a warm caramel-rust band round the neck and sides, a white fleck on the back
      const P2 = 0.62, p2 = still ? 0.85 : (t % P2) / P2, air = !still && p2 < 0.42, k2 = air ? Math.sin(p2 / 0.42 * Math.PI) : 0;
      const land = !still && p2 >= 0.42 && p2 < 0.55 ? 1 - (p2 - 0.42) / 0.13 : 0, hop = -k2 * 7;
      petShadow(g, 15 - k2 * 3, 2.2, 0, `rgba(0,0,0,${0.18 - k2 * 0.06})`);
      g.save(); g.translate(0, hop); g.rotate(air ? -0.12 * k2 : 0);
      g.scale(1 + 0.1 * k2 + 0.08 * land, 1 - 0.06 * k2 - 0.1 * land);   // stretches in the air, squashes on landing
      // hind foot (long and dark), then the body
      if (air) { g.fillStyle = '#2a1d16'; g.beginPath(); g.ellipse(-14, -2.5, 6.5, 2, -0.35, 0, Math.PI * 2); g.fill(); }
      else { g.fillStyle = '#2a1d16'; g.beginPath(); g.ellipse(-8, -1.6, 7, 2, 0, 0, Math.PI * 2); g.fill(); }
      const bg = g.createLinearGradient(0, -17, 0, 0); bg.addColorStop(0, '#2a1e18'); bg.addColorStop(0.55, '#3b2a21'); bg.addColorStop(1, '#4e3424');
      g.fillStyle = bg; g.beginPath();   // the long loaf: a round rump, a long back, the chest
      g.moveTo(-17, -6); g.bezierCurveTo(-19, -15, -9, -18, 0, -16.5); g.bezierCurveTo(7, -15.5, 11, -14, 12, -9); g.bezierCurveTo(12.5, -4, 10, -1, 6, -0.8);
      g.lineTo(-12, -0.8); g.bezierCurveTo(-16, -1, -17.5, -3, -17, -6); g.closePath(); g.fill();
      g.save(); g.clip();
      const rb = g.createRadialGradient(7, -6, 0.5, 6, -6, 7.5); rb.addColorStop(0, 'rgba(176,96,45,0.9)'); rb.addColorStop(1, 'rgba(150,80,40,0)');
      g.fillStyle = rb; g.fillRect(-6, -18, 22, 18);                                            // the rust band at the neck and chest
      const sb = g.createRadialGradient(-2, -3, 1, -2, -3, 10); sb.addColorStop(0, 'rgba(130,72,38,0.5)'); sb.addColorStop(1, 'rgba(130,72,38,0)');
      g.fillStyle = sb; g.fillRect(-18, -14, 26, 14);                                           // warm sides
      g.strokeStyle = 'rgba(20,12,8,0.35)'; g.lineWidth = 0.6;                                  // fur strokes along the back
      for (let q = -15; q < 9; q += 2.4) { g.beginPath(); g.moveTo(q, -15 + Math.abs(q) * 0.05); g.lineTo(q - 1.4, -12.5); g.stroke(); }
      g.fillStyle = 'rgba(255,255,255,0.13)'; g.beginPath(); g.ellipse(-4, -15, 9, 1.6, -0.05, 0, Math.PI * 2); g.fill();   // sheen on the back
      g.restore();
      pE(g, 2, -13.4, 0.6, 1.5, -0.3, 'rgba(236,230,224,0.75)');                                // the small white fleck
      pE(g, -17.5, -9, 2.4, 2.2, 0, '#2e211a');                                                 // a tiny tail
      // front paws
      const fp = air ? 2 : 0; g.fillStyle = '#3a271d'; g.beginPath(); g.ellipse(8 + fp, -1.4, 2.6, 1.4, 0, 0, Math.PI * 2); g.fill(); g.beginPath(); g.ellipse(4 + fp, -1.2, 2.4, 1.3, 0, 0, Math.PI * 2); g.fill();
      // the head: near-black, round cheeks, a soft nose
      const hx = 13, hy = -11 + (still ? Math.sin(t * 1.4) * 0.3 : 0);
      const ew = Math.sin(t * (still ? 1.6 : 7)) * 0.08;
      for (const [ex, a, k] of [[-2.2, -0.55, 0.8], [0.4, -0.3, 1]]) {   // short dwarf ears with rounded tips
        g.save(); g.translate(hx + ex, hy - 4.5); g.rotate(a + ew * k);
        const eg = g.createLinearGradient(-2.6, 0, 2.6, 0); eg.addColorStop(0, shade('#3a2a22', k * 1.15)); eg.addColorStop(1, shade('#1f1612', k));
        g.fillStyle = eg; g.beginPath(); g.moveTo(-2.4, 0); g.quadraticCurveTo(-3, -6.5, 0, -7.6); g.quadraticCurveTo(3, -6.5, 2.4, 0); g.closePath(); g.fill();
        if (k === 1) { g.fillStyle = 'rgba(120,70,50,0.6)'; g.beginPath(); g.moveTo(-1, -0.6); g.quadraticCurveTo(-1.3, -5, 0, -6); g.quadraticCurveTo(1.2, -5, 1, -0.6); g.fill(); }
        g.restore();
      }
      const hg = g.createRadialGradient(hx - 1.5, hy - 2.5, 0.8, hx, hy, 7.6); hg.addColorStop(0, '#4a3529'); hg.addColorStop(1, '#1d1410');
      g.fillStyle = hg; g.beginPath(); g.ellipse(hx, hy, 7, 6.2, 0.1, 0, Math.PI * 2); g.fill();
      pE(g, hx + 5.2, hy + 1.6, 3.4, 3, 0.1, '#2a1d17');                                        // muzzle
      pE(g, hx + 2, hy + 2.6, 2.8, 2, 0, 'rgba(120,70,45,0.55)');                              // a cheek
      pE(g, hx + 8, hy + 0.8, 0.9, 0.7, 0, '#b07a6a');                                          // the nose
      line(g, [hx + 7.6, hy + 1.6, hx + 7.4, hy + 2.8, hx + 6.2, hy + 3.3], 'rgba(0,0,0,0.5)', 0.4);
      pE(g, hx + 2.2, hy - 1.2, 2.6, 2.6, 0, 'rgba(110,60,40,0.65)');                           // the lighter ring round the eye
      petEye(g, hx + 2.4, hy - 1.2, 1.9, t, '#3e2216', 'round', 0.7);
      g.globalAlpha *= 0.55; for (const dy of [-0.6, 0.6]) line(g, [hx + 6.5, hy + 2, hx + 12, hy + 1.4 + dy * 2], '#d7ccc8', 0.35); g.globalAlpha /= 0.55;
      g.restore();
    } else if (id === 'd_lilu') {   // Лилу (CR4YNE family) — a white puppy with ginger patches, a white blaze, a big
      // ginger head with dark-edged ears (one stands up, the other folds), a long white tail
      quad(g, t, still, { L: 9, w: 2.6, rx: 10.5, ry: 5.6, col: '#f7f4ef', paw: '#f2ede4', legCol: '#f4f0ea', f: 13.5, bounce: 2,
        marks: (g, by) => {
          pE(g, -6.5, by - 3.4, 3.4, 2.2, 0.2, '#c98345'); pE(g, -8.2, by - 2.6, 1.6, 1.2, 0, '#7a4a28');   // the patch on the hip
          for (const [x, y] of [[-3, 2.5], [2, 3], [6, 2.4]]) pE(g, x, by + y, 0.7, 0.5, 0, 'rgba(201,131,69,0.8)');   // freckles
        },
        tail: (g, tx, ty, s, run) => tailChain(g, tx, ty, t, run, { n: 7, len: 15, prof: f => 2.8 - 1.6 * f, a: -2.3, curl: 0.22, root: 0.35, amp: 0.12, lag: 0.4, fq: 9, col: '#fbfaf7', under: '#ddd6cc', r: { fq: 13 } }),
        head: (g, hx, hy, t, run) => {
          const r = 6.2, ew = run ? Math.sin(t * 24) * 0.18 : Math.sin(t * 2) * 0.06;
          // the back ear stands up: tall, dark edges, ginger inside
          g.save(); g.translate(hx - 3, hy - 4.5); g.rotate(-0.25 + ew * 0.4);
          g.fillStyle = '#6b4024'; g.beginPath(); g.moveTo(-3, 1); g.quadraticCurveTo(-3.5, -7, 0.5, -11); g.quadraticCurveTo(3.6, -6, 3, 1); g.closePath(); g.fill();
          g.fillStyle = '#d99a5c'; g.beginPath(); g.moveTo(-1.4, 0); g.quadraticCurveTo(-1.6, -5.5, 0.4, -8.5); g.quadraticCurveTo(2, -5, 1.6, 0); g.closePath(); g.fill();
          g.restore();
          const hg = g.createRadialGradient(hx - 2, hy - 2.5, 1, hx, hy, r * 1.1); hg.addColorStop(0, '#e2a462'); hg.addColorStop(1, '#a8652f');
          g.fillStyle = hg; g.beginPath(); g.ellipse(hx, hy, r, r * 0.92, 0, 0, Math.PI * 2); g.fill();
          g.fillStyle = '#fbfaf7'; g.beginPath(); g.moveTo(hx + 1.6, hy - r * 0.9); g.quadraticCurveTo(hx + 3.2, hy - 2, hx + 4, hy + 1); g.lineTo(hx + 1.6, hy + 2); g.quadraticCurveTo(hx + 1.4, hy - 2, hx + 0.6, hy - r * 0.85); g.closePath(); g.fill();   // the white blaze
          pE(g, hx + 5.4, hy + 2, 3.8, 2.6, 0.12, '#fbfaf7');                                     // the white muzzle
          pE(g, hx + 5.4, hy + 3.2, 3, 1.4, 0.1, 'rgba(150,140,130,0.35)');
          pE(g, hx + 8.6, hy + 1.2, 1.7, 1.25, 0, '#2a2522'); pE(g, hx + 8.1, hy + 0.7, 0.55, 0.4, 0, 'rgba(255,255,255,0.6)');
          line(g, [hx + 7.8, hy + 2.4, hx + 6.4, hy + 3.8, hx + 4.6, hy + 3.6], 'rgba(0,0,0,0.45)', 0.6);
          if (run) pE(g, hx + 5.6, hy + 4.6 + Math.sin(t * 26) * 0.4, 1.3, 1.9, 0.2, '#ff7b9a');
          petEye(g, hx + 1.2, hy - 1.4, 1.6, t, '#5d3218', 'round', 1.3); petEye(g, hx + 5, hy - 1.6, 1.3, t, '#5d3218', 'round', 1.3);
          // the front ear folds: dark-tipped, flopping as she runs
          g.save(); g.translate(hx - 0.5, hy - r * 0.7); g.rotate(0.55 + ew);
          g.fillStyle = '#7a4a2a'; g.beginPath(); g.moveTo(-2.6, 0); g.quadraticCurveTo(-2, -7, 2.6, -8); g.quadraticCurveTo(5.4, -6, 4.4, -2.4); g.quadraticCurveTo(2, 0.6, -2.6, 0); g.fill();
          g.fillStyle = '#4a2b17'; g.beginPath(); g.moveTo(2.6, -8); g.quadraticCurveTo(5.4, -6, 4.4, -2.4); g.lineTo(3.3, -4.5); g.closePath(); g.fill();
          g.restore();
        } });
    } else if (id === 'd_sonya') {   // Соня (Насики) — a round tabby cat: grey-brown stripes, a white bib, chin and paws, green eyes
      quad(g, t, still, { L: 8.5, w: 2.8, rx: 10.5, ry: 6.3, col: '#7f746a', belly: '#fafafa', paw: '#fafafa', legCol: '#eee8e1', f: 12,
        under: (g, by) => fluff(g, 0, by + 0.4, 10.6, 6.3, 16, 0.06, '#6e645b', 0),
        marks: (g, by) => {
          g.save(); g.beginPath(); g.ellipse(0, by, 10.5, 6.3, 0, 0, Math.PI * 2); g.clip();
          g.strokeStyle = 'rgba(52,44,38,0.75)'; g.lineWidth = 1.2;   // tabby stripes, curving down the sides
          for (const k of [-7, -4, -1, 2, 5]) { g.beginPath(); g.moveTo(k, by - 6.5); g.quadraticCurveTo(k - 2, by - 2, k - 0.5, by + 1.5); g.stroke(); }
          pE(g, 6, by + 3, 4, 3, 0, '#fafafa'); g.restore();
        },
        tail: (g, tx, ty, s, run) => { const q = tailChain(g, tx, ty, t, run, { n: 7, len: 16, w0: 3.2, w1: 2.4, a: -2.1, curl: 0.15, amp: 0.3, lag: 0.75, fq: 2, col: '#7f746a', r: { a: -2.7, curl: 0.08, fq: 5.5 } });
          for (let k = 2; k < 7; k += 2) pE(g, q[k][0], q[k][1], 1.5, 1.5, 0, '#3e352f'); pE(g, q[7][0], q[7][1], 1.3, 1.3, 0, '#3e352f'); },
        head: (g, hx, hy, t) => {
          catHead(g, hx, hy, t, { col: '#857a70', r: 6.6, inner: '#e8b0a8', iris: '#9ccc65', pupil: 'slit', muzzle: '#fafafa', stripes: '#4a4038', nose: '#d99a95', whisk: '#ffffff', seed: 0.3 });
          pE(g, hx + 2.4, hy + 4.6, 3.6, 2.4, 0, '#fafafa');   // the white chin and bib
          line(g, [hx - 2.6, hy + 1.4, hx - 4.6, hy + 2.6], '#4a4038', 0.8); line(g, [hx - 2.4, hy + 3, hx - 4.4, hy + 4], '#4a4038', 0.8);   // cheek stripes
        } });
    } else if (id === 'd_asya') {   // Ася (Насики) — an oriental, seal-point (1.0.57 redraw): a slim but solid cream body that darkens
      // towards the back and the legs, a 3/4 wedge head with the dark seal mask over the whole face, big ears growing out of the head,
      // blue almond eyes, a long whip tail carried up in a curve
      const SEAL = '#3b2a20', CREAM = '#f2e8d8';
      quad(g, t, still, { L: 10.5, w: 2.3, rx: 11, ry: 5.4, col: CREAM, belly: '#faf5ec', paw: '#2e2018', legCol: '#7b5c48', f: 12, bounce: 1.5, hdx: 4.5, hdy: 2.6,
        marks: (g, by) => {   // the points shading: a warm fawn haze over the back and the haunch
          g.save(); g.beginPath(); g.ellipse(0, by, 11, 5.4, 0, 0, Math.PI * 2); g.clip();
          const sg = g.createLinearGradient(-11, 0, 6, 0); sg.addColorStop(0, 'rgba(110,80,56,0.55)'); sg.addColorStop(1, 'rgba(110,80,56,0)');
          g.fillStyle = sg; g.fillRect(-11, by - 6, 17, 12);
          const tg = g.createLinearGradient(0, by - 5.4, 0, by); tg.addColorStop(0, 'rgba(120,90,64,0.35)'); tg.addColorStop(1, 'rgba(120,90,64,0)');
          g.fillStyle = tg; g.fillRect(-11, by - 6, 22, 6); g.restore();
        },
        tail: (g, tx, ty, s, run) => { const q = tailChain(g, tx, ty, t, run, { n: 9, len: 20, w0: 2.4, w1: 1, a: -2.25, curl: 0.2, amp: 0.3, lag: 0.75, fq: 2, col: '#5a4232', r: { a: -2.75, curl: 0.1, fq: 5.5 } });
          pE(g, q[9][0], q[9][1], 1, 1, 0, SEAL); },
        head: (g, hx, hy, t) => {
          const r = 6;
          for (const [ex, back] of [[-3.6, 1], [2.4, 0]]) {   // big ears, wide at the base, set low on the sides of the head
            g.fillStyle = back ? '#2c1f17' : SEAL;
            g.beginPath(); g.moveTo(hx + ex - 3.6, hy - r * 0.2); g.lineTo(hx + ex - 0.4, hy - r - 7.5); g.lineTo(hx + ex + 3.4, hy - r * 0.35); g.closePath(); g.fill();
            g.fillStyle = back ? '#8a645a' : '#b88a7c';
            g.beginPath(); g.moveTo(hx + ex - 1.8, hy - r * 0.5); g.lineTo(hx + ex - 0.4, hy - r - 5.2); g.lineTo(hx + ex + 1.6, hy - r * 0.55); g.closePath(); g.fill();
          }
          // the head: a slightly long, narrow wedge
          g.save(); g.translate(hx, hy); g.scale(1.12, 0.9);
          pE(g, 0, 0, r, r, 0, rGrad(g, 0, 0, r, '#efe3cf')); g.restore();
          pE(g, hx + r * 0.75, hy + r * 0.32, r * 0.55, r * 0.38, 0.12, '#e6d7c0');   // the muzzle
          // the seal mask: dark on the muzzle, fading out over the eyes towards the ears
          g.save(); g.beginPath(); g.ellipse(hx, hy, r * 1.12, r * 0.9, 0, 0, Math.PI * 2); g.ellipse(hx + r * 0.75, hy + r * 0.32, r * 0.55, r * 0.38, 0.12, 0, Math.PI * 2); g.clip();
          const mg = g.createRadialGradient(hx + r * 0.95, hy + r * 0.3, 0.3, hx + r * 0.6, hy + r * 0.05, r * 1.15);
          mg.addColorStop(0, SEAL); mg.addColorStop(0.55, 'rgba(59,42,32,0.88)'); mg.addColorStop(1, 'rgba(59,42,32,0)');
          g.fillStyle = mg; g.fillRect(hx - r * 1.2, hy - r, r * 3, r * 2.2);
          g.restore();
          petEye(g, hx - r * 0.02, hy - r * 0.16, r * 0.28, t, '#5aa9f0', 'slit', 0.7);   // blue almond eyes
          petEye(g, hx + r * 0.6, hy - r * 0.18, r * 0.23, t, '#5aa9f0', 'slit', 0.7);
          g.fillStyle = '#1a120d'; g.beginPath(); g.moveTo(hx + r * 1.2, hy + r * 0.12); g.lineTo(hx + r * 1.42, hy + r * 0.14); g.lineTo(hx + r * 1.3, hy + r * 0.32); g.closePath(); g.fill();
          line(g, [hx + r * 0.95, hy + r * 0.58, hx + r * 1.15, hy + r * 0.48, hx + r * 1.35, hy + r * 0.56], '#1a120d', 0.6);
          g.globalAlpha *= 0.7; for (const dy of [-0.6, 0.5]) line(g, [hx + r * 1.3, hy + r * 0.38, hx + r * 2.1, hy + r * 0.33 + dy], '#efe6d8', 0.45); g.globalAlpha /= 0.7;
        } });
    } else if (id === 'lvl_star') {   // level 30 reward: a little star with a face, trailing sparkles
      const fy = -64 + Math.sin(t * 3) * 4, rot = Math.sin(t * 2) * 0.25;
      g.translate(0, fy);
      for (let k = 0; k < 4; k++) { const e = (t * 1.5 + k * 0.25) % 1; g.globalAlpha = 1 - e; g.fillStyle = '#fff59d'; starPath(g, -6 - e * 16, Math.sin(k * 2 + t * 3) * 3, 1.6 * (1 - e) + 0.4); g.fill(); }
      g.globalAlpha = 1;
      g.save(); g.rotate(rot); g.shadowColor = 'rgba(255,214,0,0.9)'; g.shadowBlur = 10;
      const sg2 = g.createRadialGradient(-2, -3, 1, 0, 0, 10); sg2.addColorStop(0, '#fffde7'); sg2.addColorStop(0.5, '#ffd54f'); sg2.addColorStop(1, '#ffa000');
      g.fillStyle = sg2; starPath(g, 0, 0, 10); g.fill(); g.restore();
      petEye(g, -2.5, -1, 1.2, t, null, null, 0.2); petEye(g, 2.5, -1, 1.2, t, null, null, 0.2);
      line(g, [-1.5, 2.5, 0, 3.4, 1.5, 2.5], '#8d6e63', 0.7);
      pE(g, -4.5, 1.6, 1.3, 0.8, 0, 'rgba(255,128,100,0.5)'); pE(g, 4.5, 1.6, 1.3, 0.8, 0, 'rgba(255,128,100,0.5)');
    } else if (id === 'bird') {   // canary
      const fy = -62 + Math.sin(t * 3) * 4, fl = flapOf(t * 17);
      g.translate(0, fy);
      g.fillStyle = '#e0a800'; for (const a of [-0.3, 0, 0.3]) { g.save(); g.translate(-6, 1); g.rotate(a + 0.15); pE(g, -4, 0, 4.5, 1.6, 0, '#e8b100'); g.restore(); }
      petWing(g, 0, -2, 11, fl, '#f2c200', '#c99700', true);
      pE(g, 0, 0, 8, 6.4, -0.1, vGrad(g, -6, 6, '#ffe36e', '#f2b600'));
      pE(g, 1.5, 2.6, 5, 3, 0, '#fff3b0');
      pE(g, 5.6, -4.2, 4.8, 4.6, 0, rGrad(g, 5.6, -4.2, 4.8, '#ffe066', 1.15, 0.85));
      pE(g, 7, -2.6, 1.3, 0.9, 0, 'rgba(255,128,100,0.5)');
      petEye(g, 6.8, -5.2, 1.4, t, null, null, 0.2);
      g.fillStyle = '#ff8f00'; g.beginPath(); g.moveTo(9.6, -5); g.lineTo(13, -3.8); g.lineTo(9.6, -2.6); g.closePath(); g.fill();
      line(g, [-1, 5.5, -2, 7.5], '#e65100', 0.8); line(g, [1.5, 5.6, 0.8, 7.6], '#e65100', 0.8);
      petWing(g, 1, -1, 12, fl, '#ffd84a', '#e3a900', true);
    } else if (id === 'owl') {   // 1.0.46: the body leans forward in flight; the head stays level and looks at the player
      const fy = -64 + Math.sin(t * 3) * 3, fl = flapOf(t * 9), lean = 0.55;
      g.translate(0, fy);
      g.save(); g.rotate(lean);
      petWing(g, -1, -1, 12, fl, '#6d4c41', '#4e342e', true);
      g.fillStyle = '#5d4037'; g.beginPath(); g.moveTo(-6, 4); g.lineTo(-12, 6); g.lineTo(-11, 8); g.lineTo(-5, 7.5); g.closePath(); g.fill();   // tail
      pE(g, 0, 0, 7.5, 9, 0, vGrad(g, -9, 9, '#a1887f', '#6d4c41'));
      pE(g, 1.4, 2.4, 4.6, 5.6, 0, '#d7ccc8');
      for (const [vx, vy] of [[0, 0], [2.6, 1.6], [0.2, 3.6], [2.8, 5], [-1.8, 2]]) line(g, [vx - 0.9, vy, vx, vy + 0.9, vx + 0.9, vy], '#8d6e63', 0.6);
      for (const s2 of [-1.5, 1.5]) line(g, [s2 - 1, 8.5, s2 - 3.2, 10], '#ffb300', 1);   // talons tucked back
      g.restore();
      const hx = 5.8, hy = -8.2 + Math.sin(t * 9) * 0.4;
      for (const s2 of [-1, 1]) { g.fillStyle = '#6d4c41'; g.beginPath(); g.moveTo(hx + s2 * 3, hy - 5); g.lineTo(hx + s2 * 5.4, hy - 10.5); g.lineTo(hx + s2 * 6.2, hy - 3.6); g.closePath(); g.fill(); }
      pE(g, hx, hy, 7, 6.4, 0, rGrad(g, hx, hy, 7, '#8d6e63', 1.15, 0.8));
      for (const s2 of [-1, 1]) { pE(g, hx + s2 * 3, hy + 0.3, 3.4, 3.6, 0, '#efe3d3'); petEye(g, hx + s2 * 3, hy - 0.2, 2.1, t, '#ffca28', 'round', 0.6); }
      g.fillStyle = '#ff9800'; g.beginPath(); g.moveTo(hx - 1, hy + 1.6); g.lineTo(hx + 1, hy + 1.6); g.lineTo(hx, hy + 4.2); g.closePath(); g.fill();
      g.save(); g.rotate(lean); petWing(g, 0.5, 0, 12.5, fl, '#8d6e63', '#5d4037', true); g.restore();
    } else if (id === 'bat') {
      const fy = -66 + Math.sin(t * 5) * 4, fl = flapOf(t * 20);
      g.translate(0, fy);
      const bw = (s2, k) => {
        g.fillStyle = k ? '#4a3866' : '#32264a';
        const tip = -8 * fl;
        g.beginPath(); g.moveTo(0, -1);
        g.quadraticCurveTo(s2 * 7, tip - 5, s2 * 16, tip - 1);
        g.quadraticCurveTo(s2 * 13, tip + 3, s2 * 11, tip + 5 - fl);
        g.quadraticCurveTo(s2 * 8, 1, s2 * 6, 3.5);
        g.quadraticCurveTo(s2 * 4, 1.5, 0, 3); g.closePath(); g.fill();
        line(g, [0, -1, s2 * 8, tip - 3, s2 * 16, tip - 1], '#22182f', 0.7);
        line(g, [s2 * 8, tip - 3, s2 * 11, tip + 5 - fl], '#22182f', 0.6);
      };
      bw(-1, 0); bw(1, 1);   // 1.0.47: both wings behind the body
      pE(g, 0, 0.5, 4.8, 5.8, 0, vGrad(g, -6, 6, '#5e4a7e', '#2e2242'));
      for (const s2 of [-1, 1]) { g.fillStyle = '#4a3866'; g.beginPath(); g.moveTo(s2 * 1, -4); g.lineTo(s2 * 3.8, -10); g.lineTo(s2 * 4.2, -3.5); g.closePath(); g.fill(); g.fillStyle = '#f48fb1'; g.beginPath(); g.moveTo(s2 * 2, -4.2); g.lineTo(s2 * 3.6, -8.2); g.lineTo(s2 * 3.6, -4); g.closePath(); g.fill(); }
      for (const s2 of [-1, 1]) petEye(g, s2 * 1.8, -1.6, 1.15, t, null, null, 1.2);
      g.fillStyle = '#fff'; g.beginPath(); g.moveTo(-1, 1.3); g.lineTo(-0.5, 2.8); g.lineTo(0, 1.3); g.moveTo(0.4, 1.3); g.lineTo(0.9, 2.8); g.lineTo(1.4, 1.3); g.fill();
    } else if (id === 'bee') {
      const fy = -56 + Math.sin(t * 7) * 3, fl = Math.sin(t * 70);
      g.translate(0, fy);
      g.fillStyle = `rgba(225,245,255,${0.55 + 0.25 * fl})`; g.strokeStyle = 'rgba(144,202,249,0.8)'; g.lineWidth = 0.5;
      for (const [wx, a] of [[-1.5, -0.5], [1.5, 0.35]]) { g.beginPath(); g.ellipse(wx, -6, 3.2, 6 * (0.55 + 0.45 * Math.abs(fl)), a, 0, Math.PI * 2); g.fill(); g.stroke(); }
      g.fillStyle = '#4e342e'; g.beginPath(); g.moveTo(-7.5, 0.5); g.lineTo(-11, 1.4); g.lineTo(-7.5, 2.3); g.fill();
      g.save(); g.beginPath(); g.ellipse(0, 0.5, 7.8, 5.4, 0, 0, Math.PI * 2); g.clip();
      g.fillStyle = vGrad(g, -5, 6, '#ffe082', '#f9a825'); g.fillRect(-9, -6, 18, 13);
      g.fillStyle = '#3e2723'; g.fillRect(-4.2, -6, 2.4, 13); g.fillRect(0.6, -6, 2.4, 13);
      g.fillStyle = 'rgba(255,255,255,0.35)'; g.fillRect(-9, -4.8, 18, 1.4);
      g.restore();
      pE(g, 7, -1, 3.8, 3.6, 0, rGrad(g, 7, -1, 3.8, '#4e342e', 1.3, 0.8));
      petEye(g, 8, -1.6, 1.3, t, null, null, 0.5);
      line(g, [6.5, -4, 7, -7, 9, -8], '#3e2723', 0.6); line(g, [8, -4, 9.5, -6.5, 11.5, -6.8], '#3e2723', 0.6);
      for (const lx of [-2, 1, 4]) line(g, [lx, 5, lx - 1, 7.3], '#3e2723', 0.6);
    } else if (id === 'drone') {
      const fy = -70 + Math.sin(t * 2.5) * 3.5, tilt = Math.sin(t * 1.7) * 0.06;
      g.translate(0, fy); g.rotate(tilt);
      line(g, [-12, -4, -4, 0], '#78909c', 2); line(g, [12, -4, 4, 0], '#78909c', 2);
      for (const mx of [-12, 12]) {
        g.fillStyle = '#37474f'; g.fillRect(mx - 1.6, -6, 3.2, 3);
        g.fillStyle = 'rgba(176,190,197,0.35)'; g.beginPath(); g.ellipse(mx, -6.2, 7.5, 1.6, 0, 0, Math.PI * 2); g.fill();
        const pr = Math.cos(t * 50 + mx) * 7; line(g, [mx - pr, -6.4, mx + pr, -6], '#263238', 1.1);
      }
      g.fillStyle = vGrad(g, -4, 5, '#90a4ae', '#455a64'); roundRectOn(g, -8.5, -3.5, 17, 7.5, 3.2); g.fill();
      g.fillStyle = 'rgba(255,255,255,0.35)'; roundRectOn(g, -7, -3, 9, 1.6, 0.8); g.fill();
      pE(g, 2, 5, 2.6, 2.4, 0, '#263238'); pE(g, 2.4, 5, 1.4, 1.4, 0, '#4fc3f7'); pE(g, 2, 4.4, 0.5, 0.5, 0, '#fff');
      pE(g, -6, 1.5, 0.9, 0.9, 0, Math.sin(t * 6) > 0 ? '#ff1744' : '#4a0010');
      pE(g, 6.5, 1.5, 0.9, 0.9, 0, Math.sin(t * 6) > 0 ? '#00e676' : '#003d1f');
    } else if (id === 'ghost') {   // daily reward — glowing, soft and lively
      const fy = -52 + Math.sin(t * 2.6) * 5, lean = Math.sin(t * 1.3) * 0.08;
      g.translate(0, fy); g.rotate(lean);
      for (let k = 3; k >= 1; k--) pE(g, -10 - k * 5, 6 + Math.sin(t * 3 + k) * 2, 4 - k * 0.8, 3.2 - k * 0.6, 0, `rgba(225,235,255,${0.09 * (4 - k)})`);
      g.save(); g.shadowColor = 'rgba(170,200,255,0.95)'; g.shadowBlur = 14;
      g.fillStyle = vGrad(g, -11, 13, 'rgba(255,255,255,0.97)', 'rgba(214,226,255,0.82)');
      g.beginPath(); g.arc(0, -1, 10, Math.PI, 0); g.lineTo(10, 10);
      for (let i = 0; i < 5; i++) { const x0 = 10 - i * 4; g.quadraticCurveTo(x0 - 2, 13.5 + Math.sin(t * 7 + i) * 2, x0 - 4, 10 + Math.sin(t * 7 + i + 1) * 0.8); }
      g.closePath(); g.fill(); g.restore();
      pE(g, -4, -6, 3, 1.8, -0.5, 'rgba(255,255,255,0.9)');
      for (const s2 of [-1, 1]) { g.save(); g.translate(s2 * 9.5, 3); g.rotate(s2 * (0.6 + Math.sin(t * 5 + s2) * 0.35)); pE(g, s2 * 2, 0, 3.2, 1.8, 0, 'rgba(240,245,255,0.95)'); g.restore(); }
      for (const ex of [0.5, 6]) { pE(g, ex, -1.5, 2, 2.8, 0, '#1a1a2e'); pE(g, ex - 0.6, -2.6, 0.8, 0.9, 0, '#fff'); pE(g, ex + 0.5, -0.5, 0.35, 0.35, 0, '#fff'); }
      pE(g, -1.8, 2.2, 1.6, 0.9, 0, 'rgba(255,128,171,0.5)'); pE(g, 8, 2.2, 1.6, 0.9, 0, 'rgba(255,128,171,0.5)');
      pE(g, 3.3, 3.6, 1.3, 1 + Math.abs(Math.sin(t * 2)) * 0.8, 0, '#1a1a2e');
      for (let k = 0; k < 3; k++) { const a = Math.max(0, Math.sin(t * 4 + k * 2.1)); if (a > 0.5) { g.globalAlpha = (a - 0.5) * 2; g.fillStyle = '#e3f2fd'; starPath(g, -12 + k * 12, -13 + k * 3, 1.6); g.fill(); g.globalAlpha = 1; } }
    } else if (id === 'dragon') {   // daily reward — horns, spikes, bat wings, a puff of fire now and then
      const fy = -60 + Math.sin(t * 2.8) * 4, fl = flapOf(t * 10);
      g.translate(0, fy);
      const wingD = (k) => {
        const tip = -12 * fl - 3;
        g.fillStyle = k ? vGrad(g, tip - 4, 4, '#4db6ac', '#00796b') : vGrad(g, tip - 4, 4, '#26806f', '#004d40');
        g.beginPath(); g.moveTo(-1, -3);
        g.lineTo(-6 - k * 2, tip - 3); g.lineTo(-14 - k * 2, tip + 1);
        g.quadraticCurveTo(-12, tip + 5, -11, tip + 8 - fl * 2);
        g.quadraticCurveTo(-8, 0, -4, 2); g.closePath(); g.fill();
        line(g, [-1, -3, -6 - k * 2, tip - 3, -14 - k * 2, tip + 1], k ? '#2e7d32' : '#1b5e20', 1.3);
        line(g, [-6 - k * 2, tip - 3, -11, tip + 8 - fl * 2], 'rgba(27,94,32,0.7)', 0.7);
      };
      wingD(0);
      const tw = Math.sin(t * 3) * 2;
      g.fillStyle = vGrad(g, -4, 6, '#66bb6a', '#2e7d32');
      g.beginPath(); g.moveTo(-6, -2); g.quadraticCurveTo(-14, 2, -19, 0 + tw); g.quadraticCurveTo(-13, 5, -5, 4); g.closePath(); g.fill();
      g.fillStyle = '#ff7043'; g.beginPath(); g.moveTo(-19, 0 + tw); g.lineTo(-24, -3 + tw); g.lineTo(-22.5, 1.5 + tw); g.lineTo(-24, 4 + tw); g.closePath(); g.fill();
      pE(g, 0, 0, 9.5, 6.2, -0.1, vGrad(g, -6, 6, '#7ccf7f', '#2e7d32'));
      g.save(); g.beginPath(); g.ellipse(0.5, 2.8, 6.5, 3, -0.1, 0, Math.PI * 2); g.clip();
      g.fillStyle = '#f3e5ab'; g.fillRect(-7, -1, 15, 8);
      for (let k = -5; k <= 6; k += 2.4) line(g, [k, -0.5, k + 0.6, 6], '#d4c27a', 0.6);
      g.restore();
      g.fillStyle = '#ff8a65'; for (const [sx2, sy2] of [[-7, -4.5], [-3.5, -6.2], [0, -6.8], [3.5, -6.4]]) { g.beginPath(); g.moveTo(sx2 - 1.6, sy2 + 1.4); g.lineTo(sx2, sy2 - 2.6); g.lineTo(sx2 + 1.6, sy2 + 1.2); g.fill(); }
      line(g, [-2, 5, -3, 8], '#2e7d32', 2); line(g, [3, 5, 2.5, 8], '#388e3c', 2);
      pE(g, 7, -4, 3.4, 4.6, -0.6, '#4caf50');
      const hx = 11, hy = -8;
      g.fillStyle = '#efe0b0';
      g.beginPath(); g.moveTo(hx - 3, hy - 3); g.quadraticCurveTo(hx - 7, hy - 8, hx - 9, hy - 7); g.quadraticCurveTo(hx - 6, hy - 5, hx - 1.5, hy - 2); g.fill();
      pE(g, hx, hy, 5.6, 4.6, 0, rGrad(g, hx, hy, 5.6, '#66bb6a', 1.2, 0.8));
      pE(g, hx + 4.6, hy + 1.4, 3.8, 2.6, 0.1, '#5cb860');
      pE(g, hx + 7.2, hy + 0.4, 0.6, 0.45, 0, '#1b5e20');
      g.fillStyle = '#fff3c4'; g.beginPath(); g.moveTo(hx - 1, hy - 3.5); g.quadraticCurveTo(hx - 4, hy - 9, hx - 6.5, hy - 9.5); g.quadraticCurveTo(hx - 3.6, hy - 6, hx + 0.8, hy - 3.6); g.fill();
      petEye(g, hx + 1.2, hy - 1.4, 1.7, t, '#ffd600', 'slit', 0.8);
      line(g, [hx + 3.5, hy + 3.2, hx + 7, hy + 2.8], '#1b5e20', 0.6);
      const fire = (t % 2.6) < 0.55;
      if (fire) {
        const fk = (t % 2.6) / 0.55, len = 8 + Math.sin(fk * Math.PI) * 9;
        const fg = g.createLinearGradient(hx + 8, 0, hx + 8 + len, 0);
        fg.addColorStop(0, 'rgba(255,245,157,0.95)'); fg.addColorStop(0.5, 'rgba(255,152,0,0.85)'); fg.addColorStop(1, 'rgba(244,67,54,0)');
        g.fillStyle = fg; g.beginPath(); g.moveTo(hx + 8, hy + 1.6);
        g.quadraticCurveTo(hx + 8 + len * 0.5, hy - 3 + Math.sin(t * 40) * 1.5, hx + 8 + len, hy + 1 + Math.sin(t * 33));
        g.quadraticCurveTo(hx + 8 + len * 0.5, hy + 6 + Math.sin(t * 37) * 1.5, hx + 8, hy + 2.8); g.closePath(); g.fill();
      }
      wingD(1);
    } else if (id === 'p_phoenix') {
      const fy = -66 + Math.sin(t * 3) * 4, fl = flapOf(t * 12);
      g.translate(0, fy);
      g.save(); g.shadowColor = 'rgba(255,120,0,0.9)'; g.shadowBlur = 12;
      for (let k = 0; k < 4; k++) {
        const wv = Math.sin(t * 9 + k * 1.3) * 2.5;
        g.fillStyle = ['#ff3d00', '#ff9100', '#ffd600', '#ff6d00'][k];
        g.beginPath(); g.moveTo(-5, -1 + k * 0.6);
        g.quadraticCurveTo(-14, 1 + k * 2 + wv, -25 - k * 2, 5 + k * 3 + wv);
        g.quadraticCurveTo(-15, 4 + k * 2, -5, 3); g.closePath(); g.fill();
      }
      petWing(g, 0, -2, 13, fl, '#ff6d00', '#d84315', true);
      pE(g, 0, 0, 8, 5.2, 0, vGrad(g, -5, 5, '#ffab40', '#e64a19'));
      pE(g, 1, 2, 5, 2.6, 0, '#ffe082');
      pE(g, 7.5, -3, 4, 3.8, 0, rGrad(g, 7.5, -3, 4, '#ff7043', 1.2, 0.8));
      for (let k = 0; k < 3; k++) { const wv = Math.sin(t * 12 + k) * 1.2; g.fillStyle = ['#ffd600', '#ff9100', '#ff3d00'][k]; g.beginPath(); g.moveTo(6 + k, -6); g.quadraticCurveTo(4 + k * 1.5 + wv, -10 - k, 2 + k * 2 + wv, -12 - k * 1.5); g.lineTo(8 + k * 0.8, -5.5); g.fill(); }
      g.restore();
      petEye(g, 8.6, -3.6, 1.3, t, null, null, 1.6);
      g.fillStyle = '#ffd600'; g.beginPath(); g.moveTo(11, -3.6); g.lineTo(14.5, -2.4); g.lineTo(11, -1.2); g.closePath(); g.fill();
      petWing(g, 1, -1, 14, fl, '#ffca28', '#ff6d00', true);
      for (let k = 0; k < 5; k++) { const e = (t * 1.8 + k * 0.37) % 1; g.globalAlpha = 1 - e; pE(g, -6 - e * 20, 3 + Math.sin(k * 3 + t * 4) * 3 + e * 4, 0.9, 0.9, 0, k % 2 ? '#ffd600' : '#ff6d00'); }
      g.globalAlpha = 1;
    } else if (id === 'p_kitsune') {   // 1.0.51: a fox spirit — cream fur, three tails with blue fox-fire tips, a red mark
      quad(g, t, still, { L: 9, w: 2.4, rx: 10.5, ry: 5.4, col: '#fff3d6', belly: '#ffffff', paw: '#ffe0a8', legCol: '#ffe9c2', f: 13,
        tail: (g, tx, ty, s, run) => {
          for (const [k, da] of [[2, -0.5], [1, 0], [0, 0.45]]) {
            const q = tailChain(g, tx, ty, t + k * 0.3, run, { n: 7, len: 16, prof: f => 2.5 + 4 * Math.sin(Math.min(1, f * 1.05) * Math.PI * 0.85), a: -2.4 + da, curl: 0.05, amp: 0.16, lag: 0.8, fq: 2.6, ph: k, col: k === 1 ? '#fff3d6' : '#f6e2b8', r: { a: -2.8 + da * 0.6, fq: 5 } });
            const e = q[7]; g.save(); g.shadowColor = '#40c4ff'; g.shadowBlur = 8; pE(g, e[0], e[1], 2.6, 2.6, 0, `rgba(64,196,255,${0.7 + 0.3 * Math.sin(t * 8 + k)})`); g.restore(); pE(g, e[0], e[1], 1.2, 1.2, 0, '#e1f5fe');
          }
        },
        head: (g, hx, hy, t, run) => {
          dogHead(g, hx, hy, t, run, { col: '#fff3d6', snout: '#ffffff', ear: 'up', earIn: '#ffcdd2', earTip: '#e53935', long: 1, tongue: false, iris: '#ff7043', seed: 0.4 });
          g.fillStyle = '#e53935'; g.beginPath(); g.moveTo(hx - 0.5, hy - 4.5); g.lineTo(hx + 0.8, hy - 7); g.lineTo(hx + 2.1, hy - 4.5); g.lineTo(hx + 0.8, hy - 5.4); g.closePath(); g.fill();
        } });
    } else if (id === 'p_pegasus') {   // a winged horse: a silver-blue mane, big feathered wings beating as it trots
      const fl = 0.45 + 0.5 * flapOf(t * 7);   // the wings stay spread and beat around a raised position
      quad(g, t, still, { L: 12, w: 2.6, rx: 12, ry: 6.2, col: '#fafafa', paw: '#90a4ae', f: 11, noNeck: 1,
        tail: (g, tx, ty, s, run) => ['#cfd8dc', '#90caf9', '#e3f2fd'].forEach((c2, k) => tailChain(g, tx + 1, ty + k * 0.7, t, run, { n: 6, len: 14, w0: 2, w1: 1.2, a: -2.75 + k * 0.08, curl: -0.2, amp: 0.2, lag: 0.9, fq: 2, ph: k * 0.4, col: c2, r: { a: -2.95, curl: -0.06, fq: 7 } })),
        under: (g, by) => petWing(g, 1, by - 6, 19, fl, '#e3e8ef', '#b0bec5', true),
        marks: (g, by) => petWing(g, -1, by - 4, 22, fl, '#ffffff', '#cfd8dc', true),
        hdx: 5, hdy: 5,
        head: (g, hx, hy, t, run, ph) => {
          pE(g, hx - 1, hy + 4, 3.6, 6, 0.5, '#f4f6f8');
          pE(g, hx + 3, hy, 4.6, 4, 0.35, rGrad(g, hx + 3, hy, 5, '#fafafa', 1.05, 0.85));
          pE(g, hx + 7.5, hy + 2.4, 3.4, 2.6, 0.35, '#eef1f4'); pE(g, hx + 9.5, hy + 2.9, 0.6, 0.5, 0, '#607d8b');
          petEye(g, hx + 3.8, hy - 1, 1.4, t, null, null, 0.4);
          pE(g, hx + 0.5, hy - 3.2, 1.2, 2.4, -0.4, '#eceff1');
          ['#cfd8dc', '#90caf9', '#e3f2fd'].forEach((c2, k) => { const w2 = run ? Math.sin(ph + k) * 1.4 : Math.sin(t * 2 + k) * 0.6; line(g, [hx - 0.5 - k * 1.2, hy - 3 + k * 1.6, hx - 4 - k * 1.3 + w2, hy + k * 1.9], c2, 1.8); });
        } });
    } else if (id === 'p_axolotl') {   // a pink axolotl: frilly gills, a wide smile, a finned tail, little legs
      quad(g, t, still, { L: 4, w: 2, rx: 10, ry: 4.4, col: '#f8bbd0', belly: '#fce4ec', paw: '#f48fb1', f: 9, bounce: 0.6, noFlex: 1,
        tail: (g, tx, ty, s, run) => tailChain(g, tx, ty + 2, t, run, { n: 6, len: 14, prof: f => 5 - 3.6 * f, a: -3.05, curl: 0.02, amp: 0.18, lag: 0.7, fq: 3, col: '#f8bbd0', under: '#f06292', r: { fq: 6 } }),
        marks: (g, by) => { for (const [x, y] of [[-4, -2], [1, -3], [5, -1.5]]) pE(g, x, by + y, 1, 0.8, 0, 'rgba(236,64,122,0.35)'); },
        hdx: 2, hdy: -2,
        head: (g, hx, hy, t) => {
          for (const [k, a] of [[0, -0.9], [1, -0.4], [2, 0.1]]) for (const sd of [-1, 1]) {   // three frilly gills on each side
            const ang = a + Math.sin(t * 4 + k) * 0.12, gx = hx - 2 + sd * 1.5, gy = hy - 1;
            g.save(); g.translate(gx, gy); g.rotate(ang - (sd > 0 ? 0.3 : 0.9) - Math.PI / 2);
            g.fillStyle = vGrad(g, -7, 0, '#ff4081', '#f48fb1'); g.beginPath(); g.ellipse(0, -4, 1.4, 4.2, 0, 0, Math.PI * 2); g.fill();
            for (let q = 0; q < 3; q++) pE(g, 1.1, -2 - q * 2, 0.7, 0.5, 0, '#ff80ab');
            g.restore();
          }
          pE(g, hx, hy, 6.4, 5, 0, rGrad(g, hx, hy, 6.4, '#f8bbd0', 1.15, 0.85));
          petEye(g, hx + 1, hy - 1.4, 1.1, t, null, null, 0.7); petEye(g, hx + 4.6, hy - 1.4, 1, t, null, null, 0.7);
          line(g, [hx + 1, hy + 2, hx + 3.5, hy + 3.4, hx + 6, hy + 2], '#c2185b', 0.7);
          pE(g, hx + 0, hy + 1.5, 1, 0.6, 0, 'rgba(255,128,171,0.6)'); pE(g, hx + 5.5, hy + 1.5, 0.9, 0.6, 0, 'rgba(255,128,171,0.6)');
        } });
    } else if (id === 'p_capybara') {   // a calm capybara with a little orange on its head
      quad(g, t * 0.85, still, { L: 7, w: 3, rx: 12, ry: 7, col: '#a0764a', belly: '#b98d5c', paw: '#6d4c41', legCol: '#8d6440', f: 9, bounce: 0.8,
        tail: (g, tx, ty) => pE(g, tx + 1, ty, 1.4, 1.4, 0, '#8d6440'),
        marks: (g, by) => { for (let q = 0; q < 6; q++) line(g, [-8 + q * 3, by - 5.5, -8.6 + q * 3, by - 3], 'rgba(90,60,30,0.35)', 0.6); },
        hdx: 3, hdy: 0,
        head: (g, hx, hy, t) => {
          pE(g, hx - 2, hy - 4.6, 1.6, 1.4, 0, '#7a5530');
          pE(g, hx + 1.5, hy, 7, 5.4, 0.08, rGrad(g, hx + 1.5, hy, 7, '#a0764a', 1.12, 0.82));
          pE(g, hx + 6.8, hy + 1, 3, 3.4, 0, '#8d6440'); pE(g, hx + 8.6, hy, 0.6, 0.8, 0, '#3e2723');
          petEye(g, hx + 2.6, hy - 1.8, 0.9, t, null, null, 1.1);
          line(g, [hx + 1.5, hy - 2, hx + 3.6, hy - 2.2], 'rgba(60,40,20,0.6)', 0.6);   // sleepy lid
          pE(g, hx + 0.5, hy - 7.6, 3, 2.6, 0, rGrad(g, hx + 0.5, hy - 7.6, 3, '#ffa726', 1.2, 0.8));
          pE(g, hx + 0.8, hy - 10, 1.4, 0.6, -0.4, '#43a047');
        } });
    } else if (id === 'p_redpanda') {   // a red panda: rust fur, white face marks, a thick ringed tail
      quad(g, t, still, { L: 7.5, w: 3, rx: 10.5, ry: 5.8, col: '#d2541e', legCol: '#3e2723', paw: '#212121', belly: '#5d4037', f: 12,
        tail: (g, tx, ty, s, run) => {
          const q = tailChain(g, tx, ty, t, run, { n: 8, len: 17, prof: f => 4.5 + 1.5 * Math.sin(f * Math.PI), a: -2.6, curl: -0.04, amp: 0.15, lag: 0.8, fq: 2.4, col: '#d2541e', under: '#a63d12', r: { a: -2.85, fq: 5 } });
          for (let k = 1; k < 8; k += 2) pE(g, q[k][0], q[k][1], 2.6, 2.4, 0, '#f3b07a');
        },
        head: (g, hx, hy, t) => {
          for (const ex of [-3.5, 3]) { pE(g, hx + ex, hy - 5.2, 2.4, 2.4, 0, '#d2541e'); pE(g, hx + ex, hy - 5, 1.4, 1.4, 0, '#fafafa'); }
          pE(g, hx, hy, 6.4, 5.6, 0, rGrad(g, hx, hy, 6.4, '#e0682a', 1.12, 0.82));
          pE(g, hx + 3.5, hy + 1.6, 3.2, 2.4, 0, '#fafafa'); pE(g, hx + 1, hy - 3, 1.6, 1.2, 0, '#fafafa'); pE(g, hx + 5, hy - 3, 1.4, 1.1, 0, '#fafafa');
          pE(g, hx - 0.5, hy + 0.6, 1.2, 2.4, 0.3, '#8d3a12');
          petEye(g, hx + 1.4, hy - 1.2, 1.1, t, null, null, 0.3); petEye(g, hx + 5, hy - 1.3, 1, t, null, null, 0.3);
          pE(g, hx + 6.2, hy + 1.2, 0.9, 0.7, 0, '#212121');
        } });
    } else if (id === 'p_golem') {   // a little crystal golem: stone body, glowing crystals on its back, a heavy step
      const run = !still, bob = run ? -Math.abs(Math.sin(ph * 0.8)) * 1.2 : 0, by = -12 + bob, pul = 0.6 + 0.4 * Math.sin(t * 3);
      petShadow(g, 11, 2.2, 0, 'rgba(0,0,0,0.18)');
      petLeg(g, -3, by + 4, 9, ph * 0.8 + Math.PI, still, false, '#78909c', 3.8, '#546e7a');
      for (const [x, h2, c2] of [[-6, 11, '#7c4dff'], [-2, 14, '#40c4ff'], [2.5, 10, '#e040fb']]) {   // crystals
        g.save(); g.shadowColor = c2; g.shadowBlur = 8 * pul; g.fillStyle = vGrad(g, by - 8 - h2, by - 4, shade(c2, 1.4), c2);
        g.beginPath(); g.moveTo(x - 2.4, by - 5); g.lineTo(x, by - 5 - h2); g.lineTo(x + 2.4, by - 5); g.closePath(); g.fill(); g.restore();
        line(g, [x - 0.5, by - 6, x, by - 3 - h2], 'rgba(255,255,255,0.6)', 0.5);
      }
      pE(g, 0, by, 9, 7.5, 0, rGrad(g, 0, by, 9, '#90a4ae', 1.15, 0.7));
      for (const [x, y, r] of [[-4, 1, 2], [3, -3, 1.6], [4, 3, 1.4]]) pE(g, x, by + y, r, r * 0.8, 0, 'rgba(55,71,79,0.4)');
      petLeg(g, 3, by + 4, 9, ph * 0.8, still, false, '#90a4ae', 4, '#607d8b');
      line(g, [7, by - 2, 10, by + 3, 10.5, by + 6], '#78909c', 3.2);
      const hx = 6, hy = by - 6; pE(g, hx, hy, 5, 4.4, 0, rGrad(g, hx, hy, 5, '#b0bec5', 1.1, 0.75));
      g.save(); g.shadowColor = '#40c4ff'; g.shadowBlur = 8; pE(g, hx + 1.4, hy - 0.8, 1.1, 1, 0, '#b3e5fc'); pE(g, hx + 3.8, hy - 0.8, 1, 0.9, 0, '#b3e5fc'); g.restore();
    } else if (id === 'p_maneki') {   // a lucky cat: hops along, waves its raised paw, a gold coin and a bell
      const P2 = 0.7, p2 = still ? 0.9 : (t % P2) / P2, hop = p2 < 0.5 ? -Math.sin(p2 / 0.5 * Math.PI) * 5 : 0, sq = p2 > 0.5 && p2 < 0.6 ? 0.9 : 1;
      petShadow(g, 8 + hop * 0.2, 2, 0, 'rgba(0,0,0,0.15)');
      g.save(); g.translate(0, hop); g.scale(1, sq);
      pE(g, 0, -8, 7.5, 8, 0, rGrad(g, 0, -8, 8, '#ffffff', 1, 0.85));
      pE(g, -3, -4, 2.4, 1.8, 0, '#ff8f00'); pE(g, 3, -10, 2, 1.6, 0, '#212121');   // calico spots
      g.fillStyle = vGrad(g, -6, 0, '#fff59d', '#ffb300'); g.beginPath(); g.ellipse(2.5, -5, 3.2, 4, 0, 0, Math.PI * 2); g.fill();   // the gold coin it holds
      g.strokeStyle = '#e65100'; g.lineWidth = 0.6; g.stroke(); line(g, [1.5, -6.5, 3.5, -6.5], '#e65100', 0.5); line(g, [1.5, -4, 3.5, -4], '#e65100', 0.5);
      const wv = Math.sin(t * 8) * 0.5;   // the raised, waving paw
      g.save(); g.translate(-5, -14); g.rotate(-0.3 + wv); pE(g, 0, -3, 2, 3.6, 0, '#ffffff'); pE(g, 0, -6, 1.6, 1, 0, '#ffcdd2'); g.restore();
      catHead(g, 1, -19, t, { col: '#ffffff', r: 6.2, inner: '#ffcdd2', iris: null, pupil: 'round', muzzle: '#ffffff', nose: '#f48fb1', whisk: '#bdbdbd', seed: 0.2 });
      g.fillStyle = '#e53935'; g.fillRect(-5, -13.6, 11, 1.8);
      pE(g, 1.5, -11.4, 1.6, 1.6, 0, rGrad(g, 1.5, -11.4, 1.6, '#ffd54f', 1.2, 0.8));
      g.restore();
    } else if (id === 'p_spiritcat') {   // a spirit cat: see-through glowing blue, wisps for a tail, floating a little
      g.save(); g.translate(0, -3 + Math.sin(t * 2.5) * 1.5); g.globalAlpha *= 0.85; g.shadowColor = '#80deea'; g.shadowBlur = 10;
      quad(g, t, still, { L: 8.5, w: 2.4, rx: 10, ry: 5.4, col: '#b2ebf2', belly: '#e0f7fa', paw: '#e0f7fa', f: 12,
        tail: (g, tx, ty, s, run) => { for (let k = 0; k < 2; k++) tailChain(g, tx, ty, t + k, run, { n: 7, len: 15, prof: f => 3 - 2.4 * f, a: -2.2 - k * 0.3, curl: 0.2, amp: 0.4, lag: 0.7, fq: 2, ph: k, col: `rgba(178,235,242,${0.8 - k * 0.3})`, r: { fq: 4 } }); },
        head: (g, hx, hy, t) => catHead(g, hx, hy, t, { col: '#b2ebf2', inner: '#e1f5fe', iris: '#00e5ff', pupil: 'slit', muzzle: '#e0f7fa', nose: '#80deea', whisk: '#ffffff', seed: 2.2 }) });
      g.restore();
    } else if (id === 'p_bunnyking') {   // a rabbit king: hops, a little gold crown and a red velvet cape
      const P2 = 0.6, p2 = still ? 0.9 : (t % P2) / P2, air = p2 < 0.5, k2 = air ? Math.sin(p2 / 0.5 * Math.PI) : 0, hop = -k2 * 8;
      petShadow(g, 8 - k2 * 2, 2, 0, 'rgba(0,0,0,0.15)');
      g.save(); g.translate(0, hop); g.rotate(air ? -0.15 * k2 : 0);
      const cw = Math.sin(t * 9) * 1.5; g.fillStyle = vGrad(g, -14, 0, '#e53935', '#8e0000'); g.beginPath(); g.moveTo(1, -13); g.quadraticCurveTo(-8, -10, -11 + cw, -2); g.lineTo(-4, -3); g.closePath(); g.fill();   // the cape
      g.fillStyle = '#fafafa'; for (let q = 0; q < 4; q++) pE(g, -10 + cw + q * 2, -2.4, 1, 0.8, 0, q % 2 ? '#fafafa' : '#212121');
      if (air) { line(g, [-3, -3, -9, 0, -12, 1], '#e0e0e0', 2.4); } else pE(g, -3, -2, 4, 2.6, 0, '#eeeeee');
      pE(g, -6.5, -7, 2.2, 2.2, 0, '#ffffff');
      pE(g, 0, -7, 6.6, 5.4, 0, vGrad(g, -12, -2, '#ffffff', '#e0e0e0'));
      pE(g, 4, -1, 2.4, 1.2, 0, '#eeeeee');
      for (const [ex, a] of [[2, -0.25], [4.5, 0.05]]) { g.save(); g.translate(ex, -14); g.rotate(a + Math.sin(t * 5) * 0.08); pE(g, 0, -5, 1.6, 5, 0, '#fafafa'); pE(g, 0, -5, 0.8, 3.8, 0, '#f8bbd0'); g.restore(); }
      pE(g, 4, -13, 4.6, 4.2, 0, rGrad(g, 4, -13, 4.6, '#ffffff', 1, 0.86));
      petEye(g, 5.4, -14, 1, t, null, null, 1.9); pE(g, 8.2, -12.4, 0.8, 0.6, 0, '#f48fb1');
      g.fillStyle = vGrad(g, -22, -16, '#fff59d', '#ffb300'); g.beginPath(); g.moveTo(1.2, -16.5); g.lineTo(1.4, -20); g.lineTo(2.8, -18); g.lineTo(4.2, -21); g.lineTo(5.6, -18); g.lineTo(7, -20); g.lineTo(7, -16.5); g.closePath(); g.fill();
      pE(g, 4.2, -17.6, 0.6, 0.6, 0, '#e53935');
      g.restore();
    } else if (id === 'p_mech') {   // a mini mech: a boxy walker with a glass cockpit, a tiny pilot and a thruster
      const run = !still, by = -13 + (run ? -Math.abs(Math.sin(ph)) * 1.2 : 0);
      petShadow(g, 11, 2.2, 0, 'rgba(0,0,0,0.18)');
      petLeg(g, -2, by + 4, 10, ph + Math.PI, still, false, '#546e7a', 3, '#263238', '#ffca28');
      if (petAirPose > 0) { g.save(); g.shadowColor = '#ff9100'; g.shadowBlur = 8; g.fillStyle = 'rgba(255,145,0,0.85)'; g.beginPath(); g.moveTo(-9, by + 2); g.lineTo(-12 + Math.random() * 2, by + 12); g.lineTo(-6, by + 2); g.fill(); g.restore(); }
      g.fillStyle = vGrad(g, by - 7, by + 6, '#ffb300', '#e65100'); roundRectOn(g, -9, by - 7, 18, 12, 3); g.fill();
      g.fillStyle = '#263238'; g.fillRect(-9, by + 1, 18, 1.4); for (const x of [-6, 6]) pE(g, x, by - 4, 0.8, 0.8, 0, '#ffe082');
      g.fillStyle = 'rgba(178,235,242,0.7)'; g.beginPath(); g.arc(1, by - 7, 5.4, Math.PI, 0); g.closePath(); g.fill();
      pE(g, 1.4, by - 9, 1.8, 1.8, 0, '#ffcc80'); pE(g, 2.2, by - 9.4, 0.4, 0.4, 0, '#212121');
      g.strokeStyle = 'rgba(255,255,255,0.8)'; g.lineWidth = 0.6; g.beginPath(); g.arc(1, by - 7, 4.6, Math.PI * 1.15, Math.PI * 1.45); g.stroke();
      line(g, [-6, by - 7, -7, by - 13], '#90a4ae', 0.8); pE(g, -7, by - 13.5, 1, 1, 0, Math.sin(t * 6) > 0 ? '#ff1744' : '#7f0000');
      line(g, [8, by - 2, 12, by + 1], '#78909c', 2); pE(g, 12.5, by + 1.4, 1.4, 1.4, 0, '#37474f');
      petLeg(g, 2, by + 4, 10, ph, still, false, '#78909c', 3.2, '#37474f', '#ffca28');
    } else if (id === 'p_kraken') {   // a baby kraken: floats, waves six tentacles one after another, blows bubbles
      const fy = -58 + Math.sin(t * 2) * 5;
      g.translate(0, fy);
      for (let k = 0; k < 6; k++) tailChain(g, -4 + k * 1.6, 4, t + k * 0.35, !still, { n: 6, len: 13, prof: f => 2.6 - 2 * f, a: 1.9 - k * 0.14, curl: 0.12, amp: 0.3, lag: 0.8, fq: 3, col: k % 2 ? '#9575cd' : '#7e57c2', tip: '#b39ddb', tipFrom: 0.7 });
      pE(g, 0, -2, 9, 9.5, 0, rGrad(g, 0, -2, 9.5, '#b39ddb', 1.2, 0.7));
      for (const [x, y, r] of [[-4, -7, 1.4], [2, -9, 1], [-1, -4, 0.8]]) pE(g, x, y, r, r, 0, 'rgba(255,255,255,0.35)');
      pE(g, 1.6, 0, 2.6, 2.8, 0, '#ffffff'); pE(g, 6.2, 0, 2.2, 2.4, 0, '#ffffff');
      petEye(g, 2, 0.2, 1.5, t, '#ffb300', 'round', 1.4); petEye(g, 6.4, 0.2, 1.3, t, '#ffb300', 'round', 1.4);
      line(g, [3, 4, 4.4, 5, 5.8, 4], '#4527a0', 0.7);
    } else if (id === 'p_griffin') {   // a griffin: an eagle's head and wings on a lion's body
      const fl = flapOf(t * 6);
      quad(g, t, still, { L: 10, w: 2.8, rx: 11.5, ry: 6, col: '#c8a165', belly: '#e6cfa0', paw: '#ffb300', legCol: '#c8a165', f: 12,
        tail: (g, tx, ty, s, run) => { const q = tailChain(g, tx, ty, t, run, { n: 7, len: 15, w0: 2, w1: 1.4, a: -2.5, curl: -0.06, amp: 0.25, lag: 0.7, fq: 2.4, col: '#b8915a', r: { fq: 5.5 } }); pE(g, q[7][0], q[7][1], 2.2, 1.8, 0, '#6d4c41'); },
        under: (g, by) => petWing(g, 1, by - 6, 15, fl, '#6d4c41', '#4e342e', true),
        marks: (g, by) => petWing(g, 0, by - 4, 17, fl, '#a1887f', '#5d4037', true),
        hdx: 4, hdy: 3,
        head: (g, hx, hy, t) => {
          fluff(g, hx - 1, hy + 2, 6, 6, 12, 0.18, '#fafafa', t);
          pE(g, hx + 1, hy - 1, 5.2, 4.8, 0, rGrad(g, hx + 1, hy - 1, 5.2, '#ffffff', 1, 0.85));
          g.fillStyle = vGrad(g, hy - 2, hy + 3, '#ffca28', '#ef6c00'); g.beginPath(); g.moveTo(hx + 4.5, hy - 2.4); g.quadraticCurveTo(hx + 10, hy - 2, hx + 9.5, hy + 2.6); g.lineTo(hx + 7.5, hy + 1); g.lineTo(hx + 4.5, hy + 0.6); g.closePath(); g.fill();
          petEye(g, hx + 2.4, hy - 2.2, 1.2, t, '#ffb300', 'round', 0.9);
          line(g, [hx + 0.6, hy - 3.8, hx + 3.8, hy - 3.4], '#5d4037', 0.8);
        } });
    // ---------- 1.0.52: background animals, drawn with the same care as the pets (never sold) ----------
    } else if (id === 'cr_wolf') {
      quad(g, t, still, { L: 10, w: 2.6, rx: 12, ry: 5.6, col: '#90a4ae', belly: '#cfd8dc', paw: '#eceff1', legCol: '#78909c', f: 13,
        under: (g, by, ph) => fluff(g, -2, by - 1, 11, 5.4, 16, 0.1, '#78909c', ph),
        tail: (g, tx, ty, s, run) => tailChain(g, tx, ty, t, run, { n: 6, len: 14, prof: f => 3 + 3 * Math.sin(Math.min(1, f) * Math.PI * 0.8), a: -2.75, curl: -0.03, amp: 0.12, lag: 0.7, fq: 2.5, col: '#90a4ae', under: '#607d8b', tip: '#455a64', tipFrom: 0.85, r: { a: -2.9, fq: 6 } }),
        head: (g, hx, hy, t, run) => dogHead(g, hx, hy, t, run, { col: '#a7b6bf', snout: '#eceff1', ear: 'up', earCol: '#78909c', earIn: '#cfd8dc', long: 1, tongue: false, iris: '#ffb300', seed: 0.5 }) });
    } else if (id === 'cr_hare') {
      const P2 = 0.42, p2 = still ? 0.9 : (t % P2) / P2, air = p2 < 0.55, k2 = air ? Math.sin(p2 / 0.55 * Math.PI) : 0, hop = -k2 * 7;
      petShadow(g, 7 - k2 * 2, 1.8, 0, 'rgba(0,0,0,0.15)');
      g.save(); g.translate(0, hop); g.rotate(air ? -0.2 * k2 + 0.1 : 0);
      if (air) { line(g, [-3, -3, -9, -1, -12, 0], shade(o_hareCol, 0.85), 2.4); line(g, [3, -4, 8, -2, 10, -1], o_hareCol, 1.8); }
      else { pE(g, -3, -2, 4, 2.6, 0, shade(o_hareCol, 0.9)); pE(g, 4, -1, 2.4, 1.2, 0, o_hareCol); }
      pE(g, -6.5, -7, 2.2, 2.2, 0, '#fafafa');
      pE(g, 0, -7, 6.6, 5, 0, vGrad(g, -12, -2, shade(o_hareCol, 1.15), shade(o_hareCol, 0.8)));
      for (const [ex, a] of [[2, -0.4], [4.4, -0.15]]) { g.save(); g.translate(ex, -13); g.rotate(a + Math.sin(t * 5) * 0.06); pE(g, 0, -5, 1.5, 5, 0, o_hareCol); pE(g, 0, -5, 0.7, 3.6, 0, '#f8bbd0'); g.restore(); }
      pE(g, 4, -12, 4.2, 3.8, 0, rGrad(g, 4, -12, 4.2, o_hareCol, 1.1, 0.85));
      petEye(g, 5.2, -13, 0.9, t, null, null, 1.1); pE(g, 8, -11.4, 0.7, 0.6, 0, '#f48fb1');
      g.restore();
    } else if (id === 'cr_camel') {
      quad(g, t * 0.8, still, { L: 15, w: 2.6, rx: 13, ry: 6.2, col: '#c8a165', belly: '#dcbd86', paw: '#8d6e3a', f: 8, bounce: 1, noNeck: 1,
        under: (g, by) => { pE(g, -2, by - 6, 6, 5.5, 0, vGrad(g, by - 12, by, '#dcb57a', '#b48a50')); pE(g, 5, by - 5, 5, 4.6, 0, vGrad(g, by - 10, by, '#d8b072', '#b08648')); },
        tail: (g, tx, ty, s, run) => { const q = tailChain(g, tx, ty, t, run, { n: 4, len: 8, w0: 1.6, w1: 1, a: 1.9, curl: 0.05, amp: 0.2, lag: 0.5, fq: 3, col: '#b48a50' }); pE(g, q[4][0], q[4][1], 1.4, 2, 0, '#5d4037'); },
        hdx: 4, hdy: 9,
        head: (g, hx, hy, t, run, ph) => {
          const nk = Math.sin(ph * 0.5) * 0.8;   // a long curved neck from the shoulders up to the head
          line(g, [hx - 6, hy + 14, hx - 5 + nk * 0.3, hy + 6, hx - 1 + nk * 0.5, hy - 1, hx + 2, hy - 3], '#b48a50', 6);
          line(g, [hx - 6, hy + 14, hx - 5 + nk * 0.3, hy + 6, hx - 1 + nk * 0.5, hy - 1, hx + 2, hy - 3], '#d4ad6f', 4.4);
          line(g, [hx - 7, hy + 12, hx - 6.4 + nk * 0.3, hy + 5, hx - 2.6, hy - 1.5], 'rgba(255,240,210,0.35)', 1);
          pE(g, hx + 3, hy - 3, 4.4, 3.2, 0.25, rGrad(g, hx + 3, hy - 3, 4.4, '#d9b47a', 1.1, 0.85));
          pE(g, hx + 7, hy - 1.5, 2.6, 2.2, 0.2, '#c8a165'); pE(g, hx + 8.8, hy - 1.8, 0.5, 0.4, 0, '#5d4037');
          pE(g, hx + 1.4, hy - 6, 1, 1.4, -0.4, '#b48a50'); petEye(g, hx + 3.6, hy - 4, 1, t, null, null, 0.5);
          line(g, [hx + 2.4, hy - 5, hx + 4.6, hy - 5.4], 'rgba(70,40,20,0.6)', 0.6);
        } });
    } else if (id === 'cr_gazelle') {
      quad(g, t, still, { L: 12, w: 1.8, rx: 9.5, ry: 4.6, col: '#c48a4a', belly: '#fafafa', paw: '#3e2723', f: 14, bounce: 2.2,
        marks: (g, by) => line(g, [-8, by + 1.5, 8, by + 1.2], '#3e2723', 1),
        tail: (g, tx, ty, s, run) => tailChain(g, tx, ty, t, run, { n: 2, len: 4, w0: 1.6, w1: 1, a: -2.4, root: 0.6, fq: 8, col: '#3e2723' }),
        head: (g, hx, hy, t) => {
          for (const k of [0, 1]) { g.strokeStyle = k ? '#4e342e' : '#3e2723'; g.lineWidth = 1; g.beginPath(); g.moveTo(hx - 1 + k, hy - 3); g.quadraticCurveTo(hx - 4 + k, hy - 10, hx - 1 + k, hy - 14); g.stroke(); }
          pE(g, hx - 2.5, hy - 2.5, 1, 2.6, -0.7, '#c48a4a');
          pE(g, hx + 1.5, hy, 3.8, 3, 0.25, rGrad(g, hx + 1.5, hy, 3.8, '#d39a5a', 1.1, 0.85));
          pE(g, hx + 5, hy + 1.4, 2, 1.5, 0.2, '#c48a4a'); pE(g, hx + 6.6, hy + 1.2, 0.5, 0.4, 0, '#212121');
          line(g, [hx + 1, hy - 0.5, hx + 4.5, hy + 1.5], '#fafafa', 0.8); petEye(g, hx + 2, hy - 0.8, 0.9, t, null, null, 0.8);
        } });
    } else if (id === 'cr_croc') {
      const run = !still, sw = Math.sin(t * 6) * (run ? 2 : 0.6);
      petShadow(g, 18, 2, 0, 'rgba(0,0,0,0.15)');
      tailChain(g, -9, -3, t, run, { n: 7, len: 20, prof: f => 6 - 5 * f, a: -3.1, curl: 0.01, amp: 0.15, lag: 0.7, fq: 3, col: '#558b2f', under: '#33691e' });
      for (const [lx, o] of [[-6, 0], [6, Math.PI]]) { const a = Math.sin(t * 9 + o) * 0.5; line(g, [lx, -3, lx + Math.sin(a) * 4, 0, lx + Math.sin(a) * 4 + 2, 0], '#33691e', 2.2); }
      pE(g, 0, -4, 11, 4, 0, vGrad(g, -8, 0, '#7cb342', '#33691e'));
      for (let q = -8; q <= 8; q += 3) g.fillStyle = '#33691e', g.beginPath(), g.moveTo(q - 1.4, -7.2), g.lineTo(q, -9.4), g.lineTo(q + 1.4, -7.2), g.fill();
      pE(g, 2, -2, 8, 1.6, 0, '#c5e1a5');
      g.save(); g.translate(9, -4); g.rotate(sw * 0.02);
      g.fillStyle = vGrad(g, -4, 2, '#7cb342', '#558b2f'); g.beginPath(); g.moveTo(0, -3); g.lineTo(14, -1.5); g.quadraticCurveTo(16, 0, 14, 1.5); g.lineTo(0, 2.5); g.closePath(); g.fill();
      g.fillStyle = '#fafafa'; for (let q = 2; q < 14; q += 2.2) { g.beginPath(); g.moveTo(q, 0.2); g.lineTo(q + 0.8, 1.6); g.lineTo(q + 1.6, 0.2); g.fill(); }
      pE(g, 3, -3.4, 1.8, 1.6, 0, '#7cb342'); petEye(g, 3.2, -3.6, 1, t, '#ffeb3b', 'slit', 0.4); pE(g, 13.6, -1.4, 0.5, 0.4, 0, '#1b5e20');
      g.restore();
    } else if (id === 'cr_squirrel') {
      const P2 = 0.36, p2 = still ? 0.9 : (t % P2) / P2, hop = p2 < 0.5 ? -Math.sin(p2 / 0.5 * Math.PI) * 4 : 0;
      petShadow(g, 6, 1.6, 0, 'rgba(0,0,0,0.15)');
      g.save(); g.translate(0, hop);
      tailChain(g, -4, -5, t, true, { n: 7, len: 14, prof: f => 2.5 + 3.5 * Math.sin(Math.min(1, f) * Math.PI), a: -1.9, curl: 0.42, amp: 0.1, lag: 0.6, fq: 6, col: '#d2691e', under: '#a0522d' });
      pE(g, 0, -5, 5, 3.6, -0.2, vGrad(g, -9, -1, '#e07b39', '#b85a1e')); pE(g, 1, -3.6, 3, 1.8, -0.2, '#ffe0b2');
      pE(g, 2, -1, 1.6, 1, 0, '#b85a1e'); pE(g, -2.5, -1, 2.2, 1.4, 0, '#b85a1e');
      pE(g, 4.5, -8.5, 3.2, 2.9, 0, rGrad(g, 4.5, -8.5, 3.2, '#e07b39', 1.1, 0.85));
      g.fillStyle = '#b85a1e'; g.beginPath(); g.moveTo(3, -10.6); g.lineTo(3.4, -13.4); g.lineTo(4.8, -11); g.fill();
      petEye(g, 5.4, -9, 0.8, t, null, null, 2); pE(g, 7.6, -8, 0.5, 0.4, 0, '#3e2723');
      g.restore();
    } else if (id === 'cr_hedgehog') {
      const run = !still, bob = run ? Math.abs(Math.sin(t * 10)) * -0.6 : 0;
      petShadow(g, 8, 1.6, 0, 'rgba(0,0,0,0.15)');
      g.save(); g.translate(0, bob);
      for (const [lx, o] of [[-3, 0], [3, Math.PI]]) line(g, [lx, -2, lx + Math.sin(t * 12 + o) * 1.2, 0], '#5d4037', 1.6);
      g.fillStyle = '#6d4c41'; g.beginPath();
      for (let a = Math.PI; a <= Math.PI * 2.001; a += Math.PI / 14) { const r2 = (Math.round(a * 10) % 2 ? 8.6 : 6.6); g.lineTo(Math.cos(a) * r2 - 1, -2 + Math.sin(a) * r2 * 0.8); }
      g.closePath(); g.fill();
      pE(g, -1, -3, 6, 4, 0, vGrad(g, -7, 0, '#8d6e63', '#5d4037'));
      for (let q = 0; q < 8; q++) line(g, [-6 + q * 1.6, -6.5 + Math.abs(q - 4) * 0.4, -6.6 + q * 1.6, -3.4], 'rgba(255,240,220,0.45)', 0.5);
      pE(g, 5.5, -2.4, 3, 2.2, 0.2, '#d7ccc8'); pE(g, 8.4, -2, 0.7, 0.6, 0, '#212121'); petEye(g, 5.6, -3.2, 0.7, t, null, null, 0.9);
      g.restore();
    } else if (id === 'cr_shark') {   // swims by in the deep, the tail sweeping side to side
      const fy = -70 + Math.sin(t * 1.2) * 4; g.translate(0, fy);
      tailChain(g, -12, 0, t, true, { n: 4, len: 10, prof: f => 6 - 4 * f, a: Math.PI, amp: 0.25, lag: 0.6, fq: 5, col: '#78909c' });
      g.fillStyle = vGrad(g, -8, 8, '#90a4ae', '#eceff1'); g.beginPath(); g.moveTo(-14, 0); g.quadraticCurveTo(-2, -9, 18, -1); g.quadraticCurveTo(10, 6, -14, 3); g.closePath(); g.fill();
      g.fillStyle = '#78909c'; g.beginPath(); g.moveTo(-2, -6); g.lineTo(-6, -15); g.lineTo(3, -6.5); g.fill(); g.beginPath(); g.moveTo(2, 2); g.lineTo(-2, 9); g.lineTo(6, 3); g.fill();
      for (let q = 0; q < 3; q++) line(g, [7 + q * 1.4, -2, 6.4 + q * 1.4, 1.5], 'rgba(55,71,79,0.5)', 0.5);
      pE(g, 12, -2, 0.9, 0.9, 0, '#212121'); line(g, [12, 1.5, 15, 1, 17, 0], 'rgba(55,71,79,0.6)', 0.6);
    } else if (id === 'cr_crab') {
      const run = !still, sc = Math.abs(Math.sin(t * 10));
      petShadow(g, 8, 1.6, 0, 'rgba(0,0,0,0.15)');
      for (const sd of [-1, 1]) for (let q = 0; q < 3; q++) { const a = Math.sin(t * 14 + q + sd) * 0.3; line(g, [sd * (2 + q * 1.6), -4, sd * (5 + q * 2) + Math.sin(a) * 2, -2, sd * (6 + q * 2.4), 0], '#d84315', 1); }
      pE(g, 0, -5 - sc * (run ? 0.8 : 0), 7, 4.4, 0, vGrad(g, -9, -1, '#ff7043', '#c62828'));
      for (const sd of [-1, 1]) { line(g, [sd * 4, -7, sd * 8, -10], '#d84315', 1.2); g.fillStyle = '#ff5722'; g.beginPath(); g.ellipse(sd * 9, -11, 2.6, 1.8, sd * 0.4, 0, Math.PI * 2); g.fill(); g.strokeStyle = '#bf360c'; g.lineWidth = 0.6; g.beginPath(); g.moveTo(sd * 9, -11); g.lineTo(sd * 11, -12 + Math.sin(t * 6) * 0.8); g.stroke(); }
      for (const ex of [-1.6, 1.6]) { line(g, [ex, -8.5, ex, -11], '#d84315', 0.8); pE(g, ex, -11.6, 1.1, 1.1, 0, '#fafafa'); pE(g, ex + 0.2, -11.6, 0.5, 0.5, 0, '#212121'); }
    } else if (id === 'cr_horse') {
      quad(g, t, still, { L: 13, w: 2.8, rx: 12.5, ry: 6, col: o_horseCol, paw: '#212121', f: 12, noNeck: 1,
        tail: (g, tx, ty, s, run) => [0, 1].forEach(k => tailChain(g, tx + 1, ty + k, t, run, { n: 6, len: 14, w0: 2, w1: 1.2, a: -2.75, curl: -0.18, amp: 0.2, lag: 0.9, fq: 2.5, ph: k * 0.5, col: '#212121', r: { a: -2.95, curl: -0.05, fq: 7 } })),
        hdx: 5, hdy: 5,
        head: (g, hx, hy, t, run, ph) => {
          pE(g, hx - 1, hy + 4, 3.8, 6.4, 0.5, shade(o_horseCol, 0.95));
          pE(g, hx + 3, hy, 4.6, 4, 0.35, rGrad(g, hx + 3, hy, 5, o_horseCol, 1.12, 0.85));
          pE(g, hx + 7.5, hy + 2.4, 3.4, 2.6, 0.35, shade(o_horseCol, 1.05)); pE(g, hx + 9.5, hy + 2.9, 0.6, 0.5, 0, '#212121');
          petEye(g, hx + 3.8, hy - 1, 1.3, t, null, null, 0.4); pE(g, hx + 0.5, hy - 3.2, 1.2, 2.4, -0.4, shade(o_horseCol, 0.85));
          for (let k = 0; k < 4; k++) { const w2 = run ? Math.sin(ph + k) * 1.2 : 0; line(g, [hx - 0.5 - k * 1.2, hy - 3 + k * 1.8, hx - 3.5 - k * 1.3 + w2, hy + k * 2], '#212121', 1.6); }
          line(g, [hx + 3, hy + 1, hx + 8, hy + 3], '#5d4037', 0.6);   // the bridle
        } });
    } else if (id === 'p_jelly') {
      const fy = -60 + Math.sin(t * 2) * 5, pul = Math.sin(t * 4);
      g.translate(0, fy);
      for (let k = 0; k < 5; k++) {
        g.strokeStyle = `rgba(206,147,216,${0.75 - k * 0.06})`; g.lineWidth = 1.4;
        const bx = -6 + k * 3;
        g.beginPath(); g.moveTo(bx, 4);
        g.bezierCurveTo(bx + Math.sin(t * 5 + k) * 3, 9, bx - Math.sin(t * 5 + k + 1) * 3, 14, bx + Math.sin(t * 5 + k + 2) * 2.5, 19 - pul);
        g.stroke();
      }
      g.fillStyle = 'rgba(244,143,177,0.55)';
      for (const s2 of [-1, 1]) { g.beginPath(); g.moveTo(s2 * 2, 4); g.quadraticCurveTo(s2 * 4 + Math.sin(t * 3) * 2, 10, s2 * 1.5, 14); g.quadraticCurveTo(s2 * 1, 9, 0, 4); g.fill(); }
      g.save(); g.shadowColor = 'rgba(234,128,252,0.8)'; g.shadowBlur = 10;
      const bw = 10 * (1 - pul * 0.08), bh = 9 * (1 + pul * 0.1);
      const jg = g.createRadialGradient(-2, -3, 1, 0, 1, 11);
      jg.addColorStop(0, 'rgba(255,230,255,0.95)'); jg.addColorStop(0.6, 'rgba(225,170,240,0.85)'); jg.addColorStop(1, 'rgba(171,71,188,0.75)');
      g.fillStyle = jg; g.beginPath(); g.ellipse(0, 4, bw, bh, 0, Math.PI, 0);
      for (let i = 0; i < 6; i++) { const x0 = bw - i * bw / 3; g.quadraticCurveTo(x0 - bw / 6, 6.5, x0 - bw / 3, 4); }
      g.closePath(); g.fill(); g.restore();
      for (const [sx2, sy2] of [[-4, -1], [3, -2], [-1, 1.5]]) pE(g, sx2, sy2, 1, 1, 0, 'rgba(255,255,255,0.45)');
      pE(g, -4, -2.5, 2.4, 1.4, -0.5, 'rgba(255,255,255,0.7)');
      for (const ex of [-2.6, 2.6]) petEye(g, ex, 0.5, 1.15, t, null, null, 0.9);
      line(g, [-1, 2.6, 0, 3.3, 1, 2.6], '#6a1b9a', 0.6);
    } else {
      // unknown id (e.g. an item from a newer version): a simple paw print
      for (const [a, b] of [[0, -4], [-3.5, -8], [0, -10], [3.5, -8]]) pE(g, a, b, a === 0 && b === -4 ? 3 : 1.6, a === 0 && b === -4 ? 2.4 : 1.6, 0, '#8d6e63');
    }
    g.restore();
  }

  // 1.0.43: no outline ("aura") around the stickman in any skin, day or night
  function outlineFor(pal) { return null; }


  function drawHUD() {
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    const u = Math.max(0.8, Math.min(1.5, Math.min(W, H) / 380));
    if (state === 'menu' || state === 'loading') return;
    // coins of this run
    // levels show two numbers: coins picked of all (for the stars) and what they are worth (gold 5, crystal 25)
    const mainTxt = isEndless() ? `${coinsGot}` : `${picked}/${LV.total}`, valTxt = isEndless() ? '' : `+${coinsGot}  ★${starsGot}/5`;
    ctx.font = `700 ${18 * u}px system-ui, sans-serif`;
    const w1 = ctx.measureText(mainTxt).width;
    ctx.font = `800 ${14 * u}px system-ui, sans-serif`;
    const w2 = valTxt ? ctx.measureText(valTxt).width + 8 * u : 0;
    const boxW = Math.max(110 * u, 36 * u + w1 + w2 + 12 * u);
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    roundRect(10, 10, boxW, 40 * u, 10 * u); ctx.fill();
    ctx.fillStyle = '#ffcc1a'; ctx.strokeStyle = '#c98a00'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(10 + 20 * u, 10 + 20 * u, 9 * u, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#fff'; ctx.font = `700 ${18 * u}px system-ui, sans-serif`;
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    ctx.fillText(mainTxt, 10 + 36 * u, 10 + 21 * u);
    if (valTxt) {
      ctx.fillStyle = '#ffd54f'; ctx.font = `800 ${14 * u}px system-ui, sans-serif`;
      ctx.fillText(valTxt, 10 + 36 * u + w1 + 8 * u, 10 + 22 * u);
    }

    // coin multiplier next to the counter
    if (isEndless() && coinMult() > 1 && state === 'play') {
      ctx.font = `900 ${15 * u}px system-ui, sans-serif`; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
      ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(0,0,0,0.5)';
      const mt = `×${coinMult().toFixed(1)}`;
      ctx.strokeText(mt, 16 + boxW, 10 + 21 * u); ctx.fillStyle = coinMult() >= MULT_MAX ? '#ff9100' : '#ffd54f'; ctx.fillText(mt, 16 + boxW, 10 + 21 * u);
    }
    // boosts under the coin counter
    let bx0 = 10 + 18 * u;
    const by0 = 10 + 40 * u + 18 * u;
    if (save.life) {
      drawHeart(ctx, bx0, by0, 1.3 * u, lifeUsed ? 'rgba(255,255,255,0.35)' : '#ff4d6d');
      bx0 += 30 * u;
    }
    if (player.magnet > 0) {
      drawMagnetIcon(ctx, bx0, by0 - 2 * u, 0.9 * u);
      ctx.fillStyle = '#fff'; ctx.font = `800 ${14 * u}px system-ui, sans-serif`;
      ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(0,0,0,0.5)';
      const s = isFinite(player.magnet) ? `${Math.ceil(player.magnet)}` : '∞';
      ctx.strokeText(s, bx0 + 13 * u, by0); ctx.fillText(s, bx0 + 13 * u, by0);
    }

    const left = 10 + boxW + (isEndless() && coinMult() > 1 ? 58 : 14), right = W - 124;
    const bw = Math.max(60, Math.min(280, right - left)), bx = left + (right - left - bw) / 2, by = 18;
    ctx.textAlign = 'center';
    if (isEndless()) {
      // distance + record
      ctx.font = `800 ${22 * u}px system-ui, sans-serif`;
      ctx.lineWidth = 4; ctx.lineJoin = 'round'; ctx.strokeStyle = 'rgba(0,0,0,0.45)';
      const txt = `${Math.floor(dist / 10)} ${S.m}`;
      ctx.strokeText(txt, bx + bw / 2, by + 8 * u); ctx.fillStyle = '#fff'; ctx.fillText(txt, bx + bw / 2, by + 8 * u);
      ctx.font = `700 ${13 * u}px system-ui, sans-serif`;
      const rec = dailyRun ? `${S.todayBest}: ${Math.max(save.dailyBest.m, Math.floor(dist / 10))} ${S.m}`
        : `${S.record}: ${Math.max(save.bestEndless, Math.floor(dist / 10))} ${S.m}`;
      ctx.strokeText(rec, bx + bw / 2, by + 30 * u); ctx.fillText(rec, bx + bw / 2, by + 30 * u);
    } else {
      ctx.fillStyle = 'rgba(0,0,0,0.3)'; roundRect(bx, by, bw, 12 * u, 6 * u); ctx.fill();
      const pr = Math.min(1, dist / LV.len);
      ctx.fillStyle = '#ffb400'; roundRect(bx, by, Math.max(12 * u, bw * pr), 12 * u, 6 * u); ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = `700 ${14 * u}px system-ui, sans-serif`;
      ctx.fillText(`${S.levelN} ${lvl + 1}`, bx + bw / 2, by + 28 * u);
    }
    // mini-event: a big banner during the 2-second warning, then a small bar with what is left
    const zn = isEndless() && (state === 'play' || state === 'paused') ? zoneAt(dist) : null;
    if (zn) {
      const [nm, rule] = S.ev[zn.id], pre = dist < zn.x0;
      if (pre) {
        const pulse = 1 + 0.06 * Math.sin(performance.now() / 90);
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
        ctx.font = `900 ${28 * u * pulse}px system-ui, sans-serif`; ctx.lineWidth = 6; ctx.strokeStyle = 'rgba(0,0,0,0.55)';
        drawTextIco(ctx, nm, W / 2, H * 0.24, 28 * u * pulse, '#ffd54f', 'rgba(0,0,0,0.55)', 6);
        ctx.font = `800 ${16 * u}px system-ui, sans-serif`; ctx.lineWidth = 4;
        ctx.strokeText(rule, W / 2, H * 0.24 + 30 * u); ctx.fillStyle = '#fff'; ctx.fillText(rule, W / 2, H * 0.24 + 30 * u);
      } else {
        const k = Math.max(0, 1 - (dist - zn.x0) / (zn.x1 - zn.x0)), bw2 = 120 * u, bx2 = W / 2 - bw2 / 2, by2 = by + 46 * u;
        ctx.textAlign = 'center'; ctx.font = `800 ${13 * u}px system-ui, sans-serif`; ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(0,0,0,0.5)';
        drawTextIco(ctx, nm, W / 2, by2 - 8 * u, 13 * u, '#ffd54f', 'rgba(0,0,0,0.5)', 3);
        ctx.fillStyle = 'rgba(0,0,0,0.3)'; roundRect(bx2, by2, bw2, 7 * u, 3.5 * u); ctx.fill();
        ctx.fillStyle = '#ffd54f'; roundRect(bx2, by2, Math.max(7 * u, bw2 * k), 7 * u, 3.5 * u); ctx.fill();
        if (zn.id === 'word') {   // which letters are collected
          const n = S.word.length, cw = 18 * u;
          for (let q = 0; q < n; q++) {
            const lx = W / 2 - (n * cw) / 2 + q * cw + cw / 2, ly = by2 + 20 * u, on = zn.mask & (1 << q);
            ctx.fillStyle = on ? '#ffb300' : 'rgba(0,0,0,0.35)'; roundRect(lx - 8 * u, ly - 8 * u, 16 * u, 16 * u, 4 * u); ctx.fill();
            ctx.fillStyle = on ? '#5d2e00' : 'rgba(255,255,255,0.6)'; ctx.font = `900 ${12 * u}px system-ui, sans-serif`; ctx.textAlign = 'center'; ctx.fillText(S.word[q], lx, ly + 0.5);
          }
        }
      }
    }
    // tutorial hint with a pulsing finger / key
    if (tutWait && state === 'play') {
      const txt = tutWait === 'jump' ? (IS_TOUCH ? S.tutJumpTouch : S.tutJumpPc) : (IS_TOUCH ? S.tutSlideTouch : S.tutSlidePc);
      const pulse = 1 + 0.08 * Math.sin(performance.now() / 120);
      ctx.fillStyle = 'rgba(0,0,0,0.35)'; ctx.fillRect(0, 0, W, H);
      ctx.font = `900 ${30 * u * pulse}px system-ui, sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.lineWidth = 6; ctx.lineJoin = 'round'; ctx.strokeStyle = 'rgba(0,0,0,0.6)';
      ctx.strokeText(txt, W / 2, H * 0.32); ctx.fillStyle = '#ffd54f'; ctx.fillText(txt, W / 2, H * 0.32);
      ctx.font = `${54 * u * pulse}px system-ui, sans-serif`;
      const tIcon = tutWait === 'jump' ? (IS_TOUCH ? 'tapUp' : null) : (IS_TOUCH ? 'tapDown' : 'down');
      const tx = tutWait === 'slide' && IS_TOUCH ? W - 58 : W / 2, ty = tutWait === 'slide' && IS_TOUCH ? H - 150 : H * 0.48;
      if (tIcon) { const sz = 54 * u * pulse; ctx.drawImage(iconCanvas(tIcon).cv, tx - sz / 2, ty - sz / 2, sz, sz); }
      else ctx.fillText('⎵', tx, ty);
    }
    // combo counter
    if (combo >= 5 && state === 'play') {
      ctx.font = `800 ${16 * u}px system-ui, sans-serif`; ctx.textAlign = 'left';
      ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(0,0,0,0.5)';
      const s = `${S.combo} ×${combo}`;
      ctx.strokeText(s, 14, 10 + 40 * u + 44 * u); ctx.fillStyle = '#ffb400'; ctx.fillText(s, 14, 10 + 40 * u + 44 * u);
    }
    // tip
    if (tipTimer > 0 && state === 'play' && tipText && !tutWait) {
      ctx.globalAlpha = Math.min(1, tipTimer);
      let fs = 24 * u;
      ctx.font = `800 ${fs}px system-ui, sans-serif`;
      const tw = ctx.measureText(tipText).width;
      if (tw > W - 30) { fs *= (W - 30) / tw; ctx.font = `800 ${fs}px system-ui, sans-serif`; }
      ctx.lineJoin = 'round';
      drawTextIco(ctx, tipText, W / 2, H * 0.3, fs, '#fff', 'rgba(0,0,0,0.55)', 5);
      ctx.globalAlpha = 1;
    }
  }

  function draw() {
    const c = palette();
    const sh = shakeT > 0 ? shakeT * 28 * DPR : 0;
    ctx.setTransform(DPR * scale, 0, 0, DPR * scale, (Math.random() - 0.5) * sh, (Math.random() - 0.5) * sh);
    drawBackground(c);
    if (goldT > 0 && (state === 'play' || state === 'paused')) { ctx.fillStyle = 'rgba(255,190,0,0.18)'; ctx.fillRect(0, 0, viewW, groundY); }
    drawGround(c);
    drawFinish();
    drawCoins();
    drawObstacles();
    // soft shadow under the stickman (smaller and lighter the higher he is)
    if (player.visible && (player.ground || !overGap(dist))) {
      const hgt = player.ground ? 0 : Math.max(0, player.y), k = 1 - Math.min(1, hgt / 180);
      const shy = player.ground ? groundY - player.y : groundY;
      ctx.fillStyle = `rgba(0,0,0,${0.22 * k})`;
      ctx.beginPath(); ctx.ellipse(px + 2, shy + 1, (sliding() ? 24 : 13) * (0.5 + 0.5 * k), 3.2 * (0.5 + 0.5 * k), 0, 0, Math.PI * 2); ctx.fill();
    }
    if (player.visible) drawTrail();
    if (player.visible) {
      let mode = sliding() ? 'slide' : player.ground ? 'run' : 'jump';
      const blink = player.inv > 0 && Math.floor(time * 12) % 2 === 0;
      const col = stickColor(c);
      const em = gl().emote, LK = gl();
      const stopped = ((state === 'winning' && stateTimer < winHold) || state === 'win') && player.ground;
      ctx.__live = 1;   // emotes ease in on the game screen
      if (stopped && !em) mode = 'stand';
      if (stopped && em) {   // the emote loops while the win panel is open
        if (em === 'flip') {
          const k = Math.min(1, (stopT % 1.6) / EMOTE_TIME), foot = groundY - player.y - 34 * Math.sin(Math.min(1, k * 1.6) * Math.PI);
          ctx.save(); ctx.translate(px, foot - 28); ctx.rotate(-Math.min(1, k * 1.6) * Math.PI * 2); ctx.translate(-px, -(foot - 28));
          drawStick(ctx, px, foot, 'jump', player.anim, col, 1, LK, outlineFor(c));
          ctx.restore();
          mode = null;
        } else mode = em;   // dance / flag / wave / cheer / bow
      }
      const ev = state === 'play' || state === 'paused' ? evId() : '';
      const foot = groundY - player.y;
      if (mode && ev === 'giant') {
        ctx.save(); ctx.translate(px, foot); ctx.scale(1.8, 1.8); ctx.translate(-px, -foot);
        drawStick(ctx, px, foot, mode, player.anim, col, blink ? 0.3 : 1, LK, outlineFor(c));
        ctx.restore();
      } else if (mode) {
        if (ev === 'cart') drawMineCart(ctx, px, foot);
        const m2 = ev === 'jet' && !player.ground ? 'jump' : (ev === 'cart' || ev === 'skate') && player.ground ? 'stand' : mode;
        ctx.save();
        if (spinT > 0) { const a = (1 - spinT / 0.6) * Math.PI * 2; ctx.translate(px, foot - 28); ctx.rotate(-a); ctx.translate(-px, -(foot - 28)); }
        if (ev === 'skate') drawSkateboard(ctx, px, foot);   // the board turns with the trick
        drawStick(ctx, px, foot - (ev === 'cart' ? 6 : ev === 'skate' ? 5 : 0), m2, player.anim, col, blink ? 0.3 : 1, ev === 'jet' ? Object.assign({}, LK, { acc: 'jetpack' }) : LK, outlineFor(c));
        ctx.restore();
        if (ev === 'balloon') { const zb = evNow(); if (zb && !zb.popped) drawBalloon(ctx, px, foot); }
      }
      const z = ev === 'pet' ? evNow() : null, helper = z ? (LK.pet || z.pet) : LK.pet;
      if (helper && petGrab && z) drawPet(ctx, helper, sx(petGrab.x) - 4, groundY - petGrab.y + 10, player.anim);
      else if (helper) drawPet(ctx, helper, px - 40, groundY - petY, player.anim, stopped, overGap(dist - 40) ? 0 : petY, petAct);
      if (shieldOn && state === 'play') {
        ctx.strokeStyle = 'rgba(66,165,245,0.8)'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(px, groundY - player.y - bodyH() / 2, 30, 0, Math.PI * 2); ctx.stroke();
      }
    }
    if (player.visible && player.magnet > 0) {
      ctx.strokeStyle = `rgba(229,57,53,${0.25 + 0.15 * Math.sin(time * 8)})`; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(px, groundY - player.y - bodyH() / 2, 34, 0, Math.PI * 2); ctx.stroke();
    }
    for (const q of particles) drawParticle(ctx, q, sx(q.x), groundY - q.y);
    ctx.globalAlpha = 1;
    const dz = isEndless() ? zoneAt(dist) : null;
    if (dz && dz.id === 'dark' && dist > dz.x0) {   // darkness with a cone of light ahead (fades in and out)
      const k = Math.max(0, Math.min(1, (dist - dz.x0) / 300, (dz.x1 - dist) / 300));
      const lg = ctx.createRadialGradient(px + 85, groundY - 40, 14, px + 85, groundY - 40, 215);
      lg.addColorStop(0, 'rgba(5,5,20,0)'); lg.addColorStop(0.4, `rgba(5,5,20,${0.3 * k})`); lg.addColorStop(0.75, `rgba(5,5,20,${0.9 * k})`); lg.addColorStop(1, `rgba(5,5,20,${0.98 * k})`);
      ctx.fillStyle = lg; ctx.fillRect(0, 0, viewW, viewH);
    }
    if (warpT > 0) { ctx.fillStyle = `rgba(206,147,216,${warpT * 1.2})`; ctx.fillRect(0, 0, viewW, viewH); }
    drawHUD();
    if (screen === 'shop') drawShopPreview();
    if (screen === 'pcard' && cardItem) drawShopPreview('pcv', Object.assign({}, save.look, { [cardItem.cat]: cardItem.item }));
    if (screen === 'item' && pendingItem) drawShopPreview('pcv', Object.assign({}, save.look, { [pendingItem.cat]: pendingItem.id }), { loopEmote: pendingItem.cat === 'emote', loopJump: pendingItem.cat === 'jump' });
    if (screen === 'wheel') drawWheel();
  }

  // =====================================================================
  //  UI panels (DOM)
  // =====================================================================
  const ui = document.getElementById('ui'), panel = document.getElementById('panel');
  const bPause = document.getElementById('bPause'), bSound = document.getElementById('bSound');
  const bSlide = document.getElementById('bSlide'), bJump = document.getElementById('bJump');

  let devBtn = null, devEvBtn = null;
  // event test: every mini-event as a button; the run starts right at it
  function showDevEvents() {
    const btns = Object.keys(EVENTS).map(id => `<button class="btn" data-act="devEv" data-id="${id}">${S.ev[id][0]}</button>`).join('');
    showPanel(`<h2>${S.devEventsTitle}</h2><p class="small">${S.devEventsHint}</p>
      <button class="btn${devGod ? ' main' : ''}" data-act="devGodT">${S.devGod}: ${devGod ? S.on : S.off}</button>
      <div class="devgrid">${btns}<button class="btn" data-act="devGold">${S.encGold[0]}</button></div>
      <button class="btn" data-act="menu">${S.back}</button>`, 'devev', true);
  }
  function showPanel(html, name, wide) {
    if (LOCAL && !devBtn) {
      devBtn = document.createElement('button'); devBtn.className = 'devbtn';
      devBtn.addEventListener('click', e => {
        e.stopPropagation(); ensureAudio(); sfx.click();
        devMode = !devMode; try { localStorage.setItem('sr_dev', devMode ? '1' : '0'); } catch (er) { }
        toast(devMode ? S.devMode : S.playerMode);
        if (screen === 'shop') { const sc = panel.scrollTop; showShop(); panel.scrollTop = sc; } else if (screen === 'pcard') showShop(); else goMenu();
      });
      document.body.appendChild(devBtn);
      devEvBtn = document.createElement('button'); devEvBtn.className = 'devbtn ev';
      devEvBtn.addEventListener('click', e => { e.stopPropagation(); ensureAudio(); sfx.click(); showDevEvents(); });
      document.body.appendChild(devEvBtn);
    }
    if (save.noAds && /data-act="(cont|x2|dbl|freeChest|tryOn|shield|spinAd|replTask)"/.test(html)) html += `<p class="small">${S.noAdsNote}</p>`;
    panel.innerHTML = html; screen = name || '';
    {   // 1.0.47: a copy of the menu's back button pinned at the top
      const bk = [...panel.querySelectorAll('button[data-act]')].filter(b => b.textContent.trim() === S.back).pop();
      if (bk) { const bar = document.createElement('div'); bar.className = 'backbar'; const b2 = bk.cloneNode(true); b2.className = 'btn backtop'; b2.textContent = '← ' + S.back; bar.appendChild(b2); panel.prepend(bar); }
    }
    emojify(panel);
    if (devEvBtn) { devEvBtn.textContent = S.devEvents; devEvBtn.style.display = devMode && ['menu', 'shop', 'pcard', 'daily', 'profile', 'devev'].includes(screen) ? '' : 'none'; }
    if (devBtn) { devBtn.textContent = devMode ? 'DEV' : 'PLAYER'; devBtn.classList.toggle('on', devMode); devBtn.style.display = ['menu', 'shop', 'pcard', 'daily', 'profile', 'devev'].includes(screen) ? '' : 'none'; }
    SDK.banner(true);
    panel.classList.toggle('wide', !!wide);
    ui.classList.add('show');
  }
  function hideUI() { ui.classList.remove('show'); screen = ''; if (devBtn) devBtn.style.display = 'none'; if (devEvBtn) devEvBtn.style.display = 'none'; }
  function starsHtml(n) {
    let s = '';
    for (let i = 0; i < 5; i++) s += i < n ? '★' : '<span class="off">★</span>';
    return s;
  }
  const coinHtml = n => `<span class="wallet"><i class="coin"></i>${n}</span>`;
  // button that shows a rewarded ad (or gives the reward at once with "no ads")
  const adBtn = (act, text, extra) =>
    `<button class="btn ad${extra ? ' ' + extra : ''}" data-act="${act}">${save.noAds || !SDK.ysdk ? '🎁' : '▶'} ${text}${save.noAds || !SDK.ysdk ? '' : S.adSuffix}</button>`;   // 1.0.55: no ads outside Yandex

  function showMenu() {
    let lv = '';
    WORLDS.forEach(([a, b], w) => {
      if (w > 0 && a > save.unlocked) { lv += `<p class="wname locked">🔒 ${S.world} ${w + 1}: ${S.worlds[w]}</p>`; return; }
      if (!worldOpen(w)) { lv += `<p class="wname locked">🔒 ${S.world} ${w + 1}: ${S.worlds[w]} — ${S.worldStars.replace('{n}', WORLD_STARS[w])} (${starSum()}★)</p>`; return; }
      lv += `<p class="wname">${S.world} ${w + 1}: ${S.worlds[w]}</p><div class="levels">`;
      for (let i = a; i < b; i++) {
        const locked = i > save.unlocked;
        const st = save.done[i] ? `${save.stars[i]}/5★` : '';
        lv += `<button class="lv${locked ? ' locked' : ''}" data-act="lvl" data-i="${i}">${locked ? '🔒' : i + 1}<small>${st}</small></button>`;
      }
      lv += '</div>';
    });
    const totalStars = save.stars.reduce((a, b) => a + b, 0);
    const endlessBtn = `<div class="endrow">${allDone()
      ? `<button class="btn endless" data-act="endless">${S.endless}</button>`
      : `<button class="btn locked">${S.endlessLocked}</button>`}<button class="btn worlds" data-act="worlds">${S.worldsBtn}</button></div>`;
    showPanel(`<div class="topline">${coinHtml(save.wallet)}</div>
      <h1>${S.title}</h1>
      <p class="small">⭐ ${S.lvlShort} ${levelInfo().L}${save.title ? ` · 🏅 ${S.titles[save.title]}` : ''}</p>
      <p>${IS_TOUCH ? S.hintTouch : S.hintPc}</p>
      <button class="btn main" data-act="play">${S.play}</button>
      ${lv}
      ${endlessBtn}
      <button class="btn shop" data-act="shop">${S.shop}</button>
      <div class="minis">
        ${allDone() ? `<button class="mini" data-act="drun">${S.dailyRun}</button>` : ''}
        <button class="mini${dailyAvail() ? ' hot' : ''}" data-act="daily">${S.dailyBtn}</button>
        <button class="mini${tasksReady() ? ' hot' : ''}" data-act="tasks">${S.tasksBtn} ${save.tasks.list.filter(t => t.done).length}/3</button>
        <button class="mini" data-act="ach">${S.achBtn}</button>
        <button class="mini" data-act="enc">${S.encBtn}</button>
        <button class="mini${save.wheel.day !== today() ? ' hot' : ''}" data-act="wheel">${S.wheelBtn}</button>
        <button class="mini" data-act="top">${S.topBtn}</button>
        <button class="mini" data-act="profile">${S.profileBtn}</button>
        ${canShortcut && !save.shortcut ? `<button class="mini hot" data-act="shortcut">${S.shortcutBtn}</button>` : ''}
      </div>
      <p class="small">${S.total}: ${totalStars}/${LEVELS.length * 5}${save.bestEndless ? ` · ${S.record}: ${save.bestEndless} ${S.m}` : ''} · v${VERSION}</p>`, 'menu');
  }

  // before every endless run: buy a magnet, see the second life
  function showPrerun(daily) {
    prerunDaily = !!daily;
    if (daily && save.dailyBest.day !== today()) save.dailyBest = { day: today(), m: 0 };
    const mag = save.magnetPerm ? `<p class="boost on">🧲 ${S.magnetPermOn}</p>` : save.magnets > 0
      ? `<p class="boost on">🧲 ${S.magnetOn}</p>`
      : `<button class="btn boostbtn${save.wallet < 25 ? ' cant' : ''}" data-act="buyMagnet">🧲 ${S.buyMagnet} — <i class="coin"></i>25</button>`;
    showPanel(`<div class="topline"><h2>${daily ? S.dailyRunShort : S.endlessShort}</h2>${coinHtml(save.wallet)}</div>
      ${daily ? `<p class="small">${S.dailyRunDesc}</p><p>${S.todayBest}: <b>${save.dailyBest.m} ${S.m}</b></p>`
              : `<p>${S.record}: <b>${save.bestEndless} ${S.m}</b></p>`}
      ${mag}
      <p class="boost ${save.life ? 'on' : 'off'}">${save.life ? S.lifeHave : S.lifeNo}</p>
      ${shieldNext ? `<p class="boost on">${S.shieldOn}</p>` : adBtn('shield', S.shield)}
      <p class="small">${S.values}</p>
      <button class="btn main" data-act="run">${S.run}</button>
      <button class="btn" data-act="menu">${S.back}</button>`, 'prerun');
  }

  function showFail() {
    if (isEndless()) {
      const m = Math.floor(dist / 10);
      showPanel(`<h2>${newRecord ? S.newRecord : S.fail}</h2>
        <p class="big">${S.distance}: <b>${m} ${S.m}</b></p>
        <p>${dailyRun ? `${S.todayBest}: ${save.dailyBest.m}` : `${S.record}: ${save.bestEndless}`} ${S.m}</p>
        ${(() => {   // how far the record was ("only N m!" when it was close)
          const best = dailyRun ? save.dailyBest.m : save.bestEndless, gap = best - m;
          if (newRecord || gap <= 0) return '';
          return gap <= Math.max(100, best * 0.2) ? `<p class="near">${S.nearRecord.replace('{n}', gap)}</p>` : `<p>${S.toRecord.replace('{n}', gap)}</p>`;
        })()}
        <p>${S.earned}: ${coinHtml('+' + coinsGot * (x2Used ? 2 : 1))}${x2Used ? ' <b>×2</b>' : ''}</p>
        <button class="btn main" data-act="retry">${S.retry}</button>
        ${usedContinue ? '' : adBtn('cont', S.contT)}${x2Used || !coinsGot ? '' : adBtn('x2', `${S.x2} (+${coinsGot})`)}
        <button class="btn" data-act="menu">${S.menu}</button>`, 'fail');
      return;
    }
    const pr = Math.floor(Math.min(1, dist / LV.len) * 100);
    showPanel(`<h2>${S.fail}</h2>
      <p>${S.failText}${pr}%</p>
      <p>${S.earned}: ${coinHtml('+' + coinsGot * (x2Used ? 2 : 1))}${x2Used ? ' <b>×2</b>' : ''}</p>
      <button class="btn main" data-act="retry">${S.retry}</button>
      ${usedContinue ? '' : adBtn('cont', S.contT)}${x2Used || !coinsGot ? '' : adBtn('x2', `${S.x2} (+${coinsGot})`)}
      <button class="btn" data-act="menu">${S.menu}</button>`, 'fail');
  }

  function showWin() {
    const last = lvl + 1 >= LEVELS.length;
    showPanel(`<h2>${last ? S.allDone : S.win}</h2>
      <div class="stars">${starsHtml(lastStars)}</div>
      <p>${S.coins}: ${picked}/${LV.total} · ${coinHtml('+' + coinsGot)}</p>
      ${lvl === ENDLESS_AFTER ? `<p>${S.endlessOpen}</p>` : ''}
      ${last ? `<p>${S.allDoneText}</p><button class="btn main endless" data-act="endless">${S.endless}</button>`
             : levelOpen(lvl + 1) ? `<button class="btn main" data-act="next">${S.next}</button>`
             : `<p>${S.needStars.replace('{w}', worldOf(lvl + 1) + 1).replace('{n}', WORLD_STARS[worldOf(lvl + 1)]).replace('{have}', starSum())}</p>`}
      ${lvl === ENDLESS_AFTER ? `<button class="btn endless" data-act="endless">${S.endless}</button>` : ''}
      <button class="btn" data-act="retry">${S.retry}</button>
      <button class="btn" data-act="menu">${S.menu}</button>`, 'win');
  }

  // ---------- Golden hour: 10 s of coin rain in the endless run ----------
  function goldenHour(dt) {
    if (dist >= LV.goldAt) {
      LV.goldAt += 10000;
      if (goldT <= 0 && (LV.devGold || LV.gr() < 0.05)) {
        LV.devGold = 0;
        goldT = 10; goldSpawn = 0;
        save.stats.golden++; showTip(S.golden, 2); sfx.win();
      }
    }
    if (goldT > 0) {
      goldT -= dt; goldSpawn -= dt;
      if (goldSpawn <= 0) {
        goldSpawn = 0.12;
        LV.coins.push({ x: dist + 230 + Math.random() * (viewW - px - 100), y: 200 + Math.random() * 60,
                        v: Math.random() < 0.25 ? 5 : 1, got: false, fall: true, rain: true });
      }
    }
    for (const c of LV.coins) if (c.fall && !c.got) { c.y -= 340 * dt; if (c.y <= 24) { c.y = 24; c.fall = false; } }   // lands before you reach it
  }

  // =====================================================================
  //  1.0.37: own little icons instead of emoji (emoji differ between devices; 🪙 isn't drawn on Windows 10 at all).
  //  Panels and toasts are converted automatically; canvas texts use drawTextIco().
  // =====================================================================
  const ICON_DRAW = {
    gift: g => { g.fillStyle = '#e53935'; g.fillRect(8, 20, 32, 22); g.fillStyle = '#c62828'; g.fillRect(6, 14, 36, 8); g.fillStyle = '#ffd54f'; g.fillRect(21, 14, 6, 28);
      g.beginPath(); g.ellipse(17, 11, 7, 4.5, -0.5, 0, Math.PI * 2); g.closePath(); g.ellipse(31, 11, 7, 4.5, 0.5, 0, Math.PI * 2); g.fill(); },
    lock: g => { g.strokeStyle = '#90a4ae'; g.lineWidth = 5; g.beginPath(); g.arc(24, 20, 9, Math.PI, 0); g.lineTo(33, 24); g.moveTo(15, 24); g.lineTo(15, 20); g.stroke();
      g.fillStyle = '#ffb300'; roundRectOn(g, 9, 22, 30, 21, 4); g.fill(); g.fillStyle = '#5d4037'; g.beginPath(); g.arc(24, 31, 3.5, 0, Math.PI * 2); g.fill(); g.fillRect(22.5, 31, 3, 7); },
    heart: g => drawHeart(g, 24, 26, 3.2, '#ff4d6d'),
    medal: g => { g.fillStyle = '#1e88e5'; g.beginPath(); g.moveTo(12, 4); g.lineTo(22, 4); g.lineTo(27, 22); g.lineTo(19, 24); g.fill(); g.fillStyle = '#e53935'; g.beginPath(); g.moveTo(36, 4); g.lineTo(26, 4); g.lineTo(21, 22); g.lineTo(29, 24); g.fill();
      const mg = g.createRadialGradient(20, 28, 2, 24, 32, 13); mg.addColorStop(0, '#fff8e1'); mg.addColorStop(0.5, '#ffca28'); mg.addColorStop(1, '#ff8f00'); g.fillStyle = mg; g.beginPath(); g.arc(24, 32, 12, 0, Math.PI * 2); g.fill();
      g.fillStyle = '#fff59d'; starPath(g, 24, 32, 6); g.fill(); },
    magnet: g => drawMagnetIcon(g, 24, 22, 1.7),
    paw: g => { g.fillStyle = '#8d6e63'; g.beginPath(); g.ellipse(24, 31, 10, 8.5, 0, 0, Math.PI * 2); g.fill();
      for (const [x, y] of [[11, 19], [19, 12], [29, 12], [37, 19]]) { g.beginPath(); g.ellipse(x, y, 4.5, 5.5, 0, 0, Math.PI * 2); g.fill(); } },
    shield: g => { g.fillStyle = '#1e88e5'; g.beginPath(); g.moveTo(24, 4); g.lineTo(41, 10); g.quadraticCurveTo(40, 34, 24, 44); g.quadraticCurveTo(8, 34, 7, 10); g.closePath(); g.fill();
      g.strokeStyle = '#bbdefb'; g.lineWidth = 3; g.stroke(); g.strokeStyle = '#fff'; g.lineWidth = 4; g.beginPath(); g.moveTo(16, 24); g.lineTo(22, 30); g.lineTo(33, 17); g.stroke(); },
    star: g => { g.fillStyle = '#ffc107'; starPath(g, 24, 25, 19); g.fill(); g.fillStyle = 'rgba(255,255,255,0.5)'; starPath(g, 21, 21, 7); g.fill(); },
    coin: g => { const cg = g.createRadialGradient(18, 17, 2, 24, 24, 19); cg.addColorStop(0, '#fff3b0'); cg.addColorStop(0.5, '#ffcc1a'); cg.addColorStop(1, '#d99a00');
      g.fillStyle = cg; g.strokeStyle = '#a86f00'; g.lineWidth = 3; g.beginPath(); g.arc(24, 24, 18, 0, Math.PI * 2); g.fill(); g.stroke();
      g.strokeStyle = 'rgba(168,111,0,0.6)'; g.lineWidth = 2; g.beginPath(); g.arc(24, 24, 12, 0, Math.PI * 2); g.stroke(); },
    sparkle: g => { g.fillStyle = '#ffd54f'; starPath(g, 20, 26, 14); g.fill(); g.fillStyle = '#fff59d'; starPath(g, 37, 11, 7); g.fill(); starPath(g, 38, 38, 5); g.fill(); },
    trophy: g => { g.fillStyle = '#ffb300'; g.beginPath(); g.moveTo(12, 6); g.lineTo(36, 6); g.quadraticCurveTo(36, 28, 24, 30); g.quadraticCurveTo(12, 28, 12, 6); g.fill();
      g.strokeStyle = '#ffb300'; g.lineWidth = 3.5; g.beginPath(); g.arc(11, 13, 6, Math.PI * 0.5, Math.PI * 1.5); g.arc(37, 13, 6, Math.PI * 1.5, Math.PI * 0.5); g.stroke();
      g.fillStyle = '#ff8f00'; g.fillRect(21, 29, 6, 7); g.fillStyle = '#6d4c41'; g.fillRect(14, 36, 20, 7); g.fillStyle = 'rgba(255,255,255,0.45)'; g.fillRect(16, 9, 4, 14); },
    user: g => { g.fillStyle = '#78909c'; g.beginPath(); g.arc(24, 16, 9, 0, Math.PI * 2); g.fill(); g.beginPath(); g.ellipse(24, 40, 16, 11, 0, Math.PI, 0); g.fill(); },
    cart: g => { g.strokeStyle = '#37474f'; g.lineWidth = 3.5; g.lineJoin = 'round'; g.beginPath(); g.moveTo(4, 8); g.lineTo(11, 8); g.lineTo(16, 32); g.lineTo(38, 32); g.lineTo(42, 14); g.lineTo(13, 14); g.stroke();
      g.fillStyle = '#ffb300'; g.fillRect(17, 17, 21, 11); g.fillStyle = '#37474f'; g.beginPath(); g.arc(19, 39, 3.5, 0, Math.PI * 2); g.closePath(); g.arc(35, 39, 3.5, 0, Math.PI * 2); g.fill(); },
    gem: g => { g.fillStyle = '#4fc3f7'; g.beginPath(); g.moveTo(12, 8); g.lineTo(36, 8); g.lineTo(44, 18); g.lineTo(24, 42); g.lineTo(4, 18); g.closePath(); g.fill();
      g.fillStyle = '#b3e5fc'; g.beginPath(); g.moveTo(12, 8); g.lineTo(20, 18); g.lineTo(4, 18); g.fill(); g.beginPath(); g.moveTo(24, 8); g.lineTo(32, 18); g.lineTo(16, 18); g.fill();
      g.fillStyle = '#0288d1'; g.beginPath(); g.moveTo(32, 18); g.lineTo(44, 18); g.lineTo(24, 42); g.fill(); },
    hero: g => { g.fillStyle = '#e53935'; g.beginPath(); g.moveTo(20, 16); g.lineTo(8, 42); g.lineTo(28, 38); g.fill();
      g.strokeStyle = '#1565c0'; g.lineWidth = 4; g.lineCap = 'round'; g.beginPath(); g.moveTo(24, 16); g.lineTo(24, 30); g.lineTo(18, 42); g.moveTo(24, 30); g.lineTo(30, 42); g.moveTo(24, 20); g.lineTo(34, 10); g.moveTo(24, 20); g.lineTo(14, 24); g.stroke();
      g.fillStyle = '#1565c0'; g.beginPath(); g.arc(24, 10, 6, 0, Math.PI * 2); g.fill(); },
    list: g => { g.fillStyle = '#8d6e63'; roundRectOn(g, 9, 6, 30, 38, 4); g.fill(); g.fillStyle = '#fafafa'; g.fillRect(13, 11, 22, 29); g.fillStyle = '#90a4ae'; g.fillRect(18, 3, 12, 7);
      g.fillStyle = '#43a047'; for (let k = 0; k < 3; k++) { g.fillRect(15, 15 + k * 8, 4, 4); g.fillStyle = '#78909c'; g.fillRect(21, 16 + k * 8, 11, 2); g.fillStyle = '#43a047'; } },
    calendar: g => { g.fillStyle = '#fafafa'; roundRectOn(g, 6, 8, 36, 34, 4); g.fill(); g.fillStyle = '#e53935'; roundRectOn(g, 6, 8, 36, 10, 4); g.fill(); g.fillRect(6, 14, 36, 4);
      g.fillStyle = '#90a4ae'; for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) g.fillRect(10 + c * 8, 22 + r * 6, 5, 4); g.fillStyle = '#37474f'; g.fillRect(13, 4, 3, 8); g.fillRect(32, 4, 3, 8); },
    wheel: g => { const cs = ['#ef5350', '#ffca28', '#66bb6a', '#42a5f5', '#ab47bc', '#ff7043']; cs.forEach((c, i) => { g.fillStyle = c; g.beginPath(); g.moveTo(24, 26); g.arc(24, 26, 18, i * Math.PI / 3, (i + 1) * Math.PI / 3); g.fill(); });
      g.fillStyle = '#37474f'; g.beginPath(); g.arc(24, 26, 4, 0, Math.PI * 2); g.fill(); g.beginPath(); g.moveTo(19, 2); g.lineTo(29, 2); g.lineTo(24, 11); g.fill(); },
    pin: g => { g.strokeStyle = '#78909c'; g.lineWidth = 3; g.beginPath(); g.moveTo(24, 28); g.lineTo(24, 45); g.stroke(); g.fillStyle = '#e53935'; g.beginPath(); g.arc(24, 17, 12, 0, Math.PI * 2); g.fill(); g.fillStyle = 'rgba(255,255,255,0.5)'; g.beginPath(); g.arc(20, 13, 4, 0, Math.PI * 2); g.fill(); },
    trash: g => { g.fillStyle = '#78909c'; g.fillRect(10, 10, 28, 5); g.fillRect(19, 6, 10, 5); g.fillStyle = '#90a4ae'; g.beginPath(); g.moveTo(12, 16); g.lineTo(36, 16); g.lineTo(33, 44); g.lineTo(15, 44); g.fill();
      g.fillStyle = '#607d8b'; for (const x of [18, 23, 28]) g.fillRect(x, 20, 2.5, 20); },
    rocket: g => { g.fillStyle = '#ff7043'; g.beginPath(); g.moveTo(17, 38); g.lineTo(24, 48); g.lineTo(31, 38); g.fill(); g.fillStyle = '#e53935'; g.beginPath(); g.moveTo(14, 34); g.lineTo(8, 42); g.lineTo(16, 40); g.fill(); g.beginPath(); g.moveTo(34, 34); g.lineTo(40, 42); g.lineTo(32, 40); g.fill();
      g.fillStyle = '#eceff1'; g.beginPath(); g.moveTo(24, 2); g.quadraticCurveTo(36, 14, 33, 38); g.lineTo(15, 38); g.quadraticCurveTo(12, 14, 24, 2); g.fill(); g.fillStyle = '#42a5f5'; g.beginPath(); g.arc(24, 18, 5, 0, Math.PI * 2); g.fill(); },
    muscle: g => { g.fillStyle = '#ffb74d'; g.beginPath(); g.moveTo(6, 40); g.quadraticCurveTo(6, 26, 18, 24); g.quadraticCurveTo(26, 12, 22, 6); g.lineTo(32, 4); g.quadraticCurveTo(40, 14, 30, 26); g.quadraticCurveTo(44, 30, 40, 42); g.closePath(); g.fill();
      g.strokeStyle = '#e65100'; g.lineWidth = 1.5; g.beginPath(); g.arc(25, 31, 7, Math.PI * 1.1, Math.PI * 1.9); g.stroke(); },
    turtle: g => { g.fillStyle = '#8bc34a'; g.beginPath(); g.ellipse(41, 30, 5, 4, 0, 0, Math.PI * 2); g.fill(); g.fillRect(10, 34, 6, 6); g.fillRect(30, 34, 6, 6);
      g.fillStyle = '#558b2f'; g.beginPath(); g.ellipse(23, 28, 16, 12, 0, Math.PI, 0); g.fill(); g.fillStyle = '#7cb342'; g.beginPath(); g.ellipse(23, 26, 6, 5, 0, 0, Math.PI * 2); g.fill(); g.fillStyle = '#111'; g.fillRect(42, 28, 2, 2); },
    drum: g => { g.fillStyle = '#e53935'; g.fillRect(8, 22, 32, 18); g.fillStyle = '#eceff1'; g.beginPath(); g.ellipse(24, 22, 16, 6, 0, 0, Math.PI * 2); g.fill(); g.fillStyle = '#ffd54f';
      for (let k = 0; k < 5; k++) g.fillRect(9 + k * 7, 26, 2, 12); g.strokeStyle = '#8d6e63'; g.lineWidth = 3; g.lineCap = 'round'; g.beginPath(); g.moveTo(12, 4); g.lineTo(22, 18); g.moveTo(38, 4); g.lineTo(28, 18); g.stroke(); },
    tapUp: g => { g.fillStyle = '#ffcc80'; g.strokeStyle = '#8d6e63'; g.lineWidth = 2; g.beginPath(); g.moveTo(20, 46); g.lineTo(18, 30); g.lineTo(18, 8); g.quadraticCurveTo(22, 3, 26, 8); g.lineTo(26, 24); g.lineTo(36, 26); g.quadraticCurveTo(40, 30, 38, 40); g.lineTo(36, 46); g.closePath(); g.fill(); g.stroke(); },
    tapDown: g => { g.translate(0, 48); g.scale(1, -1); ICON_DRAW.tapUp(g); },
    down: g => { g.fillStyle = '#1e88e5'; g.beginPath(); g.moveTo(16, 4); g.lineTo(32, 4); g.lineTo(32, 24); g.lineTo(42, 24); g.lineTo(24, 44); g.lineTo(6, 24); g.lineTo(16, 24); g.closePath(); g.fill(); },
    soundOn: g => { g.fillStyle = '#37474f'; g.beginPath(); g.moveTo(6, 18); g.lineTo(14, 18); g.lineTo(24, 8); g.lineTo(24, 40); g.lineTo(14, 30); g.lineTo(6, 30); g.closePath(); g.fill();
      g.strokeStyle = '#37474f'; g.lineWidth = 3.5; g.lineCap = 'round'; g.beginPath(); g.arc(26, 24, 8, -0.8, 0.8); g.stroke(); g.beginPath(); g.arc(26, 24, 15, -0.8, 0.8); g.stroke(); },
    soundOff: g => { ICON_DRAW.soundOn(g); g.fillStyle = '#fafafa'; g.fillRect(27, 8, 20, 32); g.strokeStyle = '#e53935'; g.lineWidth = 4; g.lineCap = 'round'; g.beginPath(); g.moveTo(30, 16); g.lineTo(44, 32); g.moveTo(44, 16); g.lineTo(30, 32); g.stroke(); }
  };
  Object.assign(ICON_DRAW, {
    flashlight: g => { g.fillStyle = 'rgba(255,241,118,0.6)'; g.beginPath(); g.moveTo(28, 14); g.lineTo(46, 4); g.lineTo(46, 44); g.lineTo(28, 34); g.fill();
      g.fillStyle = '#37474f'; roundRectOn(g, 4, 16, 22, 16, 3); g.fill(); g.fillStyle = '#90a4ae'; g.fillRect(24, 13, 6, 22); g.fillStyle = '#e53935'; g.fillRect(10, 20, 6, 4); },
    balloon: g => { g.strokeStyle = '#757575'; g.lineWidth = 1.5; g.beginPath(); g.moveTo(24, 36); g.quadraticCurveTo(20, 42, 26, 47); g.stroke();
      const bg2 = g.createRadialGradient(18, 14, 2, 24, 20, 17); bg2.addColorStop(0, '#ff8a80'); bg2.addColorStop(1, '#c62828'); g.fillStyle = bg2; g.beginPath(); g.ellipse(24, 20, 13, 16, 0, 0, Math.PI * 2); g.fill();
      g.fillStyle = '#b71c1c'; g.beginPath(); g.moveTo(21, 35); g.lineTo(27, 35); g.lineTo(24, 39); g.fill(); g.fillStyle = 'rgba(255,255,255,0.55)'; g.beginPath(); g.ellipse(18, 13, 3, 5, -0.4, 0, Math.PI * 2); g.fill(); },
    rails: g => { g.fillStyle = '#6d4c41'; for (let k = 0; k < 4; k++) g.fillRect(6 + k * 10, 30, 6, 14); g.fillStyle = '#9e9e9e'; g.fillRect(2, 30, 44, 3); g.fillRect(2, 40, 44, 3);
      g.fillStyle = '#607d8b'; g.beginPath(); g.moveTo(10, 10); g.lineTo(38, 10); g.lineTo(35, 26); g.lineTo(13, 26); g.fill(); g.fillStyle = '#212121'; g.beginPath(); g.arc(16, 28, 3, 0, Math.PI * 2); g.fill(); g.beginPath(); g.arc(32, 28, 3, 0, Math.PI * 2); g.fill(); },
    skate: g => { g.fillStyle = '#ef5350'; g.beginPath(); g.moveTo(4, 22); g.quadraticCurveTo(2, 18, 6, 18); g.lineTo(42, 18); g.quadraticCurveTo(46, 18, 44, 22); g.lineTo(42, 26); g.lineTo(6, 26); g.closePath(); g.fill();
      g.fillStyle = '#ffca28'; g.beginPath(); g.arc(12, 31, 4.5, 0, Math.PI * 2); g.fill(); g.beginPath(); g.arc(36, 31, 4.5, 0, Math.PI * 2); g.fill(); },
    abc: g => { g.fillStyle = '#ffb300'; roundRectOn(g, 4, 10, 40, 28, 6); g.fill(); g.fillStyle = '#5d2e00'; g.font = '900 18px system-ui, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('ABC', 24, 25); },
    portal: g => { for (let k = 0; k < 3; k++) { g.strokeStyle = ['#7c4dff', '#e040fb', '#b388ff'][k]; g.lineWidth = 4; g.beginPath(); g.ellipse(24, 24, 12 - k * 3, 20 - k * 5, 0, k, k + Math.PI * 1.6); g.stroke(); } }
  });
  ICON_DRAW.book = g => { g.fillStyle = '#1e88e5'; roundRectOn(g, 8, 6, 30, 38, 3); g.fill(); g.fillStyle = '#fafafa'; g.fillRect(34, 9, 6, 34); g.fillStyle = '#0d47a1'; g.fillRect(8, 6, 5, 38);
    g.fillStyle = '#ffd54f'; g.fillRect(17, 14, 14, 3); g.fillRect(17, 20, 10, 2); };
  const EMOJI_ICON = { '📖': 'book', '🔦': 'flashlight', '🎈': 'balloon', '🛤': 'rails', '🛹': 'skate', '🔤': 'abc', '🌀': 'portal', '🎁': 'gift', '🔒': 'lock', '❤': 'heart', '🏅': 'medal', '🧲': 'magnet', '🐾': 'paw', '🛡': 'shield', '⭐': 'star', '🪙': 'coin', '✨': 'sparkle',
    '🏆': 'trophy', '👤': 'user', '🛒': 'cart', '💎': 'gem', '🦸': 'hero', '📋': 'list', '📅': 'calendar', '🎡': 'wheel', '📌': 'pin', '🗑': 'trash', '🚀': 'rocket',
    '💪': 'muscle', '🐢': 'turtle', '🥁': 'drum', '👆': 'tapUp', '👇': 'tapDown', '⬇': 'down', '🔊': 'soundOn', '🔇': 'soundOff' };
  const EMOJI_RE = new RegExp('(' + Object.keys(EMOJI_ICON).map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')\\uFE0F?', 'gu');
  const iconCache = {};
  function iconCanvas(name) {
    if (iconCache[name]) return iconCache[name];
    const cv = document.createElement('canvas'); cv.width = cv.height = 48;
    const g = cv.getContext('2d'); g.lineCap = 'round'; g.lineJoin = 'round';
    try { ICON_DRAW[name](g); } catch (e) { }
    return (iconCache[name] = { cv, url: cv.toDataURL() });
  }
  const icoTag = name => `<img class="ico" alt="" src="${iconCanvas(name).url}">`;
  // replace emoji in the text of a DOM subtree (attributes stay untouched)
  function emojify(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), nodes = [];
    while (walker.nextNode()) { EMOJI_RE.lastIndex = 0; if (EMOJI_RE.test(walker.currentNode.nodeValue)) nodes.push(walker.currentNode); }
    for (const n of nodes) {
      const span = document.createElement('span');
      span.innerHTML = n.nodeValue.replace(/[&<>]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[ch]).replace(EMOJI_RE, (m, e) => icoTag(EMOJI_ICON[e]));
      n.replaceWith(...span.childNodes);
    }
  }
  // canvas text with icons in place of emoji, centred on x (uses the current font; stroke + fill like the HUD texts)
  function drawTextIco(c, text, x, y, size, fill, stroke, lw) {
    const parts = text.split(EMOJI_RE).filter(t => t !== '' && t !== '\\uFE0F');
    const wOf = t => EMOJI_ICON[t] ? size * 1.1 : c.measureText(t).width;
    let total = 0; for (const t of parts) total += wOf(t);
    let cx = x - total / 2;
    const al = c.textAlign; c.textAlign = 'left';
    for (const t of parts) {
      if (EMOJI_ICON[t]) c.drawImage(iconCanvas(EMOJI_ICON[t]).cv, cx + size * 0.05, y - size * 0.5, size, size);
      else { if (stroke) { c.lineWidth = lw || 4; c.strokeStyle = stroke; c.strokeText(t, cx, y); } c.fillStyle = fill; c.fillText(t, cx, y); }
      cx += wOf(t);
    }
    c.textAlign = al;
  }

  // ---------- 1.0.42: the encyclopedia: events, every world's hazards, the obstacles ----------
  function withCtx(g, gy, fn) { const c0 = ctx, g0 = groundY; ctx = g; groundY = gy; try { fn(); } finally { ctx = c0; groundY = g0; } }
  let encTab = 'ev';
  function showEnc(tab) {
    encTab = tab || encTab;
    const tabs = Object.entries(S.encTabs).map(([k, v]) => `<button class="tab${k === encTab ? ' on' : ''}" data-act="encTab" data-tab="${k}">${v}</button>`).join('');
    let body = '';
    if (encTab === 'ev') {
      body = `<p class="small">${S.encEvIntro}</p><div class="row"><div class="rt"><b>${S.encGold[0]}</b><small>${S.encGold[1]}</small></div></div>` + Object.keys(EVENTS).map(id =>
        `<div class="row"><div class="rt"><b>${S.ev[id][0]}${EVENTS[id].only ? ` <small>(${S.encOnlyMine})</small>` : ''}</b><small>${S.encEv[id]}</small></div></div>`).join('');
    } else if (encTab === 'worlds') {
      body = `<p class="small">${S.encWorldsIntro}</p>` + SHOP.theme.map(th => {
        const pal = THEMES[th.id] || LEVELS[0], k = worldKind(pal), hz = S.encHaz[k] || S.encHaz.wild;
        return `<div class="row enc"><canvas class="encv" data-th="${th.id}" width="300" height="128"></canvas>
          <div class="rt"><b>${S.items[th.id]}</b><small>${S.encSpike}: ${hz[0]}<br>${S.encPud}: ${hz[1]}<br>${S.encBeam}: ${S.encBeams[k] || S.encBeams.wild}</small></div></div>`;
      }).join('');
    } else {
      body = S.encObs.map(([n, d]) => `<div class="row"><div class="rt"><b>${n}</b><small>${d}</small></div></div>`).join('');
    }
    showPanel(`<h2>${S.encTitle}</h2><div class="tabs t3">${tabs}</div><div class="list">${body}</div>
      <button class="btn main" data-act="menu">${S.back}</button>`, 'enc', true);
    // little pictures: spikes, puddle and beam of each world
    panel.querySelectorAll('canvas.encv').forEach(cv => {
      const g = cv.getContext('2d'), pal = THEMES[cv.dataset.th] || LEVELS[0], k = worldKind(pal), gy = 50;
      g.setTransform(2, 0, 0, 2, 0, 0);
      const sg = g.createLinearGradient(0, 0, 0, gy); sg.addColorStop(0, pal.sky[0]); sg.addColorStop(1, pal.sky[1]);
      g.fillStyle = sg; g.fillRect(0, 0, 150, gy); g.fillStyle = pal.grass; g.fillRect(0, gy, 150, 4); g.fillStyle = pal.dirt; g.fillRect(0, gy + 4, 150, 14);
      withCtx(g, gy, () => { drawHazard(k, 10, 26, 30); drawPuddle(k, 50, 52); drawBeam(k, 120, 20, gy - 18); });
    });
  }
  // ---------- Toasts ----------
  const toastEl = document.getElementById('toast');
  const toastQ = [];
  let toastBusy = false;
  function toast(msg) { toastQ.push(msg); if (!toastBusy) nextToast(); }
  function nextToast() {
    const m = toastQ.shift();
    if (!m) { toastBusy = false; toastEl.classList.remove('show'); return; }
    toastBusy = true; toastEl.textContent = m; emojify(toastEl); toastEl.classList.add('show');
    setTimeout(() => { toastEl.classList.remove('show'); setTimeout(nextToast, 300); }, 2400);
  }

  // ---------- Achievements ----------
  const fmtN = n => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  function achText(a) {
    const [id, target, , , pre, k] = a;
    if (!pre) return S.ach[id];
    const [names, desc] = S.achG[pre];
    if (pre === 'cat3' || pre === 'catAll') return [names[k], desc.replace('{c}', S.tabs[k]).replace('{n}', target)];
    if (pre === 'ws') return [names[k], desc.replace('{n}', k + 1)];
    const n = pre === 'dist' ? (target >= 1000 ? `${fmtN(target / 1000)} ${S.km}` : `${target} ${S.m}`) : fmtN(target);
    return [names[k], desc.replace('{n}', n)];
  }
  // silent: grant without one toast per achievement (first start after the update)
  function checkAch(silent) {
    let cnt = 0, sum = 0;
    for (const a of ACH) {
      const [id, target, reward, val] = a;
      if (save.ach[id] || val() < target) continue;
      save.ach[id] = 1; save.wallet += reward; cnt++; sum += reward;
      if (!silent) toast(`🏆 ${S.achGot}: ${achText(a)[0]}  +${reward}`);
    }
    if (silent && cnt) setTimeout(() => toast(`🏆 ${S.achNew}: ${cnt}  +${sum}`), 3000);
  }

  function showAch() {
    const rows = ACH.map(a => {
      const [id, target, reward, val] = a, [name, desc] = achText(a);
      const got = !!save.ach[id], v = Math.min(target, Math.floor(val()));
      return `<div class="row${got ? ' done' : ''}"><div class="rt"><b>${name}</b><small>${desc}</small>
        <div class="bar"><i style="width:${(v / target * 100).toFixed(0)}%"></i></div></div>
        <div class="rr">${got ? '✓' : `<i class="coin"></i>${reward}`}</div></div>`;
    }).join('');
    const n = ACH.filter(a => save.ach[a[0]]).length;
    showPanel(`<div class="topline"><h2>${S.achTitle}</h2><span class="wallet">${n}/${ACH.length}</span></div>
      <div class="list">${rows}</div>
      <button class="btn main" data-act="menu">${S.back}</button>`, 'ach', true);
  }

  // ---------- Daily reward ----------
  const dailyAvail = () => save.daily.last !== today();

  const dailyPool = () => PRODUCTS.filter(pr => pr.item && !pr.legacy && (pr.cat === 'color' || pr.cat === 'pet') && !save.owned.includes(pr.item));

  function showDaily() {
    const avail = dailyAvail(), left = dailyPool().length, got = save.daily.got;
    let body;
    if (avail) body = `<div class="dprize">${lootHtml('dloot')}</div>
      <p>${left ? S.dailyLeft.replace('{n}', left) : S.dailyAll}</p>
      <button class="btn main" data-act="claimDaily">${S.claim}</button>`;
    else if (got && got.day === today() && got.id) body = `<p>${S.dailyGot}</p>
      <div class="dprize"><canvas class="ic" data-cat="${got.cat}" data-id="${got.id}" width="128" height="144"></canvas><b>${S.items[got.id]}</b></div>
      <p>${S.comeBack}</p>`;
    else body = `<p class="big">${coinHtml('+' + DAILY_ALL_COINS)}</p><p>${S.comeBack}</p>`;
    showPanel(`<div class="topline"><h2>${S.daily}</h2>${coinHtml(save.wallet)}</div>
      <p class="small">${S.exclusive}</p>${body}
      <button class="btn${avail ? '' : ' main'}" data-act="menu">${S.back}</button>`, 'daily', true);
    panel.querySelectorAll('canvas.ic').forEach(cv => drawThumb(cv, cv.dataset.cat, cv.dataset.id));
  }

  function claimDaily() {
    if (!dailyAvail()) return;
    const pool = dailyPool(), pr = pool[Math.floor(Math.random() * pool.length)];
    if (pr) {
      save.owned.push(pr.item);
      save.look[pr.cat] = pr.item;
      save.daily.got = { day: today(), id: pr.item, cat: pr.cat };
      toast(`🎁 ${S.items[pr.item]}`);
    } else { save.wallet += DAILY_ALL_COINS; save.daily.got = { day: today() }; }
    save.daily.count++; save.daily.last = today();
    sfx.buy(); persist(); showDaily();
  }

  // ---------- Tasks (a new set every 2 hours) ----------
  const taskPeriod = () => Math.floor(Date.now() / TASK_PERIOD);
  function ensureTasks() {
    const d = taskPeriod();
    if (save.tasks.day === d && save.tasks.list.length) return;
    // finished but not claimed when the set changes: the reward is not lost
    let back = 0;
    for (const t of save.tasks.list || []) if (t && !t.done && TASKS.some(T => T[0] === t.id) && taskProg(t) >= t.need) { back += t.reward; save.stats.tasks++; save.xp += 50; }
    if (back) { save.wallet += back; setTimeout(() => toast(`${S.taskDone} +${back}`), 800); }
    const r = rng(d), pool = TASKS.filter(T => T[0] !== 'endless' || allDone()), list = [];
    while (list.length < 3 && pool.length) {
      const T = pool.splice(Math.floor(r() * pool.length), 1)[0], hard = r() < 0.4;
      list.push({ id: T[0], need: T[2][hard ? 1 : 0], base: save.stats[T[1]], reward: Math.round(T[3] * (hard ? 1.5 : 1)), done: false });
    }
    save.tasks = { day: d, list };
  }
  const taskStat = t => TASKS.find(T => T[0] === t.id)[1];
  const taskProg = t => Math.max(0, Math.min(t.need, Math.floor(save.stats[taskStat(t)] - t.base)));
  const tasksReady = () => { ensureTasks(); return save.tasks.list.filter(t => !t.done && taskProg(t) >= t.need).length; };
  const shown = (t, v) => t.id === 'endless' ? Math.floor(v / 10) : v;

  function taskLeft() {
    const ms = (taskPeriod() + 1) * TASK_PERIOD - Date.now(), m = Math.max(1, Math.ceil(ms / 60000));
    return m >= 60 ? `${Math.floor(m / 60)} ${S.h} ${m % 60} ${S.min}` : `${m} ${S.min}`;
  }
  function showTasks() {
    ensureTasks();
    const rows = save.tasks.list.map((t, i) => {
      const p = taskProg(t), ready = !t.done && p >= t.need;
      return `<div class="row${t.done ? ' done' : ''}"><div class="rt"><b>${S.taskText[t.id].replace('{n}', shown(t, t.need))}</b>
        <small>${shown(t, p)} / ${shown(t, t.need)}</small><div class="bar"><i style="width:${(p / t.need * 100).toFixed(0)}%"></i></div></div>
        <div class="rr">${t.done ? '✓' : ready ? `<button class="mini hot" data-act="claimTask" data-i="${i}">${S.claim} ${t.reward}</button>`
          : `<span class="small">${S.taskReward}:</span> <i class="coin"></i>${t.reward}<br><button class="mini adm" data-act="replTask" data-i="${i}">${save.noAds ? '🎁' : '▶'} ${S.replaceAd}${save.noAds ? '' : S.adSuffix}</button>`}</div></div>`;
    }).join('');
    showPanel(`<div class="topline"><h2>${S.tasks}</h2>${coinHtml(save.wallet)}</div>
      <div class="list">${rows}</div><p class="small">${S.newTasks.replace('{t}', taskLeft())}</p>
      <button class="btn main" data-act="menu">${S.back}</button>`, 'tasks', true);
  }

  function claimTask(i) {
    const t = save.tasks.list[i];
    if (!t || t.done || taskProg(t) < t.need) return;
    t.done = true; save.wallet += t.reward; save.stats.tasks++; save.xp += 50;
    sfx.buy(); persist(); showTasks();
  }

  // ---------- Lucky wheel ----------
  const WHEEL = [['c', 50, 15], ['c', 100, 13], ['c', 200, 8], ['m', 1, 15], ['c', 50, 15], ['chest', 1, 6], ['c', 100, 13], ['c', 500, 2]];
  const WHEEL_COLORS = ['#ffcc80', '#90caf9', '#a5d6a7', '#ef9a9a', '#ffcc80', '#ce93d8', '#90caf9', '#ffe082'];
  let wheelAngle = 0, wheelAnim = null, wheelMsg = '';

  function wheelPrizeText(p) {
    return p[0] === 'c' ? `+${p[1]}` : p[0] === 'm' ? '🧲' : S.chestTitle;
  }
  function showWheel() {
    if (save.wheel.day !== today()) save.wheel = { day: today(), spins: 0 };
    const free = save.wheel.spins === 0, more = save.wheel.spins < 4;
    showPanel(`<div class="topline"><h2>${S.wheelTitle}</h2>${coinHtml(save.wallet)}</div>
      <canvas id="wheelCv" width="520" height="520"></canvas>
      <p class="big" id="wheelMsg">${wheelMsg}</p>
      ${wheelAnim ? '' : free ? `<button class="btn main" data-act="spin">${S.spin}</button><p class="small">${S.wheelFree}</p>`
        : more ? adBtn('spinAd', S.spinMore) : `<p>${S.comeBack}</p>`}
      <button class="btn" data-act="menu">${S.back}</button>`, 'wheel');
  }
  function spinWheel() {
    if (wheelAnim) return;
    let total = WHEEL.reduce((a, p) => a + p[2], 0), r = Math.random() * total, idx = 0;
    while (r > WHEEL[idx][2]) { r -= WHEEL[idx][2]; idx++; }
    save.wheel.spins++; wheelMsg = '';
    const seg = Math.PI * 2 / WHEEL.length;
    // pointer is at the top (-90°): sector idx must end up there
    const target = -Math.PI / 2 - (idx + 0.5) * seg;
    const TAU = Math.PI * 2, limit = wheelAngle - TAU * 5;     // at least five turns
    const to = target - TAU * Math.ceil((target - limit) / TAU);
    wheelAnim = { t0: performance.now(), from: wheelAngle, to, idx };
    persist(); showWheel();
    setTimeout(finishWheel, 3250);   // prize does not depend on frames being drawn
  }
  function finishWheel() {
    if (!wheelAnim) return;
    const p = WHEEL[wheelAnim.idx];
    wheelAngle = wheelAnim.to; wheelAnim = null;
    if (p[0] === 'c') save.wallet += p[1];
    else if (p[0] === 'm') save.magnets++;
    else { const got = grantRandomItem(); wheelMsg = got.coins ? `+${got.coins}` : `${S.newCat[got.cat]} ${S.items[got.id]}`; }
    if (!wheelMsg) wheelMsg = `${S.wheelWin}: ${wheelPrizeText(p)}`;
    sfx.buy(); persist();
    if (screen === 'wheel') showWheel(); else toast(wheelMsg);
  }
  function drawWheel() {
    const cv = document.getElementById('wheelCv');
    if (!cv) return;
    if (wheelAnim) {
      const k = Math.min(1, (performance.now() - wheelAnim.t0) / 3200), e = 1 - Math.pow(1 - k, 3);
      wheelAngle = wheelAnim.from + (wheelAnim.to - wheelAnim.from) * e;
    }
    const g = cv.getContext('2d'), R = 120, seg = Math.PI * 2 / WHEEL.length;
    g.setTransform(2, 0, 0, 2, 0, 0); g.clearRect(0, 0, 260, 260);
    g.save(); g.translate(130, 134); g.rotate(wheelAngle);
    WHEEL.forEach((p, i) => {
      g.fillStyle = WHEEL_COLORS[i]; g.beginPath(); g.moveTo(0, 0); g.arc(0, 0, R, i * seg, (i + 1) * seg); g.closePath(); g.fill();
      g.strokeStyle = '#fff'; g.lineWidth = 2; g.stroke();
      g.save(); g.rotate((i + 0.5) * seg); g.fillStyle = '#1d1d26'; g.font = '800 20px system-ui, sans-serif';
      g.textAlign = 'center'; g.textBaseline = 'middle';
      if (p[0] === 'chest') { g.imageSmoothingEnabled = false; g.rotate(Math.PI / 2); g.drawImage(lootIcon(), -12, -R * 0.66 - 12, 24, 24); g.imageSmoothingEnabled = true; }
      else if (p[0] === 'm') { g.rotate(Math.PI / 2); g.drawImage(iconCanvas('magnet').cv, -13, -R * 0.66 - 13, 26, 26); }
      else g.fillText(wheelPrizeText(p), R * 0.66, 0);
      g.restore();
    });
    g.restore();
    g.fillStyle = '#1d1d26'; g.beginPath(); g.arc(130, 134, 14, 0, Math.PI * 2); g.fill();
    g.fillStyle = '#e53935'; g.beginPath(); g.moveTo(118, 4); g.lineTo(142, 4); g.lineTo(130, 26); g.closePath(); g.fill();
  }

  // ---------- Loot box (was "chest" until 1.0.20) ----------
  // only coin-shop items the player doesn't own yet; the price is the median price of those,
  // so it follows the collection. Coins / ads only (no odds to publish for a paid box).
  const LOOT_ALL_COINS = 200;   // the wheel's loot-box sector once everything is collected
  function lootPool() {
    const pool = [];
    for (const c of CATS) for (const it of SHOP[c]) if (it.price > 0 && !save.owned.includes(it.id)) pool.push({ cat: c, id: it.id, price: it.price });
    return pool;
  }
  function lootPrice() {
    const p = lootPool().map(i => i.price).sort((a, b) => a - b), n = p.length;
    if (!n) return 0;
    const med = n % 2 ? p[(n - 1) / 2] : (p[n / 2 - 1] + p[n / 2]) / 2;
    return Math.max(50, Math.round(med / 10) * 10);
  }
  function grantRandomItem() {
    const pool = lootPool();
    if (!pool.length) { save.wallet += LOOT_ALL_COINS; return { coins: LOOT_ALL_COINS }; }
    const pick = pool[Math.floor(Math.random() * pool.length)];
    save.owned.push(pick.id);
    return pick;
  }
  // own pixel icon: a golden "?" block (in the spirit of lucky blocks, drawn from scratch)
  let lootImg = null, lootUrl = '';
  function lootIcon() {
    if (lootImg) return lootImg;
    const cv = document.createElement('canvas'); cv.width = cv.height = 16;
    const g = cv.getContext('2d');
    const Q = ['.WWWW.', 'WW..WW', 'WW..WW', '....WW', '...WW.', '..WW..', '..WW..', '......', '..WW..', '..WW..'];
    const white = new Set();
    Q.forEach((row, y) => [...row].forEach((ch, x) => { if (ch === 'W') white.add(`${x + 5},${y + 3}`); }));
    for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) {
      let c = '#ffd23f';
      if (x === 0 || y === 0 || x === 15 || y === 15) c = '#6b3f00';
      else if (x === 1 || y === 1) c = '#fff1a1';
      else if (x === 14 || y === 14) c = '#c98600';
      else if (x === 13 || y === 13) c = '#e9ab12';
      else if ((x + y) % 7 === 0) c = '#ffdc5c';
      if ((x === 2 || x === 13) && (y === 2 || y === 13)) c = '#fff8d6';
      if (white.has(`${x},${y}`)) c = '#ffffff';
      else if (white.has(`${x - 1},${y - 1}`) || white.has(`${x},${y - 1}`)) c = '#7a4a00';
      g.fillStyle = c; g.fillRect(x, y, 1, 1);
    }
    lootImg = cv; lootUrl = cv.toDataURL();
    return cv;
  }
  const lootHtml = cls => { lootIcon(); return `<img class="${cls || 'loot'}" src="${lootUrl}" alt="">`; };

  // ---------- Item card: buy or try on ----------
  let pendingItem = null;
  function showItem(cat, id) {
    const it = findItem(cat, id);
    pendingItem = { cat, id };
    const can = save.wallet >= it.price;
    showPanel(`<div class="topline"><h2>${S.items[id]}</h2>${coinHtml(save.wallet)}</div>
      <canvas id="pcv" class="pcard" width="240" height="220"></canvas>
      <button class="btn main${can ? '' : ' cant'}" data-act="buyItem">${S.buyFor} <i class="coin"></i>${it.price}</button>
      ${can ? '' : `<p class="small">${S.notEnough}</p>`}
      ${adBtn('tryOn', S.tryOn)}
      <button class="btn" data-act="shop">${S.back}</button>`, 'item');
    if (cat === 'emote') pvEmote();
  }

  // ---------- Ranking ----------
  let topTab = 'endless';
  const topCache = {};
  const TOP_BOARDS = () => [['endless', S.topEndless], ['dailyrun', S.topDaily], ['coinsday', S.topCoinsDay]];
  async function topEntries(tab, force) {   // cached for 2 minutes
    const c = topCache[tab];
    if (!force && c && Date.now() - c.t < 120000) return c;
    const res = await SDK.entries(tab);
    topCache[tab] = { t: Date.now(), res }; return topCache[tab];
  }
  async function showTop(tab) {
    topTab = tab || topTab;
    if (topTab === 'stars') topTab = 'coinsday';
    const tabs = TOP_BOARDS().map(([k, t]) => `<button class="tab${k === topTab ? ' on' : ''}" data-act="top" data-tab="${k}">${t}</button>`).join('');
    const head = `<div class="topline"><h2>${S.topTitle}</h2></div><div class="tabs t3">${tabs}</div><p class="small">${S.topNote}</p>`;
    const back = `<button class="btn main" data-act="menu">${S.back}</button>`;
    if (!SDK.ysdk) { showPanel(`${head}<p>${S.topNoSdk}</p>${back}`, 'top', true); return; }
    showPanel(`${head}<p>…</p>${back}`, 'top', true);
    if (topTab === 'coinsday') await submitCoinsDay(true);
    const { res, t } = await topEntries(topTab);
    if (screen !== 'top') return;
    const unit = topTab === 'coinsday' ? ' <i class="coin"></i>' : ' ' + S.m;
    const rows = res && res.entries ? res.entries.map(e => `<div class="row${res.userRank === e.rank ? ' done' : ''}">
      <div class="rr">${e.rank <= 3 ? ['🥇', '🥈', '🥉'][e.rank - 1] : '#' + e.rank}</div><div class="rt"><b>${(e.player && e.player.publicName) || S.guest}</b></div>
      <div class="rr">${e.score}${unit}</div></div>`).join('') : '';
    const tm = new Date(t), upd = `<p class="small">${S.topUpd}: ${String(tm.getHours()).padStart(2, '0')}:${String(tm.getMinutes()).padStart(2, '0')}</p>`;
    const login = SDK.authorized() ? '' : `<p class="small">${S.topLogin}</p><button class="btn" data-act="login">${S.login}</button>`;
    showPanel(`${head}<div class="list">${rows}</div>${upd}${login}${back}`, 'top', true);
  }
  // coins collected today (Moscow day), sent to the «coinsday» board at most every 2 minutes
  const mskDay = () => Math.floor((Date.now() + 3 * 3600e3) / 86400e3);
  let coinsDaySent = 0;
  function coinsToday() { return Math.max(0, save.stats.coins - ((save.cd && save.cd.base) || 0)); }
  async function submitCoinsDay(force) {
    if (!SDK.ysdk || !save.cd || save.cd.day !== mskDay()) return;
    if (!force && Date.now() - coinsDaySent < 120000) return;
    coinsDaySent = Date.now(); await SDK.setScore('coinsday', coinsToday());
  }
  // a new Moscow day: first look at yesterday's places (the boards still hold them), then start counting again
  let dayBusy = false;
  async function dayTick() {
    if (dayBusy) return; dayBusy = true;
    try {
      const d = mskDay();
      if (!save.cd) { save.cd = { day: d, base: save.stats.coins }; persist(); }
      if (save.cd.day !== d) {
        if (SDK.ysdk && SDK.authorized() && save.topPaid !== d) {
          save.topPaid = d;
          for (const [b, bn] of TOP_BOARDS()) {
            const r = await topEntries(b, true);
            const rank = r && r.res && r.res.userRank;
            if (rank >= 1 && rank <= 3) {
              const pool = PRODUCTS.filter(pr => pr.item && !pr.legacy && !save.owned.includes(pr.item));
              const pr = pool[Math.floor(Math.random() * pool.length)];
              if (pr) { save.owned.push(pr.item); toast(S.topReward.replace('{n}', rank).replace('{b}', bn).replace('{i}', S.items[pr.item]), 5); }
              else { save.wallet += 1000; toast(S.topReward.replace('{n}', rank).replace('{b}', bn).replace('{i}', '1000 🪙'), 5); }
            }
          }
        }
        save.cd = { day: d, base: save.stats.coins }; persist();
      }
      submitCoinsDay();
    } finally { dayBusy = false; }
  }
  setInterval(() => { if (state !== 'loading') dayTick(); }, 60000);

  // ---------- Profile with all stats ----------
  function showProfile() {
    const st = save.stats, nm = SDK.name() || S.guest, ph = SDK.photo();
    const t = Math.floor(st.playTime / 60), rt = Math.floor(st.runTime / 60);
    const hm = m2 => m2 >= 60 ? `${Math.floor(m2 / 60)} ${S.h} ${m2 % 60} ${S.min}` : `${m2} ${S.min}`;
    const worst = Object.entries(st.deathBy).sort((a, b) => b[1] - a[1])[0];
    const worn = CATS.map(c => save.look[c]).filter(id => id && id !== 'classic' && id !== 'auto').map(id => S.items[id]).join(', ') || S.items.classic;
    const rows = [
      [S.st.playTime, hm(t)], [S.st.runTime, hm(rt)],
      [S.st.runs, st.runs], [S.st.endlessRuns, st.endlessRuns],
      [S.st.dist, `${(st.dist / 10000).toFixed(1)} ${S.km}`], [S.st.best, `${save.bestEndless} ${S.m}`],
      [S.st.bestDaily, `${save.dailyBest.day === today() ? save.dailyBest.m : 0} ${S.m}`],
      [S.st.levels, st.levelsWon], [S.st.stars, `${save.stars.reduce((a, b) => a + b, 0)}/${LEVELS.length * 5}`],
      [S.st.coins, st.coins], [S.st.gold, st.gold], [S.st.spent, st.spent], [S.st.wallet, save.wallet],
      [S.st.jumps, st.jumps], [S.st.slides, st.slides], [S.st.deaths, st.deaths],
      [S.st.deathBy, worst ? S.causes[worst[0]] || worst[0] : '—'], [S.st.lives, st.lives], [S.st.magnets, st.magnets],
      [S.st.chests, st.chests], [S.st.golden, st.golden], [S.st.tasks, st.tasks],
      [S.st.ach, `${ACH.filter(a => save.ach[a[0]]).length}/${ACH.length}`], [S.st.items, save.owned.length - 2],
      [S.st.daily, save.daily.count], [S.st.look, worn]
    ].map(([k, v]) => `<div class="kv"><span>${k}</span><b>${v}</b></div>`).join('');
    const li = levelInfo();
    const tbtn = CATS.map(c => save.titles[c]
      ? `<button class="mini${save.title === c ? ' hot' : ''}" data-act="title" data-id="${c}" title="${S.titleGot.replace('{c}', S.tabs[c])}">🏅 ${S.titles[c]}</button>`
      : `<button class="mini locked" data-act="titleHint" data-hint="${S.titleHint.replace('{c}', S.tabs[c])}" title="${S.titleHint.replace('{c}', S.tabs[c])}">🔒 ${S.titles[c]}</button>`).join('');
    showPanel(`<div class="prof">${ph ? `<img src="${ph}" alt="">` : '<div class="ava">👤</div>'}<h2>${nm}</h2></div>
      ${save.title ? `<p class="big">🏅 ${S.titles[save.title]}</p>` : ''}
      <p><b>${S.lvlShort} ${li.L}</b> · ${li.x}/${li.need} ${S.xp}</p><div class="bar xpbar"><i style="width:${(li.x / li.need * 100).toFixed(0)}%"></i></div>
      <p class="small">${Object.entries(LVL_REWARDS).map(([n, r]) => `${save.lvl >= +n ? '✓' : n} ${S.items[r[1]]}`).join(' · ')}</p>
      <p class="small"><b>${S.titleT}:</b></p><div class="minis">${save.title ? `<button class="mini" data-act="title" data-id="">${S.titleNone}</button>` : ''}${tbtn}</div>
      ${SDK.ysdk && !SDK.authorized() ? `<button class="btn" data-act="login">${S.login}</button>` : ''}
      <div class="kvs">${rows}</div>
      <button class="btn main" data-act="menu">${S.back}</button>
      <button class="btn danger-soft" data-act="reset" data-n="0">${S.resetBtn}</button>`, 'profile', true);
  }

  function replaceTask(i) {
    const t = save.tasks.list[i];
    if (!t || t.done) return;
    const used = save.tasks.list.map(x => x.id);
    const pool = TASKS.filter(T => !used.includes(T[0]) && (T[0] !== 'endless' || allDone()));
    if (!pool.length) return;
    const T = pool[Math.floor(Math.random() * pool.length)];
    save.tasks.list[i] = { id: T[0], need: T[2][0], base: save.stats[T[1]], reward: T[3], done: false };
    persist(); showTasks();
  }

  // ---------- Purchases ----------
  function starterItem() {
    const pool = [];
    for (const c of CATS) for (const it of SHOP[c]) if (it.price > 0 && !save.owned.includes(it.id)) pool.push({ cat: c, id: it.id });
    if (!pool.length) return null;
    return pool[Math.floor(rng(today() * 3)() * pool.length)];
  }

  // the Pack of the day: bought for yan once a day, or claimed for free every day after "Pack of the day forever"
  function giveStarter() {
    save.wallet += STARTER.coins; save.magnets += STARTER.magnets;
    const it = starterItem();
    if (it) save.owned.push(it.id); else save.wallet += STARTER.instead;
    save.starterDay = today();
    sellMagnets();
  }
  // with the permanent magnet, 30-second magnets are useless: they are bought back at full price
  function sellMagnets() {
    if (!save.magnetPerm || save.magnets <= 0) return;
    const n = save.magnets * MAGNET_PRICE;
    save.wallet += n; save.magnets = 0;
    setTimeout(() => toast(S.magnetsSold.replace('{n}', n)), 600);
  }
  function handlePurchase(p) {
    const pr = PRODUCTS.find(x => x.id === p.productID);
    if (!pr) return;
    if (pr.id === 'noads') { save.noAds = true; SDK.banner(false); }
    else if (pr.coins) save.wallet += pr.coins;
    else if (pr.id === 'starter') giveStarter();
    else if (pr.id === 'starter_perm') save.starterPerm = true;
    else if (pr.id === 'magnet_perm') { save.magnetPerm = true; sellMagnets(); }
    else if (pr.id === 'life') save.life = true;
    else if (pr.item) {
      if (!save.owned.includes(pr.item)) save.owned.push(pr.item);
      if (!save.paid.includes(pr.item)) save.paid.push(pr.item);   // survives a progress reset
    }
    if (pr.consumable) SDK.consume(p.purchaseToken);
    persist();
  }

  function drawPremThumb(cv, id) {
    if (id.startsWith('skin_')) { drawThumb(cv, 'color', id); return; }
    const g = cv.getContext('2d'), k = cv.width / 64;
    g.setTransform(k, 0, 0, k, 0, 0); g.clearRect(0, 0, 64, 72); thumbBg(g);
    if (id === 'noads') {
      g.fillStyle = '#e7e9f2'; roundRectOn(g, 10, 18, 44, 34, 6); g.fill();
      g.fillStyle = '#1d1d26'; g.font = '900 18px system-ui, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('AD', 32, 36);
      g.strokeStyle = '#e53935'; g.lineWidth = 5; g.beginPath(); g.moveTo(12, 56); g.lineTo(52, 14); g.stroke();
    } else if (id === 'life') {
      drawHeart(g, 32, 36, 3.2, '#ff4d6d');
    } else if (id === 'magnet_perm') {
      drawMagnetIcon(g, 32, 34, 2.2);
      g.fillStyle = '#ffd54f'; g.font = '900 16px system-ui, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('∞', 32, 62);
    } else if (id === 'starter_perm') {
      g.fillStyle = '#ef5350'; g.fillRect(16, 30, 32, 24); g.fillStyle = '#e53935'; g.fillRect(13, 23, 38, 9);
      g.fillStyle = '#ffd54f'; g.fillRect(29, 23, 6, 31);
      g.fillStyle = '#1e88e5'; g.font = '900 15px system-ui, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('∞', 32, 63);
    } else if (id === 'starter') {
      g.fillStyle = '#ef5350'; g.fillRect(14, 30, 36, 26); g.fillStyle = '#e53935'; g.fillRect(11, 22, 42, 10);
      g.fillStyle = '#ffd54f'; g.fillRect(29, 22, 6, 34);
      g.beginPath(); g.ellipse(26, 19, 6, 4, -0.5, 0, Math.PI * 2); g.closePath(); g.ellipse(38, 19, 6, 4, 0.5, 0, Math.PI * 2); g.fill();
    } else {
      const pr = PRODUCTS.find(p => p.id === id);
      const n = pr && pr.coins ? Math.max(1, Math.min(5, Math.round(Math.log10(pr.coins / 250) * 2.2))) : 2;
      const coin = (x, y, r) => {
        const cg = g.createRadialGradient(x - r * 0.3, y - r * 0.35, 1, x, y, r); cg.addColorStop(0, '#fff3b0'); cg.addColorStop(0.5, '#ffcc1a'); cg.addColorStop(1, '#d99a00');
        g.fillStyle = cg; g.strokeStyle = '#b07800'; g.lineWidth = 1.5; g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill(); g.stroke();
        g.strokeStyle = 'rgba(176,120,0,0.6)'; g.lineWidth = 1; g.beginPath(); g.arc(x, y, r * 0.65, 0, Math.PI * 2); g.stroke();
      };
      const spots = [[32, 50], [22, 54], [42, 54], [27, 42], [37, 42], [32, 33]];
      for (let i = 0; i < Math.min(6, n + 1); i++) coin(spots[i][0], spots[i][1], 9);
    }
  }

  const LOCAL = DEV_HOST;
  let devMode = false;
  try { devMode = LOCAL && localStorage.getItem('sr_dev') !== '0'; } catch (e) { devMode = LOCAL; }
  // a closer look at a product sold for yan: the stickman wearing it, then the purchase
  let cardItem = null;
  function showProductCard(id) {
    const pr = PRODUCTS.find(x => x.id === id);
    if (!pr || !pr.item) return;
    cardItem = pr;
    pendingItem = { cat: pr.cat, id: pr.item };   // 1.0.53: premium things can be tried on for one run too (one ad)
    const price = SDK.catalog[pr.id] || `${pr.yan} ян`;
    const ci = pr.cat === 'color' && findItem('color', pr.item), inf = ci ? SKIN_INFO[ci.costume] : pr.cat === 'pet' ? PET_INFO[pr.item.slice(2)] : null;
    showPanel(`<div class="topline"><h2>${S.items[pr.item]}</h2>${coinHtml(save.wallet)}</div>
      <p class="small">${S.tryLook}</p>
      <canvas id="pcv" class="pcard" width="240" height="220"></canvas>
      ${inf ? `<p class="left">${S === TEXT.ru ? inf[1] : inf[3]}</p>` : ''}
      <button class="btn main" data-act="pay" data-id="${pr.id}">${S.buyFor} ${price}</button>
      ${save.owned.includes(pr.item) ? '' : adBtn('tryOn', S.tryOn)}
      <button class="btn" data-act="shop">${S.back}</button>`, 'pcard');
  }
  function premiumList() {
    const local = DEV_HOST;
    const price = pr => SDK.catalog[pr.id] || `${pr.yan} ян`;
    // player mode: an item opens its card first; developer mode buys at once (free on localhost)
    const payBtn = pr => `<button class="mini price" data-act="${pr.item && !devMode ? 'pcard' : 'pay'}" data-id="${pr.id}">${price(pr)}</button>`;
    const list = sec => PRODUCTS.filter(pr => !pr.legacy && pr.sec === sec).sort((a, b) => a.yan - b.yan);
    // special: no ads + pack of the day
    const main = list('main').map(pr => {
      const [name, d0] = S.prem[pr.id];
      let desc = d0;
      if (pr.id === 'starter') {
        const it = starterItem();
        desc = d0.replace('{c}', STARTER.coins).replace('{m}', STARTER.magnets).replace('{i}', it ? `${S.catNoun[it.cat]} «${S.items[it.id]}»` : '—') + (it ? '' : ' ' + S.starterMore);
      }
      const done = pr.id === 'noads' ? save.noAds : pr.id === 'starter_perm' ? save.starterPerm : pr.id === 'magnet_perm' ? save.magnetPerm : pr.id === 'life' ? save.life : save.starterDay === today();
      if (pr.id === 'starter' && save.starterPerm && !done)
        return `<div class="row prem"><canvas class="ic sm" data-pid="${pr.id}" width="96" height="108"></canvas>
        <div class="rt"><b>${name}</b><small>${desc}</small></div>
        <div class="rr"><button class="mini hot" data-act="starterClaim">${S.starterClaim}</button></div></div>`;
      return `<div class="row prem"><canvas class="ic sm" data-pid="${pr.id}" width="96" height="108"></canvas>
        <div class="rt"><b>${name}</b><small>${desc}</small></div>
        <div class="rr">${done ? `<span class="small">${pr.id === 'starter' ? S.starterDone : S.owned}</span>` : payBtn(pr)}</div></div>`;
    }).join('');
    // coins with the saving compared to the smallest pack
    const base = 500 / 15;
    const coins = list('coins').map(pr => {
      const gain = Math.round(((pr.coins / pr.yan) / base - 1) * 100);
      return `<div class="row prem"><canvas class="ic sm" data-pid="${pr.id}" width="96" height="108"></canvas>
        <div class="rt"><b>${S.coinsN.replace('{n}', pr.coins.toLocaleString('ru-RU'))}</b>
        <small>${gain > 0 ? `<span class="gain">${S.benefit} +${gain}%</span>` : S.noBenefit}</small></div>
        <div class="rr">${payBtn(pr)}</div></div>`;
    }).join('');
    // characters & pets as tiles
    const tiles = sec => list(sec).map(pr => {
      const owned = save.owned.includes(pr.item), worn = save.look[pr.cat] === pr.item;
      return `<div class="ptile${worn ? ' worn' : ''}"><canvas class="ic" data-cat="${pr.cat}" data-id="${pr.item}" width="128" height="144"></canvas>
        <span class="nm">${S.items[pr.item]}</span>
        ${owned ? `<button class="mini" data-act="wearPaid" data-cat="${pr.cat}" data-id="${pr.item}">${worn ? S.worn : S.wear}</button>` : payBtn(pr)}</div>`;
    }).join('');
    return `${SDK.payments || local ? '' : `<p class="small">${S.payNoSdk}</p>`}
      <h3 class="sec">${S.secMain}</h3><div class="list">${main}</div>
      <h3 class="sec">${S.secChars}</h3><div class="ptiles">${tiles('chars')}</div>
      <h3 class="sec">${S.secPets}</h3><div class="ptiles">${tiles('pets')}</div>
      <h3 class="sec">${S.secCoins}</h3><div class="list">${coins}</div>`;
  }

  let canShortcut = false;
  const freeChestLeft = () => Math.ceil((save.freeChestAt + 30 * 60000 - Date.now()) / 60000);

  // ---------- Shop ----------
  function lookWith(cat, id) {
    const l = Object.assign({}, save.look);
    l[cat] = id;
    return l;
  }

  function boostTile(b) {
    let label, cls = 'item';
    if (b.id === 'life') {
      if (save.life) { label = `✓ ${S.bought}`; cls += ' worn'; }
      else { label = `<i class="coin"></i>${b.price}`; if (save.wallet < b.price) cls += ' cant'; }
    } else {
      label = `<i class="coin"></i>${b.price}`;
      if (save.wallet < b.price) cls += ' cant';
    }
    if (b.id === 'magnet' && save.magnetPerm) { label = '∞'; cls = 'item worn'; }
    const extra = b.id === 'magnet' ? `<span class="nm small">${save.magnetPerm ? S.prem.magnet_perm[0] : `${S.inStock}: ${save.magnets}`}</span>` : '';
    return `<button class="${cls}" data-act="item" data-id="${b.id}">
      <canvas class="ic" data-id="${b.id}" width="128" height="144"></canvas>
      <span class="nm">${S.items[b.id]}</span>${extra}<span class="pr">${label}</span></button>`;
  }

  function showShop() {
    const tabs = TABS.map(c =>
      `<button class="tab${c === shopTab ? ' on' : ''}" data-act="tab" data-tab="${c}">${S.tabs[c]}</button>`).join('');
    let items;
    if (shopTab === 'boost') {
      items = BOOSTS.slice().sort((a, b) => a.price - b.price).map(boostTile).join('');
    } else if (shopTab === 'premium') {
      items = premiumList();
    } else {
      const tile = it => {
        const owned = save.owned.includes(it.id);
        const worn = save.look[shopTab] === it.id;
        let label;
        if (worn) label = FREE[shopTab] ? `✓ ${S.equipped}` : S.take;
        else if (owned) label = S.equip;
        else if (it.ex) label = S.devTake;
        else label = `<i class="coin"></i>${it.price}`;
        if (owned && !worn && slotLocked(shopTab)) label = `🔒 ${S.slotShort}`;
        const cls = ['item', worn ? 'worn' : '', !owned && it.price > save.wallet ? 'cant' : '', owned && slotLocked(shopTab) ? 'cant' : ''].join(' ');
        return `<button class="${cls}" data-act="${!owned && it.ex ? 'devTake' : 'item'}" data-id="${it.id}">
          <canvas class="ic" data-id="${it.id}" width="128" height="144"></canvas>
          <span class="nm">${S.items[it.id]}</span>${it.friend ? `<span class="ow">🐾 ${petOwner(it.id)}</span>` : ''}<span class="pr">${label}</span></button>`;
      };
      const list = SHOP[shopTab].filter(it => !it.hide && !(RETIRED.includes(it.id) && !save.owned.includes(it.id)) && (!it.ex || devMode || save.owned.includes(it.id)))
        .map((it, i) => ({ it, i })).sort((a, b) => (a.it.ex ? 1e9 : a.it.price) - (b.it.ex ? 1e9 : b.it.price) || a.i - b.i).map(o => o.it);
      items = list.filter(it => !it.friend).map(tile).join('');
      const fr = list.filter(it => it.friend);
      if (fr.length) items += `<div class="sub">${S.friendPets}</div>` + fr.map(tile).join('');
    }
    const lp = lootPrice();
    const desc = shopTab === 'boost' ? `<p class="small left">${S.lifeDesc}<br>${S.magnetDesc}</p>`
      : shopTab === 'theme' ? `<p class="small">${S.themeDesc}</p>`
      : shopTab === 'emote' ? `<p class="small">${S.emoteDesc}</p>` : '';
    if (worldsMode) shopTab = 'theme';
    showPanel(`<div class="topline"><h2>${worldsMode ? S.worldsTitle : S.shopTitle}</h2>${coinHtml(save.wallet)}</div>
      <canvas id="pv" width="240" height="220"></canvas>
      ${lp && !worldsMode ? `<button class="btn chest${save.wallet < lp ? ' cant' : ''}" data-act="chest" title="${S.lootInfo}">${lootHtml()} ${S.chest} — <i class="coin"></i>${lp}</button>
      ${freeChestLeft() <= 0 ? adBtn('freeChest', S.freeChest) : `<p class="small">${S.freeChestIn.replace('{t}', freeChestLeft())}</p>`}` : ''}
      ${worldsMode ? '' : `<div class="tabs t5">${tabs}</div>`}
      ${desc}
      <div class="${shopTab === 'premium' ? '' : 'items'}">${items}</div>
      <button class="btn main" data-act="menu">${S.back}</button>`, 'shop', true);
    panel.querySelectorAll('canvas.ic').forEach(cv => cv.dataset.pid ? drawPremThumb(cv, cv.dataset.pid)
      : drawThumb(cv, cv.dataset.cat || shopTab, cv.dataset.id));
  }

  // one shared backdrop for every item picture, light and dark colours both read well on it
  function thumbBg(g) {
    const bg = g.createLinearGradient(0, 0, 0, 72);
    bg.addColorStop(0, '#a9bcd6'); bg.addColorStop(1, '#7f95b5');
    g.fillStyle = bg; g.fillRect(0, 0, 64, 72);
  }

  // picture of one item on a small canvas (64x72 logical px)
  function drawThumb(cv, cat, id) {
    const g = cv.getContext('2d'), k = cv.width / 64, pal = LEVELS[0];
    g.setTransform(k, 0, 0, k, 0, 0);
    g.clearRect(0, 0, 64, 72);
    thumbBg(g);
    if (cat === 'boost') {
      if (id === 'life') drawHeart(g, 32, 38, 3.2, '#ff4d6d');
      else drawMagnetIcon(g, 32, 34, 2.2);
      return;
    }
    if (cat === 'theme') {
      const th = THEMES[id] || LEVELS[0];
      g.save(); g.translate(-7, 0); g.scale(72 / 110, 72 / 110);
      drawMiniWorld(g, 120, 110, th, 300, 0.5);
      g.restore();
      if (id === 'auto') { g.fillStyle = '#0f1a3d'; g.globalAlpha = 0.6; g.fillRect(32, 0, 32, 60); g.globalAlpha = 1; g.fillStyle = '#fff59d'; g.beginPath(); g.arc(48, 12, 4, 0, Math.PI * 2); g.fill(); g.fillStyle = '#0f1a3d'; g.beginPath(); g.arc(50, 11, 3.5, 0, Math.PI * 2); g.fill(); }
      return;
    }
    const cItem = findItem('color', save.look.color);
    const col = colorOf(cItem, pal);
    if (cat === 'pet') {
      g.translate(32, { lvl_star: 132, cat: 66, bird: 129, drone: 141, ghost: 114, dragon: 126, owl: 132, bat: 135, bee: 120, p_phoenix: 132, p_jelly: 120, p_kraken: 118 }[id] || 66); g.scale(1.5, 1.5);
      drawPet(g, id, 0, 0, 0.3, true);
      return;
    }
    if (cat === 'trail' || cat === 'jump') {
      // jump effects: the stickman a bit smaller and lower, so his head stays inside the picture
      if (cat === 'jump') { g.save(); g.translate(44, 66); g.scale(0.78, 0.78); }
      else { g.save(); g.translate(44, 66); g.scale(0.9, 0.9); }
      drawStick(g, 0, cat === 'jump' ? -8 : 0, cat === 'jump' ? 'jump' : 'run', 0.12, col, 1, save.look, null);
      g.restore();
      const samples = [];
      if (cat === 'trail') {
        if (id === 'rainbow' || id === 'aurora') {
          g.lineWidth = id === 'aurora' ? 4 : 2.5;
          (id === 'aurora' ? AURORA : RAINBOW).forEach((c2, i) => { g.strokeStyle = c2; g.beginPath(); for (let xx = 2; xx <= 38; xx += 3) { const yy = 34 + i * (id === 'aurora' ? 4 : 2.6) + (id === 'aurora' ? Math.sin(xx * 0.3 + i) * 2 : 0); xx === 2 ? g.moveTo(xx, yy) : g.lineTo(xx, yy); } g.stroke(); });
        } else for (let i = 0; i < 9; i++) {
          const x = 4 + i * 4, y = 40 + Math.sin(i * 1.7) * 6;
          if (id === 'comet') samples.push({ k: 'c', r: 1 + i * 0.35, col: i % 2 ? '#b3e5fc' : '#ffffff', life: 1, x, y: 40 });
          else if (id === 'fire') samples.push({ k: 'c', r: 2 + i * 0.4, col: i % 2 ? '#ff7a00' : '#ffd23f', life: 1, x, y });
          else if (id === 'sparks') samples.push({ sz: 2.5, col: i % 2 ? '#fff59d' : '#ffca28', life: 1, x, y: y + (i % 3) * 3 });
          else if (id === 'hearts') { if (i % 2) samples.push({ k: 'h', col: '#ff4d6d', life: 1, l0: 1, x, y }); }
          else if (id === 'lightning') { if (i % 3 === 0) samples.push({ k: 'z', r: 7, col: '#fbc02d', life: 1, x: x + 4, y }); }
          // every trail gets the same particles it draws in the run (smoke, snow, leaves... used to fall back to bubbles)
          else if (id === 'smoke') samples.push({ k: 'c', r: 1.5 + i * 0.45, col: 'rgba(120,120,135,0.55)', life: 1, x, y: 38 - i * 0.6 });
          else if (id === 'snow') { samples.push({ k: 'c', r: 2.4, col: '#90a4ae', life: 1, x, y: y + (i % 3) * 2 }); samples.push({ k: 'c', r: 1.7, col: '#ffffff', life: 1, x, y: y + (i % 3) * 2 }); }
          else if (id === 'leaves') samples.push({ k: 'l', col: ['#66bb6a', '#ffa726', '#ef5350', '#d4e157'][i % 4], life: 1, x, y });
          else if (id === 'startrail') { if (i % 2 === 0) samples.push({ k: 's', r: 3.2, col: i % 4 ? '#ffd54f' : '#fbc02d', life: 1, l0: 1, x, y }); }
          else if (id === 'petals') samples.push({ k: 'l', col: i % 2 ? '#f8bbd0' : '#f06292', life: 1, x, y });
          else if (id === 'bluefire') samples.push({ k: 'c', r: 2 + i * 0.4, col: i % 2 ? '#2979ff' : '#80d8ff', life: 1, x, y });
          else if (id === 'pixels') samples.push({ sz: 3, col: ['#e53935', '#43a047', '#1e88e5', '#fdd835', '#8e24aa'][i % 5], life: 1, x, y });
          else if (id === 'musictrail') { if (i % 3 === 0) samples.push({ k: 't', txt: i % 2 ? '♪' : '♫', fs: 11, col: ['#7c4dff', '#ec407a', '#00897b'][i % 3], life: 1, x, y }); }
          else if (id === 'shadowtrail') samples.push({ k: 'c', r: 1.5 + i * 0.5, col: 'rgba(40,30,60,0.4)', life: 1, x, y: 40 });
          else if (id === 'tinsel') samples.push({ sz: 2.6, col: ['#e53935', '#ffd54f', '#43a047', '#40c4ff'][i % 4], life: 1, x, y });
          else if (id === 'paws') { if (i % 3 === 0) samples.push({ k: 'p', r: 2.6, col: 'rgba(110,70,35,0.9)', life: 1, x, y: 58 + (i % 2) * 4 }); }
          else if (id === 'goldtrail') {
            if (i % 2 === 0) samples.push({ k: 's', r: 2.6, col: '#ffc107', life: 1, l0: 1, x, y: y - 2 });
            else samples.push({ k: 'c', r: 1.3, col: 'rgba(255,160,0,0.95)', life: 1, x, y: y + 3 });
          }
          else samples.push({ k: 'o', r: 1.5 + (i % 3), col: 'rgba(90,160,230,0.95)', life: 1, x, y });
        }
      } else {
        for (let i = 0; i < 5; i++) {
          const a = Math.PI + i * Math.PI / 4, x = 40 + Math.cos(a) * 14, y = 64 + Math.sin(a) * 8;
          if (id === 'cloud') samples.push({ k: 'c', r: 4, col: '#fff', life: 1, x, y });
          else if (id === 'stars') samples.push({ k: 's', r: 4, col: '#ffc400', life: 1, x, y });
          else if (id === 'confetti') { samples.push({ sz: 3.5, col: `hsl(${i * 70},90%,55%)`, life: 1, x, y }); samples.push({ sz: 3, col: `hsl(${i * 70 + 35},90%,55%)`, life: 1, x: x + 5, y: y - 9 }); }
          else if (id === 'fireworks') { for (let q = 0; q < 3; q++) samples.push({ k: 'c', r: 2, col: `hsl(${(i * 70 + q * 25) % 360},95%,60%)`, life: 1, x: 40 + Math.cos(a + q * 0.3) * (10 + q * 4), y: 50 + Math.sin(a + q * 0.3) * (10 + q * 4) }); }
          else if (id === 'splash') samples.push({ k: 'c', r: 2, col: i % 2 ? '#4fc3f7' : '#0288d1', life: 1, x, y });
          else if (id === 'leafjump') samples.push({ k: 'l', col: ['#ef6c00', '#c62828', '#f9a825', '#7cb342'][i % 4], life: 1, x, y });
          else if (id === 'bolt') { if (i % 2 === 0) samples.push({ k: 'z', r: 7, col: '#fbc02d', life: 1, x, y }); }
          else if (id === 'flowerburst') samples.push({ k: 'c', r: 2.3, col: ['#ff80ab', '#fbc02d', '#ab47bc', '#ec407a'][i % 4], life: 1, x, y });
          else if (id === 'portal') { if (i < 2) samples.push({ k: 'o', r: 6 + i * 4, col: i ? '#e040fb' : '#7c4dff', life: 1, x: 40, y: 64 - i * 3 }); }
          else if (id === 'coinburst') samples.push({ k: 'c', r: 2.6, col: i % 2 ? '#ffcc1a' : '#ffb300', life: 1, x, y });
          else if (id === 'feathers') { samples.push({ k: 'l', col: '#90a4ae', life: 1, x, y: y + 1 }); samples.push({ k: 'l', col: '#ffffff', life: 1, x, y }); }
          else if (id === 'icejump') samples.push({ k: 's', r: 3, col: i % 2 ? '#4fc3f7' : '#81d4fa', life: 1, l0: 1, x, y });
          else if (id === 'bubblejump') samples.push({ k: 'o', r: 1.5 + (i % 3), col: 'rgba(60,140,220,0.95)', life: 1, x, y });
          else if (id === 'snowburst') { samples.push({ k: 'c', r: 2.6, col: '#90a4ae', life: 1, x, y: y + 2 }); samples.push({ k: 'c', r: 2, col: '#ffffff', life: 1, x, y: y + 2 }); }
          else if (id === 'puff') samples.push({ k: 'c', r: 3.5 + (i % 2), col: 'rgba(170,160,140,0.8)', life: 1, x, y: y + 2 });
          else if (id === 'love') samples.push({ k: 'h', col: i % 2 ? '#ff4d6d' : '#ff8fab', life: 1, l0: 1, x, y: y - 4 });
          else if (id === 'rings') { if (i < 2) samples.push({ k: 'o', r: 6 + i * 5, col: '#4fc3f7', life: 1, x: 40, y: 64 - i * 4 }); }
          else if (id === 'sunburst') { samples.push({ k: 'r', a: a - Math.PI, r: 7, col: i % 2 ? '#ffb300' : '#ffca28', life: 1, l0: 1, x: 40 + Math.cos(a) * 14, y: 64 + Math.sin(a) * 10 }); if (i === 0) samples.push({ k: 'c', r: 5, col: '#ffd600', life: 1, x: 40, y: 64 }); }
          else if (id === 'shockwave') {
            if (i < 3) samples.push({ k: 'o', r: 5 + i * 5, col: i ? 'rgba(129,212,250,0.9)' : '#ffffff', life: 1, x: 40, y: 66 });
            samples.push({ k: 'c', r: 1.8, col: 'rgba(170,160,140,0.85)', life: 1, x: 40 + (i % 2 ? 1 : -1) * (14 + i * 2), y: 66 - i });
          }
          else if (i < 3) samples.push({ k: 't', txt: i % 2 ? '♪' : '♫', fs: 12, col: '#7c4dff', life: 1, x: 22 + i * 8, y: 44 - i * 6 });
        }
        if (id === 'cloud') { g.fillStyle = '#5a6478'; g.globalAlpha = 0.25; g.fillRect(0, 54, 64, 18); g.globalAlpha = 1; }
      }
      for (const q of samples) drawParticle(g, q, q.x, q.y);
      g.globalAlpha = 1;
      return;
    }
    if (cat === 'emote') {   // a little smaller, so the raised flag / arms fit in the picture
      g.translate(32, 68); g.scale(0.8, 0.8);
      if (id === 'flip') { g.translate(0, -30); g.rotate(-2.4); g.translate(0, 30); }
      drawStick(g, -2, 0, id === 'flip' ? 'jump' : id, 0.2, col, 1, save.look, null);
      return;
    }
    const look = lookWith(cat, id);
    const ci = findItem('color', look.color);
    const c2 = colorOf(ci, pal);
    // zoom onto the part of the body the item is for
    const [z, fy] = { color: [1, -36], hat: [1.9, -56], shorts: [2.3, -24], shoes: [2.4, -10], acc: [1.45, -40] }[cat];
    g.translate(32, 38); g.scale(z, z);
    drawStick(g, -4, -fy, 'stand', 0.3, c2, 1, look, null);
  }

  function openChest(free) {
    const price = lootPrice();
    if (!price) { showShop(); return; }             // everything collected
    if (free) save.freeChestAt = Date.now();
    else if (!spend(price)) return;
    save.stats.chests++;
    const pick = grantRandomItem();
    lastChest = pick;
    persist();
    const next = lootPrice();
    showPanel(`<div class="topline"><h2>${lootHtml('loot sm')} ${S.chestTitle}</h2>${coinHtml(save.wallet)}</div>
      <canvas id="chestIc" class="big-ic" width="192" height="216"></canvas>
      <p class="big"><b>${S.items[pick.id]}</b></p>
      <p>${S.newCat[pick.cat]}</p>
      <button class="btn main" data-act="chestWear">${S.equip}</button>
      ${next ? `<button class="btn${save.wallet < next ? ' cant' : ''}" data-act="chest">${S.chestAgain} — <i class="coin"></i>${next}</button>` : `<p class="small">${S.lootAll}</p>`}
      <button class="btn" data-act="shop">${S.toShop}</button>`, 'chest');
    drawThumb(document.getElementById('chestIc'), pick.cat, pick.id);
  }
  let lastChest = null;

  let pvEmoteAt = -9, pvParts = [], pvLast = 0, pvTrailT = 0, pvScroll = 0;
  const pvEmote = () => { pvEmoteAt = performance.now() / 1000; };
  // small moving scene of a world (shop preview)
  function drawMiniWorld(g, w, h, th, scroll, now) {
    const grd = g.createLinearGradient(0, 0, 0, h);
    grd.addColorStop(0, th.sky[0]); grd.addColorStop(1, th.sky[1]);
    g.fillStyle = grd; g.fillRect(0, 0, w, h);
    const gy = h - 18, d = th.decor;
    if (th.night) { g.fillStyle = '#fff'; for (let i = 0; i < 22; i++) { g.globalAlpha = 0.5 + 0.5 * Math.sin(now * 2 + i); g.fillRect((i * 37 - scroll * 0.05) % w + (i * 37 - scroll * 0.05 < 0 ? w : 0), (i * 17) % (gy - 30), 1.2, 1.2); } g.globalAlpha = 1; }
    const WM = WORLD[d];
    if (!(WM && WM.noSun)) {
      const sg = g.createRadialGradient(w - 24, 20, 2, w - 24, 20, 18);
      sg.addColorStop(0, th.sun); sg.addColorStop(0.45, th.sun); sg.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = sg; g.beginPath(); g.arc(w - 24, 20, 18, 0, Math.PI * 2); g.fill();
      if (th.night > 0.5) { g.fillStyle = th.sky[0]; g.beginPath(); g.arc(w - 19, 17, 8, 0, Math.PI * 2); g.fill(); }
    }
    const wrap = (x, span) => ((x % span) + span) % span;
    const palm = (x, y, k) => {
      g.strokeStyle = '#8d6e63'; g.lineWidth = 2.4 * k; g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + 2 * k, y - 12 * k, x + 6 * k, y - 24 * k); g.stroke();
      g.fillStyle = '#43a047'; for (const a of [-2.6, -1.8, -1.0, -0.2, 0.5]) { g.beginPath(); g.ellipse(x + 6 * k + Math.cos(a) * 7 * k, y - 24 * k + Math.sin(a) * 4 * k + 2 * k, 7.5 * k, 2 * k, a + 1.6, 0, Math.PI * 2); g.fill(); }
    };
    const tree = (x, y, c1, c2, r0) => { g.fillStyle = '#5d4037'; g.fillRect(x - 1.5, y - 14, 3, 14); pE(g, x, y - 20, r0, r0, 0, c1); pE(g, x - r0 * 0.6, y - 15, r0 * 0.7, r0 * 0.7, 0, c1); pE(g, x + r0 * 0.6, y - 15, r0 * 0.7, r0 * 0.7, 0, c1); pE(g, x - 2, y - 23, r0 * 0.45, r0 * 0.45, 0, c2); };
    if (d === 'xmas') {
      g.fillStyle = th.far; for (let i = 0; i < 4; i++) { const x = wrap(i * 50 - scroll * 0.2, 200) - 40; g.beginPath(); g.ellipse(x, gy, 38, 24, 0, Math.PI, 0); g.fill(); }
      for (const [tx, s2] of [[24, 1], [92, 0.8]]) {
        for (let k = 0; k < 3; k++) { const y0 = gy - 4 - k * 9 * s2, ww = (13 - k * 3.5) * s2; g.fillStyle = '#1b5e20'; g.beginPath(); g.moveTo(tx - ww, y0); g.lineTo(tx, y0 - 13 * s2); g.lineTo(tx + ww, y0); g.fill(); g.fillStyle = '#f4f8fc'; g.beginPath(); g.moveTo(tx - ww * 0.5, y0 - 6 * s2); g.lineTo(tx, y0 - 13 * s2); g.lineTo(tx + ww * 0.5, y0 - 6 * s2); g.fill(); }
        ['#ff5252', '#ffeb3b', '#40c4ff', '#69f0ae'].forEach((cc, k) => { g.fillStyle = cc; g.beginPath(); g.arc(tx + Math.sin(k * 2.3) * 7 * s2, gy - 8 - k * 5 * s2, 1.3, 0, Math.PI * 2); g.fill(); });
        g.fillStyle = '#ffd54f'; starPath(g, tx, gy - 35 * s2, 3); g.fill();
      }
      pE(g, 60, gy - 6, 6, 6, 0, '#f5f9ff'); pE(g, 60, gy - 16, 4.5, 4.5, 0, '#f5f9ff'); g.fillStyle = '#ff7043'; g.fillRect(61, gy - 17, 4, 1.4);
      g.fillStyle = '#fff'; for (let i = 0; i < 16; i++) g.fillRect(wrap(i * 23 - now * 8, w), wrap(i * 31 + now * 18, gy), 1.5, 1.5);
    } else if (d === 'jungle') {
      g.fillStyle = th.far; for (let i = 0; i < 4; i++) { const x = wrap(i * 50 - scroll * 0.2, 200) - 40; g.beginPath(); g.ellipse(x, gy, 38, 24, 0, Math.PI, 0); g.fill(); }
      palm(22, gy, 1); palm(84, gy, 0.85);
    } else if (d === 'sakura') {
      g.fillStyle = th.far; g.beginPath(); g.moveTo(10, gy); g.lineTo(46, gy - 52); g.lineTo(84, gy); g.fill();
      g.fillStyle = '#fff'; g.beginPath(); g.moveTo(36, gy - 40); g.lineTo(46, gy - 52); g.lineTo(56, gy - 40); g.fill();
      tree(22, gy, '#f8bbd0', '#fce4ec', 9); tree(96, gy, '#f48fb1', '#fce4ec', 8);
      g.fillStyle = '#d32f2f'; g.fillRect(60, gy - 18, 2.5, 18); g.fillRect(72, gy - 18, 2.5, 18); g.fillRect(58, gy - 16, 19, 2); g.fillStyle = '#212121'; g.fillRect(56, gy - 20, 23, 2.5);
      g.fillStyle = '#f8bbd0'; for (let i = 0; i < 10; i++) { g.beginPath(); g.ellipse(wrap(i * 13 - now * 10, w), wrap(i * 17 + now * 12, gy), 1.8, 1, i, 0, Math.PI * 2); g.fill(); }
    } else if (d === 'autumn') {
      g.fillStyle = th.far; for (let i = 0; i < 4; i++) { const x = wrap(i * 50 - scroll * 0.2, 200) - 40; g.beginPath(); g.ellipse(x, gy, 38, 22, 0, Math.PI, 0); g.fill(); }
      tree(20, gy, '#ef6c00', '#ffa726', 9); tree(60, gy, '#c62828', '#ef5350', 8); tree(100, gy, '#f9a825', '#ffd54f', 9);
      pE(g, 80, gy - 3, 4.5, 3.5, 0, '#ff8f00');
    } else if (d === 'underwater') {
      for (let i = 0; i < 3; i++) { g.fillStyle = 'rgba(255,255,255,0.1)'; g.beginPath(); g.moveTo(10 + i * 40, 0); g.lineTo(26 + i * 40, 0); g.lineTo(46 + i * 40, gy); g.lineTo(30 + i * 40, gy); g.fill(); }
      g.strokeStyle = '#2e7d32'; g.lineWidth = 2.4; for (const kx of [16, 22]) { g.beginPath(); g.moveTo(kx, gy); for (let y = 0; y > -34; y -= 5) g.lineTo(kx + Math.sin(y * 0.2 + kx) * 3, gy + y); g.stroke(); }
      line(g, [80, gy, 80, gy - 12, 74, gy - 20], '#ff7043', 2.2); line(g, [80, gy - 12, 87, gy - 22], '#ff7043', 2.2); line(g, [100, gy, 100, gy - 10, 105, gy - 18], '#ec407a', 2);
      g.strokeStyle = 'rgba(255,255,255,0.7)'; g.lineWidth = 0.8; for (let i = 0; i < 8; i++) { g.beginPath(); g.arc(30 + i * 11, 20 + (i * 23) % 60, 1.5 + (i % 3), 0, Math.PI * 2); g.stroke(); }
      g.fillStyle = '#ffb300'; g.beginPath(); g.ellipse(56, 34, 6, 3.5, 0, 0, Math.PI * 2); g.fill(); g.beginPath(); g.moveTo(61, 34); g.lineTo(66, 30); g.lineTo(66, 38); g.fill();
    } else if (d === 'mine') {
      g.fillStyle = th.far; g.beginPath(); g.ellipse(60, gy, 80, 60, 0, Math.PI, 0); g.fill();
      g.fillStyle = shade(th.far, 0.65); g.fillRect(0, 0, w, 10); for (let i = 0; i < 12; i++) { const x = i * 11 + 3; g.beginPath(); g.moveTo(x - 4, 9); g.lineTo(x, 9 + 8 + (i * 7) % 12); g.lineTo(x + 4, 9); g.fill(); }
      for (let i = 0; i < 8; i++) { g.fillStyle = i % 3 ? '#4dd0e1' : '#ffd54f'; g.fillRect(10 + (i * 37) % 100, 30 + (i * 19) % 40, 2, 2); }
      g.fillStyle = '#6d4c41'; g.fillRect(70, gy - 40, 3, 40); g.fillRect(92, gy - 40, 3, 40); g.fillRect(68, gy - 42, 29, 4);
      const lg = g.createRadialGradient(82, gy - 30, 1, 82, gy - 30, 18); lg.addColorStop(0, 'rgba(255,200,90,0.6)'); lg.addColorStop(1, 'rgba(255,200,90,0)'); g.fillStyle = lg; g.fillRect(64, gy - 48, 36, 36);
      g.fillStyle = '#ffca28'; g.fillRect(80, gy - 34, 4, 5);
      g.fillStyle = '#546e7a'; g.fillRect(18, gy - 12, 22, 9); g.fillStyle = '#212121'; g.beginPath(); g.arc(23, gy - 2, 2.5, 0, Math.PI * 2); g.closePath(); g.arc(35, gy - 2, 2.5, 0, Math.PI * 2); g.fill();
    } else if (d === 'wildwest') {
      g.fillStyle = th.far; g.beginPath(); g.moveTo(4, gy); g.lineTo(14, gy - 34); g.lineTo(50, gy - 34); g.lineTo(60, gy); g.fill(); g.beginPath(); g.moveTo(66, gy); g.lineTo(74, gy - 24); g.lineTo(104, gy - 24); g.lineTo(112, gy); g.fill();
      g.fillStyle = '#558b2f'; roundRectOn(g, 86, gy - 30, 6, 30, 3); g.fill(); roundRectOn(g, 79, gy - 22, 4, 10, 2); g.fill(); roundRectOn(g, 79, gy - 14, 8, 4, 2); g.fill(); roundRectOn(g, 95, gy - 26, 4, 10, 2); g.fill(); roundRectOn(g, 91, gy - 18, 8, 4, 2); g.fill();
      g.strokeStyle = '#a1887f'; g.lineWidth = 0.8; for (let a = 0; a < 4; a++) { g.beginPath(); g.ellipse(30, gy - 5, 5, 3, a, 0, Math.PI * 2); g.stroke(); }
    } else if (d === 'neon') {
      const nc = ['#ff4081', '#00e5ff', '#b388ff', '#76ff03'];
      for (let i = 0; i < 7; i++) { const x = i * 18 - 4, bh = 30 + (i * 23) % 40; g.fillStyle = '#1a1033'; g.fillRect(x, gy - bh, 15, bh); g.fillStyle = nc[i % 4]; g.fillRect(x, gy - bh, 15, 1.5); g.fillStyle = 'rgba(255,255,255,0.18)'; for (let k = 0; k < 4; k++) g.fillRect(x + 3 + (k % 2) * 6, gy - bh + 5 + k * 6, 3, 3); }
      g.save(); g.shadowColor = '#ff4081'; g.shadowBlur = 6; g.strokeStyle = '#ff4081'; g.lineWidth = 1.5; roundRectOn(g, 38, gy - 52, 22, 8, 3); g.stroke(); g.restore();
    } else if (d === 'skyland') {
      g.lineWidth = 3; RAINBOW.forEach((c2, i) => { g.strokeStyle = c2; g.globalAlpha = 0.45; g.beginPath(); g.arc(46, gy + 10, 52 - i * 3, Math.PI, 0); g.stroke(); }); g.globalAlpha = 1;
      g.fillStyle = '#8d6e63'; g.beginPath(); g.moveTo(70, 40); g.lineTo(100, 40); g.lineTo(88, 58); g.fill(); g.fillStyle = '#7cb342'; g.fillRect(70, 37, 30, 4); pE(g, 80, 32, 5, 5, 0, '#558b2f');
      g.fillStyle = 'rgba(179,229,252,0.8)'; g.fillRect(96, 41, 2, 18);
      g.fillStyle = '#fff'; for (let i = 0; i < 7; i++) { g.beginPath(); g.arc(i * 20, gy - 4, 13, Math.PI, 0); g.fill(); }
    } else if (d === 'swamp') {
      g.fillStyle = th.far; for (let i = 0; i < 4; i++) { const x = wrap(i * 50 - scroll * 0.2, 200) - 40; g.beginPath(); g.ellipse(x, gy, 38, 20, 0, Math.PI, 0); g.fill(); }
      for (const tx of [26, 90]) {
        line(g, [tx, gy, tx - 3, gy - 14, tx + 1, gy - 28], '#3e3a2a', 3); pE(g, tx + 1, gy - 32, 9, 7, 0, '#4e5d34');
        g.strokeStyle = '#7f8f52'; g.lineWidth = 0.8; for (const m of [-6, -1, 5]) { g.beginPath(); g.moveTo(tx + m, gy - 27); g.lineTo(tx + m, gy - 18); g.stroke(); }
      }
      for (let i = 0; i < 6; i++) { const fg = g.createRadialGradient(40 + i * 9, 30 + (i * 13) % 30, 0, 40 + i * 9, 30 + (i * 13) % 30, 4); fg.addColorStop(0, 'rgba(220,255,120,0.9)'); fg.addColorStop(1, 'rgba(220,255,120,0)'); g.fillStyle = fg; g.fillRect(36 + i * 9, 26 + (i * 13) % 30, 8, 8); }
    } else if (d === 'savanna') {
      { const sg = g.createRadialGradient(w * 0.7, gy - 22, 2, w * 0.7, gy - 22, 22); sg.addColorStop(0, '#fffbe6'); sg.addColorStop(0.5, '#ffe08a'); sg.addColorStop(1, 'rgba(255,183,77,0)'); g.fillStyle = sg; g.beginPath(); g.arc(w * 0.7, gy - 22, 22, 0, Math.PI * 2); g.fill(); }
      g.fillStyle = shade(th.far, 0.7);
      for (const [x, k] of [[26, 1], [98, 0.8]]) { g.fillRect(x - 1, gy - 18 * k, 2, 18 * k); g.beginPath(); g.ellipse(x, gy - 19 * k, 18 * k, 4 * k, 0, 0, Math.PI * 2); g.fill(); }
      g.beginPath(); g.ellipse(62, gy - 9, 6, 3.4, 0, 0, Math.PI * 2); g.fill(); g.save(); g.translate(66, gy - 10); g.rotate(-0.35); g.fillRect(-1, -14, 2, 14); g.restore();
      g.beginPath(); g.ellipse(71, gy - 23, 2.6, 1.4, 0.3, 0, Math.PI * 2); g.fill(); for (const lx of [-4, -2, 3, 5]) g.fillRect(62 + lx, gy - 7, 1.1, 7);
      g.strokeStyle = '#d9b44a'; g.lineWidth = 1; for (let i = 0; i < 18; i++) { const x = wrap(i * 9 - scroll * 0.3, w); g.beginPath(); g.moveTo(x, gy); g.lineTo(x + Math.sin(now * 2 + i) * 1.5, gy - 5 - (i % 3) * 2); g.stroke(); }
    } else if (d === 'egypt') {
      for (const [x, hh] of [[28, 40], [70, 52], [104, 30]]) { g.fillStyle = shade(th.far, 1.1); g.beginPath(); g.moveTo(x - hh, gy); g.lineTo(x, gy - hh); g.lineTo(x, gy); g.fill(); g.fillStyle = shade(th.far, 0.82); g.beginPath(); g.moveTo(x, gy - hh); g.lineTo(x + hh, gy); g.lineTo(x, gy); g.fill(); }
      palm(10, gy, 0.8);
    } else if (d === 'halloween') {
      const mg = g.createRadialGradient(80, 28, 4, 80, 28, 26); mg.addColorStop(0, 'rgba(255,236,179,0.5)'); mg.addColorStop(1, 'rgba(255,236,179,0)'); g.fillStyle = mg; g.fillRect(54, 2, 52, 52);
      pE(g, 80, 28, 14, 14, 0, '#ffe9a8');
      g.fillStyle = th.far; g.beginPath(); g.ellipse(40, gy, 60, 22, 0, Math.PI, 0); g.fill();
      g.fillStyle = '#78909c'; g.beginPath(); g.moveTo(20, gy); g.lineTo(20, gy - 12); g.arc(26, gy - 12, 6, Math.PI, 0); g.lineTo(32, gy); g.fill();
      pE(g, 96, gy - 5, 6, 5.5, 0, '#ef6c00'); g.fillStyle = '#ffeb3b'; g.fillRect(93, gy - 7, 2, 2); g.fillRect(98, gy - 7, 2, 2);
      line(g, [60, gy, 60, gy - 22, 54, gy - 30], '#2b2233', 2.2); line(g, [60, gy - 16, 67, gy - 26], '#2b2233', 1.6);
    } else if (d === 'space') {
      pE(g, 26, 30, 10, 10, 0, rGrad(g, 26, 30, 10, '#7e57c2')); g.strokeStyle = 'rgba(206,147,216,0.7)'; g.lineWidth = 1.2; g.beginPath(); g.ellipse(26, 30, 16, 4, -0.3, 0, Math.PI * 2); g.stroke();
    } else if (d === 'city') {
      g.fillStyle = th.far;
      for (let i = 0; i < 9; i++) { const x = wrap(i * 19 - scroll * 0.25, 171) - 20, bh = 20 + (i * 13) % 26; g.fillRect(x, gy - bh, 15, bh); g.fillStyle = 'rgba(255,230,150,0.55)'; for (let k = 0; k < 3; k++) g.fillRect(x + 3 + (k % 2) * 6, gy - bh + 4 + k * 6, 3, 3); g.fillStyle = th.far; }
    } else if (d === 'ocean') {
      g.fillStyle = th.far; g.fillRect(0, gy - 22, w, 22);
      g.strokeStyle = 'rgba(255,255,255,0.6)'; g.lineWidth = 1;
      for (let i = 0; i < 6; i++) { const x = wrap(i * 26 - scroll * 0.3, 156) - 10; g.beginPath(); g.moveTo(x, gy - 14 + (i % 2) * 6); g.quadraticCurveTo(x + 4, gy - 17 + (i % 2) * 6, x + 8, gy - 14 + (i % 2) * 6); g.stroke(); }
    } else if (d === 'volcano') {
      g.fillStyle = th.far; g.beginPath(); g.moveTo(10, gy); g.lineTo(42, gy - 46); g.lineTo(54, gy - 46); g.lineTo(88, gy); g.fill();
      g.fillStyle = `rgba(255,${120 + 60 * Math.sin(now * 3)},0,0.9)`; g.beginPath(); g.ellipse(48, gy - 46, 7, 2.5, 0, 0, Math.PI * 2); g.fill();
    } else if (d === 'candy') {
      for (let i = 0; i < 5; i++) { const x = wrap(i * 34 - scroll * 0.25, 170) - 10; line(g, [x, gy, x, gy - 26], '#fff', 1.6); pE(g, x, gy - 30, 7, 7, 0, i % 2 ? '#f06292' : '#ba68c8'); g.strokeStyle = '#fff'; g.lineWidth = 1.4; g.beginPath(); g.arc(x, gy - 30, 4, 0, Math.PI * 1.5); g.stroke(); }
    } else {
      g.fillStyle = th.far;
      for (let i = 0; i < 4; i++) { const x = wrap(i * 50 - scroll * 0.2, 200) - 40; g.beginPath(); g.ellipse(x, gy, 38, d === 'dunes' ? 14 : 24, 0, Math.PI, 0); g.fill(); if (d === 'snow') pE(g, x, gy - 21, 12, 4, 0, '#ffffff'); }
      if (d === 'dunes') { g.fillStyle = '#5e8c3a'; roundRectOn(g, 30, gy - 26, 6, 26, 3); g.fill(); roundRectOn(g, 24, gy - 18, 4, 9, 2); g.fill(); roundRectOn(g, 24, gy - 12, 8, 3.5, 1.7); g.fill(); roundRectOn(g, 38, gy - 22, 4, 9, 2); g.fill(); roundRectOn(g, 34, gy - 16, 8, 3.5, 1.7); g.fill(); }
    }
    g.fillStyle = th.near;
    for (let i = 0; i < 4; i++) { const x = wrap(i * 46 - scroll * 0.5, 184) - 30; g.beginPath(); g.ellipse(x, gy + 2, 30, 11, 0, Math.PI, 0); g.fill(); }
    if (d === 'snow') { g.fillStyle = '#fff'; for (let i = 0; i < 14; i++) g.fillRect(wrap(i * 23 - now * 8, w), wrap(i * 31 + now * 18, gy), 1.5, 1.5); }
    g.fillStyle = th.grass; g.fillRect(0, gy, w, 4);
    g.fillStyle = th.dirt; g.fillRect(0, gy + 4, w, h - gy - 4);
    g.fillStyle = 'rgba(0,0,0,0.15)'; for (let i = 0; i < 6; i++) g.fillRect(wrap(i * 23 - scroll, 138) - 9, gy + 8 + (i % 3) * 3, 4, 2);
  }
  let pvHopU = 0;
  // the jump effect for the shop preview: runs the real one into pvParts, around the preview stickman
  function pvJumpFx(j) {
    const p0 = particles, d0 = dist, y0 = player.y, rl = runLook;
    particles = []; dist = -2; player.y = 0; runLook = Object.assign({}, save.look, { jump: j });
    try { jumpFx0(); } finally { const made = particles; particles = p0; dist = d0; player.y = y0; runLook = rl; for (const q of made) { q.vx += 150 * 0.9; pvParts.push(q); } }
  }
  function drawShopPreview(cvId, lookOver, opt) {
    const cv = document.getElementById(cvId || 'pv');
    if (!cv) return;
    const LKs = lookOver || save.look;
    const g = cv.getContext('2d'), w = 120, h = 110, now = performance.now() / 1000;
    const dt = Math.min(0.05, Math.max(0, now - pvLast)); pvLast = now;
    g.setTransform(2, 0, 0, 2, 0, 0);
    const th = LKs.theme && LKs.theme !== 'auto' && THEMES[LKs.theme] || LEVELS[0];
    if (opt && opt.loopEmote && now - pvEmoteAt > 3.2) pvEmote();   // the emote plays again and again
    const em = LKs.emote, et = now - pvEmoteAt, emoting = em && et < 2.4;
    let hopY = 0;
    if (opt && opt.loopJump && LKs.jump) {   // a hop every 1.4 s with the jump effect
      const u = (now % 1.4) / 0.62;
      if (u < pvHopU) pvJumpFx(LKs.jump);
      pvHopU = u; hopY = u < 1 ? -24 * Math.sin(Math.PI * u) : 0;
    }
    if (!emoting) pvScroll += 150 * dt;
    drawMiniWorld(g, w, h, th, pvScroll, now);
    const c = findItem('color', LKs.color);
    const col = colorOf(c, th);
    g.save(); g.translate(w / 2 + 8, h - 18); g.scale(1.1, 1.1);
    // trail behind the back (the world scrolls, so the particles drift away to the left)
    const tr = LKs.trail;
    if (tr === 'rainbow' || tr === 'aurora') {
      g.globalAlpha = 0.85; g.lineWidth = 2.6;
      (tr === 'aurora' ? AURORA : RAINBOW).forEach((rc, i) => { g.strokeStyle = rc; g.beginPath(); for (let x = -70; x <= -4; x += 4) { const y = -30 + (i - 2.5) * 2.6 + Math.sin(x * 0.08 + now * 6) * 2; x === -70 ? g.moveTo(x, y) : g.lineTo(x, y); } g.stroke(); });
      g.globalAlpha = 1;
    } else if (tr && !emoting) {
      pvTrailT -= dt;
      if (pvTrailT <= 0) pvTrailT = trailSpawn(tr, -8, 30, pvParts);
    }
    if (!tr && !(opt && opt.loopJump)) pvParts.length = 0;
    for (const q of pvParts) { q.vy -= 900 * (q.g === undefined ? 1 : q.g) * dt; q.x += (q.vx - 150) * dt; q.y += q.vy * dt; q.life -= dt; partNature(q, dt); }
    pvParts = pvParts.filter(q => q.life > 0 && q.x > -90);
    for (const q of pvParts) drawParticle(g, q, q.x, -q.y);
    g.globalAlpha = 1;
    if (LKs.pet) drawPet(g, LKs.pet, -38, 0, emoting ? 0.3 : now, emoting);
    const outline = null;   // no aura in the preview either
    if (emoting && em === 'flip') {
      const k = Math.min(1, et / EMOTE_TIME), foot = -34 * Math.sin(Math.min(1, k * 1.6) * Math.PI);
      g.save(); g.translate(-2, foot - 28); g.rotate(-Math.min(1, k * 1.6) * Math.PI * 2); g.translate(2, -(foot - 28));
      drawStick(g, -2, foot, 'jump', now, col, 1, LKs, outline);
      g.restore();
    } else { g.__live = 1; drawStick(g, -2, hopY, emoting ? em : hopY < -1 ? 'jump' : 'run', now, col, 1, LKs, outline); }
    g.restore();
  }


  function spend(price) {
    if (save.wallet < price) { sfx.no(); return false; }
    save.wallet -= price; save.stats.spent += price; sfx.buy();
    return true;
  }

  const slotMsg = cat => { const c = findItem('color', save.look.color); return S.slotBusy.replace('{c}', c ? S.items[c.id] : '').replace('{s}', S.slotNoun[cat]); };
  function shopClick(id) {
    const cat = shopTab;
    if (cat === 'boost') {
      if (id === 'life') { if (save.life) return; if (!spend(4000)) return; save.life = true; }
      else if (id === 'magnet') { if (save.magnetPerm || !spend(MAGNET_PRICE)) return; save.magnets++; }
    } else {
      const it = findItem(cat, id);
      if (!it) return;
      if (save.owned.includes(id)) {
        if (save.look[cat] !== id && slotLocked(cat)) { sfx.no(); toast(slotMsg(cat)); return; }
        if (save.look[cat] === id) { if (!FREE[cat]) save.look[cat] = null; }
        else { save.look[cat] = id; if (cat === 'emote') pvEmote(); }
        sfx.click();
      } else { showItem(cat, id); return; }
    }
    persist();
    const scroll = panel.scrollTop;
    showShop();
    panel.scrollTop = scroll;
  }

  ui.addEventListener('click', e => {
    const b = e.target.closest('button');
    if (!b) return;
    ensureAudio();
    const act = b.dataset.act;
    if (act !== 'item' && act !== 'buyMagnet') sfx.click();
    if (act === 'play') { const n = nextLevel(); if (n >= 0) startLevel(n); else showPrerun(); }
    else if (act === 'lvl') { const i = +b.dataset.i; if (levelOpen(i)) startLevel(i); }
    else if (act === 'endless') { if (allDone()) showPrerun(); }
    else if (act === 'run') startLevel(ENDLESS, prerunDaily);
    else if (act === 'buyMagnet') { if (!save.magnetPerm && spend(MAGNET_PRICE)) { save.magnets++; persist(); } showPrerun(prerunDaily); }
    else if (act === 'drun') { if (allDone()) showPrerun(true); }
    else if (act === 'daily') showDaily();
    else if (act === 'claimDaily') claimDaily();
    else if (act === 'tasks') showTasks();
    else if (act === 'claimTask') claimTask(+b.dataset.i);
    else if (act === 'ach') showAch();
    else if (act === 'x2') SDK.rewarded(ok => { if (ok && !x2Used) { x2Used = true; save.wallet += coinsGot; persist(); toast(`+${coinsGot}`); } showFail(); });
    else if (act === 'freeChest') SDK.rewarded(ok => { if (ok && freeChestLeft() <= 0) openChest(true); else showShop(); });
    else if (act === 'buyItem') {
      const p = pendingItem, it = p && findItem(p.cat, p.id);
      if (it && !save.owned.includes(p.id) && spend(it.price)) {
        save.owned.push(p.id);
        if (slotLocked(p.cat)) toast(slotMsg(p.cat)); else save.look[p.cat] = p.id;   // bought, but not put on over the character
        shopTab = p.cat; if (p.cat === 'emote') pvEmote(); persist(); showShop();
      }
    }
    else if (act === 'tryOn') SDK.rewarded(ok => { if (ok && pendingItem) { trial = pendingItem; toast(`${S.trying}: ${S.items[pendingItem.id]}`); } goMenu(); });
    else if (act === 'shield') SDK.rewarded(ok => { if (ok) shieldNext = true; showPrerun(prerunDaily); });
    else if (act === 'wheel') { wheelMsg = ''; showWheel(); }
    else if (act === 'spin') { if (save.wheel.spins === 0) spinWheel(); }
    else if (act === 'spinAd') SDK.rewarded(ok => { if (ok) spinWheel(); else showWheel(); });
    else if (act === 'replTask') { const i = +b.dataset.i; SDK.rewarded(ok => { if (ok) replaceTask(i); else showTasks(); }); }
    else if (act === 'top') showTop(b.dataset.tab);
    else if (act === 'login') SDK.login().then(() => { if (screen === 'top') showTop(); else showProfile(); });
    else if (act === 'profile') showProfile();
    else if (act === 'title') { const id = b.dataset.id; if (!id || save.titles[id]) { save.title = id; persist(); } showProfile(); }
    else if (act === 'reset') { const n = +b.dataset.n; if (n < 3) showReset(n + 1); else doReset(); }
    else if (act === 'wearPaid') {
      const cat = b.dataset.cat, id = b.dataset.id;
      if (save.owned.includes(id)) { save.look[cat] = save.look[cat] === id && !FREE[cat] ? null : id; if (cat === 'color' && save.look.color !== id) save.look.color = id; persist(); }
      const sc = panel.scrollTop; showShop(); panel.scrollTop = sc;
    }
    else if (act === 'pay') {
      const id = b.dataset.id;
      SDK.buy(id).then(ok => {
        if (ok) {
          toast(S.thanks); sfx.buy();
          const pr = PRODUCTS.find(p => p.id === id);
          if (pr && pr.item) { save.look[pr.cat] = pr.item; persist(); }   // put the new character / pet on right away
        }
        if (screen === 'shop') { const sc = panel.scrollTop; showShop(); panel.scrollTop = sc; }
      });
    }
    else if (act === 'starterClaim') { if (save.starterPerm && save.starterDay !== today()) { giveStarter(); persist(); sfx.buy(); toast(S.thanks); } const sc = panel.scrollTop; showShop(); panel.scrollTop = sc; }
    else if (act === 'pcard') showProductCard(b.dataset.id);
    else if (act === 'devToggle') { devMode = !devMode; try { localStorage.setItem('sr_dev', devMode ? '1' : '0'); } catch (e) { } toast(devMode ? S.devMode : S.playerMode); if (screen === 'shop') showShop(); else goMenu(); }
    else if (act === 'devTake') { const id = b.dataset.id; if (devMode && !save.owned.includes(id)) { save.owned.push(id); persist(); } const sc = panel.scrollTop; showShop(); panel.scrollTop = sc; }
    else if (act === 'titleHint') toast(b.dataset.hint);
    else if (act === 'enc') showEnc('ev');
    else if (act === 'encTab') { showEnc(b.dataset.tab); panel.scrollTop = 0; }
    else if (act === 'devGodT') { devGod = !devGod; showDevEvents(); }
    else if (act === 'devGold') { startLevel(ENDLESS); LV.goldAt = 900; LV.devGold = 1; }   // golden hour at ~90 m
    else if (act === 'devEv') {
      const id = b.dataset.id; devForce = id; startLevel(ENDLESS);
      if (EVENTS[id] && EVENTS[id].only === 'mine') runLook = Object.assign({}, save.look, { theme: 'mine' });   // the cart lives in the mine
    }
    else if (act === 'shortcut') SDK.shortcut().then(ok => {
      if (ok && !save.shortcut) { save.shortcut = true; save.wallet += 700; toast(S.shortcutDone); persist(); }
      goMenu();
    });
    else if (act === 'shop') showShop();
    else if (act === 'chest') openChest();
    else if (act === 'chestWear' && lastChest && lastChest.id && slotLocked(lastChest.cat)) { toast(slotMsg(lastChest.cat)); showShop(); }
    else if (act === 'chestWear') { if (lastChest && lastChest.id) { save.look[lastChest.cat] = lastChest.id; shopTab = lastChest.cat; if (lastChest.cat === 'emote') pvEmote(); persist(); } showShop(); }
    else if (act === 'tab') { worldsMode = false; shopTab = b.dataset.tab; showShop(); }
    else if (act === 'worlds') { worldsMode = true; shopTab = 'theme'; showShop(); }
    else if (act === 'item') shopClick(b.dataset.id);
    else if (act === 'resume') resumeGame();
    else if (act === 'retry') {
      if (!isEndless()) startLevel(lvl);
      // fullscreen ad on "retry" after every 3rd fall in the endless run
      else if (endlessDeaths >= 3 && state === 'fail') { endlessDeaths = 0; hideUI(); SDK.fullscreen(() => showPrerun(dailyRun)); }
      else showPrerun(dailyRun);
    }
    else if (act === 'menu') { if (worldsMode) { worldsMode = false; shopTab = 'color'; } goMenu(); }
    else if (act === 'cont') continueAfterAd();
    else if (act === 'next') {
      const n = lvl + 1;
      if (!levelOpen(n)) { goMenu(); return; }
      hideUI();
      SDK.fullscreen(() => startLevel(n));   // ad only in a natural pause between levels
    }
  });

  function updateSoundBtn() { bSound.innerHTML = icoTag(save.sound ? 'soundOn' : 'soundOff'); }
  bSound.addEventListener('click', e => {
    e.stopPropagation();
    save.sound = !save.sound; updateSoundBtn(); persist();
    ensureAudio();
  });
  bPause.addEventListener('click', e => { e.stopPropagation(); pauseGame(); });

  // =====================================================================
  //  Input
  // =====================================================================
  function jumpPress() {
    if (state !== 'play') return;
    player.buffer = 0.12;
    tryJump();
  }
  // hold the right mouse button = slide. Tracked through pointer events and e.buttons: preventDefault() on
  // pointerdown suppresses mousedown, and a second button pressed while the first is held only fires pointermove.
  let rmbDown = false;
  function rmbState(e) {
    if (e.pointerType !== 'mouse') return;
    const down = (e.buttons & 2) !== 0;
    if (down === rmbDown) return;
    rmbDown = down;
    if (down) { if (state === 'play') slideHeld = true; }
    else slideHeld = false;
  }
  canvas.addEventListener('pointerdown', e => {
    e.preventDefault(); ensureAudio();
    if (e.pointerType === 'mouse' && e.button !== 0) { rmbState(e); return; }
    jumpHeld = true;
    jumpPress();
  });
  window.addEventListener('pointermove', rmbState);
  ['pointerup', 'pointercancel'].forEach(ev => window.addEventListener(ev, e => {
    rmbState(e);
    if (!(e.pointerType === 'mouse' && e.button === 2)) jumpHeld = false;
  }));
  // on-screen slide button (touch devices)
  bSlide.addEventListener('pointerdown', e => { e.preventDefault(); e.stopPropagation(); ensureAudio(); slideHeld = true; });
  ['pointerup', 'pointercancel', 'pointerleave'].forEach(ev => bSlide.addEventListener(ev, () => { slideHeld = false; }));
  // on-screen jump button (touch devices); holding it keeps the jetpack event's thrust on
  bJump.addEventListener('pointerdown', e => { e.preventDefault(); e.stopPropagation(); ensureAudio(); jumpHeld = true; jumpPress(); });
  ['pointerup', 'pointercancel', 'pointerleave'].forEach(ev => bJump.addEventListener(ev, () => { jumpHeld = false; }));

  window.addEventListener('keydown', e => {
    const k = e.code;
    if (k === 'Space' || k === 'ArrowUp' || k === 'KeyW') {
      e.preventDefault(); ensureAudio(); jumpHeld = true;
      if (e.repeat) return;
      if (state === 'play') jumpPress();
      else if (ui.classList.contains('show') && screen !== 'shop' &&
               (state === 'menu' || state === 'paused' || state === 'win' || state === 'fail')) {
        const main = panel.querySelector('.btn.main'); if (main) main.click();
      }
    } else if (k === 'ArrowDown' || k === 'KeyS') {
      e.preventDefault();
      if (state === 'play') slideHeld = true;
    } else if (k === 'Escape' || k === 'KeyP') {
      if (state === 'play') pauseGame();
      else if (state === 'paused') resumeGame();
      else if (['shop', 'prerun', 'chest', 'daily', 'tasks', 'ach', 'item', 'top', 'profile', 'devev', 'enc'].includes(screen)) goMenu();
      else if (screen === 'wheel' && !wheelAnim) goMenu();
    }
  });
  window.addEventListener('keyup', e => {
    if (e.code === 'ArrowDown' || e.code === 'KeyS') slideHeld = false;
    if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') jumpHeld = false;
  });
  // no context menu, no selection, no pinch / double-tap zoom, no scrolling
  ['contextmenu', 'selectstart', 'dragstart', 'gesturestart'].forEach(ev =>
    document.addEventListener(ev, e => e.preventDefault()));
  document.addEventListener('touchmove', e => { if (!e.target.closest('.panel')) e.preventDefault(); }, { passive: false });
  document.addEventListener('dblclick', e => e.preventDefault());

  // =====================================================================
  //  Pause on tab switch / platform pause
  // =====================================================================
  function onSystemPause(on) {
    sysPause = on;
    if (on) pauseGame();
    applyAudio();
  }
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && state !== 'loading') { pauseGame(); persist(); }   // 1.0.55: never save before the old save is loaded
    applyAudio();
  });
  window.addEventListener('blur', () => { slideHeld = false; pauseGame(); });
  window.addEventListener('pagehide', () => { if (state !== 'loading') persist(); });   // 1.0.55: iPhone apps closed by a swipe save too

  // =====================================================================
  //  Main loop & boot
  // =====================================================================
  let lastT = performance.now();
  function frame(now) {
    requestAnimationFrame(frame);
    let dt = (now - lastT) / 1000; lastT = now;
    if (dt > 0.1) dt = 0.1;
    if (state !== 'loading' && !document.hidden) save.stats.playTime += dt;   // the whole time the game is open
    if (state !== 'paused' && state !== 'loading') {
      // slow motion: tutorial pause-ish, and a moment at the finish line
      const ts = tutWait ? 0.12 : slowMoT > 0 ? 0.35 : 1;
      if (slowMoT > 0) slowMoT -= dt;
      if (shakeT > 0) shakeT -= dt;
      const n = Math.ceil(dt * ts / (1 / 120));
      for (let i = 0; i < n; i++) step(dt * ts / n);
    }
    draw();
  }

  // Loading never throws anything away: every field of the old save is kept (even ones this
  // version doesn't know about), new fields get defaults, and only broken values are fixed.
  function mergeInto(def, src) {
    if (!src || typeof src !== 'object' || Array.isArray(src)) return def;
    for (const k of Object.keys(src)) {
      const a = def[k], b = src[k];
      if (a && typeof a === 'object' && !Array.isArray(a) && b && typeof b === 'object' && !Array.isArray(b)) mergeInto(a, b);
      else if (a === undefined || a === null || b === null || typeof a === typeof b) def[k] = b;
    }
    return def;
  }

  function applyLoaded(d) {
    if (!d || typeof d.unlocked !== 'number') return;
    const hadTut = !!d.tut;
    mergeInto(save, JSON.parse(JSON.stringify(d)));
    // repair / normalise
    save.unlocked = Math.max(0, Math.min(LEVELS.length - 1, save.unlocked | 0));
    const arr = (a, n) => { const out = Array.isArray(a) ? a.slice() : []; while (out.length < n) out.push(0); return out.map(v => v | 0); };
    save.stars = arr(save.stars, LEVELS.length).map(v => Math.max(0, Math.min(5, v)));
    save.done = arr(save.done, LEVELS.length).map(v => v ? 1 : 0);
    save.best = arr(save.best, LEVELS.length);
    save.wallet = Math.max(0, save.wallet | 0);
    save.magnets = Math.max(0, save.magnets | 0);
    for (const [k, v] of Object.entries(newStats())) if (typeof save.stats[k] !== typeof v) save.stats[k] = v;
    if (!Array.isArray(save.owned)) save.owned = [];
    save.owned = [...new Set(['classic', 'auto', ...save.owned.filter(x => typeof x === 'string')])];
    if (!Array.isArray(save.tasks.list)) save.tasks.list = [];
    save.tasks.list = save.tasks.list.filter(t => t && TASKS.some(T => T[0] === t.id));
    if (!hadTut && save.stats.jumps > 0) save.tut.jump = 1;   // old players already know how to jump
    for (const c of CATS) {
      const id = save.look[c];
      if (id && !(findItem(c, id) && save.owned.includes(id))) save.look[c] = FREE[c] || null;
    }
    migrate();
    sellMagnets();
  }

  // one-time changes between versions (each runs once per player)
  function migrate() {
    const m = save.migrations || (save.migrations = {});
    if (!m.stars5) {   // 1.0.45: stars are found on the level now (5 per level)
      m.stars5 = 1;
      save.done = save.stars.map((v, i) => v > 0 || save.done[i] ? 1 : 0);
      save.stars = save.stars.map(v => Math.min(5, Math.round(v * 5 / 3)));
    }
    // 1.0.9: the coin-shop "Gold" colour was removed — give the 700 coins back
    if (!m.goldRefund) {
      m.goldRefund = 1;
      if (save.owned.includes('gold')) {
        save.owned = save.owned.filter(x => x !== 'gold');
        save.wallet += 700;
        if (save.look.color === 'gold') save.look.color = 'classic';
        setTimeout(() => toast(S.goldRefund), 1500);
      }
    }
    // 1.0.30: player level — experience is counted from what was already played (one message, rewards included)
    if (!m.xp) { m.xp = 1; save.xp = Math.max(save.xp, save.stats.dist / 100 + save.stats.coins * 0.5 + save.stats.tasks * 50); checkLevel(true); checkTitles(true); }
    // 1.0.37: "time played" now counts all the time the game is open; the old value was time in runs
    if (!m.runTime) { m.runTime = 1; save.stats.runTime = Math.max(save.stats.runTime, save.stats.playTime); }
    // 1.0.33: the Neon city world had the same id as the Neon colour; whoever has either one gets the world
    if (!m.neoncity) {
      m.neoncity = 1;
      if (save.owned.includes('neon') && !save.owned.includes('neoncity')) save.owned.push('neoncity');
      if (save.look.theme === 'neon') save.look.theme = 'neoncity';
    }
    // 1.0.29: worlds now open with stars — whoever already reached a world keeps it open
    if (!m.wOpen) { m.wOpen = 1; if (save.unlocked >= 5) save.wOpen[1] = 1; if (save.unlocked >= 10) save.wOpen[2] = 1; }
    // 1.0.28: 100 achievements — whatever the player has already earned is granted at once, with one toast
    if (!m.ach100) { m.ach100 = 1; checkAch(true); }
    // 1.0.21: whoever bought the beach also keeps its old look, now the "Forest" world
    if (!m.forestGift) {
      m.forestGift = 1;
      if (save.owned.includes('ocean') && !save.owned.includes('forest')) { save.owned.push('forest'); setTimeout(() => toast(S.forestGift), 2500); }
    }
    // 1.0.9: gem skins could only be bought for yan so far — remember them as paid
    if (!m.paidSkins) {
      m.paidSkins = 1;
      for (const id of ['skin_gold', 'skin_ruby', 'skin_emerald', 'skin_diamond', 'skin_obsidian'])
        if (save.owned.includes(id) && !save.paid.includes(id)) save.paid.push(id);
    }
  }

  // ---------- Reset progress (3 confirmations) ----------
  const IAP_ITEMS = () => (Array.isArray(save.paid) ? save.paid : []);
  function showReset(stepN) {
    const texts = [S.reset1, S.reset2, S.reset3];
    showPanel(`<h2>${S.resetTitle} (${stepN}/3)</h2><p>${texts[stepN - 1]}</p>
      <button class="btn danger" data-act="reset" data-n="${stepN}">${stepN < 3 ? S.resetNext : S.resetDo}</button>
      <button class="btn main" data-act="profile">${S.resetCancel}</button>`, 'reset');
  }
  function doReset() {
    const keepOwned = save.owned.filter(id => IAP_ITEMS().includes(id));   // bought for yan stays
    const keep = { noAds: save.noAds, sound: save.sound, paid: IAP_ITEMS().slice() };
    const fresh = JSON.parse(JSON.stringify(DEFAULT_SAVE));
    for (const k of Object.keys(save)) delete save[k];
    Object.assign(save, fresh, keep);
    save.owned = [...new Set([...save.owned, ...keepOwned])];
    save.migrations = { goldRefund: 1, forestGift: 1, ach100: 1, wOpen: 1, xp: 1, neoncity: 1, runTime: 1, stars5: 1 };
    persist();
    toast(S.resetDone);
    goMenu();
  }

  async function boot() {
    resize();
    requestAnimationFrame(frame);
    await SDK.init();
    const lang = String(SDK.lang() || 'ru').slice(0, 2).toLowerCase();
    S = ['ru', 'be', 'kk', 'uk', 'uz'].includes(lang) ? TEXT.ru : TEXT.en;
    document.documentElement.lang = S === TEXT.ru ? 'ru' : 'en';
    document.title = S.title;
    { const ru = S === TEXT.ru; document.querySelector('#bJump small').textContent = ru ? 'прыжок' : 'jump'; document.querySelector('#bSlide small').textContent = ru ? 'подкат' : 'slide'; }
    try { applyLoaded(await SDK.load()); } catch (e) { }
    await SDK.initPayments();
    dayTick();   // 1.0.49: daily ranking rewards / the coins-today counter
    updateSoundBtn();
    document.getElementById('loading').remove();
    goMenu();
    if (dailyAvail()) showDaily();
    SDK.canShortcut().then(v => { canShortcut = v; if (screen === 'menu') showMenu(); });
    SDK.ready();   // tell the platform the game is loaded and playable
  }

  // Local test hook: only on localhost, never on the Yandex domain.
  if (DEV_HOST) {
    window.__game = { get state() { return state; }, get dist() { return dist; }, get level() { return LV; },
      get coins() { return coinsGot; }, get slow() { return slow; }, get time() { return time; }, get tutWait() { return tutWait; },
      save, player, startLevel, tick: step, render: () => draw(), jump: jumpPress, setSlide: v => { slideHeld = v; },
      goMenu, showShop, showPrerun, lootPrice, lootPool, openChest, evId, drawThumb, SHOP, CATS, S: () => S, setHeld: v => { jumpHeld = v; },
      // dev: draws every world's hazard + puddle on top of the current frame
      galleryBeams: (list) => { ctx.setTransform(DPR * scale, 0, 0, DPR * scale, 0, 0); list.forEach((k, i) => drawBeam(k, 14 + i * 34, 26, groundY - 32)); },
      forceCrit: () => { crit = null; critNext = 0; }, critInfo: () => crit && { x: crit.x, t0: crit.t0, k: crit.k, critNext }, CRITTERS,
      galleryBoxes: (g, list, gy) => withCtx(g, gy, () => list.forEach((k, i) => { const tm = time; drawBox(k, 20 + (i % 5) * 150, 56, i % 2 ? 56 : 34); drawCoinAt(g, 120 + (i % 5) * 150, gy - 30, [1, 5, 25][i % 3], tm * 4 + i, i); })),
      galleryHazards: (list) => { ctx.setTransform(DPR * scale, 0, 0, DPR * scale, 0, 0); (list || ['wild', 'jungle', 'desert', 'winter', 'city', 'space', 'volcano', 'candy', 'ocean']).forEach((k, i) => { ctx.fillStyle = '#9ccc65'; ctx.fillRect(20 + i * 58, groundY, 50, 60); drawHazard(k, 32 + i * 58, 26, 30); drawPuddle(k, 20 + i * 58, 50); }); }, overGap, platTop, baseSpeed, ENDLESS, LEVELS, AIR, PEAK, drawStick, drawPet, drawBird, BIRDS, drawCoinAt, setWorld: k => { save.look.theme = k; },
      testLoad: d => { for (const k of Object.keys(save)) delete save[k]; Object.assign(save, JSON.parse(JSON.stringify(DEFAULT_SAVE))); applyLoaded(d); return save; } };
  }

  boot();
})();
