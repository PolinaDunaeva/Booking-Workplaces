package com.hotdesk.hotdesk;

import com.hotdesk.hotdesk.model.*;
import com.hotdesk.hotdesk.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Stream;

@Component
public class TestData implements ApplicationRunner {

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    CountryRepository countryRepository;

    @Autowired
    CityRepository cityRepository;

    @Autowired
    OfficeRepository officeRepository;

    @Autowired
    BlueprintRepository blueprintRepository;

    @Autowired
    DeskRepository deskRepository;

    @Autowired
    DeskBookingRepository deskBookingRepository;

    @Autowired
    ItemRepository itemRepository;

    @Override
    public void run(ApplicationArguments args) {
        addUsers();
        addOffices();
        addDeskBookings();
    }

    private void addDeskBookings() {
        if (deskBookingRepository.findAll().isEmpty()) {
            @SuppressWarnings("OptionalGetWithoutIsPresent") //If there is no test user we want this to fail

            User admin = userRepository.findByEmail("zvasilenko@exadel.com").get();
            User user_1 = userRepository.findByEmail("adubik@exadel.com").get();
            User user_2 = userRepository.findByEmail("snovozhylov.@exadel.com").get();
            User user_3 = userRepository.findByEmail("yshagun@exadel.com").get();
            User user_4 = userRepository.findByEmail("ktsirul@exadel.com").get();
            User user_5 = userRepository.findByEmail("dbaranchik@exadel.com").get();
            User user_6 = userRepository.findByEmail("pdunaeva@exadel.com").get();
            User user_7 = userRepository.findByEmail("isolovyev@exadel.com").get();
            User user_8 = userRepository.findByEmail("sgoda@exadel.com").get();
	        User user_9 = userRepository.findByEmail("mpavlov@exadel.com").get();

            AtomicInteger iteration = new AtomicInteger();

            deskRepository.findAll()
                    .forEach(desk -> {
                        DeskBooking deskBooking = new DeskBooking(
                                desk,
                                admin,
                                LocalDate.now().plusDays(30 + iteration.get()),
                                LocalTime.of(9, 00),
                                LocalTime.of(13, 30)
                        );

                        iteration.getAndIncrement();

                        deskBookingRepository.save(deskBooking);
                    });

            deskRepository.findAll()
                    .forEach(desk -> {
                        DeskBooking deskBooking = new DeskBooking(
                                desk,
                                admin,
                                LocalDate.now().minusDays(5 + iteration.get()),
                                LocalTime.of(9, 00),
                                LocalTime.of(13, 05)
                        );

                        iteration.getAndIncrement();

                        deskBookingRepository.save(deskBooking);
                    });

            deskRepository.findAll()
                    .forEach(desk -> {
                        DeskBooking deskBooking = new DeskBooking(
                                desk,
                                admin,
                                LocalDate.now().minusDays(60 + iteration.get()),
                                LocalTime.of(8, 00),
                                LocalTime.of(12, 45)
                        );

                        iteration.getAndIncrement();

                        deskBookingRepository.save(deskBooking);
                    });

            deskRepository.findAll()
                    .forEach(desk -> {
                        DeskBooking deskBooking = new DeskBooking(
                                desk,
                                user_1,
                                LocalDate.now().plusDays(20 + iteration.get()),
                                LocalTime.of(15, 00),
                                LocalTime.of(23, 00)
                        );

                        iteration.getAndIncrement();

                        deskBookingRepository.save(deskBooking);
                    });

            deskRepository.findAll()
                    .forEach(desk -> {
                        DeskBooking deskBooking = new DeskBooking(
                                desk,
                                user_2,
                                LocalDate.now().plusDays(60 + iteration.get()),
                                LocalTime.of(12, 35),
                                LocalTime.of(17, 05)
                        );

                        iteration.getAndIncrement();

                        deskBookingRepository.save(deskBooking);
                    });

            deskRepository.findAll()
                    .forEach(desk -> {
                        DeskBooking deskBooking = new DeskBooking(
                                desk,
                                user_3,
                                LocalDate.now().minusDays(40 + iteration.get()),
                                LocalTime.of(13, 00),
                                LocalTime.of(15, 30)
                        );

                        iteration.getAndIncrement();

                        deskBookingRepository.save(deskBooking);
                    });

            deskRepository.findAll()
                    .forEach(desk -> {
                        DeskBooking deskBooking = new DeskBooking(
                                desk,
                                user_4,
                                LocalDate.now().plusDays(40 + iteration.get()),
                                LocalTime.of(18, 30),
                                LocalTime.of(20, 00)
                        );

                        iteration.getAndIncrement();

                        deskBookingRepository.save(deskBooking);
                    });

            deskRepository.findAll()
                    .forEach(desk -> {
                        DeskBooking deskBooking = new DeskBooking(
                                desk,
                                user_5,
                                LocalDate.now().minusDays(10 + iteration.get()),
                                LocalTime.of(12, 00),
                                LocalTime.of(16, 00)
                        );

                        iteration.getAndIncrement();

                        deskBookingRepository.save(deskBooking);
                    });

            deskRepository.findAll()
                    .forEach(desk -> {
                        DeskBooking deskBooking = new DeskBooking(
                                desk,
                                user_6,
                                LocalDate.now().plusDays(5 + iteration.get()),
                                LocalTime.of(11, 00),
                                LocalTime.of(18, 30)
                        );

                        iteration.getAndIncrement();

                        deskBookingRepository.save(deskBooking);
                    });

            deskRepository.findAll()
                    .forEach(desk -> {
                        DeskBooking deskBooking = new DeskBooking(
                                desk,
                                user_7,
                                LocalDate.now().minusDays(20 + iteration.get()),
                                LocalTime.of(10, 00),
                                LocalTime.of(14, 30)
                        );

                        iteration.getAndIncrement();

                        deskBookingRepository.save(deskBooking);
                    });

            deskRepository.findAll()
                    .forEach(desk -> {
                        DeskBooking deskBooking = new DeskBooking(
                                desk,
                                user_8,
                                LocalDate.now().plusDays(14 + iteration.get()),
                                LocalTime.of(21, 00),
                                LocalTime.of(23, 30)
                        );

                        iteration.getAndIncrement();

                        deskBookingRepository.save(deskBooking);
                    });
        }
    }

