# Appearance Theme Preference Specification

## Purpose

Provide a persistent application-wide appearance theme that users can control while keeping every Numa extension surface consistent with explicit or operating-system preferences.

## Requirements

### Requirement: Appearance theme selection

The General settings page SHALL present an Appearance theme control with exactly System, Light, and Dark choices, and SHALL identify System as the default when no valid saved choice exists.

#### Scenario: User opens Appearance settings for the first time

- **WHEN** no valid appearance theme has been saved
- **THEN** the theme control shows System as selected

#### Scenario: User selects an explicit theme

- **WHEN** the user selects Light or Dark
- **THEN** the selected choice becomes the active appearance theme

### Requirement: Persistent theme preference

The system SHALL persist the selected appearance theme in extension storage and restore it in later extension UI sessions.

#### Scenario: Saved theme is restored

- **WHEN** the user reopens an extension surface after selecting a theme
- **THEN** that surface uses the saved theme and the settings control reports the same choice

#### Scenario: Stored theme is invalid

- **WHEN** extension storage contains an unsupported appearance theme value
- **THEN** the system safely treats the preference as System

### Requirement: Effective theme application

The system SHALL apply the effective appearance theme to both the options page and popup before presenting their React content.

#### Scenario: Dark is selected

- **WHEN** the saved appearance theme is Dark
- **THEN** the options page and popup use the dark semantic color theme

#### Scenario: Light is selected

- **WHEN** the saved appearance theme is Light
- **THEN** the options page and popup use the light semantic color theme regardless of the operating-system theme

### Requirement: System theme behavior

While System is selected, the effective theme SHALL match the operating system's light or dark color preference and SHALL update when that preference changes.

#### Scenario: Surface opens with System selected

- **WHEN** the operating system prefers dark colors and the saved appearance theme is System
- **THEN** the extension surface uses the dark theme

#### Scenario: Operating-system theme changes

- **WHEN** the operating-system color preference changes while System is selected
- **THEN** each active extension surface updates its effective theme without requiring a reload

### Requirement: Cross-context theme synchronization

Active extension UI contexts SHALL react to persisted appearance theme changes made by another extension context.

#### Scenario: Theme changes while multiple surfaces are active

- **WHEN** the user changes the theme in General settings while another extension UI surface is active
- **THEN** the other active surface applies the new effective theme without requiring a reload

### Requirement: Accessible theme control

The Appearance theme choices SHALL be operable by keyboard and exposed to assistive technology through a labeled selection control with an identifiable selected value.

#### Scenario: Keyboard user changes the theme

- **WHEN** a keyboard user focuses and operates the Appearance theme control
- **THEN** the user can select System, Light, or Dark and determine which value is selected
