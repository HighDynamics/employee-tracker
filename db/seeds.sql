INSERT INTO departments (name)
VALUES
  ('Front-End'), ('Back-End'), ('Quality Assurance');

INSERT INTO roles (title, salary, department_id)
VALUES
  ('Manager', 100000.50, 1),
  ('Manager', 90000.25, 2),
  ('Manager', 75000.75, 3),
  ('Developer', 70000.36, 1),
  ('Developer', 60100.58, 2),
  ('Customer Rep', 30000.22, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('Daniel', 'Lunst', 1, NULL),
  ('Amber', 'Deter', 2, NULL),
  ('Oliver', 'Bolang', 3, NULL),
  ('Scott', 'Quill', 4, 1),
  ('Nick', 'Alling', 6, 3),
  ('Maggie', 'Sipella', 5, 2),
  ('Chris', 'Rotran', 5, 2),
  ('Jordan', 'Zelle', 4, 1),
  ('Silvia', 'Orta', 6, 3);