    private void addOffices() {
        if (!countryRepository.findByName("Belarus").isPresent()) {
			
            Country belarus = new Country("Belarus");
            countryRepository.save(belarus);

            City minsk = new City("Minsk", belarus);
            cityRepository.save(minsk);
			
			City gomel = new City("Gomel", belarus);
            cityRepository.save(gomel);

            Office pvt = new Office("PVT", minsk);
            officeRepository.save(pvt);
            Office kuprievicha = new Office("Kuprievicha", minsk);
            officeRepository.save(kuprievicha);
			Office pritytskogo = new Office("Pritytskogo", minsk);
            officeRepository.save(pritytskogo);
			Office pushkina = new Office("Pushkina", gomel);
            officeRepository.save(pushkina);

            Blueprint pvtFloor1 = new Blueprint(1, 10, 10, pvt);
            blueprintRepository.save(pvtFloor1);
            Blueprint pvtFloor2 = new Blueprint(2, 10, 10, pvt);
            blueprintRepository.save(pvtFloor2);

            Stream.of(
                    new Desk(1, 1, 0, pvtFloor1),
                    new Desk(2, 1, 0, pvtFloor1),
                    new Desk(3, 1, 0, pvtFloor1),
                    new Desk(5, 1, 0, pvtFloor1),
                    new Desk(8, 1, 1, pvtFloor1),
                    new Desk(1, 3, 2, pvtFloor1),
                    new Desk(2, 3, 2, pvtFloor1),
                    new Desk(3, 3, 2, pvtFloor1),
                    new Desk(1, 5, 3, pvtFloor1),
                    new Desk(1, 6, 3, pvtFloor1),
                    new Desk(3, 5, 3, pvtFloor1),
                    new Desk(1, 8, 2, pvtFloor1),
                    new Desk(2, 8, 2, pvtFloor1),
                    new Desk(4, 8, 2, pvtFloor1),
                    new Desk(2, 1, 0, pvtFloor2),
                    new Desk(1, 2, 3, pvtFloor2),
                    new Desk(2, 3, 2, pvtFloor2),
                    new Desk(1, 5, 3, pvtFloor2),
                    new Desk(3, 5, 0, pvtFloor2),
                    new Desk(1, 7, 3, pvtFloor2),
                    new Desk(2, 8, 2, pvtFloor2),
                    new Desk(3, 8, 2, pvtFloor2),
                    new Desk(4, 8, 2, pvtFloor2),
                    new Desk(8, 5, 1, pvtFloor2),
                    new Desk(7, 8, 2, pvtFloor2)
            )
                    .forEach(desk -> deskRepository.save(desk));

            Stream.of(
                    new Item(0, 0, "Wall" , pvtFloor1),
                    new Item(1, 0, "Wall" , pvtFloor1),
                    new Item(2, 0, "Wall" , pvtFloor1),
                    new Item(3, 0, "Window" , pvtFloor1),
                    new Item(4, 0, "Wall" , pvtFloor1),
                    new Item(5, 0, "Wall" , pvtFloor1),
                    new Item(6, 0, "Window" , pvtFloor1),
                    new Item(7, 0, "Wall" , pvtFloor1),
                    new Item(8, 0, "Wall" , pvtFloor1),
                    new Item(9, 0, "Wall" , pvtFloor1),
                    new Item(0, 1, "Wall" , pvtFloor1),
                    new Item(9, 1, "Wall" , pvtFloor1),
                    new Item(0, 2, "Window" , pvtFloor1),
		    new Item(8, 2, "Admin" , pvtFloor1),
                    new Item(9, 2, "Window" , pvtFloor1),
                    new Item(0, 3, "Wall" , pvtFloor1),
                    new Item(4, 3, "Stairs" , pvtFloor1),
                    new Item(5, 3, "Wall" , pvtFloor1),
                    new Item(6, 3, "Door" , pvtFloor1),
                    new Item(7, 3, "Wall" , pvtFloor1),
                    new Item(8, 3, "Wall" , pvtFloor1),
                    new Item(9, 3, "Wall" , pvtFloor1),
                    new Item(0, 4, "Wall" , pvtFloor1),
                    new Item(1, 4, "Wall" , pvtFloor1),
                    new Item(2, 4, "Wall" , pvtFloor1),
                    new Item(3, 4, "Wall" , pvtFloor1),
                    new Item(4, 4, "Wall" , pvtFloor1),
                    new Item(5, 4, "Wall" , pvtFloor1),
                    new Item(7, 4, "Door" , pvtFloor1),
                    new Item(9, 4, "Wall" , pvtFloor1),
                    new Item(0, 5, "Window" , pvtFloor1),
                    new Item(5, 5, "Wall" , pvtFloor1),
                    new Item(7, 5, "Wall" , pvtFloor1),
                    new Item(8, 5, "Kitchen" , pvtFloor1),
                    new Item(9, 5, "Window" , pvtFloor1),
                    new Item(0, 6, "Wall" , pvtFloor1),
                    new Item(5, 6, "Door" , pvtFloor1),
                    new Item(7, 6, "Wall" , pvtFloor1),
                    new Item(8, 6, "Wall" , pvtFloor1),
                    new Item(9, 6, "Wall" , pvtFloor1),
                    new Item(0, 7, "Window" , pvtFloor1),
                    new Item(5, 7, "Wall" , pvtFloor1),
                    new Item(7, 7, "Door" , pvtFloor1),
                    new Item(9, 7, "Wall" , pvtFloor1),
                    new Item(0, 8, "Wall" , pvtFloor1),
                    new Item(5, 8, "Wall" , pvtFloor1),
                    new Item(7, 8, "Wall" , pvtFloor1),
                    new Item(8, 8, "WC" , pvtFloor1),
                    new Item(9, 8, "Wall" , pvtFloor1),
                    new Item(0, 9, "Wall" , pvtFloor1),
                    new Item(1, 9, "Wall" , pvtFloor1),
                    new Item(2, 9, "Window" , pvtFloor1),
                    new Item(3, 9, "Wall" , pvtFloor1),
                    new Item(4, 9, "Wall" , pvtFloor1),
                    new Item(5, 9, "Wall" , pvtFloor1),
                    new Item(6, 9, "Door" , pvtFloor1),
                    new Item(7, 9, "Wall" , pvtFloor1),
                    new Item(8, 9, "Window" , pvtFloor1),
                    new Item(9, 9, "Wall" , pvtFloor1),

                    new Item(0, 0, "Wall" , pvtFloor2),
                    new Item(1, 0, "Window" , pvtFloor2),
                    new Item(2, 0, "Wall" , pvtFloor2),
                    new Item(3, 0, "Window" , pvtFloor2),
                    new Item(4, 0, "Wall" , pvtFloor2),
                    new Item(5, 0, "Wall" , pvtFloor2),
                    new Item(6, 0, "Wall" , pvtFloor2),
                    new Item(7, 0, "Window" , pvtFloor2),
                    new Item(8, 0, "Wall" , pvtFloor2),
                    new Item(9, 0, "Wall" , pvtFloor2),
                    new Item(0, 1, "Wall" , pvtFloor2),
                    new Item(5, 1, "Door" , pvtFloor2),
                    new Item(8, 1, "Kitchen" , pvtFloor2),
                    new Item(9, 1, "Wall" , pvtFloor2),
                    new Item(0, 2, "Window" , pvtFloor2),
                    new Item(5, 2, "Wall" , pvtFloor2),
                    new Item(9, 2, "Window" , pvtFloor2),
                    new Item(0, 3, "Wall" , pvtFloor2),
                    new Item(4, 3, "Stairs" , pvtFloor2),
                    new Item(5, 3, "Wall" , pvtFloor2),
                    new Item(8, 3, "Kitchen" , pvtFloor2),
                    new Item(9, 3, "Wall" , pvtFloor2),
                    new Item(0, 4, "Wall" , pvtFloor2),
                    new Item(1, 4, "Wall" , pvtFloor2),
                    new Item(2, 4, "Wall" , pvtFloor2),
                    new Item(3, 4, "Wall" , pvtFloor2),
                    new Item(4, 4, "Wall" , pvtFloor2),
                    new Item(5, 4, "Wall" , pvtFloor2),
                    new Item(6, 4, "Wall" , pvtFloor2),
                    new Item(7, 4, "Door" , pvtFloor2),
                    new Item(8, 4, "Wall" , pvtFloor2),
                    new Item(9, 4, "Wall" , pvtFloor2),
                    new Item(0, 5, "Wall" , pvtFloor2),
                    new Item(4, 5, "Wall" , pvtFloor2),
                    new Item(5, 5, "WC" , pvtFloor2),
                    new Item(6, 5, "Door" , pvtFloor2),
                    new Item(9, 5, "Wall" , pvtFloor2),
                    new Item(0, 6, "Window" , pvtFloor2),
                    new Item(4, 6, "Wall" , pvtFloor2),
                    new Item(5, 6, "Wall" , pvtFloor2),
                    new Item(6, 6, "Wall" , pvtFloor2),
		    new Item(8, 6, "Admin" , pvtFloor2),
                    new Item(9, 6, "Window" , pvtFloor2),
                    new Item(0, 7, "Wall" , pvtFloor2),
                    new Item(6, 7, "Door" , pvtFloor2),
                    new Item(9, 7, "Wall" , pvtFloor2),
                    new Item(0, 8, "Window" , pvtFloor2),
                    new Item(6, 8, "Wall" , pvtFloor2),
		    new Item(8, 8, "Admin" , pvtFloor2),
                    new Item(9, 8, "Window" , pvtFloor2),
                    new Item(0, 9, "Wall" , pvtFloor2),
                    new Item(1, 9, "Wall" , pvtFloor2),
                    new Item(2, 9, "Window" , pvtFloor2),
                    new Item(3, 9, "Wall" , pvtFloor2),
                    new Item(4, 9, "Wall" , pvtFloor2),
                    new Item(5, 9, "Window" , pvtFloor2),
                    new Item(6, 9, "Wall" , pvtFloor2),
                    new Item(7, 9, "Window" , pvtFloor2),
                    new Item(8, 9, "Wall" , pvtFloor2),
                    new Item(9, 9, "Wall" , pvtFloor2)

            )
                    .forEach(item -> itemRepository.save(item));

            Blueprint kuprFloor = new Blueprint(1, 12, 17, kuprievicha);
            blueprintRepository.save(kuprFloor);

            Stream.of(
                    new Desk(8, 3, 0, kuprFloor),
                    new Desk(6, 4, 0, kuprFloor),
                    new Desk(1, 5, 2, kuprFloor),
                    new Desk(2, 5, 2, kuprFloor),
                    new Desk(7, 6, 3, kuprFloor),
                    new Desk(1, 7, 2, kuprFloor),
                    new Desk(2, 7, 2, kuprFloor),
                    new Desk(3, 7, 2, kuprFloor),
                    new Desk(4, 7, 2, kuprFloor),
                    new Desk(1, 9, 0, kuprFloor),
                    new Desk(2, 9, 0, kuprFloor),
                    new Desk(3, 9, 0, kuprFloor),
                    new Desk(4, 9, 0, kuprFloor),
                    new Desk(8, 9, 0, kuprFloor),
                    new Desk(1, 11, 0, kuprFloor),
                    new Desk(2, 11, 0, kuprFloor),
                    new Desk(3, 11, 0, kuprFloor),
                    new Desk(4, 11, 0, kuprFloor),
                    new Desk(6, 13, 3, kuprFloor),
                    new Desk(8, 13, 1, kuprFloor),
                    new Desk(6, 15, 2, kuprFloor),
                    new Desk(7, 15, 2, kuprFloor)
            )
                    .forEach(desk -> deskRepository.save(desk));

            Stream.of(
                    new Item(0, 0, "Wall" , kuprFloor),
                    new Item(1, 0, "Wall", kuprFloor),
                    new Item(2, 0, "Window", kuprFloor),
                    new Item(3, 0, "Wall", kuprFloor),
                    new Item(4, 0, "Wall", kuprFloor),
                    new Item(5, 0, "Window", kuprFloor),
                    new Item(6, 0, "Wall", kuprFloor),
                    new Item(7, 0, "Wall", kuprFloor),
                    new Item(8, 0, "Window", kuprFloor),
                    new Item(9, 0, "Wall", kuprFloor),
                    new Item(10, 0, "Window", kuprFloor),
                    new Item(11, 0, "Wall", kuprFloor),
                    new Item(0, 1, "Wall", kuprFloor),
                    new Item(7, 1, "Wall", kuprFloor),
                    new Item(8, 1, "WC", kuprFloor),
                    new Item(9, 1, "Door", kuprFloor),
                    new Item(11, 1, "Wall", kuprFloor),
                    new Item(0, 2, "Window", kuprFloor),
                    new Item(2, 2, "Kitchen", kuprFloor),
                    new Item(6, 2, "Kitchen", kuprFloor),
                    new Item(7, 2, "Wall", kuprFloor),
                    new Item(8, 2, "Wall", kuprFloor),
                    new Item(9, 2, "Wall", kuprFloor),
                    new Item(11, 2, "Wall", kuprFloor),
                    new Item(0, 3, "Wall", kuprFloor),
                    new Item(1, 3, "Wall", kuprFloor),
                    new Item(2, 3, "Wall", kuprFloor),
                    new Item(3, 3, "Wall", kuprFloor),
                    new Item(4, 3, "Door", kuprFloor),
                    new Item(5, 3, "Wall", kuprFloor),
                    new Item(6, 3, "Wall", kuprFloor),
                    new Item(7, 3, "Wall", kuprFloor),
                    new Item(9, 3, "Wall", kuprFloor),
                    new Item(11, 3, "Wall", kuprFloor),
                    new Item(0, 4, "Wall", kuprFloor),
                    new Item(9, 4, "Wall", kuprFloor),
                    new Item(11, 4, "Door", kuprFloor),
                    new Item(0, 5, "Window", kuprFloor),
                    new Item(9, 5, "Door", kuprFloor),
                    new Item(11, 5, "Wall", kuprFloor),
                    new Item(0, 6, "Wall", kuprFloor),
                    new Item(9, 6, "Wall", kuprFloor),
                    new Item(11, 6, "Window", kuprFloor),
                    new Item(0, 7, "Window", kuprFloor),
                    new Item(5, 7, "Wall", kuprFloor),
                    new Item(7, 7, "Wall", kuprFloor),
                    new Item(8, 7, "Wall", kuprFloor),
                    new Item(9, 7, "Wall", kuprFloor),
                    new Item(10, 7, "Wall", kuprFloor),
                    new Item(11, 7, "Wall", kuprFloor),
                    new Item(0, 8, "Wall", kuprFloor),
                    new Item(1, 8, "Wall", kuprFloor),
                    new Item(2, 8, "Wall", kuprFloor),
                    new Item(3, 8, "Wall", kuprFloor),
                    new Item(4, 8, "Wall", kuprFloor),
                    new Item(5, 8, "Wall", kuprFloor),
                    new Item(9, 8, "Wall", kuprFloor),
                    new Item(11, 8, "Window", kuprFloor),
                    new Item(0, 9, "Window", kuprFloor),
                    new Item(9, 9, "Wall", kuprFloor),
                    new Item(11, 9, "Wall", kuprFloor),
                    new Item(0, 10, "Wall", kuprFloor),
                    new Item(9, 10, "Wall", kuprFloor),
                    new Item(11, 10, "Window", kuprFloor),
                    new Item(0, 11, "Wall", kuprFloor),
                    new Item(9, 11, "Door", kuprFloor),
                    new Item(11, 11, "Wall", kuprFloor),
                    new Item(0, 12, "Window", kuprFloor),
                    new Item(9, 12, "Wall", kuprFloor),
                    new Item(11, 12, "Wall", kuprFloor),
                    new Item(0, 13, "Wall", kuprFloor),
                    new Item(1, 13, "Wall", kuprFloor),
                    new Item(2, 13, "Wall", kuprFloor),
                    new Item(3, 13, "Wall", kuprFloor),
                    new Item(4, 13, "Wall", kuprFloor),
                    new Item(9, 13, "Wall", kuprFloor),
                    new Item(11, 13, "Door", kuprFloor),
                    new Item(0, 14, "Wall", kuprFloor),
		    new Item(1, 14, "Admin", kuprFloor),
                    new Item(4, 14, "Door", kuprFloor),
                    new Item(9, 14, "Wall", kuprFloor),
                    new Item(10, 14, "Door", kuprFloor),
                    new Item(11, 14, "Wall", kuprFloor),
                    new Item(0, 15, "Window", kuprFloor),
		    new Item(2, 15, "Admin", kuprFloor),
                    new Item(4, 15, "Wall", kuprFloor),
                    new Item(9, 15, "Wall", kuprFloor),
                    new Item(10, 15, "WC", kuprFloor),
                    new Item(11, 15, "Wall", kuprFloor),
                    new Item(0, 16, "Wall", kuprFloor),
                    new Item(1, 16, "Wall", kuprFloor),
                    new Item(2, 16, "Window", kuprFloor),
                    new Item(3, 16, "Wall", kuprFloor),
                    new Item(4, 16, "Wall", kuprFloor),
                    new Item(5, 16, "Wall", kuprFloor),
                    new Item(6, 16, "Window", kuprFloor),
                    new Item(7, 16, "Window", kuprFloor),
                    new Item(8, 16, "Wall", kuprFloor),
                    new Item(9, 16, "Wall", kuprFloor),
                    new Item(10, 16, "Window", kuprFloor),
                    new Item(11, 16, "Wall", kuprFloor)
            )
                    .forEach(item -> itemRepository.save(item));
					
					
			Blueprint pritFloor1 = new Blueprint(1, 14, 10, pritytskogo);
            blueprintRepository.save(pritFloor1);
			Blueprint pritFloor2 = new Blueprint(2, 14, 10, pritytskogo);
            blueprintRepository.save(pritFloor2);
			
			Stream.of(
                    new Desk(1, 1, 0, pritFloor1),
                    new Desk(3, 1, 0, pritFloor1),
                    new Desk(4, 1, 0, pritFloor1),
                    new Desk(5, 1, 0, pritFloor1),
                    new Desk(7, 1, 0, pritFloor1),
                    new Desk(1, 3, 3, pritFloor1),
                    new Desk(4, 3, 1, pritFloor1),
                    new Desk(5, 3, 3, pritFloor1),
                    new Desk(1, 4, 3, pritFloor1),
                    new Desk(4, 4, 1, pritFloor1),
                    new Desk(5, 4, 3, pritFloor1),
                    new Desk(9, 4, 0, pritFloor1),
                    new Desk(10, 4, 0, pritFloor1),
                    new Desk(11, 4, 0, pritFloor1),
                    new Desk(12, 4, 0, pritFloor1),
                    new Desk(4, 5, 1, pritFloor1),
                    new Desk(5, 5, 3, pritFloor1),

                    new Desk(1, 1, 3, pritFloor2),
                    new Desk(3, 1, 1, pritFloor2),
                    new Desk(7, 1, 0, pritFloor2),
                    new Desk(9, 1, 0, pritFloor2),
                    new Desk(11, 1, 0, pritFloor2),
                    new Desk(12, 1, 0, pritFloor2),
                    new Desk(1, 2, 3, pritFloor2),
                    new Desk(5, 2, 3, pritFloor2),
                    new Desk(3, 3, 1, pritFloor2),
                    new Desk(5, 3, 3, pritFloor2),
                    new Desk(8, 3, 2, pritFloor2),
                    new Desk(9, 3, 2, pritFloor2),
                    new Desk(10, 3, 2, pritFloor2),
                    new Desk(12, 3, 2, pritFloor2),
                    new Desk(1, 4, 3, pritFloor2),
                    new Desk(1, 5, 3, pritFloor2),
                    new Desk(7, 5, 2, pritFloor2),
                    new Desk(8, 5, 2, pritFloor2),
                    new Desk(10, 5, 2, pritFloor2),
                    new Desk(12, 5, 2, pritFloor2),
                    new Desk(1, 6, 3, pritFloor2),
                    new Desk(3, 6, 1, pritFloor2),
                    new Desk(12, 7, 1, pritFloor2),
                    new Desk(1, 8, 3, pritFloor2),
                    new Desk(7, 8, 2, pritFloor2),
                    new Desk(9, 8, 2, pritFloor2),
                    new Desk(10, 8, 2, pritFloor2),
                    new Desk(12, 8, 1, pritFloor2)

            )
                    .forEach(desk -> deskRepository.save(desk));

            Stream.of(
                    new Item(0, 0, "Wall" , pritFloor1),
                    new Item(1, 0, "Wall" , pritFloor1),
                    new Item(2, 0, "Window" , pritFloor1),
                    new Item(3, 0, "Wall" , pritFloor1),
                    new Item(4, 0, "Window" , pritFloor1),
                    new Item(5, 0, "Window" , pritFloor1),
                    new Item(6, 0, "Wall" , pritFloor1),
                    new Item(7, 0, "Window" , pritFloor1),
                    new Item(8, 0, "Wall" , pritFloor1),
                    new Item(9, 0, "Wall" , pritFloor1),
                    new Item(10, 0, "Wall" , pritFloor1),
                    new Item(11, 0, "Window" , pritFloor1),
                    new Item(12, 0, "Wall" , pritFloor1),
                    new Item(13, 0, "Wall" , pritFloor1),
                    new Item(0, 1, "Window" , pritFloor1),
                    new Item(9, 1, "Wall" , pritFloor1),
		    new Item(10, 1, "Admin" , pritFloor1),
		    new Item(12, 1, "Admin" , pritFloor1),
                    new Item(13, 1, "Window" , pritFloor1),
                    new Item(0, 2, "Wall" , pritFloor1),
                    new Item(9, 2, "Door" , pritFloor1),
		    new Item(12, 2, "Admin" , pritFloor1),
                    new Item(13, 2, "Window" , pritFloor1),
                    new Item(0, 3, "Window" , pritFloor1),
                    new Item(9, 3, "Wall" , pritFloor1),
                    new Item(10, 3, "Wall" , pritFloor1),
                    new Item(11, 3, "Wall" , pritFloor1),
                    new Item(12, 3, "Wall" , pritFloor1),
                    new Item(13, 3, "Wall" , pritFloor1),
                    new Item(0, 4, "Window" , pritFloor1),
                    new Item(13, 4, "Window" , pritFloor1),
                    new Item(0, 5, "Wall" , pritFloor1),
                    new Item(13, 5, "Wall" , pritFloor1),
                    new Item(0, 6, "Wall" , pritFloor1),
                    new Item(1, 6, "Wall" , pritFloor1),
                    new Item(2, 6, "Door" , pritFloor1),
                    new Item(3, 6, "Wall" , pritFloor1),
                    new Item(4, 6, "Wall" , pritFloor1),
                    new Item(5, 6, "Wall" , pritFloor1),
                    new Item(6, 6, "Wall" , pritFloor1),
                    new Item(7, 6, "Door" , pritFloor1),
                    new Item(8, 6, "Wall" , pritFloor1),
                    new Item(9, 6, "Wall" , pritFloor1),
                    new Item(10, 6, "Wall" , pritFloor1),
                    new Item(11, 6, "Door" , pritFloor1),
                    new Item(12, 6, "Wall" , pritFloor1),
                    new Item(13, 6, "Wall" , pritFloor1),
                    new Item(0, 7, "Window" , pritFloor1),
                    new Item(4, 7, "Wall" , pritFloor1),
                    new Item(5, 7, "Kitchen" , pritFloor1),
                    new Item(9, 7, "Door" , pritFloor1),
                    new Item(13, 7, "Window" , pritFloor1),
                    new Item(0, 8, "Window" , pritFloor1),
                    new Item(3, 8, "Stairs" , pritFloor1),
                    new Item(4, 8, "Wall" , pritFloor1),
                    new Item(6, 8, "Kitchen" , pritFloor1),
                    new Item(9, 8, "Wall" , pritFloor1),
                    new Item(11, 8, "WC" , pritFloor1),
                    new Item(12, 8, "WC" , pritFloor1),
                    new Item(13, 8, "Wall" , pritFloor1),
                    new Item(0, 9, "Wall" , pritFloor1),
                    new Item(1, 9, "Wall" , pritFloor1),
                    new Item(2, 9, "Door" , pritFloor1),
                    new Item(3, 9, "Wall" , pritFloor1),
                    new Item(4, 9, "Wall" , pritFloor1),
                    new Item(5, 9, "Window" , pritFloor1),
                    new Item(6, 9, "Wall" , pritFloor1),
                    new Item(7, 9, "Wall" , pritFloor1),
                    new Item(8, 9, "Window" , pritFloor1),
                    new Item(9, 9, "Wall" , pritFloor1),
                    new Item(10, 9, "Window" , pritFloor1),
                    new Item(11, 9, "Wall" , pritFloor1),
                    new Item(12, 9, "Wall" , pritFloor1),
                    new Item(13, 9, "Wall" , pritFloor1),

                    new Item(0, 0, "Wall" , pritFloor2),
                    new Item(1, 0, "Window" , pritFloor2),
                    new Item(2, 0, "Window" , pritFloor2),
                    new Item(3, 0, "Wall" , pritFloor2),
                    new Item(4, 0, "Wall" , pritFloor2),
                    new Item(5, 0, "Wall" , pritFloor2),
                    new Item(6, 0, "Window" , pritFloor2),
                    new Item(7, 0, "Wall" , pritFloor2),
                    new Item(8, 0, "Wall" , pritFloor2),
                    new Item(9, 0, "Wall" , pritFloor2),
                    new Item(10, 0, "Window" , pritFloor2),
                    new Item(11, 0, "Wall" , pritFloor2),
                    new Item(12, 0, "Wall" , pritFloor2),
                    new Item(13, 0, "Wall" , pritFloor2),
                    new Item(0, 1, "Wall" , pritFloor2),
                    new Item(4, 1, "Wall" , pritFloor2),
                    new Item(13, 1, "Window" , pritFloor2),
                    new Item(0, 2, "Window" , pritFloor2),
                    new Item(4, 2, "Wall" , pritFloor2),
                    new Item(13, 2, "Window" , pritFloor2),
                    new Item(0, 3, "Wall" , pritFloor2),
                    new Item(4, 3, "Wall" , pritFloor2),
                    new Item(13, 3, "Wall" , pritFloor2),
                    new Item(0, 4, "Window" , pritFloor2),
                    new Item(4, 4, "Wall" , pritFloor2),
                    new Item(13, 4, "Window" , pritFloor2),
                    new Item(0, 5, "Wall" , pritFloor2),
                    new Item(4, 5, "Door" , pritFloor2),
                    new Item(13, 5, "Wall" , pritFloor2),
                    new Item(0, 6, "Window" , pritFloor2),
                    new Item(4, 6, "Wall" , pritFloor2),
                    new Item(6, 6, "Wall" , pritFloor2),
                    new Item(7, 6, "Wall" , pritFloor2),
                    new Item(8, 6, "Wall" , pritFloor2),
                    new Item(9, 6, "Door" , pritFloor2),
                    new Item(10, 6, "Wall" , pritFloor2),
                    new Item(11, 6, "Wall" , pritFloor2),
                    new Item(12, 6, "Wall" , pritFloor2),
                    new Item(13, 6, "Wall" , pritFloor2),
                    new Item(0, 7, "Wall" , pritFloor2),
                    new Item(4, 7, "Wall" , pritFloor2),
                    new Item(5, 7, "Door" , pritFloor2),
                    new Item(6, 7, "Wall" , pritFloor2),
                    new Item(13, 7, "Window" , pritFloor2),
                    new Item(0, 8, "Window" , pritFloor2),
                    new Item(3, 8, "Stairs" , pritFloor2),
                    new Item(4, 8, "Wall" , pritFloor2),
                    new Item(5, 8, "WC" , pritFloor2),
                    new Item(6, 8, "Wall" , pritFloor2),
                    new Item(13, 8, "Wall" , pritFloor2),
                    new Item(0, 9, "Wall" , pritFloor2),
                    new Item(1, 9, "Wall" , pritFloor2),
                    new Item(2, 9, "Window" , pritFloor2),
                    new Item(3, 9, "Wall" , pritFloor2),
                    new Item(4, 9, "Wall" , pritFloor2),
                    new Item(5, 9, "Window" , pritFloor2),
                    new Item(6, 9, "Wall" , pritFloor2),
                    new Item(7, 9, "Wall" , pritFloor2),
                    new Item(8, 9, "Wall" , pritFloor2),
                    new Item(9, 9, "Window" , pritFloor2),
                    new Item(10, 9, "Window" , pritFloor2),
                    new Item(11, 9, "Wall" , pritFloor2),
                    new Item(12, 9, "Window" , pritFloor2),
                    new Item(13, 9, "Wall" , pritFloor2)
            )
                    .forEach(item -> itemRepository.save(item));
					
					
			Blueprint pushkFloor = new Blueprint(1, 12, 12, pushkina);
            blueprintRepository.save(pushkFloor);

            Stream.of(
                    new Desk(1, 1, 0, pushkFloor),
                    new Desk(2, 1, 0, pushkFloor),
                    new Desk(1, 3, 3, pushkFloor),
                    new Desk(1, 4, 3, pushkFloor),
                    new Desk(3, 3, 1, pushkFloor),
                    new Desk(3, 4, 1, pushkFloor),
                    new Desk(3, 8, 1, pushkFloor),
                    new Desk(3, 9, 1, pushkFloor),
                    new Desk(3, 10, 1, pushkFloor),
                    new Desk(5, 8, 0, pushkFloor),
                    new Desk(6, 8, 0, pushkFloor),
                    new Desk(5, 10, 2, pushkFloor),
                    new Desk(6, 10, 2, pushkFloor),
                    new Desk(5, 3, 3, pushkFloor),
                    new Desk(5, 4, 3, pushkFloor),
                    new Desk(6, 1, 0, pushkFloor),
                    new Desk(7, 1, 0, pushkFloor),
                    new Desk(9, 1, 0, pushkFloor),
                    new Desk(10, 2, 1, pushkFloor),
                    new Desk(10, 3, 1, pushkFloor),
                    new Desk(8, 3, 2, pushkFloor)
            )
                    .forEach(desk -> deskRepository.save(desk));

            Stream.of(
                    new Item(0, 0, "Wall" , pushkFloor),
                    new Item(1, 0, "Wall" , pushkFloor),
                    new Item(2, 0, "Window" , pushkFloor),
                    new Item(3, 0, "Wall" , pushkFloor),
                    new Item(4, 0, "Wall" , pushkFloor),
                    new Item(5, 0, "Window" , pushkFloor),
                    new Item(6, 0, "Wall" , pushkFloor),
                    new Item(7, 0, "Window" , pushkFloor),
                    new Item(8, 0, "Wall" , pushkFloor),
                    new Item(9, 0, "Window" , pushkFloor),
                    new Item(10, 0, "Wall", pushkFloor),
                    new Item(11, 0, "Wall", pushkFloor),
                    new Item(0, 1, "Window", pushkFloor),
                    new Item(4, 1, "Wall", pushkFloor),
                    new Item(11, 1, "Window", pushkFloor),
                    new Item(0, 2, "Wall", pushkFloor),
                    new Item(4, 2, "Door", pushkFloor),
                    new Item(11, 2, "Window", pushkFloor),
                    new Item(0, 3, "Wall", pushkFloor),
                    new Item(4, 3, "Wall", pushkFloor),
                    new Item(11, 3, "Wall", pushkFloor),
                    new Item(0, 4, "Window", pushkFloor),
                    new Item(4, 4, "Wall", pushkFloor),
                    new Item(8, 4, "Wall", pushkFloor),
                    new Item(9, 4, "Wall", pushkFloor),
                    new Item(10, 4, "Wall", pushkFloor),
                    new Item(11, 4, "Wall", pushkFloor),
                    new Item(0, 5, "Wall", pushkFloor),
                    new Item(1, 5, "Wall", pushkFloor),
                    new Item(2, 5, "Door", pushkFloor),
                    new Item(3, 5, "Wall", pushkFloor),
                    new Item(4, 5, "Wall", pushkFloor),
                    new Item(8, 5, "Wall", pushkFloor),
                    new Item(9, 5, "WC", pushkFloor),
                    new Item(10, 5, "WC", pushkFloor),
                    new Item(11, 5, "Wall", pushkFloor),
                    new Item(0, 6, "Door", pushkFloor),
                    new Item(8, 6, "Door", pushkFloor),
                    new Item(11, 6, "Window", pushkFloor),
                    new Item(0, 7, "Wall", pushkFloor),
                    new Item(1, 7, "Wall", pushkFloor),
                    new Item(2, 7, "Door", pushkFloor),
                    new Item(3, 7, "Wall", pushkFloor),
                    new Item(4, 7, "Wall", pushkFloor),
                    new Item(8, 7, "Wall", pushkFloor),
                    new Item(9, 7, "Wall", pushkFloor),
                    new Item(10, 7, "Wall", pushkFloor),
                    new Item(11, 7, "Wall", pushkFloor),
                    new Item(0, 8, "Window", pushkFloor),
		    new Item(1, 8, "Admin", pushkFloor),
                    new Item(4, 8, "Wall", pushkFloor),
                    new Item(8, 8, "Wall", pushkFloor),
                    new Item(9, 8, "Kitchen", pushkFloor),
                    new Item(11, 8, "Window", pushkFloor),
                    new Item(0, 9, "Wall", pushkFloor),
                    new Item(4, 9, "Wall", pushkFloor),
                    new Item(8, 9, "Wall", pushkFloor),
                    new Item(10, 9, "Kitchen", pushkFloor),
                    new Item(11, 9, "Window", pushkFloor),
                    new Item(0, 10, "Window", pushkFloor),
		    new Item(1, 10, "Admin", pushkFloor),
                    new Item(4, 10, "Wall", pushkFloor),
                    new Item(8, 10, "Door", pushkFloor),
                    new Item(11, 10, "Wall", pushkFloor),
                    new Item(0, 11, "Wall", pushkFloor),
                    new Item(1, 11, "Wall", pushkFloor),
                    new Item(2, 11, "Window", pushkFloor),
                    new Item(3, 11, "Wall", pushkFloor),
                    new Item(4, 11, "Wall", pushkFloor),
                    new Item(5, 11, "Wall", pushkFloor),
                    new Item(6, 11, "Window", pushkFloor),
                    new Item(7, 11, "Wall", pushkFloor),
                    new Item(8, 11, "Wall", pushkFloor),
                    new Item(9, 11, "Window", pushkFloor),
                    new Item(10, 11, "Wall", pushkFloor),
                    new Item(11, 11, "Wall", pushkFloor)
            )
                    .forEach(item -> itemRepository.save(item));
        }
    }

