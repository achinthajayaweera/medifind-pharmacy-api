# MediFind Pharmacy Registration API

A REST API backend for the MediFind pharmacy partner onboarding flow. Built with Node.js and deployed on WSO2 Choreo.

## Overview

This API is part of the MediFind healthcare platform. It works alongside WSO2 Identity Platform (Asgardeo) to handle authenticated pharmacy partner registrations.

**Authentication Flow:**
1. Pharmacy visits MediFind web platform
2. Clicks "Get Started" → redirected to WSO2 Identity Platform for authentication
3. After login, fills pharmacy registration form
4. Form submits to this Choreo-deployed API
5. Registration is stored and confirmation shown

## Endpoints

- `GET /health` — Health check
- `POST /api/register-pharmacy` — Submit pharmacy registration
- `GET /api/registrations` — View all registrations

## Tech Stack

- Runtime: Node.js
- Deployed on: WSO2 Choreo
- Authentication: WSO2 Identity Platform (Asgardeo)
- Frontend: MediFind Web (GitHub Pages)

## Live Demo

Frontend: https://achinthajayaweera.github.io/Medifind-web/
