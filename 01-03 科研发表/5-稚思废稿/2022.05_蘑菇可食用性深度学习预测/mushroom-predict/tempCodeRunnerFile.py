# plotting chosen variables against each other
plt.figure(figsize=(10,10))
plt.scatter(cap_shape_data.get_group('x')['cap-surface'],cap_shape_data.get_group('x')['cap-color'],label='x')