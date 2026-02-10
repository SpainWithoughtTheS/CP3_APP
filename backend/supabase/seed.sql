insert into students (email, full_name, role) values
('alex@campus.edu', 'Alex Rivera', 'student'),
('jamie@campus.edu', 'Jamie Chen', 'student'),
('admin@campus.edu', 'Morgan Lee', 'admin')
on conflict (email) do nothing;

insert into clubs (name, description, meeting_time, location, contact_email) values
('Robotics Club', 'Build robots for regional competitions.', 'Tue 4:00 PM', 'Lab B12', 'robotics@campus.edu'),
('Art Collective', 'Collaborative drawing, design, and murals.', 'Wed 3:30 PM', 'Art Studio', 'art@campus.edu')
on conflict do nothing;

insert into news_posts (title, category, content, pinned)
values ('Campus Wi-Fi Upgrade', 'announcement', 'Network maintenance Friday night with faster speeds by Monday.', true)
on conflict do nothing;

insert into safety_guides (guide_type, instructions)
values
('fire', array['Pull alarm if safe', 'Evacuate via nearest exit', 'Meet at assembly area']),
('lockdown', array['Lock doors', 'Move out of sight', 'Silence phones'])
on conflict (guide_type) do nothing;