    private void addUsers() {

        User basicUser_1 = new User(
                "adubik@exadel.com",
                encoder.encode("dubik"),
                "Anton",
                "Dubik"
        );

        User basicUser_2 = new User(
                "snovozhylov.@exadel.com",
                encoder.encode("novozhylov"),
                "Sergey",
                "Novozhylov"
        );

        User basicUser_3 = new User(
                "yshagun@exadel.com",
                encoder.encode("shagun"),
                "Yuri",
                "Shagun"
        );

        User basicUser_4 = new User(
                "ktsirul@exadel.com",
                encoder.encode("tsirul"),
                "Kate",
                "Tsirul"
        );

        User basicUser_5 = new User(
                "dbaranchik@exadel.com",
                encoder.encode("baranchik"),
                "Denis",
                "Baranchik"
        );

        User basicUser_6 = new User(
                "pdunaeva@exadel.com",
                encoder.encode("dunaeva"),
                "Polina",
                "Dunaeva"
        );

        User basicUser_7 = new User(
                "isolovyev@exadel.com",
                encoder.encode("solovyev"),
                "Ilya",
                "Solovyev"
        );

        User basicUser_8 = new User(
                "sgoda@exadel.com",
                encoder.encode("goda"),
                "Sotrudnik",
                "Goda"
        );

        User basicUser_9 = new User(
                "mpavlov@exadel.com",
                encoder.encode("pavlov"),
                "Max",
                "Pavlov"
        );

        User admin_1 = (new User(
                "zvasilenko@exadel.com",
                encoder.encode("vasilenko"),
                "Zhanna",
                "Vasilenko"
        ));

        User admin_2 = (new User(
                "bboss@exadel.com",
                encoder.encode("boss"),
                "Big",
                "Boss"
        ));

        User hr_1 = new User(
                "dnikulin@exadel.com",
                encoder.encode("nikulin"),
                "Dmitry",
                "Nikulin"
        );

        User hr_2 = new User(
                "abasalaev@exadel.com",
                encoder.encode("basalaev"),
                "Anatoly",
                "Basalaev"
        );
		
	    User hr_3 = new User(
                "apavlova@exadel.com",
                encoder.encode("pavlova"),
                "Anna",
                "Pavlova"
        );

        // If there is no admin or hr role we want this to fail
        @SuppressWarnings("OptionalGetWithoutIsPresent")
        Role adminRole = roleRepository.findByName(RolesEnum.ROLE_ADMIN).get();
        @SuppressWarnings("OptionalGetWithoutIsPresent")
        Role hrRole = roleRepository.findByName(RolesEnum.ROLE_HR).get();

        admin_1.getRoles().add(adminRole);
        admin_2.getRoles().add(adminRole);
        hr_1.getRoles().add(hrRole);
        hr_2.getRoles().add(hrRole);
	    hr_3.getRoles().add(hrRole);

        Stream.of(basicUser_1, basicUser_2, basicUser_3, basicUser_4)
                .forEach(u -> hr_1.getSubordinates().add(u));
        Stream.of(basicUser_5, basicUser_6, basicUser_7)
                .forEach(u -> hr_2.getSubordinates().add(u));

        Stream.of(basicUser_1, basicUser_2, basicUser_3, basicUser_4, basicUser_5, basicUser_6, basicUser_7, basicUser_8, basicUser_9, hr_1, hr_2, hr_3, admin_1, admin_2)
                .filter(user -> !userRepository.existsByEmail(user.getEmail()))
                .forEach(user -> userRepository.save(user));
    }
}
