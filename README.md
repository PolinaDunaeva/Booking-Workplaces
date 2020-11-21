# booking

## Frontend setup
1. Open `react-front` folder   
2. `npm i` (first time or if a library added)
3. `npm start`

## Backend setup
1. Install [IntelliJ IDEA](https://www.jetbrains.com/ru-ru/idea/) \
   *Optionally* Install [Lombok](https://plugins.jetbrains.com/plugin/6317-lombok) plugin
2. Download and Install JDK 8 or later 
3. Create JAVA_HOME environment variable in PATH to the JDK destination
4. Add JDK to the path structure in IDEA
5. Right click on `java-backend/hot-desk/pom.xml` and add it to Maven inside IDEA
6. Install [PostgreSQL](https://www.postgresql.org/download/) \
   While intalling set password to `qwerty123` for ease of use \
   After installing PostgreSQL you will be promted to install Stack Builder. You can just ignore it
7. Open `pgAdmin4` and add `hotdeskdb` database
8. Run project inside IDEA

## API
You can up to date version [here](https://app.swaggerhub.com/apis-docs/ilsl/BookDesk)

## Testing data
### Users
| Email | Password | First name | Last name | Roles |
|-|-|-|-|-|
| zvasilenko@exadel.com | vasilenko | Zhanna | Vasilenko | admin |
| bboss@exadel.com | boss | Big | Boss | admin |
| dnikulin@exadel.com | nikulin | Dmitry | Nikulin | hr  |
| abasalaev@exadel.com | basalaev | Anatoly | Basalaev | hr  |
| apavlova@exadel.com | pavlova | Anna | Pavlova | hr  |
| adubik@exadel.com | dubik | Anton | Dubik | —  |
| snovozhylov.@exadel.com | novozhylov | Sergey | Novozhylov | —  |
| yshagun@exadel.com | shagun | Yuri | Shagun | —  |
| ktsirul@exadel.com | tsirul | Kate| Tsirul | —  |
| dbaranchik@exadel.com | baranchik | Denis | Baranchik | —  |
| pdunaeva@exadel.com | dunaeva | Polina | Dunaeva | —  |
| isolovyev@exadel.com | solovyev | Ilya | Solovyev | —  |
| sgoda@exadel.com | goda | Sotrudnik | Goda | —  |
| mpavlov@exadel.com | pavlov | Max | Pavlov | —  |

### Offices
| Office | City | Country |
|-|-|-|
| Kuprievicha | Minsk | Belarus |
| PVT | Minsk | Belarus |
| Pritytskogo | Minsk | Belarus |
| Pushkina | Gomel | Belarus |

