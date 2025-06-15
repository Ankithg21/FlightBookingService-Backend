# BOOKING SERVICES-BACKEND

The Flight Booking Services Backend is a separate but tightly integrated service that handles booking operations, payment simulations, and seat availability for flights managed by the Flight Services Backend. It interacts with user actions, allowing customers to search, book, cancel, and retrieve tickets for flights.

##### This service is tightly integrated with the Flight Services Backend, from which it pulls validated flight and airline data to ensure consistency across the platform.

### Core Responsibilities:
#### Booking Management:
1. Create bookings
2. Cancel or update bookings
3. Fetch booking history
4. Prevent double bookings through proper locking mechanisms

### 🔗 Service Integration:
1. These two services follow a modular and decoupled microservices pattern, where:
2. The Flight Services Backend maintains master data (airlines, airports, flights).
3. The Booking Services Backend consumes that data and focuses on transactional operations like seat booking, availability, and cancellations.