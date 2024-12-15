# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Legend

- `Added` for new features.
- `Changed` for changes in existing functionality.
- `Deprecated` for soon-to-be removed features.
- `Removed` for now removed features.
- `Fixed` for any bug fixes.
- `Security` in case of vulnerabilities.

## [0.15.0] Edit Scheduled Event

### Added

- Allow for Scheduled Event to be edited and updated in the Redux store

## [0.14.0] Add Scheduled Events to Event Schedule Feature

### Added

- Ability to add a Scheduled Event to the Event Schedule in the state

## [0.13.0] Event Schedule Feature

### Added

- Adding in the Event Schedule Genesis and Populate pages
  - Genesis now handles the Event Schedule creation and pushes to Redux state
  - Populate is a shell that just showcases the event-schedule-id

### Changed

- Event Schedule Form was moved to the Event Schedule Genesis workflow

## [0.12.0] Event Schedule Feature

### Added

- Get all Event Schedules
- Create Event Schedules Form with name, description

## [0.11.0] Event, CSS Updates

### Added

- Save locationId and organizerId with the event
- Adding in CSS changes for pages spacing wise and the input/select CSS

## [0.10.0] Event Feature, CSS Updates

### Added

- Get all Events
- Create Event Form with name, category, description
- Cleaned up some CSS issues with button and table formatting

## [0.9.0] Organizer Feature

### Added

- Get all Organizers
- Create Organizers Form with name

## [0.8.0] Refactor for Redux Toolkit

### Removed

- Removing Zustand since it couldn't handle the complexity of application's state

### Added

- Adding in ReduxJs Toolkit
- Adding in the User, Client, and Location fetching logic using ReduxJs Toolkit

## [0.7.0] Event Feature

### Added

- Get all Events
- Create Event Form with just name, no optional fields

## [0.6.0] Location Feature

### Added

- Get all Locations
- Create Location Form

## [0.5.0] Create Organizer Form

### Added

- Create Organizer Form

## [0.4.0] Adding in a lot here...

### Added

- Adding in the fetching of User and aligning the Client from said User
- Fetching the list of Organizers

## [0.3.0] Create Clients Form Validation

### Added

- Client Form field validation

### Removed

- Selecting a client from the list to "set" in the state

## [0.2.0] Clients

### Added

- Clients GETALL
- Clients POST
- GitHub Actions
