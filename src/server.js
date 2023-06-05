const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs')
const cors = require('cors')
const app = express();
const _ = require('lodash');
const path = require('path')

app.use(bodyParser.json());
app.use(cors());


// Код для backend
const getInstruments = async () => {
    try {
        const instrumentFilePath = 'src/instrument/instruments.json'
        const instruments = await fs.promises.readFile(instrumentFilePath, 'utf-8');

        return JSON.parse(instruments);
    } catch (err) {
        console.error(err);
        return [];
    }
};

// Добавить инструмент в файл
const addInstrument = async (instrument) => {
    const instruments = await getInstruments();
    instruments.push(instrument);
    const instrumentFilePath = 'src/instrument/instruments.json'
    await fs.writeFile(instrumentFilePath, JSON.stringify(instruments), function (err) {
        if (err) throw err;
    });
};
// ---

// Код для backend

// app user
app.post('/api/user', async (req, res) => {
    try {
        // Создаем нового пользователя с помощью Axios и получаем его данные
        let user = req.body;

        // Получаем текущий список пользователей
        const usersFilePath = 'src/usersInfo/users.json';
        const usersData = await fs.promises.readFile(usersFilePath, 'utf-8');
        const users = JSON.parse(usersData).users;

        // Добавляем нового пользователя в массив
        users.push(user);

        // Обновляем файл users.json
        const updatedUserData = {users};
        await fs.writeFile(usersFilePath, JSON.stringify(updatedUserData), function (err) {
            if (err) throw err;
        });

        // Возвращаем успех
        res.status(200).json({message: 'User added successfully'});
    } catch (err) {
        // Обрабатываем ошибку
        console.log(err);
        res.status(500).json({error: 'Could not add user'});
    }
});
app.post('/api/user/processing', async (req, res) => {
    try {
        // Создаем нового пользователя с помощью Axios и получаем его данные
        let user = req.body;
        // Получаем текущий список пользователей
        const usersFilePath = 'src/usersInfo/userProcessing.json';
        const usersData = await fs.promises.readFile(usersFilePath, 'utf8');
        const users = JSON.parse(usersData);
        users.users[0] = user

        // Обновляем файл users.json

        await fs.writeFile(usersFilePath, JSON.stringify(users), function (err) {
            if (err) throw err;
        });

        // Возвращаем успех
        res.status(200).json({message: 'User added successfully'});
    } catch (err) {
        // Обрабатываем ошибку
        console.log(err);
        res.status(500).json({error: 'Could not add user'});
    }
});
// user id basket
app.post('/api/user/id', async (req, res) => {
    try {
        // Создаем нового пользователя с помощью Axios и получаем его данные
        let user = req.body;

        // Получаем текущий список пользователей
        const userIdFilePath = 'src/usersInfo/userId.json';
        const usersFilePath = 'src/usersInfo/users.json';

        const usersData = await fs.promises.readFile(usersFilePath, 'utf-8');

        let userDataJsonParse = JSON.parse(usersData)
        let userIdFilter = _.filter(userDataJsonParse.users, {newId: user.userId})


        const updateUserIdFilter = JSON.stringify(userIdFilter)

        await fs.writeFile(userIdFilePath, updateUserIdFilter, function (err) {
            if (err) throw err;
        });

        // Возвращаем успех
        res.status(200).json({message: 'User id change successfully'});
    } catch (err) {
        // Обрабатываем ошибку
        console.log(err);
        res.status(500).json({error: 'Could not add user'});
    }
});
// app user instrument
app.post('/api/instrument/type', async (req, res) => {
    try {
        //Получаем type
        let instrumentTypeMain = req.body;


        // Получаем файл instrumentOptions.json + меняем значение

        const typeFilePath = './src/instrumentAdd/instrumentOptions.json';
        const dataTypeRead = await fs.promises.readFile(typeFilePath, 'utf8');
        const instrumentType = JSON.parse(dataTypeRead);
        instrumentType[0] = instrumentTypeMain

        // Обновляем файл instrumentOptions.json

        await fs.writeFile(typeFilePath, JSON.stringify(instrumentType), function (err) {
            if (err) throw err;
        });


        res.status(200).json({message: 'Обработка: Type'});
    } catch (err) {
        // Обрабатываем ошибку
        console.log(err);
        res.status(500).json({error: 'Could not add user'});
    }
});
// Add
app.post('/api/instrument/add', async (req, res) => {
    try {
        await addInstrument(req.body);
        res.send('Instrument added successfully!');
    } catch (err) {
        console.error(err);
    }
});
// Filter
app.post('/api/instrument/filter/name', async (req, res) => {
    try {
        let nameFilter = req.body

        const cordlessPath = 'src/instrument/cordlessinstruments.json';
        const gasolinePath = 'src/instrument/gasolineinstruments.json';
        const networkPath = 'src/instrument/networkinstruments.json';
        const pneumaticPath = 'src/instrument/pneumotoolinstruments.json';

        // load the data from files

        const cordless = JSON.parse(await fs.promises.readFile(cordlessPath, 'utf-8'))
        const gasoline = JSON.parse(await fs.promises.readFile(gasolinePath, 'utf-8'))
        const network = JSON.parse(await fs.promises.readFile(networkPath, 'utf-8'))
        const pneumo = JSON.parse(await fs.promises.readFile(pneumaticPath, 'utf-8'))

        // lodash filter for each type of instrument
        let cordlessFiltered = _.filter(cordless, {name: nameFilter.string});
        const gasolineFiltered = _.filter(gasoline, {name: nameFilter.string});
        const networkFiltered = _.filter(network, {name: nameFilter.string});
        const pneumaticFiltered = _.filter(pneumo, {name: nameFilter.string});
        //
        let arrayInFile = {}

        if (cordlessFiltered.length === 0) {
        } else {
            arrayInFile = cordlessFiltered[0]
        }

        if (gasolineFiltered.length === 0) {
        } else {
            arrayInFile = gasolineFiltered[0]
        }

        if (networkFiltered.length === 0) {
        } else {
            arrayInFile = networkFiltered[0]
        }

        if (pneumaticFiltered.length === 0) {
        } else {
            arrayInFile = pneumaticFiltered[0]
        }

        // // write out the filtered data to a new file
        await fs.writeFileSync('src/instrument/instrumentFilter.json', JSON.stringify(arrayInFile));

        res.send('Instrument filter successfully!');
    } catch (err) {
        console.error(err);
    }
});
app.post('/api/instrument/instrument-find-by-id', async (req, res) => {
    try {
        let instrument = req.body
        const dataFilePath = 'src/instrument/instrumentFindById.json'

        await fs.writeFileSync(dataFilePath, JSON.stringify(instrument));

        res.send('Instrument add in file successfully!');
    } catch (err) {
        console.error(err);
    }
});
//


