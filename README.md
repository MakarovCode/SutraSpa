# Sutra SPA
Technical Challenge for Sutra Senior Full-Stack Ruby on Rails + ReacJS Developer

# DEMO
[Sutra SPA](https://sutra-spa.herokuapp.com/) - Test the web app


# TECHNOLOGIES USED AND CHALLENGES
* Since the Tech Stack used in Sutra products is Ruby on Rails + JQuery + Javascript and is currenty in a migration to ReactJS I decided to apply both technologies for this excerise, the API is full Rails, and the Fronend have two main views index.html.erb (made with pure Rails) and show.html.erb (rendering React Components with the help of the ReactOnRails gem)
* NodeJS
    * Is use for serve rendering ReactJS
* ReactJS (React on Rails GEM)
    * Is a gem that includes Webpacker (another gem) that allows you to work very efficient with ReactJS, this basically take cares of Serve Rendering React for more efficiency
* Ruby;
    * Version 2.7.1;
* Rails;
    * Version 6.1;
* PostgreSQL;
    * 12;
* Materialize CDN;
    * For some nice styling;
* Faker GEM;
    * For populating the database;

# Sutra Developer Onboarding Task
Create SPA that has two different states: “**Reading**” and “**Editing**”.

In the reading state the user sees content and in the editing state, the users sees forms to edit that content.

All data from forms must be synchronized with a simple backend (use whatever you are comfortable with) and reading mode must automatically update when switching back to reading from editing.

The editing form should allow the user to update the following fields:

* Username
* First name
* Last name
* Email (with validations)
* Phone number (with validations)
* Profile picture
* Bio
* Background color of reading view selected with a HEX color picker

And there should be a simple toggle switch that allows the user to chose the current state between reading and editing (default is reading).

For example: the default background color setting is #fff (white).  When the user is in editing mode, he can change this setting to his own desired color.  After saving and switching back to reading mode the user now sees a new new bg color.

# File to check
* app/controllers/api/v1/users_controllers.rb
    * Is the controllores that is in charge of updating the fields
* app/models/user.rb
    * You will find validations, and some other configurations
* app/views/users/index.html.erb
    * Is a view that uses pure Rails with ERB
* app/views/users/show.html.erb
    * Is a view that uses React on Rails, basically the whole view is render and controlled by ReactJS
* app/javascript/bundles/*;
    * Contains all the React components;


# HOW TO INSTALL

```ruby
# 1. Clone the repo

git clone https://github.com/MakarovCode/SutraSpa.git

# 2. Run bundle and make sure you install the 2.7.1 ruby version or change this number in the gem file and delete the .ruby-version file

bundle

# 3. Run the DB

rails db:create db:migrate db:seed

# Install foreman

gem install foreman

# Run Foreman

foreman start -f Procfile.dev

# Type localhost:3000

# DO NOT FORGET TO install yarn and nodejs
```
