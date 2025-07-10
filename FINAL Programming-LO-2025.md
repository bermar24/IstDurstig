# Welcome to the Learning Outcomes Evaluation

Dear students,

Welcome to this Learning Outcomes Evaluation session. The goal is to assess your understanding and mastery of the learning outcomes for this semester as evidenced by your work that was submitted on your personal git account. Remember to answer each question thoroughly by referencing **Java** code and provide clear explanations where necessary.

Best regards,
Kay Berkling

## Ethics Section regarding generative and other forms of AI

The student acknowledges and agrees that the use of AI is strictly prohibited during this evaluation. By submitting this report, the student affirms that they have completed the form independently and without the assistance of any AI technologies. This agreement serves to ensure the integrity and authenticity of the students work, as well as their understanding of the learning outcomes.


## Checklist before handing in your work

* [ ] Review the assignment requirements to ensure you have completed all the necessary tasks.
* [ ] Double-check your links and make sure that links lead to where you intended. Each answer should have links to work done by you in your own git repository. (Exception is Speed Coding)
* [ ] Make sure you have at least 10 references to your project code (This is important evidence to prove that your project is substantial enough to support the learning outcome of object oriented design and coding within a larger piece of code.)
* [ ] Include comments to explain your referenced code and why it supports the learning outcome.
* [ ] Commit and push this markup file to your personal git repository and hand in the link and a soft-copy via email at the end of the designated time period.

Remember, this checklist is not exhaustive, but it should help you ensure that your work is complete, well-structured, and meets the required standards.

Good luck with your evaluation!

# Project Description (70%)


## https://github.com/bermar24/IstDurstig


*Plant care tracking application that helps users manage their plants with custom watering schedules and collaborative plant lists.

## 🌱 Features

- **Plant Management**: Add, edit, and organize your plants with photos, tags, and notes
- **Smart Scheduling**: Custom watering frequencies (Frequent/Medium/Rare) with automatic reminders
- **Care Tracking**: Log watering, fertilizing, and transplanting events with detailed history
- **Daily Dashboard**: See which plants need attention today with beautiful statistics
- **Shared Lists**: Collaborate with roommates or family members on plant care
- **Responsive Design**: Beautiful interface that works on all devices*

## TECH STACK

*## Backend (Java Spring Boot)
- **Framework**: Spring Boot 3.2.0 with Gradle
- **Database**: MongoDB with Spring Data MongoDB
- **Security**: Spring Security with JWT authentication
- **Architecture**: Clean Architecture with Repository-Service-Controller pattern
- **Design Patterns**: Factory pattern for care events, rich domain models

### Frontend (React + TypeScript)
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS for modern, responsive design
- **Routing**: React Router for navigation
- **Forms**: React Hook Form with Yup validation
- **API**: Axios for HTTP communication
- **State Management**: React Context for authentication
*

## What did you achieve? 

*This project help me demonstrates basic understanding Object-Oriented programming principles through a real-world application.

-Designe a funcional web-app
-Best practec of OO Programing
-MongoDB integration
-Use of API

But most important I have a new app for track my plants now!!!!*





## Learning Outcomes

| Exam Question | Total Achievable Points | Points Reached During Grading |
|---------------|------------------------|-------------------------------|
| Q1. Algorithms    |           4            |                               |
| Q2.Data types    |           4            |                               |
| Q3.Complex Data Structures |  4            |                               |
| Q4.Concepts of OOP |          6            |                               |
| Q5.OO Design     |           6            |                               |
| Q6.Testing       |           3            |                               |
| Q7.Operator/Method Overloading | 6 |                               |
| Q8.Templates/Generics |       4            |                               |
| Q9.Class libraries |          4            |                               |


## Evaluation Questions

Please answer the following questions to the best of your ability to show your understanding of the learning outcomes. Please provide examples from your project code to support your answers.


## Evaluation Material


### Q1. Algorithms

