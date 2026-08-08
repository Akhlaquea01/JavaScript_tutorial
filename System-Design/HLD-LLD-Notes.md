Here are the system design topics discussed in the video, broken down into High-Level Design (HLD) and Low-Level Design (LLD) as presented:

**General Concepts:**

*   **High-Level Design (HLD):** Focuses on the overview/architecture of the system, components, and their interactions without deep coding details.
*   **Low-Level Design (LLD):** Focuses on actual machine coding, APIs, class diagrams, models, and implementation details.
*   **Prerequisite:** Hands-on development experience is crucial before starting system design.
*   **Functional Requirements:** What the system *should do* (features users interact with, e.g., sign up, login, play video).
*   **Non-Functional Requirements:** How the system *should perform* (qualities like security, low latency, scalability, availability).

**High-Level Design (HLD) Roadmap:**

1.  **Fundamentals:**
    *   Serverless vs Serverful Architecture
    *   Horizontal vs Vertical Scaling
    *   Threads
    *   Pages
    *   How the Internet Works (Request/Response cycle, DNS)

2.  **Databases:**
    *   SQL vs NoSQL DBs (Pros/Cons, types like Neo4j, MongoDB)
    *   In-memory DBs
    *   Data Replication & Migration
    *   Data Partitioning
    *   Sharding (Horizontal Data Partitioning)

3.  **Consistency vs Availability:**
    *   Data Consistency & its levels (Eventual, Quorum, Causal, Linearizable)
    *   Isolation & its levels (Read Uncommitted, Read Committed, Repeatable Read)
    *   CAP Theorem (Consistency, Availability, Partition Tolerance tradeoff)

4.  **Cache:**
    *   What is Cache? (e.g., Redis, Memcached)
    *   Write Policies (Write Back, Write Through, Write Around)
    *   Replacement Policies (LFU, LRU, Segmented LRU, etc.)
    *   Content Delivery Networks (CDNs)

5.  **Networking:**
    *   TCP vs UDP
    *   HTTP (Versions 1/2/3) & HTTPS
    *   Web Sockets
    *   WebRTC & Video Streaming

6.  **Load Balancers:**
    *   Load Balancing Algorithms (Stateless & Stateful, e.g., Round Robin, Least Connections)
    *   Consistent Hashing
    *   Proxy & Reverse Proxy
    *   Rate Limiting (Preventing DDoS)

7.  **Message Queues:**
    *   Asynchronous Processing (e.g., Kafka, RabbitMQ)
    *   Publisher-Subscriber Model (Handling non-critical tasks)

8.  **Monoliths vs Microservices:**
    *   Why Microservices?
    *   Concept of 'Single Point of Failure'
    *   Avoiding Cascading Failures
    *   Containerization (Docker)
    *   Migrating to Microservices

9.  **Monitoring & Logging:**
    *   Logging events & monitoring metrics (Tools: AWS CloudWatch, Grafana, Prometheus)
    *   Anomaly Detection

10. **Security:**
    *   Tokens for Authentication/Authorization
    *   SSO (Single Sign-On) & OAuth
    *   Access Control Lists (ACLs) & Rule Engines
    *   Encryption

11. **System Design Tradeoffs (Summary/Meta-Concepts):**
    *   Push vs Pull architecture
    *   Consistency vs Availability
    *   SQL vs NoSQL DBs
    *   Memory vs Latency
    *   Throughput vs Latency
    *   Accuracy vs Latency

12. **Practice (HLD Problems - Must Do):**
    *   Youtube, Twitter, Whatsapp, Uber, Amazon, Dropbox/Google Drive, Netflix, Instagram, Zoom, Booking.com/Airbnb

**Low-Level Design (LLD) Roadmap:**

1.  **Object Oriented Programming (OOP):**
    *   Encapsulation
    *   Abstraction
    *   Inheritance
    *   Polymorphism
    *   SOLID Principles (Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, Dependency Inversion)

2.  **Design Patterns:**
    *   Creational (e.g., Singleton, Factory)
    *   Structural (e.g., Proxy, Bridge)
    *   Behavioral (e.g., Strategy, Command, Observer)

3.  **Concurrency & Thread Safety:**
    *   Thread safe injection
    *   Locking mechanisms
    *   Producer-Consumer problem
    *   Race conditions & Synchronization

4.  **UML Diagrams (Optional, depending on company):**
    *   (Implied: Class Diagrams, Component Diagrams, etc.)

5.  **APIs:**
    *   API design
    *   Request/Response object modeling
    *   Versioning & Extensibility
    *   Clean Code Principles (DRY - Don't Repeat Yourself, SRP - Single Responsibility Principle)
    *   Avoiding God classes

6.  **Practice (Common LLD Problems):**
    *   Design a Tic-tac-toe or chess game
    *   Design a Splitwise App
    *   Design a Parking lot
    *   Design an Elevator System with multiple lifts
    *   Design a Notification System
    *   Design a Food delivery app
    *   Design a Movie ticket booking system
    *   Design a URL shortener
    *   Design a Logging framework
    *   Design a Rate Limiter


    <!-- 
     Binary Search -   / binary-search-practice-problems  
b. BFS -   / top-20-breadth-first-search-bfs-practice-p...  
c. DFS -   / top-25-depth-first-search-dfs-practice-pro...  
d. Flood Fill -   / solution-to-leetcodes-flood-fill  
e. Tree Traversals -   / binary-tree-interview-questions-and-practi...  
f. Hash Tables -   / hashing-problems-in-data-structures  
g. Linked List - https://www.geeksforgeeks.org/top-20-...
h. Stacks -   / stack-data-structure-practice-problems-and...  
i. Queues -   / queue-data-structure-practice-problems-and...  
j. Two Pointers - https://www.geeksforgeeks.org/two-poi...
k. Binary Heaps -   / heap-practice-problems-and-interview-quest...  
l. Dynamic Programming -   / 20-dynamic-programming-interview-questions...  
m. Union Find - https://www.codingninjas.com/studio/l...
n. String Manipulation -   / top-21-string-programming-interview-questi...  
o. Arrays - https://www.geeksforgeeks.org/top-50-...
p. Recursion - https://www.geeksforgeeks.org/recursi...
q. BackTracking -   / backtracking-practice-problems-and-intervi...  
r. Greedy Algorithms -   / top-7-greedy-algorithm-problems  
s. Trie - https://www.techiedelight.com/trie-in...
t. Segment Trees - https://www.hackerearth.com/practice/...
u. Bitmasks -    • Dynamic Programming with Bitmasks  
     -->



     <!-- https://www.mygreatlearning.com/blog/oops-interview-questions/ -->