# 📘 README — Clinic-First Case Management System

## 1. What are we building?

This project is a **clinic-first workflow tool** designed to **save doctors’ time and attention** in small clinics and hospitals.

The system is built around a simple belief:

> **Doctors should see everything, but be disturbed only when it truly matters.**

---

## 2. Core philosophy (non-negotiable)

1. **Doctor is the center of the system**
2. **Case is the core domain**
3. **Doctor dashboard is the primary control surface**
4. **WhatsApp is a controlled assistant, not a noise source**
5. **Doctor attention is sacred**

If a feature violates doctor focus or interrupts unnecessarily, it does not get added.

---

## 3. High-level system overview

```
Patient (WhatsApp only)
        ↓
Input Layer (Twilio / Webhooks)
        ↓
Core Domain (Cases)
        ↓
Doctor Dashboard  ←→  Doctor WhatsApp (notifications)
```

- Patients interact **only via WhatsApp**
- Doctors interact via:
  - **Dashboard** (primary)
  - **WhatsApp** (secondary, controlled)

---

## 4. Core domain: Case

A **Case** represents one unit of doctor attention.

### Case lifecycle

```
OPEN  →  CLOSED
```

This lifecycle is:

- Explicit
- Backend-controlled
- Predictable
- Queryable

### Minimum responsibilities of a case

- Track status (OPEN / CLOSED)
- Be visible on doctor dashboard
- Support derived views (severity, grouping)
- Support future extensions (notes, audit, overrides)

---

## 5. Doctor interaction model

### 5.1 Doctor Dashboard (primary surface)

The dashboard is where doctors:

- See all cases
- Review patient data
- Make decisions
- Close cases
- Add notes (later layers)
- Override system decisions (later layers)

**Dashboard is the source of truth.**

---

### 5.2 Doctor WhatsApp (secondary surface)

Doctor WhatsApp exists for **notifications only**, not free-form chat.

Backend sends WhatsApp messages to doctors:

- Based on **severity**
- Based on **doctor schedule / availability**
- Only when attention is genuinely required

#### Hard rule:

> **The system must never disturb a doctor unnecessarily — especially at night.**

If WhatsApp were removed:

- Dashboard should still work
- Core system should remain functional

---

## 6. Patient interaction model

- Patients interact **only via WhatsApp**
- Patients never see the dashboard
- WhatsApp messages are treated as **input events**
- WhatsApp does not contain business logic

WhatsApp is replaceable.
Cases are not.

---

## 7. Backend responsibilities

Backend owns:

- Case lifecycle
- State transitions
- Data persistence
- Querying by status
- Future scheduling & notification decisions

### Current APIs (Layer-1)

- `GET /api/cases?status=OPEN`
- `GET /api/cases?status=CLOSED`
- `POST /api/cases/:id/close`

Backend intentionally does **not**:

- Decide UI grouping
- Handle presentation logic
- Depend on WhatsApp logic

---

## 8. Frontend responsibilities

Frontend owns:

- Tabs (OPEN / CLOSED)
- Displaying cases
- Optimistic UI updates
- Derived views (later layers)

Frontend intentionally does **not**:

- Maintain its own truth
- Guess backend state
- Encode business rules

---

## 9. Layered development plan

### 🔴 Layer 0 — Input Channels (parked)

- WhatsApp (Twilio)
- Webhooks
- Message ingestion only
  **No business logic here**

---

### 🟠 Layer 1 — Core Domain ✅ DONE

- Case lifecycle
- Backend APIs
- Doctor dashboard foundation
- Clean frontend–backend contract

---

### 🟡 Layer 2 — Derived Logic (NEXT)

- Severity grouping (Emergency / Normal)
- Visual grouping
- Sorting
- UI-only logic
- No backend schema changes

---

### 🟢 Layer 3 — Performance & Experience

- Smart polling
- Visibility-based refresh
- Reduced backend load

---

### 🔵 Layer 4 — Doctor Control & Trust

- Doctor notes
- Severity overrides
- Audit trail
- Case history

---

### 🟣 Layer 5 — UI & Polish

- Dashboard design
- Charts
- Animations
- Visual clarity

---

## 10. Why WhatsApp is integrated later

Integrating WhatsApp too early:

- Pollutes backend logic
- Couples webhook and UI behavior
- Makes reasoning difficult
- Risks interrupting doctors unnecessarily

By integrating WhatsApp **after core stability**:

- Backend remains clean
- Notifications stay controlled
- Doctor trust is preserved

---

## 11. Guiding rule for all future features

Before adding anything, ask:

> **Does this affect the case itself, or only how the case is presented or notified?**

- Affects the case → core/backend
- Affects presentation/notification → derived layers

---

## 12. Current status

- Core architecture stable
- Case lifecycle implemented
- Doctor dashboard aligned with backend truth
- WhatsApp intentionally decoupled
- Doctor attention model respected

**Next milestone:** Layer-2 (severity as a derived UI view)

---

## ✨ End note

This system prioritizes **clarity, control, and doctor trust** over demos, noise, and shortcuts.

---

### ✅ Suggested commit

```
docs: define clinic-first architecture and doctor attention model
```

---

bhai sach bolun —
ye README likhna = **project ka backbone likhna** hota hai.
Ab future me tu ya koi aur agar bhatak bhi jaaye,
ye file bolegi: _“bhai hum kya bana rahe the”_.

Jab ready ho, bas bol:
**“Layer 2 start”**
aur hum next layer pe **bilkul isi clarity ke saath** chalenge 🤝