// app user
app.get('/users', async (req, res) => {
    try {
        const data = await fs.promises.readFile('src/usersInfo/users.json', 'utf8');
        const users = JSON.parse(data).users;
        return res.send(users);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Error reading users data');
    }
});
app.get('/api/user/processing/accepted', async (req, res) => {
    try {
        const data = await fs.promises.readFile('src/usersInfo/userProcessing.json', 'utf8');
        const usersFilePath = 'src/usersInfo/userProcessing.json'
        const users = JSON.parse(data);
        const user = users.users[0];

        user.processing = "Принят в обработку"
        users.users[0] = user
        // Обновляем файл userProcessing.json

        await fs.writeFile(usersFilePath, JSON.stringify(users), function (err) {
            if (err) throw err;
        });

        return res.send(user);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Error reading users data');
    }
});
app.get('/api/user/processing/refusal', async (req, res) => {
    try {
        const data = await fs.promises.readFile('src/usersInfo/userProcessing.json', 'utf8');
        const usersFilePath = 'src/usersInfo/userProcessing.json'
        const users = JSON.parse(data);
        const user = users.users[0];
        user.processing = "Отклонен в обработке"
        users.users[0] = user

        // Обновляем файл userProcessing.json

        await fs.writeFile(usersFilePath, JSON.stringify(users), function (err) {
            if (err) throw err;
        });


        return res.send(user);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Error reading users data');
    }
});
app.get('/api/user/processing/change', async (req, res) => {
    try {
        const dataUsers = await fs.promises.readFile('src/usersInfo/users.json', 'utf8');
        const dataUserProcessing = await fs.promises.readFile('src/usersInfo/userProcessing.json', 'utf8');
        const usersFilePathDataUser = 'src/usersInfo/users.json'

        let users = JSON.parse(dataUsers);
        let user = JSON.parse(dataUserProcessing)

        // Поиск нужного пользователя

        const userIndex = _.findIndex(users.users, {newId: user.users[0].newId});


        if (userIndex !== -1) {
            // Обновление данных пользователя в объекте users
            _.set(users.users, [userIndex], user.users[0]);
        }

        // Обновляем файл userProcessing.json


        await fs.writeFile(usersFilePathDataUser, JSON.stringify(users), function (err) {
            if (err) throw err;
        });

        return res.send(users);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Error reading users data');
    }
});
// app user id basket
app.get('/user/id', async (req, res) => {
    try {
        const data = await fs.promises.readFile('src/usersInfo/userId.json', 'utf8');
        const user = JSON.parse(data)
        return res.send(user);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Error reading users data');
    }
});
// app instrument
app.get('/api/instrument/type', async (req, res) => {
    try {
        // Получаем Type из файла instrumentOptions.json
        const dataType = await fs.promises.readFile('./src/instrumentAdd/instrumentOptions.json', 'utf8');
        const dataTypeValue = JSON.parse(dataType);
        let objectData = {
            type: null
        }
        let arrayType = []

        if (dataTypeValue[0].type === 'Аккумуляторный инструмент') {
            arrayType = ['Аккумуляторная дрель-шуруповерт', 'Аккумуляторная шлифмашина', 'Аккумуляторный гайковерт',
                'Аккумуляторный тример', 'Аккумуляторный пистолет',
                'Аккумуляторная цепная пила', 'Аккумуляторная сабельная пила', 'Аккумуляторная монтажная пила',
                'Аккумуляторная торцовая пила', 'Аккумуляторная ленточная пила', 'Аккумуляторная дисковая пила',
                'Аккумуляторный строительный миксер', 'Аккумуляторная трещетка', 'Аккумуляторный гравер',
                'Аккумуляторный заклепочник', 'Аккумуляторный лобзик', 'Аккумуляторная отвертка',
                'Аккумуляторный реноватор', 'Аккумуляторные ножницы', 'Аккумуляторный перфоратор',
                'Аккумуляторный рубанок', 'Аккумуляторный рубанок', 'Аккумуляторный степлер',
                'Аккумуляторный фрезер', 'Аккумуляторный штроборез', 'Аккумуляторная болгарка',
                'Аккумуляторный бороздодел', 'Аккумуляторный сварочный инвертор', 'Аккумуляторный газовый паяльник',]
            objectData.type = arrayType
        } else if (dataTypeValue[0].type === 'Бензоинструмент') {
            arrayType = [
                'Бензиновая виброплита', 'Бензиновая газонокосилка', 'Бензиновая мойка высокого давления',
                'Бензиновый отбойный молоток', 'Бензотриммер', 'Бензопила',
                'Бензогенератор', 'Бензиновый мотоблок'
            ]
            objectData.type = arrayType
        } else if (dataTypeValue[0].type === 'Сетевой инструмент') {
            arrayType = [
                'Высоторез',
                'Измельчитель',
                'Клеевой пистолет',
                'Кусторез',
                'Лобзик электрический',
                'Мультитул',
                'Отбойный молоток электрический',
                'Перфоратор',
                'Пуско-зарядное устройство',
                'Пылесос',
                'Рейсмус',
                'Рубанок',
                'Станок',
                'Дрель',
                'Шлифмашина электрическая',
                'Эксцентрик',
                'Электрическая болгарка',
                'Электрическая цепная пила',
                'Электрическая дисковая пила',
                'Электрическая газонокосилка',
                'Электрическая сабельная пила',
                'Электрическая торцовая пила',
                'Электрическая циркулярная пила',
                'Электрический гайковерт',
                'Электрокультиватор',
                'Электроплиткорез',
                'Электротриммер'
            ]


            objectData.type = arrayType
        } else if (dataTypeValue[0].type === 'Пневмоинструмент') {
            arrayType = [
                "Арматура торцовая пневматическая",
                "Компрессор",
                "Гвоздезабивной пистолет пневматический",
                "Дрель пневматическая",
                "Инструмент для материалорезки пневматический",
                "Краскопульт пневматический",
                "Микродрель пневматическая",
                "Молоток пневматический",
                "Набор для смазки пневматических инструментов",
                "Пистолет для нанесения клея пневматический",
                "Пневматическая бормашина",
                "Пневматическая гайковерт",
                "Пневматическая дельташлифмашина",
                "Пневматическая инверторная сварка",
                "Пневматическая кромкооблицовочная машина",
                "Пневматическая ленточная шлифмашина",
                "Пневматическая отбойная молотковая машина",
                "Пневматическая пила",
                "Пневматическая прецизионная шлифмашина",
                "Пневматическая разгрузочная машина",
                "Пневматическая ручная фрезерная машина",
                "Пневматическая ручная цепная пила",
                "Пневматическая ручная шлифмашина",
                "Пневматическая ручная электродрель",
                "Пневматическая ручная электрошлифмашина",
                "Пневматическая ручная щетка",
                "Пневматическая ручная щипцовая машина",
                "Пневматическая сверлильная машина",
                "Пневматическая термообрабатывающая машина",
                "Пневматический гравер",
                "Пневматический гриндер",
                "Пневматический колесный дисковый резак",
                "Пневматический молоток",
                "Пневматический молоток-дрель",
                "Пневматический полировальный аппарат",
                "Пневматический пресс",
                "Пневматический режущий и растворяющий инструмент",
                "Пневматический ручной магнитный сверлильный станок",
                "Пневматический штамповочный пресс",
                "Пневмоаппаратура",
                "Пневмовинты (клепки и шпильки)",
                "Пневмогайки",
                "Пневмостеплер",
                "Пневмотерка"
            ]
            objectData.type = arrayType
        }


        return res.send(objectData);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Error reading Type data');
    }
});
app.get('/api/instruments/get/instrument/all', async (req, res) => {
    try {
        let data = ''
        let instrumentAll = ''
        data = await fs.promises.readFile('./src/instrument/instruments.json', 'utf8')
        instrumentAll = JSON.parse(data)
        res.send(instrumentAll);
    } catch (err) {
        console.error(err);
        res.status(500).send('Ошибка при выполнении операции.');
    }
});
app.get('/api/instruments/get/cordless', async (req, res) => {
    try {
        let data = ''
        let cordless = ''
        data = await fs.promises.readFile('./src/instrument/cordlessinstruments.json', 'utf8')
        cordless = JSON.parse(data)
        res.send(cordless);
    } catch (err) {
        console.error(err);
        res.status(500).send('Ошибка при выполнении операции.');
    }
});
app.get('/api/instruments/get/gasoline', async (req, res) => {
    try {
        let data = ''
        let gasoline = ''
        data = await fs.promises.readFile('./src/instrument/gasolineinstruments.json', 'utf8')
        gasoline = JSON.parse(data)
        res.send(gasoline);
    } catch (err) {
        console.error(err);
    }
});
app.get('/api/instruments/get/network', async (req, res) => {
    try {
        let data = ''
        let network = ''
        data = await fs.promises.readFile('./src/instrument/networkinstruments.json', 'utf8');
        network = JSON.parse(data);

        res.send(network);
    } catch (err) {
        console.error(err);
    }
});
app.get('/api/instruments/get/pneumo', async (req, res) => {
    try {
        let data = ''
        let pneumo = ''
        data = await fs.promises.readFile('./src/instrument/pneumotoolinstruments.json', 'utf8');
        pneumo = JSON.parse(data);

        res.send(pneumo);
    } catch (err) {
        console.error(err);
    }
});
app.get('/api/instruments/get/instrument-find-by-id', async (req, res) => {
    try {
        let instrument = ''
        const data = await fs.promises.readFile('./src/instrument/instrumentFindById.json', 'utf8');
        instrument = JSON.parse(data);
        res.send(instrument);
    } catch (err) {
        console.error(err);
        res.status(500).send({error: 'Internal Server Error'});
    }
});
// Filter get
app.get('/api/instrument/get/filter/name', async (req, res) => {
    try {
        let instrument = ''
        const data = await fs.promises.readFile('src/instrument/instrumentFilter.json', 'utf8');
        instrument = JSON.parse(data);
        res.send(instrument);
    } catch (err) {
        console.error(err);
    }
});
// Change file
app.get('/api/instrument/change', async (req, res) => {
    try {
        const readInstrumentsFromFile = async () => {
            try {
                const data = await fs.promises.readFile('./src/instrument/instruments.json', 'utf-8');
                const instruments = JSON.parse(data);
                return instruments;
            } catch (error) {
                throw error;
            }
        };

        const categorizeInstruments = async (instruments) => {
            const cordlessInstruments = _.filter(instruments, {type: 'Аккумуляторный инструмент'});
            const gasolineInstruments = _.filter(instruments, {type: 'Бензоинструмент'});
            const networkInstruments = _.filter(instruments, {type: 'Сетевой инструмент'});
            const pneumotoolInstruments = _.filter(instruments, {type: 'Пневмоинструмент'});

            const categorizedInstruments = {
                cordlessInstruments,
                gasolineInstruments,
                networkInstruments,
                pneumotoolInstruments,
            };

            return categorizedInstruments;
        };

        const writeInstrumentsToFile = async (instruments, category) => {
            const categoryFileName = `${category.toLowerCase()}.json`;
            const categoryFilePath = path.join('./src/instrument/', categoryFileName);

            try {
                const fileDescriptor = await fs.promises.open(categoryFilePath, 'w');
                await fileDescriptor.write(JSON.stringify(instruments));
                await fileDescriptor.close();
            } catch (error) {
                throw error;
            }
        };

        const categorizeAndWriteInstruments = async () => {
            try {
                const instruments = await readInstrumentsFromFile();
                const categorizedInstruments = await categorizeInstruments(instruments);

                const promises = Object.entries(categorizedInstruments).map(([category, instruments]) => {
                    return writeInstrumentsToFile(instruments, category);
                });

                await Promise.all(promises);
                return true
            } catch (error) {
                console.error(error);
            }
        };
        await categorizeAndWriteInstruments()

        res.send('Instrument change successfully!');
    } catch (err) {
        console.error(err);
    }
});

app.listen(3000, () => {
    console.log('Сервер запущен на http://localhost:3000)');
});