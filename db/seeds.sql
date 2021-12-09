INSERT INTO departments (name)
VALUES
  ('Front-End'), ('Back-End'), ('Quality Assurance'), ('Human Resources');

INSERT INTO roles (title, salary, department_id)
VALUES
  ('Manager', 100000.50, 1),
  ('Manager', 90000.25, 2),
  ('Manager', 75000.75, 3),
  ('Manager', 80000.00, 4),
  ('Developer', 70000.36, 1),
  ('Developer', 60100.58, 2),
  ('Customer Rep', 30000.22, 3),
  ('Recruiter', 30000.00, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('Daniel', 'Lunst', 1, NULL),
  ('Amber', 'Deter', 2, NULL),
  ('Oliver', 'Bolang', 3, NULL),
  ('Tina', 'Wright', 4, NULL),
  ('Scott', 'Quill', 5, 1),
  ('Nick', 'Alling', 6, 2),
  ('Maggie', 'Sipella', 7, 3),
  ('Chris', 'Rotran', 8, 4),
  ('Jordan', 'Zelle', 5, 1),
  ('Silvia', 'Orta', 6, 2),
  ('Arn', 'Hachem', 7, 3),
  ('Zach', 'Asalam', 8, 4);