Algorithms are manyfold and Java can be used to program these. Examples are sorting or search strategies but also mathematical calculations. Please refer to **two** areas in either your regular coding practice (for example from Semester 1) or within your project, where you have coded an algorithm. Do not make reference to code written for other classes, like theoretical informatics.


*during the first semester I was testing differents sorting algorithms in Java, along with Hash Map usage
Here you can see the discusion: https://github.com/bermar24/Programming_DHBW_24/discussions/7
An example of HashMap: https://github.com/bermar24/Programming_DHBW_24/blob/main/HashAndSort/hashMap.java
An example of QuickSort: https://github.com/bermar24/Programming_DHBW_24/blob/main/HashAndSort/quickSort.java
*

| Total Achievable Points | Points Reached During Grading |
|------------------------|-------------------------------|
|                        |                               |
|           4            |                               |


### Q2. Data types

Please explain the concept of data types and provide examples of different data types in Java.
typical data types in java are int, double, float, char, boolean, long, short, byte, String, and arrays. Please provide one example for each of the **four** following data types in your code.
* arrays
* Strings
* boolean
* your choice


*Typical data types in Java define the kind of data a variable can hold and the operations that can be performed on it. Java divides data types into two categories:

- **Primitive types**: basic building blocks (e.g., int, boolean, double).
- **Reference types**: objects that refer to instances of classes (e.g., String, arrays, custom classes).

* arrays
  https://github.com/bermar24/IstDurstig/blob/main/backend/src/main/java/istdurstig/model/Plant.java
27     private List<CareEvent> careHistory;
* Strings
  https://github.com/bermar24/IstDurstig/blob/main/backend/src/main/java/istdurstig/model/Plant.java
21  private String name;

* boolean
  https://github.com/bermar24/IstDurstig/blob/main/backend/src/main/java/istdurstig/model/Plant.java
42 public boolean needsWatering() {...}


* double
  https://github.com/bermar24/IstDurstig/blob/main/backend/src/main/java/istdurstig/model/WateringEvent.java
12     private double amountLiters;



*

| Total Achievable Points | Points Reached During Grading |
|------------------------|-------------------------------|
|                        |                               |
|           4             |                               |



### Q3. Complex Data Structures

Examples of complex data structures in java are ArrayList, HashMap, HashSet, LinkedList, and TreeMap. Please provide an example of how you have used **two** of these complex data structures in your code and explain why you have chosen these data structures.

*ArrayList: Chosen because I expect to add multiples CareHistory entries for each plant, allowing dynamic resizing and easy iteration.
   37   this.careHistory = new ArrayList<>();
https://github.com/bermar24/IstDurstig/blob/main/backend/src/main/java/istdurstig/model/TransplantEvent.java
HashSet: Chosen to store unique collaborator IDs for shared plant lists, ensuring no duplicates and efficient membership checks.
    34    this.collaboratorIds = new HashSet<>();
https://github.com/bermar24/IstDurstig/blob/main/backend/src/main/java/istdurstig/model/PlantList.java
*


| Total Achievable Points | Points Reached During Grading |
|------------------------|-------------------------------|
|                        |                               |
|           4             |                               |


### Q4. Concepts of OOP
Concepts of OOP are the basic building blocks of object-oriented programming, such as classes, objects, methods, and attributes. 
Explain HOW and WHY your **project** demonstrates the use of OOP by using all of the following concepts:
* Classes/Objects
* Methods
* Attributes 
Link to the code in your project that demonstrates what you have explained above.

*In my project, I demonstrate OOP concepts through:
Each plant is object of the Plant class.
The class Plant is a blueprint thet defines atributes (variables) and methods (functions). Describing the behavior and state of the object Plant:


