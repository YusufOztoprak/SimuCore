# SimuCore 🌍

**SimuCore** is a scientifically grounded, data-driven simulation engine that models complex ecosystem dynamics in an **African Savanna**. It focuses on interactions between producers (plants), primary consumers (herbivores), and secondary consumers (predators) using established ecological theory and allometric scaling laws.

> 🎯 Goal: provide a backend-first, extensible ecosystem simulation that is **scientifically meaningful**, **data-driven**, and **engineered like a real system** (not a toy model).

![Simulation Dashboard](https://via.placeholder.com/800x400?text=SimuCore+Dashboard+Preview)

---

## 🎯 Who Is This For?

- Backend developers interested in scientific simulations
- Students working on ecology, AI, evolutionary systems, or complex systems
- Researchers or hobbyists prototyping ecosystem dynamics
- Academic project submissions requiring technical depth

---

## ❓ Why SimuCore?

Unlike classic Lotka–Volterra demos or hardcoded simulations, **SimuCore**:

- Uses **allometric scaling** instead of arbitrary constants
- Stores species and parameters as **real database entities**
- Separates **scientific models** from **infrastructure code**
- Runs as a **backend simulation engine** with real-time visualization
- Is designed to scale to other domains (e.g. epidemiology, evolution)

---

## 🧪 Scientific Principles

The simulation is built on well-established ecological and mathematical models.

### Allometric Scaling (Kleiber-like)

Biological parameters are derived from average body mass \(M\):

- Metabolic rate / consumption: \(R \propto M^{0.75}\)
- Reproduction rate: \(r \propto M^{-0.25}\)
- Mortality: inversely related to lifespan and scaled by mass

This allows species parameters to **emerge from biology**, not manual tuning.

---

### Logistic Growth (Plants)

Plant biomass follows logistic growth limited by carrying capacity \(K\), reduced by herbivore grazing:

\[
\frac{dN}{dt} = rN\left(1 - \frac{N}{K}\right) - G(N, H)
\]

In the simulation, this is approximated using a discrete-time update:

\[
N_{t+1} = N_t + \Delta t \left[ rN_t\left(1 - \frac{N_t}{K}\right) - G(N_t, H_t) \right]
\]

Herbivory \(G(N,H)\) is modeled using standard ecological functional responses (e.g. Holling Type II).

<details>
<summary><strong>Implementation details</strong></summary>

- Example grazing model:
  \( G = c \cdot H \cdot \frac{N}{N + h} \)
- Population values are clamped to avoid numerical instability
- Equations may be rendered using KaTeX in documentation builds

</details>

---

### Predator–Prey Dynamics

Predator–prey interactions are modeled using discrete-time adaptations of classical Lotka–Volterra dynamics:

- Herbivore growth depends on plant availability
- Predator growth depends on hunting success and conversion efficiency
- Mortality and reproduction are mass-scaled via allometry

---

## 🖥️ What You Will See

When running the simulation:

- 🦓 Emoji-based savanna visualization (HTML5 Canvas)
- 📈 Real-time population charts (plants / herbivores / predators)
- 🔄 Continuous population updates via Socket.io
- 🧬 Species behavior emerging from biological parameters

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Backend:** Express.js
- **Database:** PostgreSQL (Sequelize ORM)
- **Real-time:** Socket.io
- **Frontend:** HTML5 Canvas, Chart.js
- **Architecture:** Modular / Clean Architecture

---

## 🚀 Features

- Data-driven species definitions (stored in database)
- Dynamic seeding script (`seed-savanna.js`) computing species stats from body mass
- Real-time simulation loop
- Live visualization and population metrics
- Designed for extensibility (new ecosystems, models, or domains)

---

## 📦 Installation & Usage

### 1. Clone the repository
```bash
git clone https://github.com/YusufOztoprak/SimuCore.git
cd SimuCore
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment
Copy `.env.example` to `.env` and update PostgreSQL credentials.

```bash
# Windows
copy .env.example .env

# macOS / Linux
cp .env.example .env
```

### 4. Database setup
```bash
npm run db:migrate
npm run db:seed
```

### 5. Run the app (development)
```bash
npm run dev
```

### 6. Run tests
```bash
npm test
```

### 7. Production (example)
```bash
npm run build
npm start
```

---

## 🤝 Contributing

Contributions are welcome.

- Open issues for bugs or feature requests
- Submit pull requests with clear descriptions
- Include tests where applicable

---

## 📄 License

This project is licensed under the **MIT License**. See the `LICENSE` file for details.

---

## 📧 Contact

For questions or collaboration:

**Yusuf Öztoprak**  
📩 yusufoztoprak35@gmail.com