https://github.com/bermar24/IstDurstig/blob/main/backend/src/main/java/istdurstig/model/Plant.java
18 public class Plant {
20     private String id;    This is an atribut
42     public boolean needsWatering() { this is a method
43     return schedule != null && schedule.needsWatering(); }  != is an operator
46     public void addCareEvent(CareEvent event) { ...} this is a metod

*

| Total Achievable Points | Points Reached During Grading |
|------------------------|-------------------------------|
|                        |                               |
|             6           |                               |

### Q5. OO Design
Please showcase **two** areas where you have used object orientation and explain the advantage that object oriented code brings to the application or the problem that your code is addressing.
Examples in java of good oo design are encapsulation, inheritance, polymorphism, and abstraction. 


*
Encapsulation means hiding the internal details of how an object works and only exposing what is necessary through a public interface.

        Key Goals of Encapsulation:
                      - Protect internal data from being directly accessed or changed.
                      - Control how data is accessed or modified.
                      - Make code easier to maintain and debug.
                      - Improve modularity — objects manage their own data.

https://github.com/bermar24/IstDurstig/blob/main/backend/src/main/java/istdurstig/model/PlantList.java
26  private List<String> plantIds;                        Private fields (hidden from outside)
35     this.plantIds = new ArrayList<>();                 Constructor
54 -60      public void addPlant(String plantId) {        Public method to access the value
            ...  plantIds.add(plantId); ... }


Inheritance allows a class to acquire the atributes and methods of another class.
        - Code Reusability – Common logic can be written once in a superclass.
        -Hierarchy – Helps organize related classes in a natural structure.
        -Extensibility – You can add or override behavior in the subclass.
    
    // Superclass
    15 public abstract class CareEvent {...}
https://github.com/bermar24/IstDurstig/blob/main/backend/src/main/java/istdurstig/model/CareEvent.java

    // Subclass
    public class WateringEvent extends CareEvent { ...}
https://github.com/bermar24/IstDurstig/blob/main/backend/src/main/java/istdurstig/model/WateringEvent.java
    public class TransplantEvent extends CareEvent {...}
https://github.com/bermar24/IstDurstig/blob/main/backend/src/main/java/istdurstig/model/TransplantEvent.java
    public class FertilizingEvent extends CareEvent {...}
https://github.com/bermar24/IstDurstig/blob/main/backend/src/main/java/istdurstig/model/FertilizingEvent.java

*

| Total Achievable Points | Points Reached During Grading |
|------------------------|-------------------------------|
|                        |                               |
|              6          |                               |



### Q6. Testing
Java code is tested by using JUnit. Please explain how you have used JUnit in your project and provide a link to the code where you have used JUnit. Links do not have to refer to your project and can refer to your practice code. If you tested without JUnit, please explain how you tested your code.
Be detailed about what you are testing and how you argue for your test cases. 

Feel free to refer to the vibe coding session where you explored testing. (pair programming - you may link to your partner git and name him/her.)

Test cases usually cover the following areas:
* boundary cases
* normal cases
* error cases / catching exceptions 

*your text*

| Total Achievable Points | Points Reached During Grading |
|------------------------|-------------------------------|
|                        |                               |
|         3               |                               |

### Q7. Operator/Method Overloading
An example of operator overloading is the "+" operator that can be used to add two numbers or concatenate two strings. An example of method overloading is having two methods with the same name but different parameters. Please provide an example of how you have used operator or method overloading in your code and explain why you have chosen this method of coding.
The link does not have to be to your project and can be to your practice code.

*your text*

| Total Achievable Points | Points Reached During Grading |
|------------------------|-------------------------------|
|                        |                               |
|          6              |                               |



### Q8. Templates/Generics
Generics in java are used to create classes, interfaces, and methods that operate on objects of specified types. Please provide an example of how you have used generics in your code and explain why you have chosen to use generics. The link does not have to be to your project and can be to your practice code.

*
Generics allow you to write classes, interfaces, and methods that can work with any data type, while maintaining type safety.
23  private Set<String> tags;
https://github.com/bermar24/IstDurstig/blob/main/backend/src/main/java/istdurstig/model/Plant.java

Generics + Polymorphism
27   private List<CareEvent> careHistory;  \\ CareEvent is the base superclass with subclasses.
It combines generics and polymorphism by saying: "Give me a list of anything that is-an CareEvent."
https://github.com/bermar24/IstDurstig/blob/main/backend/src/main/java/istdurstig/model/Plant.java
*

| Total Achievable Points | Points Reached During Grading |
|------------------------|-------------------------------|
|                        |                               |
|           6             |                               |

### Q9. Class Libraries
Examples of class libraries in java are the Java Standard Library, JavaFX, Apache Commons, JUnit, Log4j, Jackson, Guava, Joda-Time, Hibernate, Spring, Maven, and many more. Please provide an example of how you have used a class library in your **project** code and explain why you have chosen to use this class library. 

* 
    Using class libraries helps you follow OOP principles like:
        -Reusability: You don’t reinvent the wheel.
        -Encapsulation: Internal details of how a class works are hidden.
        -Abstraction: You use the what, not the how.
    These libraries are built using OOP best practices and encourage modular, clean, and maintainable code.

3-12    ...
        import java.time.LocalDateTime;
        import java.util.ArrayList;
        import java.util.List;
        import java.util.Set;
https://github.com/bermar24/IstDurstig/blob/main/backend/src/main/java/istdurstig/model/Plant.java

handling timestamps (LocalDateTime), dynamic lists (ArrayList and List), and unique collections (Set)
*

| Total Achievable Points | Points Reached During Grading |
|------------------------|-------------------------------|
|                        |                               |
|            6            |                               |


# Creativity (10%)
Which one did you choose: 

* [ ] Web Interface with Design
* [ ] Database Connected
* [ ] Multithreading
* [ ] File I/O
* [ ] API
* [ ] Deployment



*y
Database Connected    MongoDB + string data
Multithreading  not manualy spring boot does it for me ( backend framework).  
API list on my README.md
https://github.com/bermar24/IstDurstig/blob/main/README.md
Deployment      Only in LocalNetwork becouse my free project on rendler I am using it for web engeniering. (sorry)

xt*



| Total Achievable Points | Points Reached During Grading |
|------------------------|-------------------------------|
|                        |                               |
|            10          |                               |



# Speed Coding (20%)
Please enter **three** Links to your speed coding session GITs and name your partner. 


*
Grading Management sistem (Niky, Daniela)
    https://github.com/Ngoc901/grades-management-system/tree/master/src

Rental Management ( Ali)
    https://github.com/bermar24/car_rental_manager/tree/master/.idea

Inventory Managementsystem (Sahil, Brian)
    https://github.com/Obrienmaina-Mosbach/Bumble-Bee-The-Second-Coming/tree/main/InventoryManagementSystem
*


Paste your class diagram for your project that you developed during the peer review class here: 

*![fLHHJnin37w_Nn71Gm-uLl1Q8GJQXeOqeKaKxJcz68YMIsv93WRR_lkSf4tkhB8XyL9TFd-sFzkrpvtdrW-TgjntgNjkUSTQnPsxyDxAzU3XgZNwHhu0EwwgQ65V5TUU_QeOcpCfbkm6cVeUdqTCymucW7_k2S3l7GBWJnDubloC1pVXzG_6crkh9g1h7q0CAaJSV4MuvHO-I-UDVLwoB_Xn-W6HJu-WVGhVMk0Un8L7iscv-eYlbUoIzz.png](../../Sem_II/Programing_II/fLHHJnin37w_Nn71Gm-uLl1Q8GJQXeOqeKaKxJcz68YMIsv93WRR_lkSf4tkhB8XyL9TFd-sFzkrpvtdrW-TgjntgNjkUSTQnPsxyDxAzU3XgZNwHhu0EwwgQ65V5TUU_QeOcpCfbkm6cVeUdqTCymucW7_k2S3l7GBWJnDubloC1pVXzG_6crkh9g1h7q0CAaJSV4MuvHO-I-UDVLwoB_Xn-W6HJu-WVGhVMk0Un8L7iscv-eYlbUoIzz.png)
I am also going to push it now to my git repository, so you can see it there as well.*

It can be done very simply by just copying any image and pasting it while editing Readme.md.


| Total Achievable Points | Points Reached During Grading |
|------------------------|-------------------------------|
|                        |                               |
|            16            |                               |







